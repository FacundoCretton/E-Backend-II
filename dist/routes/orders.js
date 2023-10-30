"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validarJWT_1 = __importDefault(require("../middlewares/validarJWT"));
const recoleccionDeErrores_1 = require("../middlewares/recoleccionDeErrores");
const validarVerify_1 = require("../middlewares/validarVerify");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", [
    validarJWT_1.default,
    recoleccionDeErrores_1.recoleccionDeErrores
], orders_1.getOrder);
router.post("/", [
    validarJWT_1.default,
    validarVerify_1.isVerify,
    (0, express_validator_1.check)("price", "El precio es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("shippingCost", "El costo de envío es necesario").not().isEmpty(),
    (0, express_validator_1.check)("total", "El total es requerido").not().isEmpty(),
    (0, express_validator_1.check)("shippingDetails", "Los detalles del envío son obligatorios").not().isEmpty(),
    (0, express_validator_1.check)("items", "El array de productos es requerido").not().isEmpty(),
    recoleccionDeErrores_1.recoleccionDeErrores
], orders_1.createOrder);
exports.default = router;
