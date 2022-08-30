import { check } from 'express-validator'

const userLoginValidator = <any>[
    check("nameOrEmail")
        .exists()
        .withMessage("Zadejte prosím uživatelské jméno nebo heslo"),
    check("password")
        .exists()
        .withMessage("Zadejte prosím heslo")
]

export default userLoginValidator