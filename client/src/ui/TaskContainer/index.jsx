import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css';
import './scrollbar.css';
import styles from './style.module.scss';
import TaskItem from '../../components/TaskItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {  TasksState, FilteredTasksSelector, SearchTerm } from '../../storage';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Empty from '../../components/Empty';
import Spinner from '../../components/Spinner';
import useTodo from '../../hooks/useTodos';


const TaskContainer = () => {

    const setTasks = useSetRecoilState(TasksState);
    const searchTerm = useRecoilValue(SearchTerm);
    const filteredTasks = useRecoilValue(FilteredTasksSelector);
    const [isLoaded, setIsLoaded] = useState(false);

    const { getTodos } = useTodo();

    useEffect(() => {
        getTodos().then(data => setTasks(data.data)).finally(() => setIsLoaded(true));
    }, []);

  
    const filteredBySearch = filteredTasks.filter(t => t.task.toLowerCase().includes(searchTerm.toLowerCase()));

    const pendingTasks = filteredBySearch.map(task => 
        <TaskItem key={task._id} data={task}/>
    );

    return (
        <SimpleBar data-simplebar className={styles.container}>
            <AnimatePresence>
                {
                    !isLoaded ?
                    <Spinner /> :
                    pendingTasks.length === 0 ?
                    <Empty /> :
                    pendingTasks
                }
            </AnimatePresence>
        </SimpleBar>
    );
};

export default TaskContainer;