import { Router } from 'express'
import * as userController from '../controller/userController'
import userValidator from '../validator/userValidator'
import userUpdateValidator from '../validator/userUpdateValidator'
import auth from '../auth/local'

const userRouter: Router = Router()

userRouter.post('/signup', userValidator, userController.signUp)

userRouter.post('/signin', auth)

userRouter.post("/logout", (req: any, res: any) => {
    req.logout((err: any) => {
        if (err) { res.status(400).send(err) }
        res.status(202).send('Odhlášení proběhlo úspěšně')
    })
})

userRouter.get('/get-users/:status?:role?:returnInResponse?', userController.getUsers)

userRouter.get('/get-one-user/:id?:name?:email?', userController.getOneUser)

userRouter.patch('/update-user/:id?:name?:email?', userUpdateValidator, userController.updateUser)

userRouter.delete('/delete-user', userController.deleteUser)

export default userRouter
