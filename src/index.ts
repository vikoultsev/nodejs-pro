import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { PrismaClient } from '@prisma/client';

const token = process.env.TOKEN;

if (!token) {
	throw new Error('No token!');
}

const prisma = new PrismaClient();
const bot = new Telegraf(token);

async function main(): Promise<void> {
	try {
		await prisma.$connect();

		bot.command('start', (ctx) => {
			ctx.reply('Hello!');
		});

		bot.launch();
	} catch (error) {
		console.log(error);
	}
}

main();
