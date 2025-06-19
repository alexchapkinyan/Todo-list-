import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRecoilState } from 'recoil';
import {  TasksInView } from '../../storage';
import { AnimatePresence, motion } from 'framer-motion';

const DropDown = () => {

    const [tasksInView, setTasksInView] = useRecoilState(TasksInView);
    const [isOpened, setIsOpened] = useState(false);

    const mainRef = useRef(null);

    const toggleMenu = () => {
        setIsOpened(!isOpened);
    };

    useEffect(() => {
        const closeDropDown = (event) => {
            if(!mainRef.current.contains(event.target)) {
                setIsOpened(false);
            };
        };

        window.addEventListener('click', closeDropDown);

        return () => window.removeEventListener('click', closeDropDown);
    }, []);

    return (
        <div className={styles.container} ref={mainRef}>
            <button className={styles.dropBtn} onClick={toggleMenu} >{tasksInView}</button>
            <AnimatePresence>
                {
                    isOpened &&
                    <motion.ul 
                        className={styles.dropDownMain}
                        initial={{  opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2, type: 'spring', damping: 15 }}
                    >
                        <li onClick={() => setTasksInView('All')}>All</li>
                        <li onClick={() => setTasksInView('Completed')}>Completed</li>
                        <li onClick={() => setTasksInView('Incompleted')}>Incompleted</li>
                    </motion.ul>
                }
            </AnimatePresence>
            {
                isOpened ? 
                <ChevronUp className={styles.selectIcon} /> : 
                <ChevronDown className={styles.selectIcon} />
            }
        </div>
    );
};

export default DropDown;