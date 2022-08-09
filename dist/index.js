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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const telegraf_1 = require("telegraf");
const client_1 = require("@prisma/client");
const token = process.env.TOKEN;
if (!token) {
    throw new Error('No token!');
}
const prisma = new client_1.PrismaClient();
const bot = new telegraf_1.Telegraf(token);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            bot.command('start', (ctx) => {
                ctx.reply('Hello!');
            });
            bot.launch();
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
