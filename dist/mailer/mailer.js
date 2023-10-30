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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'ladespensadelaabuelaok@gmail.com',
        pass: 'vtifcckhlwytccwa'
    },
    from: 'ladespensadelaabuelaok@gmail.com'
});
const sendEmail = (to, code, nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: '"La Despensa de la Abuela" <ladespensadelaabuelaok@gmail.com>',
        to,
        subject: 'Código de verificación',
        html: `
            <p>¡Hola ${nombre}!</p>
            <p>Tu código de verificación es: ${code}</p>
            <img src="https://i.ibb.co/yWGf1rY/tu-imagen.png" alt="Logo">
            <p>La Despensa de la Abuela. Todos los derechos reservados</p>
        `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Email enviado');
    }
    catch (error) {
        console.log("Se produjo un error al enviar el email", error);
    }
});
exports.sendEmail = sendEmail;
