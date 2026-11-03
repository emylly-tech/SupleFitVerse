const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

// Entrega o site (pasta suplefitverse) em http://localhost:3000
app.use(express.static(path.join(__dirname, 'suplefitverse')));

// Inicializa a API utilizando a chave do arquivo .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Persona do Suplito
const PERSONA = `Você é o Suplito, assistente virtual da loja SupleFitVerse, especializado em suplementos, nutrição e treino.
Fale em português do Brasil, de forma simpática, direta e curta.
Ajude a escolher entre whey, creatina, pré-treino, hipercalóricos, barras e coqueteleiras.
Você não faz prescrição médica nem define doses: nesses casos, recomende procurar um nutricionista ou médico.
Se a pergunta não tiver relação com suplementos, nutrição, treino ou a loja, diga educadamente que só pode ajudar com esses assuntos.`;

app.post('/api/gerar', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.length > 500) {
            return res.status(400).json({ erro: 'Envie uma pergunta de até 500 caracteres.' });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction: PERSONA }
        });

        res.json({ resposta: response.text });

    } catch (error) {
        console.error('Erro ao falar com o Gemini:', error);
        res.status(500).json({ erro: 'Erro ao processar a resposta do Gemini.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});