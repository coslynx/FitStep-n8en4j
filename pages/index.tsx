import Head from 'next/head';
import Link from 'next/link';
import { useStore } from '../store';
import { User } from '../types';

const HomePage = () => {
  const { user, setUser } = useStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <Head>
        <title>FitTrack - Track Your Fitness Journey</title>
        <meta name="description" content="FitTrack is a web application designed to empower fitness enthusiasts to track their progress, stay motivated, and connect with a supportive community." />
      </Head>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to FitTrack</h2>
        <p className="text-gray-700 mb-6">
          Join our fitness community and take control of your health journey!
        </p>
        {!user && (
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </Link>
        )}
        {user && (
          <Link href="/dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;