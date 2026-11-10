import express from 'express';
const app = express();

const PORT = 3000;

// Sprint 02: Array de objetos e função de consulta
function criarMensagem(id, usuario, texto) {
    return { id, usuario: usuario.trim(), texto: texto.trim() };
}

const mensagens = [
    { id: 1, usuario: "Ana", texto: "Bom dia!" },
    { id: 2, usuario: "Pedro", texto: "Olá!" },
    { id: 3, usuario: "Maria", texto: "Tudo bem?" },
    { id: 4, usuario: "Lucas", texto: "Como vai?" },
    { id: 5, usuario: "Carla", texto: "Até logo!" }
];

function listaMensagens() {
    return mensagens;
}

function quantidadeDeMensagens() {
    return mensagens.length;
}

function buscarMensagemPorId(id) {
    return mensagens.find(mensagem => mensagem.id === id);
}

app.get('/', (req, res) => res.send('Servidor rodando! 🚀'));
app.get('/status', (req, res) => res.json({ status: 'online', sprint: 2, total: quantidadeDeMensagens() }));
app.get('/sobre', (req, res) => res.send('Meu primeiro servidor Node.js com Express e ES Modules.'));

// [SPRINT 02 - NOVA] 6.Consulta, total e busca por ID; erro HTTP 404
app.get('/mensagens', (req, res) => res.json(listaMensagens()));
app.get('/total-mensagens', (req, res) => res.json({ total: quantidadeDeMensagens }));
app.get('/mensagens/:id', (req, res) => {
    const mensagem = buscarMensagem(Number(req.params.id));
    if (!mensagem)
        return res.status(404).json({ erro: 'Mensagem não encontrada' });

    res.json(mensagem);
});
app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));

function consultar(falhar = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            falhar
                ? reject(new Error('Falhou'))
                : resolve(mensagens);
        }, 1000);
    });
}