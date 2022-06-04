import { useUserAuth } from '../contexts/AuthContext';
import NavBar from './NavBar';
import NavbarAfter from './NavbarAfter';

export default function Navbarcondition() {
  const { currentUser } = useUserAuth();
  return <header>{!currentUser ? <NavbarAfter /> : <NavBar />}</header>;
}
