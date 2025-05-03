import { createContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

type Props = {
    children: ReactNode
}

type AuthServices = {
    user: User | null,
    login: (email:string, password:string)=>void,
    logout: ()=>void
    register: (phoneNumber:string, nickname:string, email:string, password:string, address:Address)=>void
}

type Token = {
  sub: number,
  email:string,
  phone_number:string,
  nickname:string
}

type Address = {
  address:string
  latitude:number,
  longitude:number
}

export type User = {
    nickname: string,
    email: string,
    id: number
    address: Address
    phone_number:string
}

export type MiniUser = {
  id: number,
  nickname: string,
  phone_number:string
}

export const AuthContext = createContext<AuthServices>({
    user: null,
    login: ()=>{},
    logout:()=>{},
    register: ()=>{}
});

export async function GetFullUser(id:number){
  let token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  if (token==null)return;
  const res = await axios.get('https://coszop.electimore.xyz/api/user/full/'+id, config)
  return res.data;
}

export async function GetMiniUser(id:number){
  const res = await axios.get('https://coszop.electimore.xyz/api/user/3'+id)
  return res.data;
}

export const AuthProvider = ({ children } : Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email : string, password : string) => {
    const res = await axios.post('https://coszop.electimore.xyz/api/auth/login', { email, password });
    localStorage.setItem('token', res.data);
    let userTemp:Token = jwtDecode(res.data)
    setUser(await GetFullUser(userTemp.sub));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (phoneNumber:string, nickname:string, email:string, password:string, address:Address) => {
    var res;
    try{
       res = await axios.post("https://coszop.electimore.xyz/api/auth/register", {phoneNumber, email, password, nickname, address});
    }catch(error){
      throw new Error("Something went wrong")
    }
    localStorage.setItem('token', res.data);
    let userTemp:Token = jwtDecode(res.data)
    setUser(await GetFullUser(userTemp.sub))
  }

  // Check if user is logged in on app load
  useEffect(() => {
    async function localGet(token:Token){
      let data = await GetFullUser(token.sub);
      setUser(data)
    }
    const token = localStorage.getItem('token');
    if (token) {
      let userTemp:Token = jwtDecode(token)
      localGet(userTemp)
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

