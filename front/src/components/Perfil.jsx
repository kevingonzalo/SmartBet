import { useAuth0 } from "@auth0/auth0-react";
import "./styles/perfil.css";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <main className="Perfil">
        <h1>Tu perfil</h1>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </main>
    )
  );
};

export default Profile;
