-- ==================================================================
-- CONSULTA RELACIONAL: PEDIDOS DETALHADOS COM INFORMAÇÕES DO CLIENTE
-- ==================================================================
SELECT 
    p.id AS pedido_id,
    c.nome AS cliente_nome,
    c.email AS cliente_email,
    p.valor_total,
    p.status,
    p.criado_em
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
ORDER BY p.criado_em DESC;