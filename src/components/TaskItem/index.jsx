import React from 'react';
import styles from './style.module.scss';
import { Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { deleteTask, fetchTasks} from '../../api/API';
import { TasksState, ModalState } from '../../storage';
import { useRecoilState } from 'recoil';

const TaskItem = ({ data, onToggle }) => {
    
    const [tasks, setTasks] = useRecoilState(TasksState);
    const [modalState, setModalState] = useRecoilState(ModalState);

    const deleteItem = async (id) => {
        await deleteTask(id);
        await fetchTasks().then(d => setTasks(d));
    };

    const editTask = () => {
        setModalState({
            title: 'EDIT TASK',
            purpose: 'edit',
            placeholder: 'Input your changes...',
            id: data.id,
            value: data.task,
            isOpened: true
        })
    }

    return (
        <motion.div 
            className={styles.container}
            layout
            initial={{ opacity: 0.5, scale: 0}}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x:  200 }}
            transition={{ duration: 0.3 }}
        >
            <label className={styles.main}>
                <input 
                    type='checkbox' 
                    className={styles.checkbox} 
                    checked={data.completed} 
                    onChange={() => onToggle(data.id)}
                />
                <span className={styles.checkmark} />
                <motion.p 
                    key={data.task}
                    className={styles.note}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7}}
                    transition={{ duration: 0.3 }}
                >
                    {data.task.length > 45 ? data.task.slice(0, 45) + ' ...' : data.task}
                </motion.p>
            </label>
            <div className={styles.icons}>
                <Edit onClick={editTask}/>
                <Trash onClick={() => deleteItem(data.id)}/>
            </div>
        </motion.div>
    );
};

export default React.memo(TaskItem);