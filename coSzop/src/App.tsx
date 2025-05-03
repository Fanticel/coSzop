import { AppProvider } from './provider'
import { useContext } from "react";
import { AppRouter } from './router'
import Navbar from './components/ui/navbar/Navbar.tsx'
import { AuthProvider } from './paths/authcontext.tsx'
import { AuthContext } from './paths/authcontext.tsx';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <AuthProvider>
      <AppProvider>
        <Navbar links={user!=null?[{text:"dd", href:"dd"}, {text:"dd", href:"dd"}]:[]}/>
        <AppRouter/>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
