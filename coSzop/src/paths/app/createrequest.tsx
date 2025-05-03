import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../config/path';
import { AuthContext } from '../authcontext';
import axios from 'axios';

interface Request {
  items: string;
  description: string;
  maximumPrice: number;
  status: 'pending' | 'accepted' | 'completed';
  userId: number;
}

function CreateRequest() {
  const {user} = useContext(AuthContext)
  const [requester, setRequester] = useState('');
  const [items, setItems] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [maximumPrice, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const newRequest: Request = {
      items,
      maximumPrice,
      userId: user!.id,
      status:"pending",
      description,
    };
    console.log('https://coszop.electimore.xyz/api/shopping-request', newRequest, config)
    let res = await axios.post('https://coszop.electimore.xyz/api/shopping-request', newRequest, config)
    console.log(res)
//do something here?
    navigate(paths.app.requests.getHref());
  };

  const handleCancel = () => {
    navigate(paths.home.getHref());
  };

  const handleSend = () => {

  }

  useEffect(()=>{
    if (user==null){return;}
    setAddress(user.address.address);
    setRequester(user.nickname);
  },[user])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Create Request</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 space-y-4">
        <div>
          <label htmlFor="requester" className="block text-gray-700 text-sm font-bold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="requester"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={requester}
            disabled
            onChange={(e) => setRequester(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="items" className="block text-gray-700 text-sm font-bold mb-2">
            Items Needed:
          </label>
          <textarea
            id="items"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Delivery Address:
          </label>
          <input
            type="text"
            id="address"
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Maximum price:
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={maximumPrice}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">
            Additional Details (Optional):
          </label>
          <textarea
            id="details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button
            type="submit"
            onClick={()=>{handleSend()}}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRequest;