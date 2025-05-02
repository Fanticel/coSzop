import { Path, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext, User } from './authcontext';



const RegisterRoute = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [nickname, setNickname] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const {user , register} = useContext(AuthContext)    
    const navigate = useNavigate();

    const handlNav = (id: number) => {
    // to navigate, uncomment the navigate and provide a path defined in config/path.ts
        switch(id){
        case 1:
            navigate(paths.home.getHref());
            break;
        case 2:
            navigate(paths.login.getHref());
            break;
        }
      };
    const handleRegister = () => {
        if (email==""){
            setError("You need to provide an email address");
            return;
        }
        if(password==""){
            setError("You need to provide a password");
            return;
        }
        if(nickname==""){
          setError("You need to provide a nickname");
          return;
        }
        if(phoneNumber==""){
          setError("You need to provide a phone number");
          return;
        }
        if(address==""){
          setError("You need to provide an address");
          return;
        }
        register(Number(phoneNumber), nickname, email, password, address);
        setError("");
        setEmail("");
        setPassword("");
        setNickname("");
        setPhoneNumber("");
    }
    useEffect(()=>{
        if (user!=null){handlNav(1)}
    }, [user])
    return (
    <>
      <div className="flex-col h-screen bg-white justify-center items-center">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h1 className='text-black font-bold text-3xl lg:text-6xl'>Register</h1>
        </div>
        <div className='mx-5 px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-green-200 bg-opacity-20 rounded-md h-[50%]'>
        <div className='flex-col px-3'>
                <p className='px-4 text-xl py-2'>nickname:</p>
                <p className='px-4 text-xl py-2'>email:</p>
                <p className='px-4 text-xl py-2'>phone number:</p>
                <p className='px-4 text-xl py-2'>password:</p>
                <p className='px-4 text-xl py-2'>address:</p>
            </div>
            <div className='flex-col px-3'>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={nickname} onChange={(e) => setNickname(e.target.value)} className='rounded-md bg-green-500 my-2'></input><br/> 
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-500 my-2'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="number"value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='rounded-md bg-green-500 my-2'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-500 my-2'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={address} onChange={(e) => setAddress(e.target.value)} className='rounded-md bg-green-500 my-2'></input>
            </div>
            <button onClick={()=>{handleRegister()}} className='w-20 h-10 bg-red-500 rounded-md'>Register</button>
        </div>
        {error!=""?<div className='px-5'><p className='text-2xl text-red-700'>{error}</p></div>:<></>}
        <div className='px-5 py-4 flex'>
            <p className='text-xl text-cyan-500'>Already have an account?</p>
            <button onClick={()=>{handlNav(2)}} className='w-20 h-10 bg-red-500 rounded-md'>Log in</button>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};
export default RegisterRoute;
