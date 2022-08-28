import { Router } from 'express'
import * as userController from '../controller/userController'
import userValidator from '../validator/userValidator'

const userRouter: Router = Router()

userRouter.post('/signup', userValidator, userController.signUp)

userRouter.get('/get-users/:status?:role?', userController.getUsers)

userRouter.get('/get-one-user/:id?:name?:email?', userController.getOneUser)

userRouter.delete('/delete-user', userController.deleteUser)

export default userRouter;