import { check } from 'express-validator'

const userUpdateValidator = <any>[
    check("name")
        .optional()
        .isString()
        .withMessage("Uživatelské jméno musí být textový řetězec"),
    check("password")
        .optional()
        .isString()
        .withMessage("Heslo jméno musí být textový řetězec")
        .isLength({ min: 6 })
        .withMessage("Heslo musí mít alespoň 6 znaků"),
    check("email")
        .optional()
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

export default userUpdateValidator