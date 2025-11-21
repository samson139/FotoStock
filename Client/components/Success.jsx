import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center text-center max-w-md w-full">

        {/* Success Icon */}
        <div className="text-green-600 dark:text-green-400 text-6xl md:text-8xl mb-6 animate-bounce">
          <FaCheckCircle />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-amber-50 mb-4 drop-shadow-md">
          Payment Successful!
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-lg md:text-xl">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Go Home Button */}
        <Link to="/user">
          <button className="px-8 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
