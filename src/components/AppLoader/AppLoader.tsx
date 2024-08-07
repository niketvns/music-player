import classNames from "classnames";
import { useAppContext } from "../../contexts";
import styles from "./AppLoader.module.css";
import { FC, ReactElement } from "react";

const AppLoader: FC = (): ReactElement | null => {
  const { globalAppState } = useAppContext();
  const isLoading: boolean = globalAppState?.isLoading;

  if (!isLoading) {
    return null;
  }
  return (
    <div className={styles.appLoader}>
      <span className={classNames(styles.circle1, styles.circle)}></span>
      <span className={classNames(styles.circle2, styles.circle)}></span>
      <span className={classNames(styles.circle3, styles.circle)}></span>
    </div>
  );
};

export { AppLoader };
