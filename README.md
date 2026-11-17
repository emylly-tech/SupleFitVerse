# SupleFitVerse

Landing page de uma loja de suplementos, com vitrine de produtos organizada por categorias, carrinho, formulário de contato, banco de dados relacional em nuvem (**Supabase / PostgreSQL**) e o **Suplito**, um assistente virtual com Inteligência Artificial local. Feita com HTML, CSS e JavaScript puro, com integração direta ao servidor local Ollama (Llama 3).

> Projeto acadêmico de Programação Web e Banco de Dados. Os produtos, preços e informações são ilustrativos.

## Visão geral

O SupleFitVerse apresenta e vende suplementos para atletas, praticantes de musculação e entusiastas do fitness. O visual é escuro, com detalhes em verde neon, e o site se adapta a computador, tablet e celular. Além da interface interativa, o sistema persiste pedidos, itens, mensagens de contato e clientes em um banco de dados relacional normalizado.

## Integrantes do grupo

| Nome |
|---|
| Chrislley Emylly de Oliveira Vilela |
| Liana Raquel Silva dos Santos Costa |

**Disciplinas:** Desenvolvimento Web para I.A. | Banco de Dados 
**Professores:** Tiago Martins Ribeiro | Sidiney de Sousa Araujo

## Funcionalidades

- **Menu responsivo:** vira botão de menu em telas pequenas e destaca a seção em que você está ao rolar a página.
- **Vitrine por categorias:** 24 produtos em 6 categorias, com filtro por abas.
- **Cards de produto:** foto, etiquetas, avaliação, preço e parcelamento, em layout `grid` responsivo.
- **Carrinho e Pedidos:** o contador do topo aumenta a cada produto adicionado e os pedidos são registrados no banco de dados.
- **Formulário de contato:** valida os campos obrigatórios, com mensagens em português, salva os dados na tabela de contatos do Supabase e confirma o envio na tela.
- **Suplito, o assistente virtual:** robô fixo no canto inferior direito, que abre um chat com perguntas rápidas e respostas inteligentes sobre a loja.

## Categorias

| Categoria | Produtos |
|---|---|
| Whey Protein | 4 |
| Creatina | 4 |
| Pré-treinos | 4 |
| Hipercalóricos | 4 |
| Coqueteleiras | 4 |
| Barras de proteína | 4 |

## Tecnologias

- **Frontend:** HTML5 e CSS3 (`display: grid` e `flex`, variáveis CSS, layout responsivo)
- **Lógica e Integração:** JavaScript Vanilla (sem frameworks) e Flask (Python) no back-end
- **Banco de Dados:** PostgreSQL hospedado no [Supabase](https://supabase.com/)
- **Inteligência Artificial:** [Ollama](https://ollama.com/) rodando o modelo de linguagem **Llama 3** localmente
- **Tipografia:** Fonte Inter, do Google Fonts

## Banco de Dados (PostgreSQL / Supabase)
O projeto utiliza um banco de dados relacional estruturado para gerenciar clientes, catálogo de mensagens (contatos), catálogo de produtos, pedidos e os itens de cada compra, garantindo integridade referencial por meio de chaves primárias (`PK`) e estrangeiras (`FK`).

### Estrutura das Tabelas (Esquema Relacional)

| Tabela | Descrição | Principais Colunas |
|---|---|---|
| **`produtos`** | Catálogo oficial de suplementos da loja. | `id` (SERIAL - PK), `nome`, `category`, `price` |
| **`contatos`** | Armazena as mensagens enviadas pelos usuários pelo formulário "Fale Conosco". | `id` (SERIAL - PK), `nome`, `email`, `assunto`, `mensagem`, `criado_em` |
| **`clientes`** | Registra os dados cadastrais dos clientes que realizam compras ou simulações. | `id` (SERIAL - PK), `nome`, `email`, `criado_em` |
| **`pedidos`** | Registra as transações principais realizadas e o status atual. | `id` (SERIAL - PK), `cliente_id` (FK), `valor_total`, `status`, `criado_em` |
| **`itens_pedido`** | Tabela associativa (N:N) que detalha os produtos e quantidades de cada pedido. | `id` (SERIAL - PK), `pedido_id` (FK), `produto_id` (FK), `quantidade` |

### Scripts SQL (`database/`)

Os scripts estão organizados na pasta `database/` em ordem lógica de execução:

1. **`01_suplefit_schema_setup.sql`**: Cria as 5 tabelas relacionais, tipos de dados, restrições e faz a carga inicial dos 24 produtos oficiais.
2. **`02_config_disable_rls.sql`**: Desativa o *Row Level Security (RLS)* nas tabelas para permitir inserções diretas em ambiente acadêmico de testes.
3. **`03_query_resumo_clientes.sql`**: Consulta analítica de agregação (`LEFT JOIN`, `GROUP BY`) que calcula o resumo e o valor acumulado por cliente.
4. **`04_query_pedidos_detalhados.sql`**: Consulta relacional avançada (`INNER JOIN`) que cruza pedidos, clientes, itens e produtos com cálculo de subtotal.

## Integração com Inteligência Artificial

O site tem um assistente virtual chamado **Suplito**, que interage via API local utilizando o modelo **Llama 3** rodando no **Ollama**.

**Persona.** O Suplito é o assistente virtual exclusivo da SupleFitVerse. Ele é programado com engenharia de prompt para responder estritamente dentro do escopo comercial da loja, auxiliando os clientes a escolher produtos do catálogo (whey, creatina, pré-treino, etc.) e entender a vitrine. Respostas fora do tema são filtradas de forma segura.

**Como funciona**

1. O visitante abre o chat pelo botão do robô e envia uma dúvida.
2. O `script.js` realiza uma requisição `fetch` diretamente para a API local do Ollama (`http://localhost:11434/api/chat`).
3. As instruções da persona são processadas pelo Llama 3 localmente.
4. A resposta é tratada pelo JavaScript e exibida no chat em tempo real.

**Por que IA Local.** A arquitetura local elimina custos com chaves de API externas, garante total privacidade aos dados e permite controle absoluto sobre a execução do modelo diretamente na máquina do desenvolvedor/servidor.

## Estrutura do projeto

```text
suplefitverseoficial/
├── database/                               # Scripts SQL do PostgreSQL / Supabase
│   ├── 01_suplefit_schema_setup.sql        # Criação do esquema, tabelas e carga inicial
│   ├── 02_config_disable_rls.sql           # Configuração de permissões (RLS)
│   ├── 03_query_resumo_clientes.sql        # Relatório analítico de clientes
│   └── 04_query_pedidos_detalhados.sql     # Relatório detalhado de pedidos com JOIN
├── static/                                 # Arquivos estáticos (assets, estilos e scripts)
│   ├── assets/                             # Imagens dos produtos e do Suplito
│   ├── css/
│   │   └── style.css                       # Estilos e responsividade
│   └── js/
│       └── script.js                       # Lógica do front-end e integrações
├── templates/                              # Páginas HTML do Flask
│   └── index.html                          # Interface principal da aplicação
├── .env.example                            # Exemplo de variáveis de ambiente
├── .gitignore                              # Arquivos protegidos (ex: .env e config.js)
├── app.py                                  # Servidor back-end em Flask
├── PERSONA_SUPLITO_COMPLETA.md             # Documentação técnica da persona e regras da IA
├── README.md                               # Documentação geral do projeto
└── requirements.txt                        # Dependências Python do projeto
