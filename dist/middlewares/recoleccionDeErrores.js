"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoleccionDeErrores = void 0;
const express_validator_1 = require("express-validator");
const recoleccionDeErrores = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.status(400).json(errores);
    }
    else {
        next();
    }
};
exports.recoleccionDeErrores = recoleccionDeErrores;
