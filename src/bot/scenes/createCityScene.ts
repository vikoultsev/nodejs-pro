import { Scenes } from 'telegraf';
import { MyContext, ScenesList } from '../../types';

export default (): Scenes.BaseScene<MyContext> => {
	const city = new Scenes.BaseScene<MyContext>(ScenesList.CITY);
	city.enter(async (ctx) => {
		ctx.reply('Введите пожалуйста название города.');
	});
	city.on('text', (ctx) => {
		if (ctx.user) {
			ctx.user.city = ctx.message.text;
		}
		ctx.reply('Введите пожалуйста адрес доставки.');
		ctx.scene.enter(ScenesList.ADDRESS);
	});
	return city;
};
