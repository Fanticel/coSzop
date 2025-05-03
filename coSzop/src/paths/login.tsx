import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';



const LoginRoute = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const {user, login} = useContext(AuthContext)    
    const navigate = useNavigate();

    const handlNav = (id: number) => {
        switch(id){
        case 1:
            navigate(paths.home.getHref());
            break;
        case 2:
            navigate(paths.register.getHref());
            break;
        }
      };
    const handleLogin = () => {
        if (email==""){
            setError("You need to provide an email address");
            return;
        }
        if(password==""){
            setError("You need to provide a password")
            return;
        }
        setError("");
        login(email, password);
        setEmail("");
        setPassword("");
    }
    useEffect(()=>{
        if (user!=null){handlNav(1)}
    }, [user])
    return (
    <>
      <div className="flex flex-col h-screen w-full bg-white items-center">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className='px-5 py-4 flex items-center justify-center absolute top-20 right-5'>
            <p className='text-lg text-cyan-500 mr-3'>Don't have an account?</p>
            <button onClick={()=>{handlNav(2)}} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Register</button>
        </div>
            
        </div>
        <div className='mx-5 px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center bg-green-200 bg-opacity-20 h-[75%] shadow-md'>
        <h1 className='text-black font-bold text-3xl lg:text-6xl'>Login</h1>
        <span className='w-1/3 h-0.5 bg-white mt-10'></span>
        <div className='flex flex-col my-10'>

        <div>
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="nickname">
                        Nickname:
                    </label>
                    <input id='nickname' onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
          </div>
          <div>
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                    Password:
                    </label>
                    <input id='password' onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input>
          </div>

{/*
            <div className='flex-col px-3'>
                <p className='px-4 text-xl py-2'>Email:</p>
                <p className='px-4 text-xl'>Password:</p>
            </div>
            <div className='flex-col px-3'>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input>
            </div>
*/}

        </div>
            <button onClick={()=>{handleLogin()}} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
        </div>
        {error!=""?<div className='px-5'><p className='text-2xl text-red-700'>{error}</p></div>:<></>}
        
        <div>
        </div>
      </div>
    </>
  );
};
export default LoginRoute;
