import "./Main.scss";

interface MainProps {
  children: JSX.Element;
}

const Main: React.FC<MainProps> = (props) => {
  return <main className="main">{props.children}</main>;
};

export default Main;
