import "./Herramientas.css";
const Perfil = ({ user }) => {
  return (
    <div className="perfil">
      {user ? (
        <div>
          <h2>Perfil de Usuario</h2>
          <p>Nombre: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Mostrar otros datos del usuario */}
        </div>
      ) : (
        <p>No estas registrado...</p>
      )}
    </div>
  );
};

export default Perfil;
