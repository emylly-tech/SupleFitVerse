# SupleFitVerse

Landing page de uma loja de suplementos, com vitrine de produtos organizada por categorias, carrinho, formulário de contato e o **Suplito**, um assistente virtual com Inteligência Artificial. Feita com HTML, CSS e JavaScript puro, com integração à API Gemini por meio de um pequeno servidor Node.js.

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
- **Suplito, o assistente virtual:** robô fixo no canto inferior direito, que abre um chat com perguntas rápidas e respostas sobre suplementos e a loja.

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
- JavaScript (sem frameworks)
- Node.js, para o servidor que guarda a chave da API
- API Gemini (Google), para as respostas do Suplito
- Fonte Inter, do Google Fonts

## Integração com Inteligência Artificial

O site tem um assistente virtual chamado **Suplito**, que usa a **API Gemini** (Google) para responder as dúvidas dos visitantes.

**Persona.** O Suplito é um robô simpático e direto, especialista em suplementação esportiva. Ele ajuda a escolher entre whey, creatina, pré-treino, hipercalóricos, barras e coqueteleiras, explica para que serve cada produto e tira dúvidas sobre a loja. Ele não faz prescrição médica nem define doses, e recomenda procurar um nutricionista nesses casos.

**Como funciona**

1. O visitante abre o chat pelo botão do robô, no canto inferior direito, e escreve uma pergunta ou toca numa pergunta rápida.
2. O `script.js` envia a mensagem para o servidor Node.js (`server.js`).
3. O servidor junta as instruções da persona do Suplito com a mensagem e chama a API Gemini usando a chave guardada no `.env`.
4. A resposta volta pelo servidor e aparece no chat.

**Por que existe um servidor.** A chave da API fica somente no servidor, dentro do `.env`, que não vai para o GitHub. Assim ela não aparece no código do navegador.

**Perguntas rápidas.** O chat oferece botões com perguntas comuns (por exemplo, "Qual whey escolher?"), que o visitante pode tocar sem digitar.

## Estrutura do projeto

```
suplefitverseoficial/
├── suplefitverse/
│   ├── index.html      # Estrutura da página
│   ├── css/
│   │   └── style.css   # Estilos e responsividade
│   ├── js/
│   │   └── script.js   # Menu, produtos, carrinho, formulário e chat
│   └── assets/         # Imagens dos produtos e do Suplito
├── server.js           # Servidor Node.js
├── package.json
├── .env                # Chave da API (não vai para o GitHub)
├── .gitignore
└── README.md
```

## Como rodar no seu computador

**Pré-requisitos:** [Node.js](https://nodejs.org/) instalado.

1. Baixe ou clone o repositório:

   ```bash
   git clone https://github.com/emylly-tech/SupleFitVerse.git
   cd SupleFitVerse
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com a sua chave da Gemini:

   ```
   GEMINI_API_KEY=coloque_sua_chave_aqui
   ```

   Você pode gerar uma chave gratuita no [Google AI Studio](https://aistudio.google.com/apikey).

4. Inicie o servidor:

   ```bash
   node server.js
   ```

5. Abra no navegador o endereço que aparecer no terminal.

Para ver só a parte visual, sem o assistente com IA, basta abrir `suplefitverse/index.html` no navegador.

## Segurança da chave de API

- Os arquivos `.env` e `node_modules` estão no `.gitignore` e **não devem ser enviados ao GitHub**.
- A chave fica somente no servidor. Nunca escreva a chave dentro do `script.js` ou do `index.html`, porque qualquer pessoa conseguiria vê-la no navegador.
- Se a chave for exposta por engano, apague-a no Google AI Studio e gere uma nova.

## Como adicionar ou editar produtos

Os produtos ficam na lista `products` do arquivo `suplefitverse/js/script.js`. Para incluir um item, copie uma linha e ajuste os campos:

```js
{ id: 25, name: "Nome do produto", category: "whey", price: 199.90,
  inst: "ou 3x de R$ 66,63", tags: ["Etiqueta 1", "Etiqueta 2", "Etiqueta 3"],
  image: "assets/foto.jpg" }
```

| Campo | O que é |
|---|---|
| `id` | Número único do produto |
| `category` | `whey`, `creatina`, `pretreino`, `hipercalorico`, `coqueteleira` ou `barras` |
| `price` | Preço em número, com ponto (ex.: `199.90`) |
| `inst` | Texto do parcelamento |
| `tags` | Etiquetas que aparecem no card |
| `image` | Caminho da imagem, dentro da pasta `assets` |

Os cards são desenhados automaticamente a partir dessa lista.

## Melhorias futuras

- Página de carrinho com resumo do pedido e finalização da compra.
- Envio real do formulário de contato por e-mail.
- Otimizar as imagens da pasta `assets` para o site carregar mais rápido.

## Autoria

Projeto desenvolvido por Chrislley Emylly de Oliveira Vilela e Liana Raquel Silva dos Santos Costa para a disciplina de Desenvolvimento Web para I.A. O repositório está em [emylly-tech/SupleFitVerse](https://github.com/emylly-tech/SupleFitVerse).

© 2026 SupleFitVerse. Todos os direitos reservados.
