import { PrismaClient } from '@prisma/client';

export class PrismaService {
	client: PrismaClient;

	constructor() {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			console.log('Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				console.error('Ошибка подключения к базе данных: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
