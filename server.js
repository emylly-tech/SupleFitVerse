const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importação correta para a versão mais recente da SDK do Google Gen AI
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa a API utilizando a chave do arquivo .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/gerar', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ erro: 'O prompt é obrigatório.' });
        }

        // Chamada correta para gerar conteúdo com o modelo Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Ou 'gemini-1.5-flash' dependendo da sua preferência
            contents: [
                {
                    role: 'user',
                    parts: [{ text: `Você é o Suplito, um assistente virtual especializado em suplementos, nutrição e treinos da loja SupleFitVerse. Responda de forma amigável e direta ao cliente: ${prompt}` }]
                }
            ]
        });

        // Extrai o texto gerado pela IA
        const textoResposta = response.text;

        res.json({ resposta: textoResposta });

    } catch (error) {
        console.error("Erro ao falar com o Gemini:", error);
        res.status(500).json({ erro: "Erro ao processar a resposta do Gemini." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend a correr na porta ${PORT}`);
});