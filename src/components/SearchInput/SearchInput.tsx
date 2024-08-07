import { SearchIcon } from "lucide-react";
import styles from "./SearchInput.module.css";
import { FC, ReactElement } from "react";
import { useAppContext } from "../../contexts";

const SearchInput: FC = (): ReactElement => {
  const { globalAppState, handleSearch } = useAppContext();

  return (
    <div className={styles.searchInputContainer}>
      <input
        type="search"
        placeholder="Search Song, Artist"
        className={styles.input}
        value={globalAppState?.searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon />
    </div>
  );
};

export { SearchInput };
