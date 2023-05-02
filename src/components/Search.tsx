import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/router';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    
    const router = useRouter();
    
    const _keyDown = (e: string) => {
        if (e === "Enter") {
            if (searchValue.length > 0) {
                router.push(`/blog/search/${searchValue}`);
            }
        }
    }

  return (
    <div className="search">
        <div className="search-box">
            <input type="text" name="search" id="search" placeholder='Search any topic..' onKeyDown={(e) => _keyDown(e.key)} onChange={(e) => setSearchValue(e.currentTarget.value)} />
        </div>
        <div className="search-button">
            <Link href={`/blog/search/${searchValue}`}>
                <HiMagnifyingGlass />
            </Link>
        </div>
    </div>
  )
}

export default Search