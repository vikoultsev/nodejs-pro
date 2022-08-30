import { PrismaClient } from '@prisma/client';
import { IPrismaService } from '../types';

export class PrismaService implements IPrismaService {
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
			throw e;
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
