import styles from './style.module.scss';
import { motion } from 'framer-motion';

const Empty = () => {
    return (
        <motion.div
            key='empty-state'
            className={styles.container}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.3 }}
        >
            <img src='/Assets/Images/empty.svg' alt='EMPTY' /> 
            <h3>No tasks yet</h3>
        </motion.div>
    );
};

export default Empty;