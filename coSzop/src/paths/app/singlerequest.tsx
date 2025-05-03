import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { paths } from '../../config/path';
import { useNavigate } from 'react-router-dom';
import { GetFullUser, User, AuthContext } from '../authcontext';
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';
import axios from 'axios';


interface Request {
    id: number;
    items: string;
    maximumPrice: number;
    userId: number;
    description: string;
    bringerId: number;
    status?:  'pending' | 'accepted' | 'completed';
    dateTimeCreated: string;
}


function RequestDetails() {
  const {user} = useContext(AuthContext);
  const { requestId } = useParams<{ requestId: string }>();
  const [zoom, setZoom] = useState<number>(17);
  const [requestingPerson, setRequestingPerson] = useState<User | null>(null);
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [miniError, setMiniError] = useState<string | null>("");
  const [newCost, setNewCost] =useState(0);
  const navigate = useNavigate();

  const setReqPerson = async (foundRequest:Request) => {
    let data = await GetFullUser(foundRequest.userId)
    setRequestingPerson(data);
  }
  function preChecks(){
    if (request==null || user==null){
      setMiniError("Something went wrong");
      return false;}
    if (newCost > request.maximumPrice){
      setMiniError("You cannot go over the maxium price");
      return false;
    }
    return true
  }
  const updateRequest = async() => {
    if (!preChecks()) {return;}
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    await axios.put('https://coszop.electimore.xyz/api/shopping-request',
      {id: request!.id, items: request!.items, description:request!.description, maximumPrice:newCost, status:'accepted', userId: request!.userId, bringerId: user!.id}, config)
    request!.status = 'accepted'
    
  } 

  useEffect(() => {
    if (!requestId) {
      setLoading(false);
      return;
    }

    const id = parseInt(requestId, 10);
    const findRequest = async(id:number) => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      var res = await axios.get('https://coszop.electimore.xyz/api/shopping-request/'+id, config)
      setRequest(res.data);
    }

    
    findRequest(id)
  }, [requestId]);

  useEffect(()=>{
    if (request) {
      setReqPerson(request);
      setNewCost(request.maximumPrice)
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [request])

  if (loading) {
    return <p className="text-gray-600 italic">Loading request...</p>;
  }

  if (error) {
    return <p className="text-red-500 font-bold">Error</p>;
  }

  if (!request) {
    return <p className="text-gray-500">No request found</p>;
  }

  if (!requestingPerson){
    return <p className="text-gray-500">No requesting person found</p>;
  }

  const handleReturn = (id:number) => {
    switch (id){
      case 1:
        navigate(paths.app.requests.getHref());
        break;
      case 2:
        navigate(paths.app.myRequests.getHref())
    }
  };

  const handleAccept = () => {
    updateRequest();
    if (preChecks()){handleReturn(1);}
  };

  const handleDeleting = async() => {
    if (user==null)return;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    await axios.delete(`https://coszop.electimore.xyz/api/shopping-request/${request.id}`, config)
    handleReturn(2);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Request Details</h1>
      <div className="bg-white shadow-md rounded-md p-6">
        <p className="mb-2">
          <span className="font-semibold text-gray-700">ID:</span> {request.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">Name:</span> {requestingPerson.nickname}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">Items:</span> {request.items}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">Address:</span> {requestingPerson.address.address}
        </p>
        {request.description && (
          <p className="mb-4">
            <span className="font-semibold text-gray-700">Details:</span> {request.description}
          </p>
        )}
        {request.status && (
          <p className={`mb-4 font-semibold text-sm ${
            request.status === 'pending' ? 'text-yellow-500' :
            request.status === 'accepted' ? 'text-green-500' :
            'text-gray-500'
          }`}>
            Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </p>
        )}
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
                  <Map
                    style={{width: '100%', height: '300px'}}
                    defaultCenter={user!=null?{lat:user!.address.latitude, lng:user!.address.longitude}:{lat: 55.854, lng: 9.850}}
                    defaultZoom={zoom}
                    onZoomChanged={(ev)=>{setZoom(ev.detail.zoom);}}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId="MY_MAP">
                      {requestingPerson!=null?<AdvancedMarker position={{lat:requestingPerson.address.latitude, lng:requestingPerson.address.longitude}}>
                        {zoom<17?<div className='bg-yellow-20 bg-opacity-20 rounded-lg'><p className='text-lg'>🚀</p></div>
                        :<div className='bg-green-200 rounded-lg h-15 w-15 bg-opacity-20 flex justify-center items-center'>
                          <p className='font-bold'>🚀 Meeting around here!</p>
                        </div>}
                      </AdvancedMarker>:''}
                      {user!=null?<AdvancedMarker position={{lat:user.address.latitude, lng:user.address.longitude}}>
                      {zoom<17?<div className='bg-yellow-20 bg-opacity-20 rounded-lg'><p className='text-lg'>🏠</p></div>
                      :<div className='bg-yellow-200 rounded-lg h-15 w-15 bg-opacity-20 flex justify-center items-center'>
                      <p className='font-bold'>🏠 Your house here!</p>
                        </div>}
                      </AdvancedMarker>:''}
                    </Map>
                </APIProvider>
        {request.status === "pending"?<div className="flex justify-center space-x-2 mt-10">
        <label htmlFor="pricer" className="block text-gray-700 text-sm font-bold mb-2">
            Name your price:
            </label>
           <input
              type="number"
              id="pricer"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newCost}
              onChange={(e) => setNewCost(parseInt(e.target.value))}
              required
            />
            {miniError!=null?<h2 className='text-red-500 font-bold text-lg'>{miniError}</h2>:''}
        </div>:''}
        <div className="flex justify-center space-x-2 mt-10">
          <button
            type="button"
            onClick={()=>{handleReturn(1)}}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Return
          </button>
          {request.status === 'pending' && (
            <>
            <button
              type="button"
              onClick={()=>{handleAccept()}}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Accept Request
            </button>
            </>
          )}
          {(request.status === 'accepted' && user!=null && request.bringerId != user?.id) && (
            <button
              type="button"
              onClick={()=>{handleDeleting()}}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mark as Completed, and remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;