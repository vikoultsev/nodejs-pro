import { Scenes, Context } from 'telegraf';
import { User, PrismaClient } from '@prisma/client';

export interface MyContext extends Context {
	user?: User;
	session: Scenes.SceneSession<Scenes.SceneSessionData>;
	scene: Scenes.SceneContextScene<MyContext, Scenes.SceneSessionData>;
}

export enum SCENES {
	CITY = 'CITY',
	ADDRESS = 'ADDRESS',
	BOUQUET_LIST = 'BOUQUET_LIST',
}

export enum COMMANDS {
	START = 'start',
	CATALOG = 'catalog',
}

export interface IPrismaService {
	client: PrismaClient;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
}

export interface IUserRepository {
	find: (userId: number) => Promise<User | null>;
	create: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
}

export interface IUserService {
	init: (userId: number) => Promise<User>;
	create: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
}
