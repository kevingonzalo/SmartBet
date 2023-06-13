import { Link } from "react-router-dom";

export default function Box({ img, alt, titulo, link }) {
  return (
    <div className="box">
      <img src={img} alt={alt} />
      <h3>{titulo}</h3>
      <Link to={link}>Acceder</Link>
    </div>
  );
}
