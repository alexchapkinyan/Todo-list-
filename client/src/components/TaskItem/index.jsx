import React from 'react';
import styles from './style.module.scss';
import { Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { TasksState, ModalState, FilteredTasksSelector } from '../../storage';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useTodo from '../../hooks/useTodos';

const TaskItem = ({ data }) => {
    
    const [tasks, setTasks] = useRecoilState(TasksState);
    const setModalState = useSetRecoilState(ModalState);
    const filteredTasks = useRecoilValue(FilteredTasksSelector);

    const { updateTodo, deleteTodo, getTodos } = useTodo();
    

    const onToggle = async (id) => {
        const task = filteredTasks.find(t => t._id === id);
        const isChecked = !task.completed;
        const body = { completed: isChecked };
        await updateTodo(id, body);
        const updatedTasks = tasks.map(t => 
            t._id === id ? { ...t, completed: isChecked } : t
        );
        setTasks(updatedTasks);
    }

    const deleteItem = async (id) => {
        await deleteTodo(id);
        await getTodos().then(d => setTasks(d.data));
    };


    const editTask = () => {
        setModalState({
            title: 'EDIT TASK',
            purpose: 'edit',
            placeholder: 'Input your changes...',
            id: data._id,
            value: data.task,
            isOpened: true
        });
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
                    onChange={() => onToggle(data._id)}
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
                    {
                        window.innerWidth > 480 ?
                        data.task.length > 45 ? 
                        data.task.slice(0, 45) + ' ...' : 
                        data.task : 
                        data.task.length > 30 ? 
                        data.task.slice(0, 30) + ' ...' : 
                        data.task
                        
                    }
                </motion.p>
            </label>
            <div className={styles.icons}>
                <Edit onClick={editTask}/>
                <Trash onClick={() => deleteItem(data._id)}/>
            </div>
        </motion.div>
    );
};

export default React.memo(TaskItem);