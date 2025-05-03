import { AppProvider } from './provider'
import { useContext, useEffect, useState } from "react";
import { AppRouter } from './router'
import Navbar from './components/ui/navbar/Navbar.tsx'
import { AuthContext } from './paths/authcontext.tsx'
import { paths } from './config/path.ts';

function App() {
  const links = [
    {text: "Home", href:"/#/"},
    {text: "Make a request", href:"/#"+paths.app.createrequest.getHref()},
    {text: "See the list", href:"/#"+paths.app.requests.getHref()},
    {text: "Profile", href:"/#"+paths.app.profile.getHref()},
    {text: "My requests", href:"/#"+paths.app.myRequests.getHref()}
  ]
  const [logged, setLogged] = useState(false);
  const {user} = useContext(AuthContext)
  useEffect(()=>{
    if (user==null){return;}
    setLogged(true);
  },[user])
  return (
      <AppProvider>
        <Navbar links={logged?links:[]}/>
        <AppRouter/>
      </AppProvider>
  )
}

export default App
