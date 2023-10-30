"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-token"];
    if (!token) {
        res.status(401).json({
            msg: "No se encontró token en la petición"
        });
        return;
    }
    try {
        const secretKey = process.env.SECRET_KEY;
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        const { id } = payload;
        const userConfirmed = yield user_1.default.findById(id);
        if (!userConfirmed) {
            res.status(404).json({
                msg: "Usuario no encontrado"
            });
            return;
        }
        ;
        req.body.userConfirmed = userConfirmed;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
});
exports.default = validarJWT;
