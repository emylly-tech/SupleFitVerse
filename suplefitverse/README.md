# SupleFitVerse

Landing page da loja de suplementos SupleFitVerse. Projeto estático, feito só com HTML, CSS e JavaScript, sem dependências para instalar.

## Estrutura

```
suplefitverse/
├── index.html        # Estrutura da página
├── css/
│   └── style.css     # Estilos e responsividade
├── js/
│   └── script.js     # Menu mobile, carrinho, formulário e chat do Suplito
├── assets/
│   ├── hero.jpg      # Foto da seção inicial
│   └── suplito.png   # Mascote do Suplito (botão flutuante e chat)
└── README.md
```

## Como abrir

Dê dois cliques em `index.html` para abrir no navegador. A fonte Inter é carregada do Google Fonts, então é preciso estar online para vê-la; offline a página usa a fonte padrão do sistema.

## Seções

- **Início:** apresentação, botões "Ver produtos" e "Falar com o Suplito" e foto de destaque
- **Diferenciais:** qualidade, compra segura, entrega rápida e suporte
- **Sobre:** apresentação da loja e do assistente Suplito
- **Produtos:** quatro produtos em destaque com botão de adicionar ao carrinho
- **Serviços:** atendimento com IA, recomendação de produtos e entrega
- **Contato:** formulário (Nome Completo, E-mail, Assunto e Mensagem) e dados de atendimento
- **Rodapé:** navegação, atendimento e redes sociais

## Funcionalidades

- **Menu responsivo:** vira botão de menu em telas pequenas e destaca a seção atual ao rolar
- **Carrinho:** o contador do topo aumenta a cada produto adicionado (ainda não há página de carrinho)
- **Suplito:** o robô fica fixo no canto inferior direito e abre um chat com respostas prontas
- **Formulário:** valida os campos obrigatórios e mostra uma confirmação ao enviar

## Pendências

- **Envio do formulário:** hoje só mostra a confirmação na tela. Para receber as mensagens, conecte o `submit` em `js/script.js` a um backend ou serviço de e-mail (por exemplo Formspree ou EmailJS).
- **Suplito com IA:** as respostas atuais são fixas, no objeto `answers` de `js/script.js`. Para um atendimento real, conecte o chat a uma API de IA.
- **Imagens dos produtos:** as ilustrações dos potes são genéricas (símbolos SVG no `index.html`). Troque por fotos reais dos produtos, por exemplo com uma tag `<img>` dentro de cada `.thumb`.
- **Dados de contato:** e-mail, WhatsApp e links das redes sociais são exemplos. Atualize no `index.html`.
- **Foto do hero:** `assets/hero.jpg` foi recortada de uma captura de tela e tem resolução baixa. Substitua por uma imagem original, de preferência com 1400 px de largura ou mais.

## Personalização

As cores ficam nas variáveis no início de `css/style.css` (bloco `:root`). Para mudar o verde da marca, altere `--green`.

---

© 2026 SupleFitVerse. Projeto acadêmico.
