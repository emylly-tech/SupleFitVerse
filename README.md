# SupleFitVerse

Landing page de uma loja de suplementos, com vitrine de produtos organizada por categorias, carrinho, formulário de contato, banco de dados relacional em nuvem (**Supabase / PostgreSQL**) e o **Suplito**, um assistente virtual com Inteligência Artificial local. Feita com HTML, CSS e JavaScript puro, com integração direta ao servidor local Ollama (Llama 3).

> Projeto acadêmico de Programação Web e Banco de Dados. Os produtos, preços e informações são ilustrativos.

## Visão geral

O SupleFitVerse apresenta e vende suplementos para atletas, praticantes de musculação e entusiastas do fitness. O visual é escuro, com detalhes em verde neon, e o site se adapta a computador, tablet e celular. Além da interface interativa, o sistema persiste pedidos, itens e mensagens de contato em um banco de dados relacional.

## Integrantes do grupo

| Nome |
|---|
| Chrislley Emylly de Oliveira Vilela |
| Liana Raquel Silva dos Santos Costa |

**Disciplinas:** Desenvolvimento Web para I.A. | Banco de Dados 
**Professores:** Tiago Martins Ribeiro | Gabriel Alencar Vale

## Funcionalidades

- **Menu responsivo:** vira botão de menu em telas pequenas e destaca a seção em que você está ao rolar a página.
- **Vitrine por categorias:** 24 produtos em 6 categorias, com filtro por abas.
- **Cards de produto:** foto, etiquetas, avaliação, preço e parcelamento, em layout `grid` responsivo.
- **Carrinho e Pedidos:** o contador do topo aumenta a cada produto adicionado e os pedidos são registrados no banco de dados.
- **Formulário de contato:** valida os campos obrigatórios, com mensagens em português, salva os dados no Supabase e confirma o envio na tela.
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
- **Lógica e Integração:** JavaScript Vanilla (sem frameworks)
- **Banco de Dados:** PostgreSQL hospedado no [Supabase](https://supabase.com/)
- **Inteligência Artificial:** [Ollama](https://ollama.com/) rodando o modelo de linguagem **Llama 3** localmente
- **Tipografia:** Fonte Inter, do Google Fonts

## Banco de Dados (PostgreSQL / Supabase)
O projeto utiliza um banco de dados relacional estruturado para gerenciar clientes, catálogo de produtos, pedidos e os itens de cada compra, garantindo integridade referencial por meio de chaves primárias (`PK`) e estrangeiras (`FK`).

### Estrutura das Tabelas

| Tabela | Descrição | Principais Colunas |
|---|---|---|
| **`clientes`** | Armazena dados cadastrais e mensagens enviadas pelo formulário de contato. | `id` (UUID - PK), `nome`, `email`, `assunto`, `mensagem`, `criado_em` |
| **`produtos`** | Catálogo de suplementos da loja. | `id` (SERIAL - PK), `nome`, `categoria`, `preco`, `estoque` |
| **`pedidos`** | Registra as compras realizadas e o status atual do pedido. | `id` (UUID - PK), `cliente_id` (FK), `valor_total`, `status`, `criado_em` |
| **`itens_pedido`** | Tabela associativa que detalha os produtos e quantidades de cada pedido. | `id` (SERIAL - PK), `pedido_id` (FK), `produto_id` (FK), `quantidade` |

### Scripts SQL (`database/`)

Os scripts estão organizados na pasta `database/` em ordem lógica de execução:

1. **`01_suplefit_schema_setup.sql`**: Cria as 4 tabelas relacionais, tipos de dados, restrições (`NOT NULL`, `UNIQUE`) e índices de busca.
2. **`02_config_disable_rls.sql`**: Desativa o *Row Level Security (RLS)* nas tabelas para permitir inserções diretas pelo frontend no ambiente de testes acadêmicos.
3. **`03_query_resumo_clientes.sql`**: Consulta analítica de agregação (`LEFT JOIN`, `GROUP BY` e `COALESCE`) que calcula o total de pedidos e o valor acumulado gasto por cliente.
4. **`04_query_pedidos_detalhados.sql`**: Consulta relacional (`INNER JOIN` e `ORDER BY`) que exibe os detalhes dos pedidos cruzados com o nome e e-mail dos clientes, ordenados dos mais recentes para os mais antigos.

## Integração com Inteligência Artificial

O site tem um assistente virtual chamado **Suplito**, que interage via API local utilizando o modelo **Llama 3** rodando no **Ollama**.

**Persona.** O Suplito é o assistente virtual exclusivo da SupleFitVerse. Ele é programado com engenharia de prompt para responder estritamente dentro do escopo comercial da loja, auxiliando os clientes a escolher produtos do catálogo (whey, creatina, pré-treino, etc.) e entender a vitrine. Respostas fora do tema são filtradas de forma segura.

**Como funciona**

1. O visitante abre o chat pelo botão do robô e envia uma dúvida.
2. O `script.js` realiza uma requisição `fetch` diretamente para a API local do Ollama (`http://localhost:11434/api/chat`).
3. As instruções da persona (em formato JSON obrigatório) são processadas pelo Llama 3 localmente.
4. A resposta em JSON é tratada pelo JavaScript e exibida no chat em tempo real.

**Por que IA Local.** A arquitetura local elimina custos com chaves de API externas, garante total privacidade aos dados e permite controle absoluto sobre a execução do modelo diretamente na máquina do desenvolvedor/servidor.

## Estrutura do projeto

```text
suplefitverseoficial/
├── assets/                                 # Imagens dos produtos e do Suplito
├── css/
│   └── style.css                           # Estilos e responsividade
├── database/                               # Scripts SQL do PostgreSQL / Supabase
│   ├── 01_suplefit_schema_setup.sql        # Criação do esquema e tabelas
│   ├── 02_config_disable_rls.sql           # Configuração de permissões (RLS)
│   ├── 03_query_resumo_clientes.sql        # Relatório analítico de clientes
│   └── 04_query_pedidos_detalhados.sql     # Relatório detalhado de pedidos
├── js/
│   ├── config.js                           # Credenciais de conexão com o Supabase
│   └── script.js                           # Menu, produtos, carrinho, formulário, Supabase e Ollama
├── .gitignore                              # Arquivos ignorados no Git (ex: config.js)
├── index.html                              # Estrutura principal da página
├── PERSONA_SUPLITO_COMPLETA.md             # Documentação técnica da persona e regras da IA
└── README.md                               # Documentação geral do projeto