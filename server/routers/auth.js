import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { body } from "express-validator";

const router = Router();

router.post('/register', 
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be at least 8 characters long (maximum` 16)'),
    AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.delete('/delete/:id', authMiddleware, AuthController.deleteAccount);
router.get('/refresh', AuthController.refresh);
router.get('/validate-token', authMiddleware, AuthController.validateToken);
router.get('/me', authMiddleware, AuthController.me);



export { router as authRouter }