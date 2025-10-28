import css from './SearchBox.module.css';
interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      onChange={onChange}
      className={css.input}
      type='text'
      placeholder='Search notes'
    />
  );
};

export default SearchBox;
