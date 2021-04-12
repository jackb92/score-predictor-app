import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const fixture = await prisma.fixture.findMany({
		include: {
			homeTeam: true,
			awayTeam: true,
		},
	});
	res.status(200).json(fixture);
}
