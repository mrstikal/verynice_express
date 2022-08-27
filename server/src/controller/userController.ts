import User from '../model/userModel'
import { Request, Response } from 'express'

const signUp = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user)
    } catch (e: any) {
        e.status = 'Error 500'
        return res.status(500).json(e)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ name: 'Punit' }, { name: 1, _id: 0 })
        if (!users.length) {
            return res.status(404).json('Žádný uživatel nenalezen')
        } else {
            return res.status(201).json(users)
        }
    } catch (e: any) {
        e.status = 'Error 404'
        return res.status(404).json(e)
    }
}

export { signUp, getAllUsers }