import { FC, ReactElement } from "react";
import { useAppContext } from "../../contexts";
import { COVER_IMAGE } from "../../utils";
import styles from "./MusicPlayer.module.css";
import Player from "./Player";
import { ISong } from "../../interfaces/globalInterfaces";

const MusicPlayer: FC = (): ReactElement | null => {
  const { globalAppState } = useAppContext();

  const activeSong: ISong | null = globalAppState.activeSong;

  if (!activeSong) return null;

  return (
    <div className={styles.musicPlayer}>
      <div>
        <h1>{activeSong.name}</h1>
        <p className={styles.artistName}>{activeSong.artist}</p>
      </div>
      <img
        src={`${COVER_IMAGE}/${activeSong.cover}`}
        alt="banner"
        className={styles.musicBanner}
      />
      <Player />
    </div>
  );
};

export { MusicPlayer };
