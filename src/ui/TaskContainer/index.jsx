import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css';
import './scrollbar.css';
import styles from './style.module.scss';
import TaskItem from '../../components/TaskItem';
import { useRecoilValue, useRecoilState } from 'recoil';
import {  TasksInView, TasksState, FilteredTasksSelector, SearchTerm } from '../../storage';
import { useEffect } from 'react';
import { fetchTasks, patchTask } from '../../api/API';
import { AnimatePresence } from 'framer-motion';


const TaskContainer = () => {


    const [tasksVariant] = useRecoilState(TasksInView);
    const [tasks, setTasks] = useRecoilState(TasksState);
    const [searchTerm, setSearchTerm] = useRecoilState(SearchTerm);
    const filteredTasks = useRecoilValue(FilteredTasksSelector);


    useEffect(() => {
        fetchTasks().then(data => setTasks(data));
    }, []);

    const onToggle = async (id) => {
        const task = filteredTasks.find(t => t.id === id);
        const isChecked = !task.completed;
        const body = { completed: isChecked};
        await patchTask(id, body);
        const updatedTasks = filteredTasks.map(t => 
            t.id === id ? { ...t, completed: isChecked } : t
        );
        setTasks(updatedTasks);
    }

    const filteredBySearch = filteredTasks.filter(t => t.task.toLowerCase().includes(searchTerm))
    console.log(searchTerm)
    const pendingTasks = filteredBySearch?.map(task => 
        <TaskItem key={task.id} data={task} onToggle={onToggle}/>
    )

    return (
        <SimpleBar data-simplebar className={styles.container}>
            <AnimatePresence>
                {pendingTasks}
            </AnimatePresence>
        </SimpleBar>
    );
};

export default TaskContainer;