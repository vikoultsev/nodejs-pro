import { User } from '@prisma/client';
import { IUserRepository, IUserService } from '../../types';

class UserService implements IUserService {
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	public async create(user: User): Promise<User> {
		return await this.userRepository.create(user);
	}

	public async update(user: User): Promise<User> {
		return this.userRepository.update(user);
	}

	public async init(userId: number): Promise<User> {
		const user = await this.userRepository.find(userId);
		if (user) {
			return user;
		}
		const newUser = await this.userRepository.create({
			id: userId,
			city: '',
			address: '',
		});
		return newUser;
	}
}

export default UserService;
