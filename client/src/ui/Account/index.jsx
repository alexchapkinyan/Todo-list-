import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { User } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { UserDataState } from '../../storage';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

const Account = () => {

    const userData = useRecoilValue(UserDataState);
    const [isOpened, setIsOpened] = useState(false);

    const contRef = useRef(null)

    const { logout, deleteAccount } = useAuth();

    const toggleDrop = () => {
        setIsOpened(prev => !prev)
    };

    useEffect(() => {
        const close = (e) => {
            if(!contRef.current.contains(e.target)) {
                setIsOpened(false);
            } ;
        };

        window.addEventListener('click', close);

        return () => window.removeEventListener('click', close)
    }, [])

    return (
        <div className={styles.container} ref={contRef}> 
            <div 
                className={styles.icon}
                onClick={toggleDrop}
            ><User /></div>
            <AnimatePresence>
                {
                    isOpened &&
                    <motion.div 
                        className={styles.dropdown}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>You: {userData.email}</p>
                        <p>ID: {userData.id}</p>
                        <button
                            onClick={logout}
                        >Log Out</button>
                        <button
                            onClick={() => deleteAccount(userData.id)}
                        >Delete Account</button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default Account;