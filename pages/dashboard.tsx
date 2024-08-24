import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import GoalInput from '@components/GoalInput';
import ProgressChart from '@components/ProgressChart';
import { useStore } from '../store';
import { Goal } from '../types';

const DashboardPage = () => {
  const { user, setUser, goals, addGoal, progressData } = useStore();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      });
    }
  }, [session, setUser]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleGoalSubmit = async (goal: Goal) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (response.ok) {
        const newGoal = await response.json();
        addGoal(newGoal);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Set New Goal</h2>
          <GoalInput onSubmit={handleGoalSubmit} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Goals</h2>
          <ul className="list-disc pl-4">
            {goals.map((goal) => (
              <li key={goal.id} className="mb-2">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {goal.name}
                </h3>
                <p className="text-gray-700">{goal.description}</p>
                <ProgressChart goalId={goal.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;