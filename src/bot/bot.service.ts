import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import initStage from './scenes/initStage';
import UserService from '../services/user/user.service';
import UserRepository from '../services/user/user.repository';
import { MyContext, SCENES, COMMANDS, IPrismaService } from '../types';

async function launchBot(bot: Telegraf<MyContext>, prismaService: IPrismaService): Promise<void> {
	const stage = initStage(prismaService);
	bot.use(new LocalSession({ database: 'session.json' }).middleware());
	bot.use(stage.middleware());

	try {
		await prismaService.connect();

		bot.command(COMMANDS.START, (ctx: MyContext) => {
			ctx.reply('Hello!');
		});

		bot.command(COMMANDS.CATALOG, async (ctx: MyContext) => {
			const userId = ctx.message?.from?.id;
			if (userId) {
				const userService = new UserService(new UserRepository(prismaService));
				const user = await userService.init(userId);
				if (user.city && user.address) {
					ctx.user = user;
					ctx.scene.enter(SCENES.BOUQUET_LIST);
				} else {
					ctx.user = user;
					ctx.scene.enter(SCENES.CITY);
				}
			}
		});

		bot.launch();

		process.once('SIGINT', () => bot.stop('SIGINT'));
		process.once('SIGTERM', () => bot.stop('SIGTERM'));
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default launchBot;
