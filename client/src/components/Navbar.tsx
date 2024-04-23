import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import logo from '../assets/images/post-it.svg'

interface Props{
  userInfo?: object;
  onSearchNotes?: ()=> void;
  handleClearSerach?: ()=> void;
}

const Navbar = ({userInfo, onSearchNotes, handleClearSerach} : Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if(searchQuery){
      onSearchNotes(searchQuery);
    }
  };

  const onClearSerach = () => {
    setSearchQuery("");
    handleClearSerach();
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg">
      <div className="flex items-center justify-center"> 
      <img src={logo} alt="Logo" width={40} height={40}/><p className="hidden md:flex md:items-center font-semibold">Notes</p> 
      </div>
      
      <SearchBar
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSerach={onClearSerach}
      />
      {userInfo && <ProfileInfo userInfo={userInfo} />}
      
    </div>
  );
};

export default Navbar;
