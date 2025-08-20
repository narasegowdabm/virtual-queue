import React from 'react';
import { Link } from 'react-router-dom';
import '../style-sheet/buttons.css';


const LoginPrompt = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">You must log in to access this page</h2>
        <Link to="/login">
          <button className="button2">
            Login
          </button>
        </Link>
        <Link to="/">
          <button className="button2 ml-2 mt-2">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPrompt;
