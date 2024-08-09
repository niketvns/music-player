import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GlobalAppState, IAppContextValue } from "./types";
import { ISong } from "../../interfaces/globalInterfaces";
import { SONGS_API } from "../../utils";

const initialState: GlobalAppState = {
  isLoading: false,
  error: false,
  songs: [],
  activeSong: null,
  topTrackSongs: false,
  searchText: "",
};

const AppContext = createContext<IAppContextValue>({} as IAppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [globalAppState, setGlobalAppState] =
    useState<GlobalAppState>(initialState);

  const handleIsLoading = useCallback(
    (loading: boolean) =>
      setGlobalAppState((prevState) => ({
        ...prevState,
        isLoading: loading,
      })),
    []
  );

  const handleActiveSong = useCallback((song: ISong) => {
    setGlobalAppState((prev) => ({ ...prev, activeSong: song }));
  }, []);

  const handleTopTrackSongs = useCallback((topTrackSongs: boolean) => {
    setGlobalAppState((prev) => ({ ...prev, topTrackSongs: topTrackSongs }));
  }, []);

  const handleSearch = useCallback((searchInput: string) => {
    setGlobalAppState((prev) => ({ ...prev, searchText: searchInput }));
  }, []);

  const getSongList = useCallback(async () => {
    try {
      setGlobalAppState((prev) => ({ ...prev, isLoading: true, error: false }));
      const apiResponse = await fetch(SONGS_API);
      const songs: { data: ISong[] } = await apiResponse.json();
      const songsWithDuration: ISong[] = await Promise.all(
        songs.data.map(async (song) => {
          const audio = new Audio(song.url);

          return new Promise((resolve) => {
            audio.addEventListener("loadedmetadata", () => {
              const duration = audio.duration;
              resolve({
                ...song,
                duration,
              });
            });
          });
        })
      );

      setGlobalAppState((prev) => ({
        ...prev,
        songs: songsWithDuration,
        activeSong: songsWithDuration[0],
      }));
    } catch (error) {
      setGlobalAppState((prev) => ({ ...prev, error: true }));
    } finally {
      setGlobalAppState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    getSongList();
  }, [getSongList]);

  const value: IAppContextValue = useMemo(() => {
    return {
      globalAppState,
      setGlobalAppState,
      handleIsLoading,
      handleActiveSong,
      handleTopTrackSongs,
      handleSearch,
      getSongList,
    };
  }, [
    globalAppState,
    handleIsLoading,
    handleActiveSong,
    handleTopTrackSongs,
    handleSearch,
    getSongList,
  ]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  return appContext;
};
