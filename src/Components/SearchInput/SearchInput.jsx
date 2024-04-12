import './searchinput.scss'
import { useEffect, useState } from 'react';

export default function SearchInput({placeholder, func}) {
  
  return (
    <div className="searchInput">
      <span></span>
      <input type="text" placeholder={placeholder} value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
    </div>
  );
}
