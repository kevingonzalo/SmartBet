import "./Herramientas.css";
const Perfil = ({ user }) => {
  return (
    <div className="perfil">
      <div>
        <h2>Perfil de Usuario</h2>
        <p>Nombre: {user.username}</p>
        <p>Email: {user.email}</p>
        {/* Mostrar otros datos del usuario */}
      </div>
    </div>
  );
};

export default Perfil;
