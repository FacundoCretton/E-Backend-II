"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const recoleccionDeErrores_1 = require("../middlewares/recoleccionDeErrores");
const validacionesDB_1 = require("../helpers/validacionesDB");
const router = (0, express_1.Router)();
router.post("/register", 
//check sirve para validar los campos que vienen en el body. En este caso, el nombre no puede estar vacío, en caso de estarlo, se devuelve un mensaje de error
[
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email").custom(validacionesDB_1.emailExiste),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recoleccionDeErrores_1.recoleccionDeErrores
], auth_1.register);
router.post("/login", [
    (0, express_validator_1.check)("email", "El email no es valido").isEmail(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password debe tener al menos 8 caracteres").isLength({ min: 8 }),
    recoleccionDeErrores_1.recoleccionDeErrores
], auth_1.login);
router.patch("/verify", [
    (0, express_validator_1.check)("code", "El código es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("code", "El código debe tener 10 caracteres").isLength({ min: 10 }),
    (0, express_validator_1.check)("email", "El email no es valido").isEmail(),
    (0, express_validator_1.check)("email", "El email es obligatorio").not().isEmpty(),
    recoleccionDeErrores_1.recoleccionDeErrores
], auth_1.verifyUser);
exports.default = router;
