-- ===============================================================
-- CONFIGURAÇÃO DE SEGURANÇA: DESATIVAR RLS PARA TESTES ACADÊMICOS
-- ===============================================================
ALTER TABLE clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos DISABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido DISABLE ROW LEVEL SECURITY;
ALTER TABLE produtos DISABLE ROW LEVEL SECURITY;