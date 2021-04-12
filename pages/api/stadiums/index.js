import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const stadium = await prisma.stadium.findMany();
	res.status(200).json(stadium);
}
