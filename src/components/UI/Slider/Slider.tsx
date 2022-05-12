import "./Slider.scss";

interface SliderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
  min?: number;
  name?: string;
  disabled?: boolean;
  ["aria-label"]?: string;
  value?: number;
  step?: number;
  className?: string;
}

const Slider: React.FC<SliderProps> = (props) => {
  const className = props.disabled ? "slider disabled " : "slider ";

  return (
    <input
      {...props}
      type="range"
      className={className + props.className}
    ></input>
  );
};

export default Slider;
