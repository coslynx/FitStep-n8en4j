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
    const { goalId, date, progress } = req.body;

    try {
      const progressData = await prisma.progress.create({
        data: {
          goalId,
          date,
          progress,
          userId: session.user.id,
        },
      });

      return res.status(201).json(progressData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating progress data' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}