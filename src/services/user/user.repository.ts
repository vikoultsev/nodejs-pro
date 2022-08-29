import { User } from '@prisma/client';
import { PrismaService } from '../../bot/prisma.service';
import { IUserRepository } from '../../types';

class UserRepository implements IUserRepository {
	prismaService: PrismaService;

	constructor(prismaService: PrismaService) {
		this.prismaService = prismaService;
	}

	public async find(userId: number): Promise<User | null> {
		const user = await this.prismaService.client.user.findUnique({
			where: {
				id: userId,
			},
		});
		return user;
	}

	public async create(user: User): Promise<User> {
		const newUser = await this.prismaService.client.user.create({
			data: user,
		});
		return newUser;
	}

	public async update(user: User): Promise<User> {
		const updatedClient = await this.prismaService.client.user.update({
			where: { id: user.id },
			data: user,
		});
		return updatedClient;
	}
}

export default UserRepository;
