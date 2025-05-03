import { useNavigate } from 'react-router';
import { useState, useEffect, useContext } from "react";
import { paths } from '../config/path';
import { AuthContext } from './authcontext';
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

type Position = {
  latitude:number,
  longitude:number
}

const RegisterRoute = () => {
    const [position, setPosition] = useState<google.maps.LatLngLiteral|null>(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [nickname, setNickname] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const {user , register} = useContext(AuthContext)
    const navigate = useNavigate();
    const myLatlng = { lat: 55.854, lng: 9.850 };
    

    const handleMapClick = async (event: Position) => {
      const lat = event.latitude;
      const lng = event.longitude;
      setPosition({lat, lng});
      const geocoder = new window.google.maps.Geocoder();
  
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results![0] !=null) {
          setAddress(results![0].formatted_address);
        } else {
          setAddress("No address found");
        }
      });
    }

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

    function handleAllTheDamnChecks(){
      if (email==""){
        setError("You need to provide an email address");
        return false;
      }
      if (!email.includes('@') || !email.includes('.')){
        setError("You need to provide an email address in the following format [something]@[something].[something]");
        return false;
      }
      if(password==""){
        setError("You need to provide a password");
        return false;
      }
      if (password.length < 8 || password.length > 30){
        setError("Your password needs to be at least 8 characters long and at max 30")
        return false;
      }
      if(nickname==""){
        setError("You need to provide a nickname");
        return false;
      }
      if (nickname.length < 5 || nickname.length > 20){
        setError("Your nickname needs to be at least 5 characters long and at max 20")
        return false;
      }
      if(phoneNumber==""){
        setError("You need to provide a phone number");
        return false;
      }
      if(position == null){
        setError("You need to select a position for your neigbourhood");
        return false;
      }
      return true;
    }
    
    const handleRegister = () => {
        if (!handleAllTheDamnChecks()) {return;}
        register(phoneNumber, nickname, email, password, {address, latitude: position!.lat, longitude:position!.lng});
        setError("");
        setEmail("");
        setPassword("");
        setNickname("");
        setPhoneNumber("");
    }
    useEffect(()=>{
        if (user!=null){handlNav(1)}
    }, [user])
    // bg-green-200 bg-opacity-20 rounded-md h-[50%]
    return (
    <>
      <div className="flex-col h-screen bg-white justify-center items-center">
        <div className="mx-5 w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 flex items-center justify-center">
        <div className='px-5 py-4 flex items-center justify-center absolute top-20 right-5'>
            <p className='text-lg text-cyan-500 mr-3'>Already have an account?</p>
            <button onClick={()=>{handlNav(2)}} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Log in</button>
        </div>
        
        </div>
        <div className='bg-green-200 bg-opacity-20 h-[75%] flex-col pt-5'>
        <h1 className='text-black font-bold text-3xl lg:text-6xl text-center mb-5'>Register</h1>
        <div className="flex justify-center items-center">
        <span className='w-1/3 h-0.5 bg-white mb-5'></span>
        </div>

          <div className='mx-5 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center'>

          <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="nickname">
                        Nickname:
                    </label>
                    <input id='nickname' onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={nickname} onChange={(e) => setNickname(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
          </div>
          <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="email">
                        Email:
                    </label>
                    <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
          </div>
          <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="phone">
                    Phone number:
                    </label>
                    <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="number"value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
          </div>
          <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                    Password:
                    </label>
                    <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
          </div>
          <label className='block text-gray-700 text-sm font-bold text-center mb-2'>{position!=null?"Address: "+address:'Address: '}</label>

            {/*<div className='flex-col px-3'>
                <p className='px-4 text-xl py-2'>Nickname:</p>
                <p className='px-4 text-xl py-2'>Email:</p>
                <p className='px-4 text-xl py-2'>Phone number:</p>
                <p className='px-4 text-xl py-2'>Password:</p>
            </div>
            <div className='flex-col px-3'>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={nickname} onChange={(e) => setNickname(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/> 
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="number"value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
                <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="password"value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md bg-green-50 my-2 inset-shadow-xs'></input><br/>
                {/* <input onKeyDown={(e)=>{e.key === "Enter"?handleRegister():''}} type="text"value={address} onChange={(e) => setAddress(e.target.value)} className='rounded-md bg-green-500 my-2'></input> *
            </div>*/}
           
        </div>
        {/* <div className='w-[100%] h-[200px] bg-green-500 my-2'></div> */}
        
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
          <Map
            onClick={ev => {
              if(ev.detail.latLng==null){return;}
              // getMap();
              handleMapClick({latitude: ev.detail.latLng.lat, longitude: ev.detail.latLng.lng});
            }}
            style={{width: '100%', height: '300px'}}
            defaultCenter={myLatlng}
            defaultZoom={14}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId="MY_MAP">
              {position!=null?<AdvancedMarker position={position}/>:''}
            </Map>
        </APIProvider>
        <div className='flex justify-center'>
        <button onClick={()=>{handleRegister()}} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-5 rounded focus:outline-none focus:shadow-outline'>Register</button>
        </div>
        </div>
        {error!=""?<div className='px-5'><p className='text-2xl text-red-700'>{error}</p></div>:<></>}
        <div>
        </div>
      </div>
    </>
  );
};
export default RegisterRoute;