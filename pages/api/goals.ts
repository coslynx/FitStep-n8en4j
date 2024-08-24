import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, description, target, timeline } = req.body;

    try {
      const goal = await prisma.goal.create({
        data: {
          name,
          description,
          target: parseFloat(target),
          timeline,
          userId: session.user.id,
        },
      });

      return res.status(201).json(goal);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating goal' });
    }
  } else if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId: session.user.id,
        },
      });

      return res.status(200).json(goals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching goals' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}