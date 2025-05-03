import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { paths } from '../../config/path';
import { AuthContext } from '../authcontext';

const EditProfile = () => {
    const { user, register } = useContext(AuthContext); {/* change register to update */}
    const navigate = useNavigate();
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (user) {
            setNickname(user.nickname);
            setEmail(user.email);
            setPhoneNumber(user.phone_number);
            setAddress(user.address.address);
            setLatitude(user.address.latitude);
            setLongitude(user.address.longitude);
        }
    }, [user]);

    const handleGoBack = () => {
      navigate(paths.app.profile.getHref()); 
          };

    const handleSave = () => {
        if (!nickname || !email || !phoneNumber || !address || latitude === null || longitude === null) {
            setError("Please fill in all the fields.");
            return;
        }

        register(phoneNumber, nickname, email, "password", { address, latitude, longitude });
        navigate(paths.app.profile.getHref());
    };

    if (!user) {
        return <p className="text-gray-500">Loading user information...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">Edit Profile</h1>
            <div className="bg-white shadow-md rounded-md p-6">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickname">
                        Nickname:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nickname"
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                        Phone Number:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                    
                <div className="flex justify-center">
                    <button
                        onClick={handleGoBack}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;