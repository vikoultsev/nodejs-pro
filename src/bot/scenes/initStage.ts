import { Scenes } from 'telegraf';
import { MyContext, IPrismaService } from '../../types';
import createCityScene from './createCityScene';
import createAddressScene from './createAddressScene';
import createBouquetListScene from './createBouquetListScene';

function initStage(prismaService: IPrismaService): Scenes.Stage<MyContext> {
	const stage = new Scenes.Stage<MyContext>([
		createCityScene(),
		createAddressScene(prismaService),
		createBouquetListScene(prismaService),
	]);
	return stage;
}

export default initStage;
