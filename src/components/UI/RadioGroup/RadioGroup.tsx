import React from "react";
import { Option } from "../Dropdown/Dropdown";
import "./RadioGroup.scss";

type RadioGroupProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: Option;
  options: Option[];
  selectedValue: string;
};

const RadioGroup = ({
  onChange,
  name,
  options,
  selectedValue,
}: RadioGroupProps) => {
  return (
    <fieldset
      className="fieldset-radio-group"
      aria-labelledby={name.value}
      id={name.value}
      >
      <legend>{name.label}</legend>
      {options.map((option) => (
          <label key={option.value}>
          <input
            type="radio"
            onChange={onChange}
            name={name.value}
            value={option.value}
            className="radio"
            checked={option.value === selectedValue}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
