import classNames from "classnames";
import { useAppContext } from "../../contexts";
import { SearchInput, SongList } from "..";
import styles from "./SongListContainer.module.css";

const SongListContainer = () => {
  const { globalAppState, handleTopTrackSongs } = useAppContext();

  return (
    <div className={styles.songListContainer}>
      <div className={styles.menuContainer}>
        <button
          onClick={() => handleTopTrackSongs(false)}
          className={classNames({
            [styles.activeMenu]: !globalAppState?.topTrackSongs,
          })}
        >
          For You
        </button>
        <button
          onClick={() => handleTopTrackSongs(true)}
          className={classNames({
            [styles.activeMenu]: globalAppState?.topTrackSongs,
          })}
        >
          Top Picks
        </button>
      </div>
      <SearchInput />
      <SongList />
    </div>
  );
};

export { SongListContainer };
