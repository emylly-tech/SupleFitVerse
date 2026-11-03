(function () {
  var $ = function (s) { return document.querySelector(s); };

  // --- MENU MOBILE ---
  var menu = $('#menu'), burger = $('#burger');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', function (e) { 
      if (e.target.tagName === 'A') menu.classList.remove('open'); 
    });
  }

  // --- DESTAQUE DO LINK ATIVO (SCROLL SPY) ---
  if (menu) {
    var links = [].slice.call(menu.querySelectorAll('a'));
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    function spy() {
      var y = window.scrollY + 120, cur = 0;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
      links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    }
    window.addEventListener('scroll', spy, { passive: true }); 
    spy();
  }

  // --- BASE DE DADOS DOS PRODUTOS COM CAMINHO DE IMAGEM REAL ---
  var products = [
    // Whey Protein (4 itens) - O primeiro já usa a sua imagem real!
    { id: 1, name: "Whey 100% Black Skull 900g", category: "whey", price: 227.00, inst: "ou 3x de R$ 75,67", tags: ["100% Whey", "Ganho de massa", "Low carb"], image: "./assets/whey.jpg" },
    { id: 2, name: "Whey Protein Concentrado Growth 900g", category: "whey", price: 240.00, inst: "ou 3x de R$ 80,00", tags: ["Alta proteína", "Ganho de massa", "Low carb"], image: "assets/growth.jpg" },
    { id: 3, name: "Whey Iso Hydro Pro 900g Premium", category: "whey", price: 289.90, inst: "ou 3x de R$ 96,63", tags: ["Isolado", "Zero lactose", "Absorção rápida"], image: "assets/iso.jpg" },
    { id: 4, name: "Whey 3VS Nutrition 1kg", category: "whey", price: 199.90, inst: "ou 3x de R$ 66,63", tags: ["Blend proteico", "Recuperação", "Sabor chocolate"], image: "assets/3vs.jpg" },

    // Creatina (4 itens)
    { id: 5, name: "Creatina Monohidratada 300g", category: "creatina", price: 119.90, inst: "ou 3x de R$ 39,97", tags: ["Creatina", "Performance", "Monohidratada"], image: "assets/creatina300g.jpg" },
    { id: 6, name: "Creatina Creapure Ultra Pure 250g", category: "creatina", price: 149.90, inst: "ou 3x de R$ 49,96", tags: ["Creapure", "Máxima força", "100% Pura"], image: "assets/ultra.jpg" },
    { id: 7, name: "Creatina Micronizada Power 500g", category: "creatina", price: 179.00, inst: "ou 3x de R$ 59,66", tags: ["Micronizada", "Resistência", "Rendimento"], image: "assets/power.jpg" },
    { id: 8, name: "Creatina Hardcore Max 250g", category: "creatina", price: 99.90, inst: "ou 3x de R$ 33,30", tags: ["Pura", "Explosão", "Foco total"], image: "assets/max.jpg" },

    // Pré-treinos (4 itens)
    { id: 9, name: "Pré-Workout Max Titanium 300g", category: "pretreino", price: 175.00, inst: "ou 3x de R$ 58,33", tags: ["Pré-treino", "Mais energia", "Foco"], image: "assets/pre.jpg" },
    { id: 10, name: "Pré-Treino Venom Explosion 300g", category: "pretreino", price: 169.90, inst: "ou 3x de R$ 56,63", tags: ["Beta-Alanina", "Vasodilatação", "Pump intenso"], image: "assets/venon.jpg" },
    { id: 11, name: "Pré-Treino Night Focus Zero Cafeína", category: "pretreino", price: 155.00, inst: "ou 3x de R$ 51,66", tags: ["Zero Cafeína", "Treino Noturno", "Resistência"], image: "assets/focus.jpg" },
    { id: 12, name: "Hórus Pré-Treino Max Titanium 150g", category: "pretreino", price: 98.00, inst: "ou 3x de R$ 32,66", tags: ["Disposição", "Foco", "Alta intensidade"], image: "assets/horus.jpg" },

    // Hipercalóricos (4 itens)
    { id: 13, name: "Hipercalórico Mass Monster 3kg", category: "hipercalorico", price: 145.00, inst: "ou 3x de R$ 48,33", tags: ["Hipercalórico", "Ganho de peso", "Alta energia"], image: "assets/monster.jpg" },
    { id: 14, name: "Super Mass Gainer 6000 3kg", category: "hipercalorico", price: 189.90, inst: "ou 3x de R$ 63,30", tags: ["Bulking", "Complexo Carbo", "Aminoácidos"], image: "assets/mass.jpg" },
    { id: 15, name: "Hipercalórico Anabolic Mass 1.5kg", category: "hipercalorico", price: 99.00, inst: "ou 3x de R$ 33,00", tags: ["Aporte Calórico", "Recuperação", "Chocolate"], image: "assets/anabolic.jpg" },
    { id: 16, name: "Mass Titanium 17500 3kg", category: "hipercalorico", price: 129.90, inst: "ou 3x de R$ 43,30", tags: ["Massa muscular", "Carboidratos", "Vitaminas"], image: "assets/17500.jpg" },

    // Coqueteleiras (4 itens)
    { id: 17, name: "Coqueteleira SupleFitVerse Pro 700ml", category: "coqueteleira", price: 49.90, inst: "ou 2x de R$ 24,95", tags: ["BPA Free", "Misturador", "Anti-vazamento"], image: "assets/suple.jpg" },
    { id: 18, name: "Coqueteleira Shaker Dual 800ml", category: "coqueteleira", price: 69.90, inst: "ou 2x de R$ 34,95", tags: ["Porta Pó", "Ergonômico", "Aço Inox"], image: "assets/dual.jpg" },
    { id: 19, name: "Coqueteleira Térmica Inox 750ml", category: "coqueteleira", price: 89.90, inst: "ou 3x de R$ 29,96", tags: ["Inox Térmico", "Gelado 12h", "Premium"], image: "assets/inox.jpg" },
    { id: 20, name: "Coqueteleira Dosadora 3 Compartimentos", category: "coqueteleira", price: 39.90, inst: "ou 2x de R$ 19,95", tags: ["Compartimentos", "Praticidade", "Resistente"], image: "assets/coqueteleira.jpg" },

    // Barras de Proteína (4 itens)
    { id: 21, name: "Power Protein Bar 90g", category: "barras", price: 120.17, inst: "ou 4x de R$ 30,97", tags: ["Recuperação", "Praticidade", "Display 90g"], image: "assets/barrinha.jpg" },
    { id: 22, name: "Power Protein Bar 41g", category: "barras", price: 92.80, inst: "ou 3x de R$ 31,89", tags: ["Recuperação", "Praticidade", "Snack Proteico"], image: "assets/41g.jpg" },
    { id: 23, name: "Power Protein Crisp", category: "barras", price: 88.72, inst: "ou 3x de R$ 30,48", tags: ["Recuperação", "Praticidade", "Crispy"], image: "assets/chocolate.jpg" },
    { id: 24, name: "Top Whey Bar 41g", category: "barras", price: 80.55, inst: "ou 2x de R$ 41,52", tags: ["Recuperação", "Praticidade", "Top Whey"], image: "assets/bar.jpg" }
  ];

  var n = 0, count = $('#count'), grid = $('#productsGrid');

  // --- FUNÇÃO PARA DESENHAR OS CARDS USANDO TAG <img> EM VEZ DE SVG ---
  function renderProducts(items) {
    if (!grid) return;
    grid.innerHTML = items.map(function (p) {
      var tagsHtml = p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
      var formattedPrice = 'R$ ' + p.price.toFixed(2).replace('.', ',');
      return '<article class="card">' +
        '<div class="thumb" style="padding: 10px; display: flex; align-items: center; justify-content: center;">' +
        '<img src="' + p.image + '" alt="' + p.name + '" style="max-height: 160px; width: auto; object-fit: contain; filter: drop-shadow(0 10px 14px rgba(0,0,0,0.4));">' +
        '</div>' +
        '<div class="card-body">' +
        '<div class="chips">' + tagsHtml + '</div>' +
        '<div class="stars" aria-label="5 estrelas">★★★★★</div>' +
        '<h3>' + p.name + '</h3>' +
        '<div class="price">' + formattedPrice + '</div>' +
        '<div class="inst">' + p.inst + '</div>' +
        '<button class="btn btn-green add" data-name="' + p.name + '">Adicionar ao carrinho</button>' +
        '</div></article>';
    }).join('');

    initCartButtons();
  }

  // --- CARRINHO DINÂMICO ---
  function initCartButtons() {
    document.querySelectorAll('.add').forEach(function (b) {
      b.addEventListener('click', function () {
        n += 1; 
        if (count) count.textContent = n;
        b.textContent = 'Adicionado ✓'; 
        b.classList.add('added');
        setTimeout(function () { 
          b.textContent = 'Adicionar ao carrinho'; 
          b.classList.remove('added'); 
        }, 1400);
      });
    });
  }

  // --- ALTERNAR AS ABAS DE CATEGORIA ---
  window.filterProducts = function (category, evt) {
    var buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(function (btn) { btn.classList.remove('active'); });
    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add('active');
    }

    if (category === 'all') {
      renderProducts(products);
    } else {
      renderProducts(products.filter(function (p) { return p.category === category; }));
    }
  };

  // Inicializa o catálogo ao carregar
  renderProducts(products);

  // --- FORMULÁRIO DE CONTATO ---
  var form = $('#form'), sent = $('#sent');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (sent) sent.classList.add('show'); 
      form.reset();
      setTimeout(function () { if (sent) sent.classList.remove('show'); }, 5000);
    });
    form.querySelectorAll('input,textarea').forEach(function (el) {
      el.addEventListener('invalid', function () {
        el.setCustomValidity(el.validity.valueMissing ? 'Preencha este campo.' : (el.type === 'email' ? 'Informe um e-mail válido.' : ''));
      });
      el.addEventListener('input', function () { el.setCustomValidity(''); });
    });
  }

// --- ASSISTENTE VIRTUAL SUPLITO ---
  var chat = $('#chat'), log = $('#log');

  function toggle(show) { if (chat) chat.hidden = !show; }
  
  function say(t, who) {
    if (!log) return;
    var d = document.createElement('div'); 
    d.className = 'msg ' + who; 
    d.textContent = t; 
    log.appendChild(d); 
    log.scrollTop = log.scrollHeight;
  }

// Quando você clica no botão "Enviar" da caixa de texto
  if ($('#sendBtn')) $('#sendBtn').addEventListener('click', enviarTextoLivre);
  
  // Ou quando aperta a tecla "Enter" dentro do input
  if ($('#userInput')) $('#userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      enviarTextoLivre();
    }
  });

  function enviarTextoLivre() {
    var input = $('#userInput');
    if (!input) return;
    var texto = input.value.trim();
    if (!texto) return;

    say(texto, 'me'); // Mostra a sua mensagem no chat
    input.value = ''; // Limpa a caixa de texto

    // Envia para o backend do Gemini
    perguntarAoBackend(texto);
  }

  // Função para falar com o teu Backend seguro
  async function perguntarAoBackend(perguntaDoUtilizador) {
    try {
      say("A pensar...", 'bot');

      const respostaServidor = await fetch('http://localhost:3000/api/gerar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: perguntaDoUtilizador })
      });

      const dados = await respostaServidor.json();

      if (respostaServidor.ok) {
        // Substitui a mensagem de "A pensar..." pela resposta real do Gemini
        log.lastChild.textContent = dados.resposta;
      } else {
        log.lastChild.textContent = "Desculpa, ocorreu um erro ao processar a tua resposta.";
      }

    } catch (erro) {
      console.error("Erro de conexão:", erro);
      log.lastChild.textContent = "Não foi possível ligar ao servidor backend.";
    }
  }

  if ($('#bot')) $('#bot').addEventListener('click', function () { toggle(chat ? chat.hidden : true); });
  if ($('#ask')) $('#ask').addEventListener('click', function () { toggle(true); });
  if ($('#talk')) $('#talk').addEventListener('click', function () { toggle(true); });
  if ($('#close')) $('#close').addEventListener('click', function () { toggle(false); });
  
  if ($('#quick')) $('#quick').addEventListener('click', function (e) {
    var q = e.target.getAttribute && e.target.getAttribute('data-q'); 
    if (!q) return;
    
    say(q, 'me'); 
    
    setTimeout(function () { 
      perguntarAoBackend(q); 
    }, 450);
  });
})();