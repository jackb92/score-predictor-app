import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { shortName } = req.query;
	const team = await prisma.team.findUnique({
		where: {
			shortName: shortName.toUpperCase(),
		},
		include: {
			awayFixtures: true,
			stadium: true,
		},
	});

	if (!team) {
		return res.status(404).send('');
	}

	res.status(200).json(team);
}
