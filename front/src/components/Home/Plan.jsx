import { useNavigate } from "react-router-dom";
export default function Plan({
  titulo,
  precio,
  flechaarriba,
  flechaarribaText,
  sombrero,
  sombreroText,
  engranaje,
  engranajeText,
  comunidad,
  comunidadText,
  textButton,
  user,
}) {
  const navigate = useNavigate();
  const handleLinkPagar = () => {
    navigate("/pagar");
  };
  const handleLinkLogin = () => {
    navigate("/login");
  };
  return (
    <li className="plan">
      <h3>{titulo}</h3>
      <p className="precio-plan">
        <span>{precio}</span>/mes
      </p>
      <div className="caracteristicas-plan">
        <p>
          <img src={flechaarriba} alt="imagen svg plan de SmartBet" />
          <span>{flechaarribaText}</span>
        </p>
        <hr className="barra-espaciadora" />
        <p>
          <img src={sombrero} alt="imagen svg plan de SmartBet" />
          <span>{sombreroText}</span>
        </p>
        <hr className="barra-espaciadora" />
        <p>
          <img src={engranaje} alt="imagen svg plan de SmartBet" />
          <span>{engranajeText}</span>
        </p>
        <hr className="barra-espaciadora" />
        <p>
          <img src={comunidad} alt="imagen svg plan de SmartBet" />
          <span>{comunidadText}</span>
        </p>
      </div>

      {user ? <button>Plan Obtenido</button> : <button onClick={handleLinkLogin}>{textButton}</button>}
    </li>
  );
}
