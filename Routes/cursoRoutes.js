import express from 'express';
import CursoController from '../Controllers/cursoController.js';

const cursoRouter = express.Router();
const ctrl = new CursoController();

cursoRouter.post('/', ctrl.gravar);
cursoRouter.get('/', ctrl.listar);
cursoRouter.get('/:id', ctrl.buscarPorId);
cursoRouter.put('/:id', ctrl.atualizar);
cursoRouter.delete('/:id', ctrl.excluir);

export default cursoRouter;