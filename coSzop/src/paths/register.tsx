import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type Position = {
  latitude: number;
  longitude: number;
};

const RegisterRoute = () => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const myLatlng = { lat: 55.854, lng: 9.850 };

  const handleMapClick = async (event: Position) => {
    const lat = event.latitude;
    const lng = event.longitude;
    setPosition({ lat, lng });
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results![0] != null) {
        setAddress(results![0].formatted_address);
      } else {
        setAddress("No address found");
      }
    });
  };

  const handleNav = (id: number) => {
    switch (id) {
      case 1:
        navigate(paths.home.getHref());
        break;
      case 2:
        navigate(paths.login.getHref());
        break;
      default:
        break;
    }
  };

  function handleAllTheDamnChecks() {
    if (email === "") {
      setError("You need to provide an email address");
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address (e.g., something@example.com)");
      return false;
    }
    if (password === "") {
      setError("You need to provide a password");
      return false;
    }
    if (password.length < 8 || password.length > 30) {
      setError("Password must be between 8 and 30 characters long");
      return false;
    }
    if (nickname === "") {
      setError("You need to provide a nickname");
      return false;
    }
    if (nickname.length < 5 || nickname.length > 20) {
      setError("Nickname must be between 5 and 20 characters long");
      return false;
    }
    if (phoneNumber === "") {
      setError("You need to provide a phone number");
      return false;
    }
    if (position == null) {
      setError("Please select your neighborhood on the map");
      return false;
    }
    return true;
  }

  const handleRegister = () => {
    if (!handleAllTheDamnChecks()) {
      return;
    }
    register(phoneNumber, nickname, email, password, {
      address,
      latitude: position!.lat,
      longitude: position!.lng,
    });
    setError("");
    setEmail("");
    setPassword("");
    setNickname("");
    setPhoneNumber("");
  };

  useEffect(() => {
    if (user != null) {
      handleNav(1);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="flex justify-end">
          <p className="text-sm text-gray-600 mr-2">Already have an account?</p>
          <button
            onClick={() => {
              handleNav(2);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition duration-150 ease-in-out"
          >
            Log in
          </button>
        </div>
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join <span className="font-semibold text-green-500">coSzop</span> and start connecting!
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
              Nickname:
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                e.key === "Enter" && handleRegister();
              }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                e.key === "Enter" && handleRegister();
              }}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone number:
            </label>
            <input
              id="phone"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
                e.key === "Enter" && handleRegister();
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
                e.key === "Enter" && handleRegister();
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select your neighborhood on the map:
            </label>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
              <div className="rounded-md overflow-hidden">
                <Map
                  onClick={(ev) => {
                    if (ev.detail.latLng == null) {
                      return;
                    }
                    handleMapClick({
                      latitude: ev.detail.latLng.lat,
                      longitude: ev.detail.latLng.lng,
                    });
                  }}
                  style={{ width: '100%', height: '400px' }}
                  defaultCenter={myLatlng}
                  defaultZoom={14}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  mapId="MY_MAP"
                >
                  {position != null ? <AdvancedMarker position={position} /> : ''}
                </Map>
              </div>
            </APIProvider>
            {address && <p className="mt-2 text-sm text-gray-600">Selected address: {address}</p>}
          </div>
          <div>
            <button
              onClick={() => {
                handleRegister();
              }}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition duration-150 ease-in-out"
            >
              Register
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
                  There were some errors with your submission
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

export default RegisterRoute;