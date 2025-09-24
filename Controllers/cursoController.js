import Curso from '../models/curso.js';
import CursoDAO from '../DB/cursoDAO.js';

export default class CursoController {

    async gravar(req, res) {
        try {
            const dados = req.body;
            if (dados.titulo && dados.preco) {
                const curso = new Curso(0, dados.titulo, dados.descricao, dados.instrutor, dados.carga_horaria, dados.nivel, dados.preco, dados.vagas);
                const dao = new CursoDAO();
                await dao.gravar(curso);
                res.status(201).json({ mensagem: 'O Curso foi cadastrado com sucesso!' });
            } else {
                res.status(400).json({ mensagem: 'O Título e O preço são obrigatórios para prosseguir.' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
        }
    }

    async listar(req, res) {
        try {
            const dao = new CursoDAO();
            const listaDeCursos = await dao.listar();
            res.status(200).json(listaDeCursos);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const dao = new CursoDAO();
                const curso = await dao.buscarPorId(id);
                if (curso) {
                    res.status(200).json(curso);
                } else {
                    res.status(404).json({ mensagem: 'Curso não foi encontrado.' });
                }
            } else {
                res.status(400).json({ mensagem: 'ID do curso esta inválido.' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const dados = req.body;
            if (id > 0 && dados.titulo && dados.preco) {
                const curso = new Curso(id, dados.titulo, dados.descricao, dados.instrutor, dados.carga_horaria, dados.nivel, dados.preco, dados.vagas);
                const dao = new CursoDAO();
                await dao.atualizar(curso);
                res.status(200).json({ mensagem: 'o Curso foi atualizado com sucesso!' });
            } else {
                res.status(400).json({ mensagem: 'o ID, título e o preço são obrigatórios.' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
        }
    }

    async excluir(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const curso = new Curso(id);
                const dao = new CursoDAO();
                await dao.excluir(curso);
                res.status(200).json({ mensagem: 'o Curso foi excluído com sucesso!' });
            } else {
                res.status(400).json({ mensagem: 'o ID do curso esta inválido.' });
            }
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro no servidor: ' + error.message });
        }
    }
}