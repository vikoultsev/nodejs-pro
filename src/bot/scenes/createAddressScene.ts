import { Scenes } from 'telegraf';
import { MyContext, SCENES, IPrismaService } from '../../types';
import UserService from '../../services/user/user.service';
import UserRepository from '../../services/user/user.repository';

export default (prismaService: IPrismaService): Scenes.BaseScene<MyContext> => {
	const address = new Scenes.BaseScene<MyContext>(SCENES.ADDRESS);
	address.on('text', async (ctx) => {
		if (ctx.user) {
			ctx.user.address = ctx.message.text;
			const userService = new UserService(new UserRepository(prismaService));
			const updatedClient = await userService.update(ctx.user);
			ctx.user = updatedClient;
		}
		ctx.scene.enter(SCENES.BOUQUET_LIST);
	});
	return address;
};
