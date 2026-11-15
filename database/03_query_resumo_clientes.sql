-- ============================================================================
-- CONSULTA DE AGREGAÇÃO: RESUMO DE PEDIDOS POR CLIENTE (LEFT JOIN + GROUP BY)
-- ============================================================================
SELECT 
    c.nome AS cliente_nome,
    COUNT(p.id) AS total_pedidos,
    COALESCE(SUM(p.valor_total), 0.00) AS valor_gasto_total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nome
ORDER BY valor_gasto_total DESC;