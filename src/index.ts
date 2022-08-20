import 'dotenv/config';
import { Telegraf, Scenes, Context, Markup } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { PrismaClient } from '@prisma/client';
import SceneGenerator, { SCENES } from './scenes';
import { MyContext } from './types';

const token: string | undefined = process.env.TOKEN;

if (!token) {
	throw new Error('No token!');
}

const sceneGenerator = new SceneGenerator();
const cityScene = sceneGenerator.generateCityScene();
const addressScene = sceneGenerator.generateAddressScene();
const bouquetListScene = sceneGenerator.generateBouquetListScene();

const prisma = new PrismaClient();
const bot = new Telegraf<MyContext>(token);

const stage = new Scenes.Stage<MyContext>([cityScene, addressScene, bouquetListScene]);

bot.use(new LocalSession({ database: 'session.json' }).middleware());
bot.use(stage.middleware());

async function main(): Promise<void> {
	try {
		await prisma.$connect();

		bot.command('start', (ctx: MyContext) => {
			ctx.reply('Hello!');
		});

		bot.command('order', async (ctx: MyContext) => {
			const clientId = ctx.message?.from?.id;
			if (clientId) {
				const client = await prisma.client.findUnique({
					where: {
						id: clientId,
					},
				});
				if (client) {
					ctx.client = client;
					ctx.scene.enter(SCENES.BOUQUET_LIST);
				} else {
					const newClient = await prisma.client.create({
						data: {
							id: clientId,
							city: '',
							address: '',
						},
					});
					ctx.client = newClient;
					ctx.scene.enter(SCENES.CITY);
				}
			}
		});

		bot.launch();
	} catch (error) {
		console.log(error);
	}
}

main();
