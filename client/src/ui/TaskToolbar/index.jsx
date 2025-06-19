import { useRef, useState } from 'react';
import styles from './style.module.scss';
import { Search } from 'lucide-react';
import DropDown from '../../components/DropDown';
import { SearchTerm } from '../../storage';
import { useRecoilState } from 'recoil';

const TaskToolbar = () => {

    const [searchTerm, setSearchTerm] = useRecoilState(SearchTerm);

    const inputRef = useRef(null);    

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input 
                    type='text' 
                    placeholder='Search task here...' 
                    ref={inputRef}
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <div 
                    className={styles.searchIcon}
                    onClick={() => inputRef.current.focus()}
                >
                    <Search />
                </div>
            </div>
            <DropDown />
        </div>
    );
};

export default TaskToolbar;