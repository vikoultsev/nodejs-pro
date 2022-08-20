import { Scenes, Context } from 'telegraf';
import { Client } from '@prisma/client';

export interface MyContext extends Context {
	client?: Client;
	session: Scenes.SceneSession<Scenes.SceneSessionData>;
	scene: Scenes.SceneContextScene<MyContext, Scenes.SceneSessionData>;
}
