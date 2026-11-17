-- Apagar tabelas antigas se existirem (para reiniciar limpo)
DROP TABLE IF EXISTS itens_pedido CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS contatos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS produtos CASCADE;

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- Tabela de Contatos (Formulário Fale Conosco)
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    assunto VARCHAR(150),
    mensagem TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes (Compradores)
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE,
    valor_total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Simulacao',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Itens do Pedido
CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
    quantidade INT NOT NULL DEFAULT 1
);

-- Inserção dos 24 Produtos Oficiais
INSERT INTO produtos (id, nome, category, price) VALUES
(1, 'Whey 100% Black Skull 900g', 'whey', 227.00),
(2, 'Whey Protein Concentrado Growth 900g', 'whey', 240.00),
(3, 'Whey Iso Hydro Pro 900g Premium', 'whey', 289.90),
(4, 'Whey 3VS Nutrition 1kg', 'whey', 199.90),
(5, 'Creatina Monohidratada 300g', 'creatina', 119.90),
(6, 'Creatina Creapure Ultra Pure 250g', 'creatina', 149.90),
(7, 'Creatina Micronizada Power 500g', 'creatina', 179.00),
(8, 'Creatina Hardcore Max 250g', 'creatina', 99.90),
(9, 'Pré-Workout Max Titanium 300g', 'pretreino', 175.00),
(10, 'Pré-Treino Venom Explosion 300g', 'pretreino', 169.90),
(11, 'Pré-Treino Night Focus Zero Cafeína', 'pretreino', 155.00),
(12, 'Hórus Pré-Treino Max Titanium 150g', 'pretreino', 98.00),
(13, 'Hipercalórico Mass Monster 3kg', 'hipercalorico', 145.00),
(14, 'Super Mass Gainer 6000 3kg', 'hipercalorico', 189.90),
(15, 'Hipercalórico Anabolic Mass 1.5kg', 'hipercalorico', 99.00),
(16, 'Mass Titanium 17500 3kg', 'hipercalorico', 129.90),
(17, 'Coqueteleira SupleFitVerse Pro 700ml', 'coqueteleira', 49.90),
(18, 'Coqueteleira Shaker Dual 800ml', 'coqueteleira', 69.90),
(19, 'Coqueteleira Térmica Inox 750ml', 'coqueteleira', 89.90),
(20, 'Coqueteleira Dosadora 3 Compartimentos', 'coqueteleira', 39.90),
(21, 'Power Protein Bar 90g', 'barras', 120.17),
(22, 'Power Protein Bar 41g', 'barras', 92.80),
(23, 'Power Protein Crisp', 'barras', 88.72),
(24, 'Top Whey Bar 41g', 'barras', 80.55);