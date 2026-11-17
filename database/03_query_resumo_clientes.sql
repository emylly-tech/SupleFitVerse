-- ==========================================================================================
-- Uma consulta útil para listar todas as mensagens recebidas pelo formulário "Fale Conosco"
-- ==========================================================================================
SELECT 
    id,
    nome,
    email,
    assunto,
    mensagem,
    criado_em
FROM contatos
ORDER BY criado_em DESC;