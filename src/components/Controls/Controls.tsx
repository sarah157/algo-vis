import { Close, Settings } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useClickOutside, useWindowSize } from "../../helpers";
import "./Controls.scss";

export type ControlElement = {
  element: JSX.Element;
  disabled?: boolean;
};

type ControlsProps = {
  disabled: boolean;
  elements: ControlElement[];
}

const Controls = ({ disabled, elements }: ControlsProps) => {
  const [show, setShow] = useState(false);
  const { width } = useWindowSize();
  const [isMediumMax, setIsMediumMax] = useState(false);

  const containerRef = React.useRef(null);
  useClickOutside(containerRef, () => setShow(false));
  
  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    if (isMediumMax && disabled) {
      setShow(false);
    }
  }, [isMediumMax, disabled]);

  useEffect(() => {
    if (width < 768) {
      setIsMediumMax(true);
    } else {
      setShow(true);
      setIsMediumMax(false);
    }
  }, [width]);

  return (
    <div ref={isMediumMax ? containerRef : null} className={`controls-container${!show ? " closed" : ""}`}>
      {isMediumMax && (
        <button className="controls__toggle" onClick={toggleShow} data-testid="controls-toggle">
          {show ? <Close  /> : "Settings" }
        </button>
      )}
    {show &&  <div className={`controls`} data-testid="controls">
        {elements.map((el, i) => (
          <div
          key={i}
            className={
              disabled && el.disabled
                ? "controls__item disabled"
                : "controls__item"
            }
          >
            {el.element}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Controls;
