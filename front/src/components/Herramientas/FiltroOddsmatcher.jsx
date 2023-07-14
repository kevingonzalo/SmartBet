import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
export default function FiltroOddsmatcher({ label, options, selectedOptions, onChange }) {
  return (
    <div>
      <label>{label}:</label>
      <Dropdown>
        <Dropdown.Toggle className="btn" id={`dropdown-${label.toLowerCase()}`}>
          Seleccionar
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <ButtonGroup vertical>
            <Button variant="outline-primary" onClick={() => onChange("SeleccionarTodo")}>
              Seleccionar todo
            </Button>
            {options.map((option) => (
              <Button key={option} variant="outline-primary" onClick={() => onChange(option)}>
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
