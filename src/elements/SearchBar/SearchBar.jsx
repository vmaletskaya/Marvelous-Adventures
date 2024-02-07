import SearchIcon from '../../images/search.svg';
import css from './SearchBar.module.css'

const SearchBar = () => {
  return (
      <button className={css.searchBtn}>
      <img src={SearchIcon} alt="Icon"  className={css.searchIcon}/>
      <span className={css.searchText}>search</span>
    </button>
  );
};

export default SearchBar;
