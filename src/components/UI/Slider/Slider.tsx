import "./Slider.scss";

interface SliderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max: number;
  min: number;
  name?: string;
  disabled?: boolean;
  label?: string;
  value?: number;
  step?: number;
  className?: string;
  id?: string;
}

const Slider = (props: SliderProps) => {
  const baseClassName = props.disabled ? "slider disabled " : "slider ";
  const { label, ...inputProps } = props;
  return (
    <div className="slider-container">
     {label && props.id && <label htmlFor={props.id}>{label}</label>}
      <input
        {...inputProps}
        type="range"
        className={props.className ? baseClassName + props.className : baseClassName}
      ></input>
    </div>
  );
};

export default Slider;
