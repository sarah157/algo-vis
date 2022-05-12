import React, { useState, useRef, MouseEventHandler } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import {useClickOutside} from "../../../helpers"
import "./Dropdown.scss";

export type Option = {
  value: string,
  label: string
}

interface DropdownProps {
  onSelect: (optionValue: string) => void,
  activeOptionValue: string,
  options: Option[]
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, activeOptionValue, disabled, options}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null)
    useClickOutside(dropdownRef, () => setIsOpen(false))

    const handleSelectOption = (e: any) => {
        setIsOpen(false);
        onSelect(e.target.value)
      };
    
    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(prev => !prev);
      }
    }
    const getSelectedOptionLabel = () => {
      const option = options.find(op => op.value === activeOptionValue) || options[0];
      return option.label;
    }

    return ( 
        <div ref={dropdownRef} className="dropdown-container">
        <button
          aria-expanded={isOpen}
          onClick={handleToggle}
          className="dropdown__toggle"
          disabled={disabled}
          >
          <span>{getSelectedOptionLabel()}</span>
          <ChevronRightRounded  className={isOpen ? "dropdown__chevron up":  "dropdown__chevron down" }/>
        </button>
        <div className={`${isOpen? "dropdown" : "dropdown closed"}`}>
          {isOpen && options.map(option => (
            <button
            key={option.value}
            aria-selected={(option.value) === activeOptionValue}
            onClick={handleSelectOption}
            onBlur={()=>setIsOpen(false)}
            className={option.value === activeOptionValue ? "dropdown__item active" : "dropdown__item"}
            role="option"
            value={option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
     );
}
 
export default Dropdown;