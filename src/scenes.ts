import { Scenes, Markup } from 'telegraf';
import { PrismaClient } from '@prisma/client';
import { MyContext } from './types';

export const SCENES = {
	CITY: 'CITY',
	ADDRESS: 'ADDRESS',
	BOUQUET_LIST: 'BOUQUET_LIST',
};

const prisma = new PrismaClient();

class SceneGenerator {
	generateCityScene = (): Scenes.BaseScene<MyContext> => {
		const city = new Scenes.BaseScene<MyContext>(SCENES.CITY);
		city.enter(async (ctx) => {
			ctx.reply('Введите пожалуйста название города.');
		});
		city.on('text', (ctx) => {
			if (ctx.client) {
				ctx.client.city = ctx.message.text;
			}
			ctx.reply('Введите пожалуйста адрес доставки.');
			ctx.scene.enter(SCENES.ADDRESS);
		});
		return city;
	};

	generateAddressScene = (): Scenes.BaseScene<MyContext> => {
		const address = new Scenes.BaseScene<MyContext>(SCENES.ADDRESS);
		address.on('text', async (ctx) => {
			if (ctx.client) {
				ctx.client.address = ctx.message.text;
				const updatedClient = await prisma.client.update({
					where: { id: ctx.client.id },
					data: ctx.client,
				});
				ctx.client = updatedClient;
			}
			ctx.scene.enter(SCENES.BOUQUET_LIST);
		});
		return address;
	};

	generateBouquetListScene = (): Scenes.BaseScene<MyContext> => {
		const bouquetList = new Scenes.BaseScene<MyContext>(SCENES.BOUQUET_LIST);
		bouquetList.enter(async (ctx) => {
			const bouquets = await prisma.bouquet.findMany({});
			bouquets.forEach((bouquet) => {
				ctx.replyWithPhoto({ url: bouquet.image }, { caption: bouquet.name });
			});
		});
		return bouquetList;
	};
}

export default SceneGenerator;
