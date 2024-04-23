import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface Props {
  value: string;
  onChange: () => void;
  handleSearch: () => void;
  onClearSerach: () => void;
}

const SearchBar = ({ value, onChange, handleSearch, onClearSerach }: Props) => {
  return (
    <div className="w-[10rem] md:w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        className="w-full text-sm font-medium py-[11px] bg-transparent outline-none"
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
      />

      {value && <IoMdClose onClick={onClearSerach} className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"/>}
      
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
