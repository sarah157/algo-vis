import "./Main.scss";

type MainProps = {
  children: JSX.Element;
}

const Main = (props: MainProps) => {
  return <main className="main">{props.children}</main>;
};

export default Main;
