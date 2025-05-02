import { Path, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext, User } from './authcontext';
// import { Modal } from '@/components/private/modal';

type EntryProps = {
  name? : string,
  url? : string
}



const LandingRoute = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const handlNav = (id: number) => {
    // to navigate, uncomment the navigate and provide a path defined in config/path.ts
    switch(id){
      case 1:
        navigate(paths.register.getHref());
        break;
      case 2:
        navigate(paths.login.getHref())
    }
  };
  return (
    user!=null?
    <>
      <div className="flex-col h-screen bg-white">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h4 className='text-black font-bold text-3xl lg:text-6xl'>Hello!</h4>
          <p className='text-black font-bold text-xl lg:text-3xl'>How the fuck are you logged in right now?</p>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{handlNav(1)}}>Register</button>
        </div>
        <div className='flex justify-around'>
        </div> 
      </div>
    </>
    :
    <>
      <div className="flex-col h-screen bg-white justify-center">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h4 className='text-black font-bold text-3xl lg:text-6xl p-2'>Hi!</h4>
          <p className='text-black font-bold text-xl lg:text-3xl p-1'>Welcome to coSzop, a place where other people remember what you forgot!</p>
          <div className='flex'>
            <p className='text-black font-bold text-xl lg:text-3xl p-1'>In orderd to use the service please, </p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-2 w-40 h-[50%]' onClick={()=>{handlNav(2)}}>Log in</button>
          </div>
        </div>
        <div className='flex justify-around'>
        </div> 
      </div>
    </>
  );
};
export default LandingRoute;
