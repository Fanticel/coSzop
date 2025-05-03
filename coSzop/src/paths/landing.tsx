import { Path, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';
// import { Modal } from '@/components/private/modal';

type EntryProps = {
  name? : string,
  url? : string
}



const LandingRoute = () => {
  const {user, logout} = useContext(AuthContext)
  const navigate = useNavigate();

  const handlNav = (id: number) => {
    // to navigate, uncomment the navigate and provide a path defined in config/path.ts
    switch(id){
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
    }
  };
  const handleLogout = () => {
    logout();
  }
  return (
    user==null?
    <>
      <div className="flex-col h-screen bg-white justify-center">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h4 className='text-black font-bold text-3xl lg:text-6xl p-2'>Hi!</h4>
          <p className='text-black font-bold text-xl lg:text-3xl p-1'>Welcome to coSzop, a place where other people remember what you forgot!</p>
          <div className='flex'>
            <p className='text-black font-bold text-xl lg:text-3xl p-1'>In orderd to use the service please, </p>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>{handlNav(2)}}>Log in</button>
          </div>
        </div>
        <div className='flex justify-around'>
        </div> 
      </div>
    </>
    :
    <>
    <div className="flex-col h-screen bg-white">
      <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h4 className='text-black font-bold text-3xl lg:text-6xl'>Hello {user.nickname}!</h4>
      </div>
      <div className='flex justify-around h-100 w-[100%]'>
      <div className='flex-col w-[80%]'>
          <p className='text-black font-bold text-xl lg:text-3xl mx-4'>What would you like to do?</p>
          <div className='flex h-[100%]'>
            <button onClick={()=>{handlNav(3)}} className='text-xl w-[50%] h-[50%] font-bold rounded-md bg-blue-500 hover:bg-blue-700 my-2 mx-2 text-white'>I forgot to buy something</button>
            <button onClick={()=>{handlNav(4)}} className='text-xl w-[50%] h-[50%] font-bold rounded-md bg-blue-500 hover:bg-blue-700 my-2 mx-2 text-white' >I am at the shop</button>
          </div>
        </div>
      </div>
      
    </div>
  </>
  );
};
export default LandingRoute;
