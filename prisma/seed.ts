import { PrismaClient, Flower } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

const flowers = [
	{
		name: 'Tulip',
	},
	{
		name: 'Rose',
	},
	{
		name: 'Orchid',
	},
	{
		name: 'Petunia',
	},
];

const bouquets = [
	{
		image: 'https://i1.fnp.sg/images/pr/x/v20210926165242/10-purple-tulip-arrangement_1.jpg',
		name: 'Purple Tulip Arrangement',
		description:
			'The tulip originated centuries ago in Persia and Turkey, where it played a significant role in the art and culture of the time. The meaning of purple flowers historically alludes to royalty. They are often used to express admiration for a loved one’s accomplishments.',
		price: 79,
	},
];

async function main(): Promise<void> {
	try {
		await prisma.$connect();
		await prisma.flower.createMany({
			data: flowers,
		});
		const flowersFromDB: Flower[] = await prisma.flower.findMany({});
		await prisma.bouquet.createMany({
			data: bouquets.map((bouquet) => ({
				...bouquet,
				flowers: flowersFromDB
					.filter((flower) => flower.name === 'Tulip')
					.map((flower) => flower.id),
			})),
		});
		await prisma.$disconnect();
	} catch (error) {
		console.log(error);
	}
}

main();
