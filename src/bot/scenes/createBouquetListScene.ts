import { Scenes } from 'telegraf';
import { MyContext, ScenesList, IPrismaService } from '../../types';

export default (prismaService: IPrismaService): Scenes.BaseScene<MyContext> => {
	const bouquetList = new Scenes.BaseScene<MyContext>(ScenesList.BOUQUET_LIST);
	bouquetList.enter(async (ctx) => {
		const bouquets = await prismaService.client.bouquet.findMany({});
		bouquets.forEach((bouquet) => {
			ctx.replyWithPhoto({ url: bouquet.image }, { caption: bouquet.name });
		});
	});
	return bouquetList;
};
