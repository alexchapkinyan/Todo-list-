import styles from './style.module.scss';
import { Plus } from 'lucide-react';
import { ModalState } from '../../storage';
import { useRecoilState } from 'recoil';

const AddTask = () => {

    const [modalState, setModalState] = useRecoilState(ModalState);

    const addTask = () => {
        setModalState({
            title: 'NEW TASK',
            purpose: 'add',
            placeholder: 'Input your task..',
            id: '',
            isOpened: true
        });
    }

    return (
        <div className={styles.container} onClick={addTask}>
            <Plus />
        </div>
    );
};

export default AddTask;