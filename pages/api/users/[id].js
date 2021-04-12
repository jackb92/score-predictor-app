import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { id } = req.query;
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			FixturesOnUsers: {
				select: {
					fixtureId: true,
				},
			},
		},
	});

	if (!user) {
		return res.status(404).send('');
	}

	res.status(200).json(user);
}

//look in to doing a get for getting teams/stadiums/all users/omit password/
//prisma docs
//https://www.prisma.io/docs/concepts/components/prisma-client
//https://nextjs.org/docs/api-routes/introduction
