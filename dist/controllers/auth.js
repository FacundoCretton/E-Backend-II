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
exports.verifyUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generarJWT_1 = require("../helpers/generarJWT");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Al saber que el usuario me va a estar mandando data en la request, lo puedo desestructurar del request body
    const { nombre, email, password, rol } = req.body;
    //Yo sé que esta data que viene del body tiene que ver con el usuario, entonces como me aseguro que todo esté bien? Yo puedo tipar la data de adentro y le puedo decir que tiene que respetar el interface de user
    const user = new user_1.default({ nombre, email, password, rol });
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.ADMINKEY) {
        user.rol = constants_1.ROLES.admin;
    }
    const newCode = randomstring_1.default.generate(10);
    user.code = newCode;
    yield user.save();
    yield (0, mailer_1.sendEmail)(email, newCode, nombre);
    res.status(201).json({ user });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: "Usuario no encontrado" });
            return;
        }
        const verificarPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!verificarPassword) {
            res.status(400).json({ msg: "Contraseña incorrecta" });
            return;
        }
        const token = yield (0, generarJWT_1.generarJWT)(user.id);
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al iniciar sesión" });
    }
});
exports.login = login;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ msg: "Usuario no encontrado" });
            return;
        }
        if (user.verified) {
            res.status(400).json({ msg: "Usuario ya verificado" });
            return;
        }
        if (code !== user.code) {
            res.status(400).json({ msg: "Código incorrecto" });
            return;
        }
        yield user_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({ msg: "Usuario verificado correctamente" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al verificar usuario" });
    }
});
exports.verifyUser = verifyUser;
