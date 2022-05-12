import React from "react";
import "./Controls.scss";

export type ControlElement = {
    element: JSX.Element,
    disabled?: boolean;
}

interface ControlsProps {
  disabled: boolean;
  elements: ControlElement[];
}

const Controls: React.FC<ControlsProps> = ({ disabled, elements }) => {


const containerRef = React.useRef(null);
  return <div className="controls-container" ref={containerRef}>
      <div className="controls">
          {elements.map(el => (
            <div className={disabled && el.disabled ? "controls__item disable" : "controls__item"}>
                {el.element}
            </div>
          ))}
      </div>
  </div>;
};

export default Controls;
