import { Path, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext, User } from './authcontext';



const LoginRoute = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const {user, login} = useContext(AuthContext)    
    const navigate = useNavigate();

    const handlNav = (id: number) => {
    // to navigate, uncomment the navigate and provide a path defined in config/path.ts
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
      <div className="flex-col h-screen bg-white justify-center items-center">
        <div className="mx-5 max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h1 className='text-black font-bold text-3xl lg:text-6xl'>Login</h1>
        </div>
        <div className='mx-5 px-4 sm:px-6 lg:px-8 flex justify-center items-center bg-green-200 bg-opacity-20 rounded-md h-[50%]'>
        <div className='flex-col px-3'>
                <p className='px-4 text-xl py-2'>email:</p>
                <p className='px-4 text-xl'>password:</p>
            </div>
            <div className='flex-col px-3'>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-500 my-2'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleLogin():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-500 my-2'></input>
            </div>
            <button onClick={()=>{handleLogin()}} className='w-20 h-10 bg-red-500 rounded-md'>Login</button>
        </div>
        {error!=""?<div className='px-5'><p className='text-2xl text-red-700'>{error}</p></div>:<></>}
        <div className='px-5 py-4 flex'>
            <p className='text-xl text-cyan-500'>Don't have an account?</p>
            <button onClick={()=>{handlNav(2)}} className='w-20 h-10 bg-red-500 rounded-md'>Register</button>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};
export default LoginRoute;
