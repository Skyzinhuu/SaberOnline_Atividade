import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cursoRouter from './Routes/cursoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

let usuarioAutenticado = false;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'publico')));
app.use('/cursos', cursoRouter);

app.get('/auth-status', (req, res) => {
    res.json({ loggedIn: usuarioAutenticado });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'publico', 'login.html'));
});

app.get('/menu', (req, res) => {
    if (usuarioAutenticado) {
        res.sendFile(path.join(__dirname, 'privado', 'menu.html'));
    } else {
        res.redirect('/login.html');
    }
});


app.get('/gerenciar', (req, res) => {
    if (usuarioAutenticado) {
        res.sendFile(path.join(__dirname, 'privado', 'gerenciar.html'));
    } else {
        res.redirect('/login.html');
    }
});

app.post('/autenticar', (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario === 'aluno' && senha === '123') {
        usuarioAutenticado = true;
        res.redirect('/index.html');
    } else {
        usuarioAutenticado = false;
        res.redirect('/login.html?erro=1');
    }
});

app.get('/logout', (req, res) => {
    usuarioAutenticado = false;
    res.redirect('/index.html');
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});