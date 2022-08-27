import { Router } from 'express';
import * as userController from '../controller/userController';

const userRouter: Router = Router()

userRouter.post('/signup', userController.signUp);
userRouter.get('/get-all-users', userController.getAllUsers);

export default userRouter;