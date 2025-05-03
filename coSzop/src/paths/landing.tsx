import { useNavigate } from 'react-router';
import { useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';

const LandingRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNav = (id: number) => {
    switch (id) {
      case 1:
        navigate(paths.register.getHref());
        break;
      case 2:
        navigate(paths.login.getHref());
        break;
      case 3:
        navigate(paths.app.createrequest.getHref());
        break;
      case 4:
        navigate(paths.app.requests.getHref());
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white rounded-lg shadow-lg p-8">
        {user == null ? (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Hi!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Welcome to <span className="font-semibold text-green-500">coSzop</span>, a place where other people remember what you forgot!
            </p>
            <p className="mt-4 text-md text-gray-700">
              To start using our service, please:
            </p>
            <div className="mt-6 space-x-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline-green active:bg-green-800 transition duration-150 ease-in-out"
                onClick={() => {
                  handleNav(2);
                }}
              >
                Log in
              </button>
              <span>or</span>
               <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-500 transition duration-150 ease-in-out"
                onClick={() => {
                  handleNav(1);
                }}
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Hello <span className="font-semibold text-green-500">{user.nickname}</span>!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              What would you like to do?
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => {
                  handleNav(3);
                }}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                I forgot to buy something
              </button>
              <button
                onClick={() => {
                  handleNav(4);
                }}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                I am at the shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingRoute;