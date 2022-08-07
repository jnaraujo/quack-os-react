import { ReactElement, ReactNode, useState } from "react";
import { Container } from "./styles";
import { reversePolishNotation } from "./util";

const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick?: (value: string) => void;
  className?: string;
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) onClick(text);
      }}
      className={className}
    >
      {text}
    </button>
  );
};
function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");

  const handleNumber = (number: string) => {
    if (display.length > 10) return;

    if (display === "0" || display === "Error") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleClick = (value: string) => {
    if (isNumeric(value) || "*/-+".includes(value)) {
      return handleNumber(value);
    }
    if (value == ".") {
      if (display.endsWith(".")) return;
      return handleNumber(value);
    }
    if (value === "C") {
      return setDisplay("0");
    }
    if (value === "=") {
      let result = "";
      try {
        result = eval(display).toString();
      } catch (error) {
        result = "Error";
      }
      return setDisplay(result);
    }
    if (value == "<") {
      return setDisplay(display.slice(0, -1));
    }
  };

  return (
    <Container>
      <div className="display">
        <p>{display}</p>
      </div>
      <div className="buttons">
        <div className="row">
          <Button onClick={handleClick} text="C" />
          <Button onClick={handleClick} text="E" />
          <Button onClick={handleClick} text="<" />
          <Button onClick={handleClick} text="*" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="7" />
          <Button onClick={handleClick} text="8" />
          <Button onClick={handleClick} text="9" />
          <Button onClick={handleClick} text="/" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="4" />
          <Button onClick={handleClick} text="5" />
          <Button onClick={handleClick} text="6" />
          <Button onClick={handleClick} text="-" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="1" />
          <Button onClick={handleClick} text="2" />
          <Button onClick={handleClick} text="3" />
          <Button onClick={handleClick} text="+" />
        </div>
        <div className="row">
          <Button onClick={handleClick} text="0" />
          <Button onClick={handleClick} text="." />
          <Button onClick={handleClick} className="max" text="=" />
        </div>
      </div>
    </Container>
  );
}
