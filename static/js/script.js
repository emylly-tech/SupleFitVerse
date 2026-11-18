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

  // --- BASE DE DADOS DOS PRODUTOS COM CAMINHO /static/assets/ ---
  var products = [
    // Whey Protein (4 itens)
    { id: 1, name: "Whey 100% Black Skull 900g", category: "whey", price: 227.00, inst: "ou 3x de R$ 75,67", tags: ["100% Whey", "Ganho de massa", "Low carb"], image: "/static/assets/whey.jpg" },
    { id: 2, name: "Whey Protein Concentrado Growth 900g", category: "whey", price: 240.00, inst: "ou 3x de R$ 80,00", tags: ["Alta proteína", "Ganho de massa", "Low carb"], image: "/static/assets/growth.jpg" },
    { id: 3, name: "Whey Iso Hydro Pro 900g Premium", category: "whey", price: 289.90, inst: "ou 3x de R$ 96,63", tags: ["Isolado", "Zero lactose", "Absorção rápida"], image: "/static/assets/iso.jpg" },
    { id: 4, name: "Whey 3VS Nutrition 1kg", category: "whey", price: 199.90, inst: "ou 3x de R$ 66,63", tags: ["Blend proteico", "Recuperação", "Sabor chocolate"], image: "/static/assets/3vs.jpg" },

    // Creatina (4 itens)
    { id: 5, name: "Creatina Monohidratada 300g", category: "creatina", price: 119.90, inst: "ou 3x de R$ 39,97", tags: ["Creatina", "Performance", "Monohidratada"], image: "/static/assets/creatina300g.jpg" },
    { id: 6, name: "Creatina Creapure Ultra Pure 250g", category: "creatina", price: 149.90, inst: "ou 3x de R$ 49,96", tags: ["Creapure", "Máxima força", "100% Pura"], image: "/static/assets/ultra.jpg" },
    { id: 7, name: "Creatina Micronizada Power 500g", category: "creatina", price: 179.00, inst: "ou 3x de R$ 59,66", tags: ["Micronizada", "Resistência", "Rendimento"], image: "/static/assets/power.jpg" },
    { id: 8, name: "Creatina Hardcore Max 250g", category: "creatina", price: 99.90, inst: "ou 3x de R$ 33,30", tags: ["Pura", "Explosão", "Foco total"], image: "/static/assets/max.jpg" },

    // Pré-treinos (4 itens)
    { id: 9, name: "Pré-Workout Max Titanium 300g", category: "pretreino", price: 175.00, inst: "ou 3x de R$ 58,33", tags: ["Pré-treino", "Mais energia", "Foco"], image: "/static/assets/pre.jpg" },
    { id: 10, name: "Pré-Treino Venom Explosion 300g", category: "pretreino", price: 169.90, inst: "ou 3x de R$ 56,63", tags: ["Beta-Alanina", "Vasodilatação", "Pump intenso"], image: "/static/assets/venon.jpg" },
    { id: 11, name: "Pré-Treino Night Focus Zero Cafeína", category: "pretreino", price: 155.00, inst: "ou 3x de R$ 51,66", tags: ["Zero Cafeína", "Treino Noturno", "Resistência"], image: "/static/assets/focus.jpg" },
    { id: 12, name: "Hórus Pré-Treino Max Titanium 150g", category: "pretreino", price: 98.00, inst: "ou 3x de R$ 32,66", tags: ["Disposição", "Foco", "Alta intensidade"], image: "/static/assets/horus.jpg" },

    // Hipercalóricos (4 itens)
    { id: 13, name: "Hipercalórico Mass Monster 3kg", category: "hipercalorico", price: 145.00, inst: "ou 3x de R$ 48,33", tags: ["Hipercalórico", "Ganho de peso", "Alta energia"], image: "/static/assets/monster.jpg" },
    { id: 14, name: "Super Mass Gainer 6000 3kg", category: "hipercalorico", price: 189.90, inst: "ou 3x de R$ 63,30", tags: ["Bulking", "Complexo Carbo", "Aminoácidos"], image: "/static/assets/mass.jpg" },
    { id: 15, name: "Hipercalórico Anabolic Mass 1.5kg", category: "hipercalorico", price: 99.00, inst: "ou 3x de R$ 33,00", tags: ["Aporte Calórico", "Recuperação", "Chocolate"], image: "/static/assets/anabolic.jpg" },
    { id: 16, name: "Mass Titanium 17500 3kg", category: "hipercalorico", price: 129.90, inst: "ou 3x de R$ 43,30", tags: ["Massa muscular", "Carboidratos", "Vitaminas"], image: "/static/assets/17500.jpg" },

    // Coqueteleiras (4 itens)
    { id: 17, name: "Coqueteleira SupleFitVerse Pro 700ml", category: "coqueteleira", price: 49.90, inst: "ou 2x de R$ 24,95", tags: ["BPA Free", "Misturador", "Anti-vazamento"], image: "/static/assets/suple.jpg" },
    { id: 18, name: "Coqueteleira Shaker Dual 800ml", category: "coqueteleira", price: 69.90, inst: "ou 2x de R$ 34,95", tags: ["Porta Pó", "Ergonômico", "Aço Inox"], image: "/static/assets/dual.jpg" },
    { id: 19, name: "Coqueteleira Térmica Inox 750ml", category: "coqueteleira", price: 89.90, inst: "ou 3x de R$ 29,96", tags: ["Inox Térmico", "Gelado 12h", "Premium"], image: "/static/assets/inox.jpg" },
    { id: 20, name: "Coqueteleira Dosadora 3 Compartimentos", category: "coqueteleira", price: 39.90, inst: "ou 2x de R$ 19,95", tags: ["Compartimentos", "Praticidade", "Resistente"], image: "/static/assets/coqueteleira.jpg" },

    // Barras de Proteína (4 itens)
    { id: 21, name: "Power Protein Bar 90g", category: "barras", price: 120.17, inst: "ou 4x de R$ 30,97", tags: ["Recuperação", "Praticidade", "Display 90g"], image: "/static/assets/barrinha.jpg" },
    { id: 22, name: "Power Protein Bar 41g", category: "barras", price: 92.80, inst: "ou 3x de R$ 31,89", tags: ["Recuperação", "Praticidade", "Snack Proteico"], image: "/static/assets/41g.jpg" },
    { id: 23, name: "Power Protein Crisp", category: "barras", price: 88.72, inst: "ou 3x de R$ 30,48", tags: ["Recuperação", "Praticidade", "Crispy"], image: "/static/assets/chocolate.jpg" },
    { id: 24, name: "Top Whey Bar 41g", category: "barras", price: 80.55, inst: "ou 2x de R$ 41,52", tags: ["Recuperação", "Praticidade", "Top Whey"], image: "/static/assets/bar.jpg" }
  ];

  // --- GESTÃO DO CARRINHO ---
  var cartItems = [];
  var count = $('#count'), grid = $('#productsGrid');
  var cartModal = $('#cartModal');
  var cartItemsList = $('#cartItemsList');
  var cartTotalPrice = $('#cartTotalPrice');

  var cartBtn = $('#cart');
  var closeCartModal = $('#closeCartModal');

  if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', function () {
      cartModal.style.display = 'flex';
      renderCartItems();
    });
  }

  if (closeCartModal && cartModal) {
    closeCartModal.addEventListener('click', function () {
      cartModal.style.display = 'none';
    });
  }

  window.addEventListener('click', function (e) {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // --- FUNÇÃO PARA DESENHAR OS CARDS ---
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
        '<button class="btn btn-green add" data-id="' + p.id + '">Adicionar ao carrinho</button>' +
        '</div></article>';
    }).join('');

    initCartButtons();
  }

  // --- ADICIONAR AO CARRINHO (SOMA QUANTIDADE) ---
  function initCartButtons() {
    document.querySelectorAll('.add').forEach(function (b) {
      b.addEventListener('click', function () {
        var productId = parseInt(b.getAttribute('data-id'));
        var product = products.find(function(p) { return p.id === productId; });

        if (product) {
          var existingItem = cartItems.find(function(item) { return item.id === productId; });

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cartItems.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1
            });
          }

          atualizarContadorCarrinho();

          b.textContent = 'Adicionado ✓'; 
          b.classList.add('added');
          setTimeout(function () { 
            b.textContent = 'Adicionar ao carrinho'; 
            b.classList.remove('added'); 
          }, 1400);
        }
      });
    });
  }

  function atualizarContadorCarrinho() {
    if (!count) return;
    var totalItens = cartItems.reduce(function(acc, item) { return acc + item.quantity; }, 0);
    count.textContent = totalItens;
  }

  // --- RENDERIZAR ITENS NO MODAL COM BOTÕES + E - ---
  function renderCartItems() {
    if (!cartItemsList) return;

    if (cartItems.length === 0) {
      cartItemsList.innerHTML = '<p style="color: #94a3b8; text-align: center; margin: 20px 0;">Seu carrinho está vazio.</p>';
      if (cartTotalPrice) cartTotalPrice.textContent = 'R$ 0,00';
      return;
    }

    var html = '';
    var total = 0;

    cartItems.forEach(function (item, index) {
      var subtotal = item.price * item.quantity;
      total += subtotal;
      var formattedPrice = 'R$ ' + subtotal.toFixed(2).replace('.', ',');

      html += '<div style="display: flex; justify-content: space-between; align-items: center; background: #0b1016; padding: 10px; border-radius: 6px; margin-bottom: 8px;">' +
        '<div>' +
        '<strong style="font-size: 0.9rem; display: block; color: #fff;">' + item.name + '</strong>' +
        '<span style="color: #00e676; font-size: 0.85rem;">' + formattedPrice + '</span>' +
        '</div>' +
        '<div style="display: flex; align-items: center; gap: 8px;">' +
        '<button onclick="window.alterarQtd(' + index + ', -1)" style="background: #1e293b; color: #fff; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer;">-</button>' +
        '<span style="color: #fff; font-size: 0.9rem; min-width: 20px; text-align: center;">' + item.quantity + '</span>' +
        '<button onclick="window.alterarQtd(' + index + ', 1)" style="background: #1e293b; color: #fff; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer;">+</button>' +
        '<button onclick="window.removeFromCart(' + index + ')" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem; margin-left: 6px;" title="Remover">&times;</button>' +
        '</div>' +
        '</div>';
    });

    cartItemsList.innerHTML = html;
    if (cartTotalPrice) {
      cartTotalPrice.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    }
  }

  window.alterarQtd = function(index, delta) {
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    atualizarContadorCarrinho();
    renderCartItems();
  };

  window.removeFromCart = function (index) {
    cartItems.splice(index, 1);
    atualizarContadorCarrinho();
    renderCartItems();
  };

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

  if ($('#sendBtn')) $('#sendBtn').addEventListener('click', enviarTextoLivre);
  if ($('#userInput')) $('#userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') enviarTextoLivre();
  });

  function enviarTextoLivre() {
    var input = $('#userInput');
    if (!input) return;
    var texto = input.value.trim();
    if (!texto) return;

    say(texto, 'me'); 
    input.value = ''; 
    perguntarAoBackend(texto);
  }

  async function perguntarAoBackend(perguntaDoUtilizador) {
    say('Pensando...', 'bot');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: perguntaDoUtilizador })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.erro || 'Falha ao conversar com o Suplito.');
      }

      if (log.lastChild) {
        log.lastChild.textContent = data.resposta || 'Não consegui responder agora.';
      }
    } catch (erro) {
      console.error('Erro no Suplito:', erro);
      if (log.lastChild) {
        log.lastChild.textContent =
          'O Suplito está indisponível agora. Tente novamente em instantes.';
      }
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
    setTimeout(function () { perguntarAoBackend(q); }, 450);
  });

  // --- FLUXO DE SIMULAÇÃO DE PAGAMENTO VIA BACK-END FLASK ---
  var checkoutCartBtn = document.getElementById('checkoutCartBtn');
  var checkoutFormSection = document.getElementById('checkoutFormSection');
  var confirmCheckoutBtn = document.getElementById('confirmCheckoutBtn');

  if (checkoutCartBtn && checkoutFormSection) {
    checkoutCartBtn.addEventListener('click', function () {
      if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }
      checkoutFormSection.style.display = 'block';
      checkoutCartBtn.style.display = 'none';
    });
  }

  if (confirmCheckoutBtn) {
    confirmCheckoutBtn.addEventListener('click', async function () {
      var nomeInput = document.getElementById('checkoutNome');
      var emailInput = document.getElementById('checkoutEmail');

      var nome = nomeInput ? nomeInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';

      if (!nome || !email) {
        alert('Por favor, preencha seu nome e e-mail para continuar.');
        return;
      }

      var total = cartItems.reduce(function(acc, item) { return acc + (item.price * item.quantity); }, 0);

      try {
        const resposta = await fetch('/api/pedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: nome,
            email: email,
            valor_total: total,
            itens: cartItems
          })
        });

        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
          alert('Erro ao processar pedido: ' + (resultado.erro || 'Falha no servidor'));
          return;
        }

        alert('Simulação realizada com sucesso! Pedido registrado via back-end seguro.');
        cartItems = [];
        atualizarContadorCarrinho();
        checkoutFormSection.style.display = 'none';
        checkoutCartBtn.style.display = 'block';
        if (cartModal) cartModal.style.display = 'none';
        if (nomeInput) nomeInput.value = '';
        if (emailInput) emailInput.value = '';
      } catch (err) {
        console.error('Erro na requisição de pedido:', err);
        alert('Erro de comunicação com o servidor Flask.');
      }
    });
  }

  // --- FORMULÁRIO DE CONTATO VIA BACK-END FLASK ---
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        assunto: document.getElementById('assunto').value.trim(),
        mensagem: document.getElementById('mensagem').value.trim()
      };

      try {
        const resposta = await fetch('/api/contato', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const resultado = await resposta.json();
        if (resposta.ok && resultado.sucesso) {
          alert('Mensagem registrada com sucesso no banco de dados!');
          form.reset();
        } else {
          alert('Erro ao enviar: ' + (resultado.erro || 'Verifique os dados'));
        }
      } catch (err) {
        console.error('Erro no envio do formulário:', err);
        alert('Erro de comunicação com o servidor Flask.');
      }
    });
  }
})();