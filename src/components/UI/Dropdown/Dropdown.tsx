import React, { useState, useRef } from "react";
import { ChevronRightRounded } from "@mui/icons-material";
import { useClickOutside } from "../../../helpers";
import "./Dropdown.scss";

export type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  onSelect: (optionValue: string) => void;
  activeOptionValue: string;
  options: Option[];
  disabled?: boolean;
  label?: string;
  id?: string;
};

const Dropdown = ({
  onSelect,
  label,
  id,
  activeOptionValue,
  disabled,
  options,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelectOption = (e: any) => {
    setIsOpen(false);
    onSelect(e.target.value);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };
  const getSelectedOptionLabel = () => {
    const option =
      options.find((op) => op.value === activeOptionValue) || options[0];
    return option.label;
  };

  return (
    <div ref={dropdownRef} className="dropdown-container">
      {label && <label htmlFor={id}>{label}</label>}
      <button
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="dropdown__toggle"
        disabled={disabled}
        id={id}
      >
        <span>{getSelectedOptionLabel()}</span>
        <ChevronRightRounded
          className={`dropdown__chevron ${isOpen ? "up" : "down"}`}
        />
      </button>
      <div className={`${isOpen ? "dropdown" : "dropdown closed"}`}>
        {isOpen &&
          options.map((option) => (
            <button
              key={option.value}
              aria-selected={option.value === activeOptionValue}
              onMouseDown={handleSelectOption}
              className={
                option.value === activeOptionValue
                  ? "dropdown__item active"
                  : "dropdown__item"
              }
              role="option"
              value={option.value}
            >
              {option.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
