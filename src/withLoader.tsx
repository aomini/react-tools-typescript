import * as React from "react";

interface IProps {
  loading: boolean;
  [proName : string] : any;
}

const withLoader = <T extends {}>(
  Component: any
): React.FC<T & IProps> => ({ loading, ...props }: IProps) => {
  return loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <Component {...props} />
  );
}   

export default withLoader;
