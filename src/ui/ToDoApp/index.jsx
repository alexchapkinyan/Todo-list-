import AddTask from '../../components/AddTask';
import Modal from '../Modal';
import TaskContainer from '../TaskContainer';
import TaskToolbar from '../TaskToolbar';
import styles from './style.module.scss';

const ToDoApp = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TODO LIST</h1>
            <TaskToolbar />
            <TaskContainer />
            <AddTask />
            <Modal />
        </div>

    );
};

export default ToDoApp;