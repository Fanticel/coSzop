import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';

const LoginRoute = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNav = (id: number) => {
    switch (id) {
      case 1:
        navigate(paths.home.getHref());
        break;
      case 2:
        navigate(paths.register.getHref());
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    if (email === "") {
      setError("Please enter your email address");
      return;
    }
    if (password === "") {
      setError("Please enter your password");
      return;
    }
    setError("");
    login(email, password);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user != null) {
      handleNav(1);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="flex justify-end">
          <p className="text-sm text-gray-600 mr-2">Don't have an account?</p>
          <button
            onClick={() => {
              handleNav(2);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition duration-150 ease-in-out"
          >
            Register
          </button>
        </div>
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to <span className="font-semibold text-green-500">coSzop</span>!
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                e.key === "Enter" && handleLogin();
              }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                e.key === "Enter" && handleLogin();
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                handleLogin();
              }}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition duration-150 ease-in-out"
            >
              Log in
            </button>
          </div>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  There was an error logging in
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRoute;