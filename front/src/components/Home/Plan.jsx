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
}) {
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
      <button>{textButton}</button>
    </li>
  );
}
