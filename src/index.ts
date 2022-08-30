import 'dotenv/config';
import { Telegraf } from 'telegraf';
import launchBot from './bot/bot.service';
import { PrismaService } from './db/prisma.service';
import { MyContext, IPrismaService } from './types';

const token: string | undefined = process.env.TOKEN;

if (!token) {
	throw new Error('No token!');
}

const bot = new Telegraf<MyContext>(token);
const prismaService = new PrismaService();

launchBot(bot, prismaService);
