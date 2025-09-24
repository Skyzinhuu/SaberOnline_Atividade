import conectar from './conexao.js';
import Curso from '../models/curso.js';

export default class CursoDAO {

    async listar() {
        let conexao;
        try {
            conexao = await conectar();
            const sql = 'SELECT * FROM cursos';
            const [registros] = await conexao.query(sql);
            const listaCursos = [];

            for (const registro of registros) {
                const curso = new Curso(
                    registro.id, registro.titulo, registro.descricao, registro.instrutor, registro.carga_horaria, registro.nivel, registro.preco, registro.vagas
                );
                listaCursos.push(curso);
            }
            return listaCursos;
        } finally {
            if (conexao) {
                conexao.release();
            }
        }
    }
    
    async buscarPorId(id) {
        let conexao;
        try {
            conexao = await conectar();
            const sql = 'SELECT * FROM cursos WHERE id = ?';
            const parametros = [id];
            const [registros] = await conexao.query(sql, parametros);
            
            if (registros.length > 0){
                const registro = registros[0];
                const curso = new Curso(
                    registro.id, registro.titulo, registro.descricao, registro.instrutor, registro.carga_horaria, registro.nivel, registro.preco, registro.vagas
                );
                return curso;
            }
            else {
                return null;
            }
        } finally {
            if (conexao) {
                conexao.release();
            }
        }
    }

    async gravar(curso) {
        if (curso instanceof Curso) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = 'INSERT INTO cursos (titulo, descricao, instrutor, carga_horaria, nivel, preco, vagas) VALUES (?, ?, ?, ?, ?, ?, ?)';
                const parametros = [curso.titulo, curso.descricao, curso.instrutor, curso.carga_horaria, curso.nivel, curso.preco, curso.vagas];
                await conexao.execute(sql, parametros);
            } finally {
                if (conexao) {
                    conexao.release();
                }
            }
        }
    }

    async atualizar(curso) {
        if (curso instanceof Curso) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = 'UPDATE cursos SET titulo = ?, descricao = ?, instrutor = ?, carga_horaria = ?, nivel = ?, preco = ?, vagas = ? WHERE id = ?';
                const parametros = [curso.titulo, curso.descricao, curso.instrutor, curso.carga_horaria, curso.nivel, curso.preco, curso.vagas, curso.id];
                await conexao.execute(sql, parametros);
            } finally {
                if (conexao) {
                    conexao.release();
                }
            }
        }
    }

    async excluir(curso) {
        if (curso instanceof Curso) {
            let conexao;
            try {
                conexao = await conectar();
                const sql = 'DELETE FROM cursos WHERE id = ?';
                const parametros = [curso.id];
                await conexao.execute(sql, parametros);
            } finally {
                if (conexao) {
                    conexao.release();
                }
            }
        }
    }
}