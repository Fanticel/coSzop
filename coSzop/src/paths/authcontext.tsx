import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

type Props = {
    children: ReactNode
}

type AuthServices = {
    user: User | null,
    login: (email:string, password:string)=>void,
    logout: ()=>void
    register: (phoneNumber:number, nickname:string, email:string, password:string, address:string)=>void
}

export type User = {
    nickname: string,
    email: string,
    id: number
}

export const AuthContext = createContext<AuthServices>({
    user: null,
    login: ()=>{},
    logout:()=>{},
    register: ()=>{}
});

export const AuthProvider = ({ children } : Props) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email : string, password : string) => {
    console.log("imagine a login with a " + email + ", " + password)
    // const res = await axios.post('https://coszop.electimore.xyz/api/auth/login', { email, password });
    // localStorage.setItem('token', res.data.token);
    // setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (phoneNumber:number, nickname:string, email:string, password:string, address:string) => {
    console.log("imagine a register with"+phoneNumber+nickname+email+password+address);
    // const res = await axios.post("", {phoneNumber, nickname, email, password});
    // localStorage.setItem('token', res.data.token);
    // setUser(res.data.user);
  }

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://coszop.electimore.xyz/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

