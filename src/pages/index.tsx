// pages/index.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Wallet App</h1>
      <Link href="/login">
        <div className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 mb-4">Login</div>
      </Link>
      <Link href="/wallet">
        <div className="bg-green-500 text-white p-4 rounded hover:bg-green-600">Go to Wallet</div>
      </Link>
      <Link href="/signup">
        <div className="bg-green-500 text-white p-4 rounded hover:bg-green-600">Sign Up</div>
      </Link>
    </div>
  );
};

export default Home;

