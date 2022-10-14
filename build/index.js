"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BOT_TOKEN = process.env.BOT_API_TOKEN;
const NODE_ENV = process.env.NODE_ENV;
console.log('token is: ', BOT_TOKEN);
console.log('current mode is: ', NODE_ENV);
