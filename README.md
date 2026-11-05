# SupleFitVerse

Landing page de uma loja de suplementos, com vitrine de produtos organizada por categorias, carrinho, formulário de contato e o **Suplito**, um assistente virtual com Inteligência Artificial local. Feita com HTML, CSS e JavaScript puro, com integração direta ao servidor local Ollama (Llama 3).

> Projeto acadêmico de Programação Web. Os produtos, preços e informações são ilustrativos.

## Visão geral

O SupleFitVerse apresenta e vende suplementos para atletas, praticantes de musculação e entusiastas do fitness. O visual é escuro, com detalhes em verde neon, e o site se adapta a computador, tablet e celular.

## Integrantes do grupo

| Nome | 
|---|
| Chrislley Emylly de Oliveira Vilela | 
| Liana Raquel Silva dos Santos Costa | 

**Disciplina:** Desenvolvimento Web para I.A.  
**Professor(a):** Tiago Martins Ribeiro

## Funcionalidades

- **Menu responsivo:** vira botão de menu em telas pequenas e destaca a seção em que você está ao rolar a página.
- **Vitrine por categorias:** 24 produtos em 6 categorias, com filtro por abas.
- **Cards de produto:** foto, etiquetas, avaliação, preço e parcelamento, em layout `grid` responsivo.
- **Carrinho:** o contador do topo aumenta a cada produto adicionado.
- **Formulário de contato:** valida os campos obrigatórios, com mensagens em português, e confirma o envio na tela.
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

- HTML5 e CSS3 (`display: grid` e `flex`, variáveis CSS, layout responsivo)
- JavaScript Vanilla (sem frameworks)
- [Ollama](https://ollama.com/) rodando o modelo de linguagem **Llama 3** localmente
- Fonte Inter, do Google Fonts

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
├── suplefitverse/
│   ├── index.html                  # Estrutura da página
│   ├── css/
│   │   └── style.css               # Estilos e responsividade
│   ├── js/
│   │   └── script.js               # Menu, produtos, carrinho, formulário e chat com Ollama
│   └── assets/                     # Imagens dos produtos e do Suplito
├── PERSONA_SUPLITO_COMPLETA.md     # Documentação técnica da persona e regras da IA
├── .gitignore
└── README.md