import React from "react";

interface IState {
  activeHeading: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialHeading?: boolean;
  heading: () => string | JSX.Element;
}

interface ITabsContext {
  activeHeading?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

interface ITab extends React.FC<{ children: React.ReactNode }> {
  Tab: React.FC<ITabProps>;
}

const TabContext = React.createContext<ITabsContext>({});

const Tab: React.FC<ITabProps> = props => {
  const { activeHeading, handleTabClick } = React.useContext(TabContext);
  const activeName = activeHeading
    ? activeHeading
    : props.initialHeading
    ? props.name
    : "";

  if(props.initialHeading && !activeHeading){
    handleTabClick && handleTabClick(props.name, props.children)
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    handleTabClick && handleTabClick(props.name, props.children);
  };

  return (
    <li
      onClick={handleClick}
      className={props.name === activeName ? "active" : ""}
    >
      {props.heading()}
    </li>
  );
};

const Tabs: ITab = props => {
  const { Provider } = TabContext;

  const [activeHeading, setActiveHeading] = React.useState<string>("");
  const [activeContent, setActiveContent] = React.useState<React.ReactNode>("");

  const handleTabClick = (heading: string, content: React.ReactNode) => {
    setActiveHeading(heading);
    setActiveContent(content);
  };
  return (
    <Provider value={{ activeHeading, handleTabClick }}>
      <ul className="tabs">{props.children}</ul>
      <div>{activeContent}</div>
    </Provider>
  );
};

Tabs.Tab = Tab;

export default Tabs;
