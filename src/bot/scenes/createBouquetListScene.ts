import { Scenes, Markup } from 'telegraf';
import { MyContext, SCENES } from '../../types';
import { PrismaService } from '../prisma.service';

export default (prismaService: PrismaService): Scenes.BaseScene<MyContext> => {
	const bouquetList = new Scenes.BaseScene<MyContext>(SCENES.BOUQUET_LIST);
	bouquetList.enter(async (ctx) => {
		const bouquets = await prismaService.client.bouquet.findMany({});
		bouquets.forEach((bouquet) => {
			ctx.replyWithPhoto({ url: bouquet.image }, { caption: bouquet.name });
		});
	});
	return bouquetList;
};
