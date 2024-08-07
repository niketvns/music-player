import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../contexts";
import { CircleX, Ellipsis } from "lucide-react";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbPlayerPlayFilled,
} from "react-icons/tb";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaPause } from "react-icons/fa6";
import { IoVolumeMute } from "react-icons/io5";
import styles from "./MusicPlayer.module.css";
import { SongListContainer } from "..";
import { DEFAULT_BG_COLOR } from "../../utils";
import classNames from "classnames";

const Player = () => {
  const { globalAppState, handleActiveSong } = useAppContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [isSongList, setIsSongList] = useState(false);
  const currentIndex = globalAppState?.songs?.findIndex(
    (item) => globalAppState?.activeSong?.id === item.id
  );

  const bgColor: string =
    globalAppState?.activeSong?.accent ?? DEFAULT_BG_COLOR;

  const handlerPrevSong = () => {
    const previousIndex =
      (currentIndex - 1 + globalAppState?.songs?.length) %
      globalAppState?.songs?.length;
    handleActiveSong(globalAppState?.songs?.[previousIndex]);
  };
  const handlerNextSong = () => {
    const nextIndex = (currentIndex + 1) % globalAppState?.songs?.length;
    handleActiveSong(globalAppState?.songs?.[nextIndex]);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current?.currentTime;
    const duration = audioRef.current?.duration;
    setProgress((Number(currentTime) / Number(duration)) * 100);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const seekTime =
      (Number(e.target.value) / 100) * Number(audioRef?.current?.duration);
    if (audioRef.current) audioRef.current.currentTime = seekTime;
  };

  const playHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlerVolumeMute = () => {
    if (audioRef.current) {
      if (isMute) {
        audioRef.current.volume = 1;
      } else {
        audioRef.current.volume = 0;
      }
    }
    setIsMute(!isMute);
  };

  useEffect(() => {
    if (audioRef?.current) {
      setIsPlaying(!audioRef.current.paused);
    }
  }, [audioRef?.current?.paused]);

  return (
    <>
      <div className={styles.player}>
        <div className={styles.seekContainer}>
          <audio
            autoPlay
            ref={audioRef}
            src={globalAppState?.activeSong?.url}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
          <input
            type="range"
            className={styles.progressInput}
            value={progress}
            onChange={handleSeek}
            max="100"
            style={{
              backgroundImage: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
            }}
          />
        </div>
        <div className={styles.playerControls}>
          <button
            className={styles.threeDotContainer}
            onClick={() => setIsSongList(true)}
          >
            <Ellipsis className={styles.controlIcon} />
          </button>
          <div className={styles.mainControl}>
            <button className="" onClick={handlerPrevSong}>
              <TbPlayerTrackPrevFilled className={styles.controlIcon} />
            </button>
            {!isPlaying ? (
              <button
                className={styles.playPauseContainer}
                onClick={playHandler}
              >
                <TbPlayerPlayFilled className={styles.controlIcon} />
              </button>
            ) : (
              <button
                className={styles.playPauseContainer}
                onClick={playHandler}
              >
                <FaPause className={styles.controlIcon} />
              </button>
            )}
            <button className="" onClick={handlerNextSong}>
              <TbPlayerTrackNextFilled className={styles.controlIcon} />
            </button>
          </div>
          {!isMute ? (
            <button
              className={styles.volumeContainer}
              onClick={handlerVolumeMute}
            >
              <HiMiniSpeakerWave className={styles.controlIcon} />
            </button>
          ) : (
            <button
              className={styles.volumeContainer}
              onClick={handlerVolumeMute}
            >
              <IoVolumeMute className={styles.controlIcon} />
            </button>
          )}
        </div>
      </div>
      <div
        className={classNames(styles.smallScreenSongList, {
          [styles.activeList]: isSongList,
        })}
        style={{
          background: `linear-gradient(108deg, ${bgColor}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
        }}
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsSongList(false)}
        >
          <CircleX height={30} width={30} />
        </button>
        <SongListContainer />
      </div>
    </>
  );
};

export default Player;
