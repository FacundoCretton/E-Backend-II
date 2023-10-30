"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersSchema = void 0;
const mongoose_1 = require("mongoose");
;
;
;
exports.OrdersSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    items: {
        type: [{
                desc: {
                    type: String,
                    required: true,
                },
                id: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
            }]
    },
    shippingDetails: {
        name: {
            type: String,
            required: true,
        },
        cellphone: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});
const Order = (0, mongoose_1.model)("Order", exports.OrdersSchema);
exports.default = Order;
