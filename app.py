import os
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
import requests
from supabase import Client, create_client

# Carrega as variáveis do arquivo .env (protegendo as credenciais no servidor)
load_dotenv()

app = Flask(__name__)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


@app.route("/")
def index():
  return render_template("index.html")


# --- ROTAS DE CADASTRO (CREATE) COM VALIDAÇÃO ---


@app.route("/api/contato", methods=["POST"])
def api_contato():
  try:
    dados = request.get_json(silent=True) or {}
    nome = (dados.get("nome") or "").strip()
    email = (dados.get("email") or "").strip()
    assunto = (dados.get("assunto") or "").strip()
    mensagem = (dados.get("mensagem") or "").strip()

    # Validação de campos obrigatórios e formato de e-mail
    if not nome or not email or not mensagem:
      return (
          jsonify({
              "sucesso": False,
              "erro": "Nome, e-mail e mensagem são obrigatórios.",
          }),
          400,
      )
    if "@" not in email or "." not in email:
      return (
          jsonify({"sucesso": False, "erro": "Formato de e-mail inválido."}),
          400,
      )

    response = (
        supabase.table("contatos")
        .insert({
            "nome": nome,
            "email": email,
            "assunto": assunto or "Geral",
            "mensagem": mensagem,
        })
        .execute()
    )

    return jsonify({"sucesso": True, "data": response.data}), 201
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


@app.route("/api/pedido", methods=["POST"])
def api_pedido():
  try:
    dados = request.get_json(silent=True) or {}
    nome = (dados.get("nome") or "").strip()
    email = (dados.get("email") or "").strip()
    itens = dados.get("itens", [])

    # Validação de campos obrigatórios e lista de itens
    if not nome or not email or not isinstance(itens, list) or len(itens) == 0:
      return (
          jsonify({
              "sucesso": False,
              "erro": "Dados do cliente e itens do pedido são obrigatórios.",
          }),
          400,
      )
    if "@" not in email or "." not in email:
      return (
          jsonify({"sucesso": False, "erro": "Formato de e-mail inválido."}),
          400,
      )

    # Validação de tipo de dado numérico (float) para o valor total
    try:
      valor_total = float(dados.get("valor_total", 0))
      if valor_total <= 0:
        raise ValueError()
    except (TypeError, ValueError):
      return jsonify({"sucesso": False, "erro": "Valor total inválido."}), 400

    # 1. Salva o cliente
    cliente_res = (
        supabase.table("clientes")
        .insert({"nome": nome, "email": email})
        .execute()
    )
    cliente_id = cliente_res.data[0]["id"]

    # 2. Cria o pedido
    pedido_res = (
        supabase.table("pedidos")
        .insert({
            "cliente_id": cliente_id,
            "valor_total": valor_total,
            "status": "Simulacao",
        })
        .execute()
    )
    pedido_id = pedido_res.data[0]["id"]

    # 3. Valida tipos e salva os itens do pedido
    for item in itens:
      try:
        produto_id = int(item["id"])
        quantidade = int(item.get("quantity", 1))
      except (KeyError, TypeError, ValueError):
        return (
            jsonify({
                "sucesso": False,
                "erro": "ID do produto ou quantidade inválidos.",
            }),
            400,
        )

      if quantidade <= 0:
        return (
            jsonify({
                "sucesso": False,
                "erro": "Quantidade do item deve ser maior que zero.",
            }),
            400,
        )

      supabase.table("itens_pedido").insert({
          "pedido_id": pedido_id,
          "produto_id": produto_id,
          "quantidade": quantidade,
      }).execute()

    return jsonify({"sucesso": True}), 201
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


# --- ROTAS DE CONSULTA (READ) ---


@app.route("/api/produtos", methods=["GET"])
def listar_produtos():
  try:
    res = supabase.table("produtos").select("*").order("id").execute()
    return jsonify({"sucesso": True, "dados": res.data}), 200
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


@app.route("/api/pedidos", methods=["GET"])
def listar_pedidos():
  try:
    res = (
        supabase.table("pedidos")
        .select("*, clientes(nome, email)")
        .order("criado_em", desc=True)
        .execute()
    )
    return jsonify({"sucesso": True, "dados": res.data}), 200
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


@app.route("/api/contatos", methods=["GET"])
def listar_contatos():
  try:
    res = (
        supabase.table("contatos")
        .select("*")
        .order("criado_em", desc=True)
        .execute()
    )
    return jsonify({"sucesso": True, "dados": res.data}), 200
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


# --- ATUALIZAÇÃO CONTROLADA (UPDATE) ---


@app.route("/api/pedido/<int:pedido_id>/status", methods=["PATCH", "PUT"])
def atualizar_status_pedido(pedido_id):
  dados = request.get_json(silent=True) or {}
  novo_status = (dados.get("status") or "").strip()
  status_permitidos = [
      "Simulacao",
      "Confirmado",
      "Em Separacao",
      "Entregue",
      "Cancelado",
  ]

  if novo_status not in status_permitidos:
    return jsonify({"sucesso": False, "erro": "Status inválido."}), 400

  try:
    res = (
        supabase.table("pedidos")
        .update({"status": novo_status})
        .eq("id", pedido_id)
        .execute()
    )
    return jsonify({"sucesso": True, "pedido_atualizado": res.data}), 200
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


# --- EXCLUSÃO CONTROLADA (DELETE) ---


@app.route("/api/contato/<int:contato_id>", methods=["DELETE"])
def excluir_contato(contato_id):
  try:
    res = supabase.table("contatos").delete().eq("id", contato_id).execute()
    return (
        jsonify({
            "sucesso": True,
            "mensagem": f"Registro {contato_id} removido com sucesso.",
        }),
        200,
    )
  except Exception as e:
    return jsonify({"sucesso": False, "erro": str(e)}), 500


# --- ROTA DE CHAT (OLLAMA) ---


@app.route("/api/chat", methods=["POST"])
def api_chat():
  dados = request.get_json(silent=True) or {}
  pergunta = (dados.get("pergunta") or "").strip()

  if not pergunta:
    return jsonify({"erro": "Digite uma pergunta."}), 400

  if len(pergunta) > 1000:
    return jsonify({"erro": "Pergunta muito longa."}), 400

  chave = os.environ.get("OLLAMA_API_KEY")
  modelo = os.environ.get("OLLAMA_MODEL", "gemma4:31b")

  if not chave:
    return jsonify({"erro": "OLLAMA_API_KEY não configurada no Vercel."}), 500

  instrucao = (
      "Você é o Suplito, assistente da loja SupleFitVerse. "
      "Responda em português, com simpatia, sobre produtos da vitrine, "
      "whey, creatina, suplementos, carrinho e pedidos. "
      "Se perguntarem sobre assuntos fora da loja e suplementos, "
      "redirecione educadamente para os produtos da loja. "
      "Não invente preços, estoque ou promessas médicas."
  )

  try:
    resposta = requests.post(
        "https://ollama.com/api/chat",
        headers={
            "Authorization": f"Bearer {chave}",
            "Content-Type": "application/json",
        },
        json={
            "model": modelo,
            "messages": [
                {"role": "system", "content": instrucao},
                {"role": "user", "content": pergunta},
            ],
            "stream": False,
        },
        timeout=40,
    )

    if not resposta.ok:
      app.logger.warning("Ollama retornou HTTP %s", resposta.status_code)
      return (
          jsonify(
              {"erro": f"Ollama retornou erro HTTP {resposta.status_code}."}
          ),
          502,
      )

    conteudo = resposta.json().get("message", {}).get("content", "")
    return jsonify({"resposta": conteudo or "Não consegui responder agora."})

  except requests.Timeout:
    return jsonify({"erro": "A Ollama demorou muito para responder."}), 504
  except (requests.RequestException, ValueError):
    return jsonify({"erro": "Falha na comunicação com a Ollama."}), 502


if __name__ == "__main__":
  app.run(debug=True)