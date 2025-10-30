import css from './SearchBox.module.css';
interface SearchBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const SearchBox = ({ onChange, value }: SearchBoxProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={css.input}
      type='text'
      placeholder='Search notes'
    />
  );
};

export default SearchBox;
