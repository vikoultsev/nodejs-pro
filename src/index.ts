import 'dotenv/config';
import { Telegraf, Context } from 'telegraf';
import { PrismaClient } from '@prisma/client';

const token: string | undefined = process.env.TOKEN;

if (!token) {
	throw new Error('No token!');
}

const prisma: PrismaClient = new PrismaClient();
const bot: Telegraf = new Telegraf(token);

async function main(): Promise<void> {
	try {
		await prisma.$connect();

		bot.command('start', (ctx: Context) => {
			ctx.reply('Hello!');
		});

		bot.launch();
	} catch (error) {
		console.log(error);
	}
}

main();
