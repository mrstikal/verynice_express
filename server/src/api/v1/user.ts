import userRouter from '../../route/userRouter'

export default (app:any) => {
    app.use('/api/v1/user', userRouter)
};