import { useNavigate } from 'react-router';
import { useContext } from "react";
import { paths } from '../../config/path';
import { AuthContext } from '../authcontext';

const UserProfile = () =>{
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  console.log(user);
  const handleNav = () => {
            navigate(paths.app.editprofile.getHref());
      };

  if (!user) {
    return <p className="text-gray-500">No user information available.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Profile</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <p className="text-gray-800">{user.nickname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone number:</label>
          <p className="text-gray-800">{user.phoneNumber}</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
          <p className="text-gray-800">{user.address.address}</p>
        </div>
        <button onClick={()=>{handleNav()}} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10 focus:outline-none focus:shadow-outline'>Edit profile</button>
      </div>
    </div>
  );
}

export default UserProfile;