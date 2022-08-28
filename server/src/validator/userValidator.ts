import { check } from 'express-validator'

const userValidator = <any>[
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Uživatelské jméno je povinné")
        .isString()
        .withMessage("Uživatelské jméno musí být textový řetězec"),
    check("password")
        .exists()
        .withMessage("Heslo je povinné")
        .isString()
        .withMessage("Heslo jméno musí být textový řetězec")
        .isLength({ min: 6 })
        .withMessage("Heslo musí mít alespoň 6 znaků"),
    check("email")
        .isEmail()
        .withMessage("Uveďte platný e-mail"),
    check("role")
        .optional()
        .isString()
        .withMessage("Uživatelská role musí být textový řetězec")
        .isIn(["user", "manager", "admin"])
        .withMessage("Neplatná uživatelská role"),
    check("status")
        .optional()
        .isBoolean()
        .withMessage("Stav uživatele musí být logická hodnota true nebo false"),
]

export default userValidator