import React, { useState } from 'react';
import { useStore } from '../store';
import { Goal } from '../types';

interface GoalInputProps {
  onSubmit: (goal: Goal) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [timeline, setTimeline] = useState('');
  const { user } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newGoal: Goal = {
      name,
      description,
      target: parseFloat(target),
      timeline,
      userId: user!.id,
    };

    onSubmit(newGoal);
    setName('');
    setDescription('');
    setTarget('');
    setTimeline('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="goal-name" className="text-gray-700 font-bold">
          Goal Name
        </label>
        <input
          type="text"
          id="goal-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="goal-description" className="text-gray-700 font-bold">
          Description (Optional)
        </label>
        <textarea
          id="goal-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="goal-target" className="text-gray-700 font-bold">
          Target
        </label>
        <input
          type="number"
          id="goal-target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="goal-timeline" className="text-gray-700 font-bold">
          Timeline (e.g., 2024-03-15)
        </label>
        <input
          type="date"
          id="goal-timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalInput;