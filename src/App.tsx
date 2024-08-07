import { ReactElement } from "react";
import "./App.css";
import { MusicPlayer, Sidebar, SongListContainer } from "./components";
import { useAppContext } from "./contexts";
import { DEFAULT_BG_COLOR } from "./utils";

function App(): ReactElement {
  const { globalAppState } = useAppContext();
  const bgColor: string =
    globalAppState?.activeSong?.accent ?? DEFAULT_BG_COLOR;

  return (
    <main
      className="app-container"
      style={{
        background: `linear-gradient(108deg, ${bgColor}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
      }}
    >
      <div className="sidebar-container">
        <Sidebar
          logo={{
            src: "/assets/logo.svg",
            alt: "logo",
          }}
          userProfile={{
            src: "/assets/user.png",
            alt: "profile",
          }}
        />
      </div>
      <div className="large-song-list">
        <SongListContainer />
      </div>
      <div className="music-player-container">
        <MusicPlayer />
      </div>
    </main>
  );
}

export default App;
