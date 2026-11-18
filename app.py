import requests
from flask import Flask, render_template, request, jsonify
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env (protegendo as credenciais no servidor)
load_dotenv()

app = Flask(__name__)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route("/")
def index():
    return render_template("index.html")

# Rota única e correta para receber o formulário e salvar na tabela 'contatos'
@app.route("/api/contato", methods=["POST"])
def api_contato():
    try:
        dados = request.get_json()
        
        # Insere na tabela 'contatos' separada do Supabase
        response = supabase.table("contatos").insert({
            "nome": dados.get("nome"),
            "email": dados.get("email"),
            "assunto": dados.get("assunto"),
            "mensagem": dados.get("mensagem")
        }).execute()

        return jsonify({"sucesso": True, "data": response.data})
    except Exception as e:
        return jsonify({"sucesso": False, "erro": str(e)}), 500

# Rota para processar a simulação de pedido e itens
@app.route("/api/pedido", methods=["POST"])
def api_pedido():
    try:
        dados = request.get_json()
        nome = dados.get("nome")
        email = dados.get("email")
        valor_total = dados.get("valor_total")
        itens = dados.get("itens", [])

        # 1. Salva ou identifica o cliente
        cliente_res = supabase.table("clientes").insert({
            "nome": nome,
            "email": email
        }).execute()
        
        # Pega o ID do cliente gerado
        cliente_id = cliente_res.data[0]["id"]

        # 2. Cria o pedido
        pedido_res = supabase.table("pedidos").insert({
            "cliente_id": cliente_id,
            "valor_total": valor_total,
            "status": "Simulacao"
        }).execute()

        pedido_id = pedido_res.data[0]["id"]

        # 3. Salva os itens do pedido com a quantidade dinâmica correta
        for item in itens:
            supabase.table("itens_pedido").insert({
                "pedido_id": pedido_id,
                "produto_id": item["id"],
                "quantidade": item.get("quantity", 1)
            }).execute()

        return jsonify({"sucesso": True})
    except Exception as e:
        return jsonify({"sucesso": False, "erro": str(e)}), 500
@app.route('/api/chat', methods=['POST'])
def api_chat():
    dados = request.get_json(silent=True) or {}
    pergunta = (dados.get('pergunta') or '').strip()

    if not pergunta:
        return jsonify({'erro': 'Digite uma pergunta.'}), 400

    if len(pergunta) > 1000:
        return jsonify({'erro': 'Pergunta muito longa.'}), 400

    chave = os.environ.get('OLLAMA_API_KEY')
    modelo = os.environ.get('OLLAMA_MODEL', 'gemma4:31b')

    if not chave:
        return jsonify({'erro': 'OLLAMA_API_KEY não configurada no Vercel.'}), 500

    instrucao = (
        'Você é o Suplito, assistente da loja SupleFitVerse. '
        'Responda em português, com simpatia, sobre produtos da vitrine, '
        'whey, creatina, suplementos, carrinho e pedidos. '
        'Se perguntarem sobre assuntos fora da loja e suplementos, '
        'redirecione educadamente para os produtos da loja. '
        'Não invente preços, estoque ou promessas médicas.'
    )

    try:
        resposta = requests.post(
            'https://ollama.com/api/chat',
            headers={
                'Authorization': f'Bearer {chave}',
                'Content-Type': 'application/json'
            },
            json={
                'model': modelo,
                'messages': [
                    {'role': 'system', 'content': instrucao},
                    {'role': 'user', 'content': pergunta}
                ],
                'stream': False
            },
            timeout=40
        )

        if not resposta.ok:
            app.logger.warning('Ollama retornou HTTP %s', resposta.status_code)
            return jsonify({
                'erro': f'Ollama retornou erro HTTP {resposta.status_code}.'
            }), 502

        conteudo = resposta.json().get('message', {}).get('content', '')
        return jsonify({'resposta': conteudo or 'Não consegui responder agora.'})

    except requests.Timeout:
        return jsonify({'erro': 'A Ollama demorou muito para responder.'}), 504
    except (requests.RequestException, ValueError):
        return jsonify({'erro': 'Falha na comunicação com a Ollama.'}), 502
