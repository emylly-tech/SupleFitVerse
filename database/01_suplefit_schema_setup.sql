-- ==========================================================
-- 1. CUSTOMERS TABLE (Data and contact messages)
-- ==========================================================
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    assunto TEXT,
    mensagem TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 2. PRODUCTS TABLE (Store Catalog)
-- ==========================================================
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    inst TEXT
);

-- ==========================================================
-- 3. ORDERS TABLE (Related to Customers)
-- ==========================================================
CREATE TABLE IF NOT EXISTS pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    valor_total NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'Simulation',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- 4. ORDER ITEMS TABLE (Relates Orders and Products)
-- ==========================================================
CREATE TABLE IF NOT EXISTS itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INT4 NOT NULL,
    quantidade INT DEFAULT 1 NOT NULL
);

-- ==========================================================
-- 5. ADDITIONAL INDEXES (Performance & Optimization)
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_pedidos_cliente_id ON pedidos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);