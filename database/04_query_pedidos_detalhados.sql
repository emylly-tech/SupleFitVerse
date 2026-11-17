-- ==================================================================
-- CONSULTA RELACIONAL: PEDIDOS DETALHADOS COM INFORMAÇÕES DO CLIENTE
-- ==================================================================
SELECT 
    p.id AS pedido_id,
    c.nome AS cliente_nome,
    c.email AS cliente_email,
    p.valor_total,
    p.status,
    pr.nome AS produto_nome,
    ip.quantidade,
    pr.price AS preco_unitario,
    (ip.quantidade * pr.price) AS subtotal
FROM pedidos p
JOIN clientes c ON p.cliente_id = c.id
JOIN itens_pedido ip ON p.id = ip.pedido_id
JOIN produtos pr ON ip.produto_id = pr.id;