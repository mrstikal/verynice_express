import User from '../model/userModel'
import jwtConfig from '../config/jwtConfig'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const { Types, SchemaTypes } = mongoose

const signUp = async (req: Request, res: Response) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.mapped())
        }

        const user = await User.create(req.body)
        return res.status(201).json(user)


    } catch (e: any) {
        e.status = 'Kód chyby: 500'
        return res.status(500).json(e)
    }
}

const signIn = async (req: Request, res: Response) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.mapped())
        }

        const user = await User.findOne({$or: [{email: req.body.nameOrEmail}, {name: req.body.nameOrEmail}] })

        if (!user) {
            return res.status(404).send('Uživatel s tímto emailem nebo uživatelským jménem nenalezen')
        }

        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (err) {
                return res.status(422).send(err);
            } else if (response) {
                return res.status(202).json({
                    //token: JWT.sign({ nameOrEmail: req.body.nameOrEmail}, jwtConfig.jwtSecret, {expiresIn: jwtConfig.jwtExpiration} ),
                    msg: 'Uživatel byl úspěšně přihlášen'
                });
            } else {
                return res.status(401).send({ message: 'Heslo nesouhlasí' });
            }
        });


    } catch (e: any) {
        e.status = 'Kód chyby: 500'
        return res.status(500).json(e)
    }
}

const getUsers = async (req: Request, res: Response) => {

    try {
        const query = <any>{}

        if ('status' in req.query) {
            query.status = req.query.status
        }

        if ('role' in req.query) {
            query.role = req.query.role
        }

        const returnInResponse = <any>{}

        const queryParams = req.query.returnInResponse as string[]

        if (req.query.returnInResponse?.length) {
            queryParams.forEach((param: string) => {
                returnInResponse[param] = 1
            })
        }

        if (queryParams && !queryParams.includes('id')) {
            returnInResponse._id = 0
        }

        const users = await User.find(query, returnInResponse)

        if (!users.length) {
            return res.status(404).send('Žádný uživatel nenalezen')
        }

        return res.status(201).json(users)

    } catch (e: any) {
        e.status = 'Kód chyby: 404'
        return res.status(404).json(e)
    }
}

const getOneUser = async (req: Request, res: Response) => {

    try {
        const query = <any>{}

        if (Object.keys(req.query).length > 1) {
            return res.status(422).send('Použijte jen jeden z parametrů: "id" NEBO "name" NEBO "email"')
        }

        if ('id' in req.query) {
            query._id = new Types.ObjectId(req.query.id as string)
        }

        if ('email' in req.query) {
            query.email = req.query.email
        }

        if ('name' in req.query) {
            query.name = req.query.name
        }

        const user = await User.findOne(query)

        if (!user) {
            return res.status(404).send('Žádný uživatel nenalezen')
        }

        return res.status(201).json(user)

    } catch (e: any) {
        e.status = 'Kód chyby: 500'
        return res.status(404).json(e)
    }
}

const updateUser = async (req: Request, res: Response) => {

    try {
        const findBy = <any>{}

        if (Object.keys(req.query).length > 1) {
            return res.status(422).send('Použijte jen jeden z parametrů: "id" NEBO "name" NEBO "email"')
        }

        if ('id' in req.query) {
            findBy._id = new Types.ObjectId(req.query.id as string)
        }

        if ('email' in req.query) {
            findBy.email = req.query.email
        }

        if ('name' in req.query) {
            findBy.name = req.query.name
        }

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json(errors)
        }

        const user = await User.findOneAndUpdate(findBy, req.body, { new: true })
        return res.status(201).json(user)

    } catch (e: any) {
        e.status = 'Kód chyby: 404'
        return res.status(404).json(e)
    }
}

const deleteUser = async (req: Request, res: Response) => {

    try {
        const query = <any>{}

        if (Object.keys(req.body).length > 1) {
            return res.status(422).send('Použijte jen jeden z parametrů: "id" NEBO "name"')
        }

        if ('name' in req.body) {
            query.name = req.body.name
        }

        if ('id' in req.body) {
            query._id = new Types.ObjectId(req.body.id as string)
        }

        const deletedUser = await User.findOneAndDelete(query)

        return res.status(202).json(deletedUser)

    } catch (e: any) {
        e.status = 'Kód chyby: 404'
        return res.status(404).json(e)
    }
}

export { signUp, signIn, getUsers, getOneUser, deleteUser, updateUser }