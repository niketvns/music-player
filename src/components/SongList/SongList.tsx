import { FC, ReactElement } from "react";
import { useAppContext } from "../../contexts";
import { COVER_IMAGE, formatDuration } from "../../utils";
import styles from "./SongList.module.css";

const SongList: FC = (): ReactElement => {
  const { globalAppState, handleActiveSong } = useAppContext();

  const isActiveSong = (songId: number): boolean => {
    return globalAppState?.activeSong?.id === songId;
  };

  let allSongs = globalAppState?.topTrackSongs
    ? globalAppState?.songs?.filter((song) => song.top_track)
    : globalAppState?.songs;

  allSongs = allSongs?.filter((song) =>
    song.name.toLowerCase().includes(globalAppState?.searchText.toLowerCase())
  );

  return (
    <div className={styles.songs}>
      {allSongs?.map((songInfo) => {
        return (
          <button
            key={songInfo.id}
            className={`${styles.songItem} ${
              isActiveSong(songInfo.id) ? styles.activeSong : null
            }`}
            onClick={() => handleActiveSong(songInfo)}
          >
            <div className={styles.details}>
              <img
                src={`${COVER_IMAGE}/${songInfo.cover}`}
                alt="cover"
                className={styles.coverImage}
              />
              <div className="detals">
                <h3>{songInfo.name}</h3>
                <p>{songInfo.artist}</p>
              </div>
            </div>
            <div>{formatDuration(songInfo?.duration ?? 0)}</div>
          </button>
        );
      })}
    </div>
  );
};

export { SongList };
