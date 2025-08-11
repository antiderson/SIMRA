const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors'); // ✅ Importante isso aqui em

const PORT = process.env.PORT || 3000;

app.use(cors()); //✅ Habilita CORS para todas as rotas
app.use(bodyParser.json());

const { credential } = require('firebase-admin');

// === Firebase Admin SDK ===
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://simra1-0-default-rtdb.firebaseio.com"
});

const db = admin.database();

// === Rotas que recebem os dados do webhook ===
app.post('/webhook', (req, res) => {
    const dados = req.body;

    if(!dados.temperatura || !dados.luz){
        return res.status(400).send('Dados inválidos');
    }
    const timestamp = new Date().toISOString();

    db.ref('sensores').set({ //set é para substituir os dados, push é para adicionar novos dados sem substituir.
        temperatura: dados.temperatura,
        luz: dados.luz,
        timestamp,
    });

    res.status(200).send('Dados recebidos com sucesso e salvos no Firebase');
});

// === Inicializa o servidor ===
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});