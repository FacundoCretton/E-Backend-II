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
exports.createOrder = exports.getOrder = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userConfirmed._id;
    const consulta = { user: userId };
    const orders = yield orders_1.default.find(consulta);
    res.status(200).json({
        data: [
            ...orders
        ]
    });
});
exports.getOrder = getOrder;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userConfirmed._id;
    const orderData = req.body;
    const data = Object.assign(Object.assign({}, orderData), { user: userId, createdAt: new Date(), status: "Pendiente" });
    const order = new orders_1.default(data);
    yield order.save();
    res.status(200).json({
        order
    });
});
exports.createOrder = createOrder;
