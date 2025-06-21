import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalState, TasksState } from '../../storage';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useTodo from '../../hooks/useTodos';

const Modal = () => {

    const [modalState, setModalState] = useRecoilState(ModalState);
    const setTasks = useSetRecoilState(TasksState);
    const [isEmpty, setIsEmpty] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { addTodo, getTodos, editTodo } = useTodo();

    const clearModal = () => {
        setInputValue('')
        setModalState({
            title: '',
            purpose: '',
            placeholder: '',
            id: '',
            value: '',
            isOpened: false
        });
    };

     useEffect(() => {
        const closeModal = (e) => {
            if(e.key === 'Escape') {
                clearModal();
            };
        };

        window.addEventListener('keydown', closeModal);

        return () => window.removeEventListener('keydown', closeModal)
    }, []);

    useEffect(() => {
        if(modalState.value) {
            setInputValue(modalState.value);
        };
    }, [modalState.value]);

    const editTask = async () => {
        const changedTask = inputValue;
        const body = { task: changedTask }
        if(changedTask) {
            await editTodo(modalState.id, body);
            await getTodos().then(data => setTasks(data.data));
            clearModal();
        };
    };

    const addNewTask =  async () => {
        if(inputValue) {
            const task = inputValue
            const body = { task: task }
            await addTodo(body);
            await getTodos().then(data => setTasks(data.data));
            clearModal();
        } else {
            setIsEmpty(true);
            setTimeout(() => {
                setIsEmpty(false)
            }, 400);
        };
    };

    return (
        <AnimatePresence>
            {
                modalState.isOpened &&
                <motion.div 
                    className={styles.container}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div 
                        className={styles.modal}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.4, type: 'spring', damping: 20 }}
                    >
                        <h2>{modalState.title}</h2>
                        <motion.input 
                            type='text' 
                            placeholder={modalState.placeholder ?? ''} 
                            value={inputValue}
                            className={styles.input} 
                            onChange={(e) => setInputValue(e.target.value)}
                            animate={ isEmpty ? { x: [-5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        />
                        <button className={styles.cancel} onClick={clearModal}>CANCEL</button>
                        <button     
                            className={styles.apply}
                            onClick={() => {
                                if(modalState.purpose === 'edit') {
                                    editTask();
                                } else if(modalState.purpose === 'add') {
                                    addNewTask();
                                }
                            }}
                        >{modalState.purpose === 'edit' ? 'SAVE' : modalState.purpose === 'add' ? 'ADD' : null}</button>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default Modal;