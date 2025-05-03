import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { paths } from '../../config/path';
import { AuthContext } from '../authcontext';
import axios from 'axios';

function requests(){
  const {user} = useContext(AuthContext)
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const navigate = useNavigate();

  interface Request {
    id: number;
    items: string;
    maximumPrice: number;
    userId: number;
    bringerId: number;
    status: 'pending' | 'accepted' | 'completed';
  }

  const getRequests = async ()=>{
    if (user==null)return;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    // var res = await axios.get('https://coszop.electimore.xyz/api/shopping-request', config)
    var res = await axios.get(`https://coszop.electimore.xyz/api/shopping-request/limited/range/100/from/${user.id}`, config)
    const ans = new Array<Request>
    res.data.shoppingRequests.forEach((req:Request) => {
      if((req.status==='pending' && req.userId!=user.id) || req.bringerId == user.id){ans.push(req)}
    });
    setRequests(ans)
  }

  const handleNav = (id: string) => {
    navigate(paths.app.request.getHref(id));
  };

  useEffect(()=>{
    getRequests();
  }, [user])

  useEffect(() => {
      // setRequests(dummyRequests);
      setLoading(false);
     }, []);

     if (loading) {
      return <p>Loading requests...</p>;
    }
  
    if (error) {
      return <p>Error loading requests: {error}</p>;
    }

  return(
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Requests</h1>
      <div className="mb-4">
      </div>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <ul className="bg-white shadow-md rounded-md overflow-hidden">
          {requests.map((request) => (
            <li
            key={request.id}
            onClick={() => handleNav(request.id.toString())}
            className={request.status==="accepted"?"px-6 py-4 border-b last:border-b-0 cursor-pointer hover:bg-green-50 transition duration-150 ease-in-out bg-yellow-200"
              :"px-6 py-4 border-b last:border-b-0 cursor-pointer hover:bg-green-50 transition duration-150 ease-in-out "}
          >
            <p className="text-lg font-medium text-gray-700">{request.items}</p>
            <p className="text-sm text-gray-500">{"max: " + request.maximumPrice + "DKK"}</p>
          </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default requests;