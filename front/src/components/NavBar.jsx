import "./styles/navbar.css";

import NavBarNoSesion from "./NavBarNoSesion";
import NavBarSesion from "./NavBarSesion";
export default function NavBar({ user, URL }) {
  return user ? <NavBarSesion URL={URL} /> : <NavBarNoSesion />;
}
