import { FC, ReactElement, ReactNode } from "react";
import { useAppContext } from "../../contexts";
import styles from "./Error.module.css";

const ErrorProtector: FC<{
  children: ReactNode;
}> = ({ children }): ReactElement => {
  const { globalAppState, getSongList } = useAppContext();

  if (!globalAppState.error) return <>{children}</>;

  return (
    <div className={styles.errorContainer}>
      <h1>Something Went Wrong! Please Try Again</h1>
      <button onClick={getSongList}>Retry</button>
    </div>
  );
};

export { ErrorProtector };
