import {Dispatch, SetStateAction} from "react";
import {ISong} from "../../interfaces/globalInterfaces";

export interface GlobalAppState {
    isLoading: boolean
    songs: ISong[]
    activeSong: ISong | null;
    topTrackSongs: boolean;
    searchText: string;
}

export interface IAppContextValue {
    globalAppState: GlobalAppState;
    setGlobalAppState: Dispatch<SetStateAction<GlobalAppState>>;
    handleIsLoading: (loading: boolean) => void;
    handleActiveSong: (song: ISong) => void;
    handleTopTrackSongs: (topTrackSongs: boolean) => void;
    handleSearch: (searchText: string) => void
}
