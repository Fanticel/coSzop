import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function requests(){

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  interface Request {
    id: number;
    items: string;
  }

  const dummyRequests: Request[] = [
    {
      id: 1,
      items: 'milk, eggs'
    },
    {
      id: 2,
      items: 'milk'
    }
  ];

  useEffect(() => {
      setRequests(dummyRequests);
     }, []);

  if (loading) {
    return <div>Loading requests...</div>;
  }

  if (error) {
    return <div>Error loading requests: {error}</div>;
  }

  return(
    <>
    <h1>Requests</h1>
    {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <Link to={"/request/" + request.id} key={request.id}>{request.items}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default requests;