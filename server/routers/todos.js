import { Router } from "express";
import TodosController from "../controllers/todos-controller.js";

const router = Router();

router.post('/', TodosController.addTodo);
router.get('/', TodosController.getTodos);
router.delete('/:id', TodosController.deleteTodo);
router.patch('/update/:id', TodosController.updateTodo);
router.patch('/edit/:id', TodosController.editTodo);

export { router as todoRouter }