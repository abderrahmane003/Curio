import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialisation sécurisée du client Gemini avec la clé côté serveur uniquement
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// Route API santé
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    aiConfigured: !!aiClient,
    timestamp: new Date().toISOString()
  });
});

// Route API génération de questions par IA (Strictement côté serveur)
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { domainId, domainLabel, count = 3, level = 'erudit' } = req.body;

    if (!aiClient) {
      return res.status(503).json({
        error: 'Service d’IA non configuré sur le serveur (clé GEMINI_API_KEY absente).'
      });
    }

    const prompt = `Génère ${count} questions de culture générale stimulantes et vérifiées pour le domaine "${domainLabel || domainId}".
Niveau ciblé : ${level}.
Fournis la réponse sous forme d’un tableau JSON valide d'objets, avec la structure suivante pour chaque question :
{
  "questionText": "Énoncé précis de la question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0, // Entier entre 0 et 3 indiquant la bonne option
  "explanation": "Anecdote 'Le saviez-vous ?' passionnante de 2 à 3 phrases expliquant le contexte historique ou scientifique.",
  "source": "Référence bibliographique, académique ou institutionnelle précise"
}
Réponds UNIQUEMENT avec le bloc JSON brut, sans formatage markdown additionnel.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '[]';
    const parsed = JSON.parse(text);

    return res.json({
      success: true,
      questions: parsed
    });
  } catch (error) {
    console.error('Erreur génération Gemini API:', error);
    return res.status(500).json({
      error: 'Échec de la génération des questions par l’IA côté serveur.'
    });
  }
});

// En mode développement, brancher Vite
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // En production, servir le build statique
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Érudit Serveur démarré sur http://localhost:${port}`);
});
