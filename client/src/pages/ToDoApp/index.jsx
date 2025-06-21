import { useEffect } from 'react';
import AddTask from '../../components/AddTask';
import Account from '../../ui/Account';
import Modal from '../../ui/Modal';
import TaskContainer from '../../ui/TaskContainer';
import TaskToolbar from '../../ui/TaskToolbar';
import styles from './style.module.scss';
import useAuth from '../../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { UserDataState } from '../../storage';

const ToDoApp = () => {

    const setData = useSetRecoilState(UserDataState);

    const { me } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await me();
            setData(response.data);
        })()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TODO LIST</h1>
            <TaskToolbar />
            <TaskContainer />
            <AddTask />
            <Modal />
            <Account />
        </div>

    );
};

export default ToDoApp;