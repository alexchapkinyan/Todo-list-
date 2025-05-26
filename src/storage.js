import { atom, selector } from "recoil";

export const TasksInView = atom({
    key: 'TasksInView',
    default: 'All'
});

export const TasksState = atom({
    key: 'TasksState',
    default: []
});

export const SearchTerm = atom({
    key: 'SearchTerm',
    default: ''
})

export const ModalState = atom({
    key: 'ModalState',
    default: {
        title: '',
        purpose: '',
        placeholder: '',
        id: '',
        isOpened: false
    }
});

export const FilteredTasksSelector = selector({
    key: 'FilteredTasksSelector',
    get: ({ get }) => {
        const filter = get(TasksInView);
        const tasks = get(TasksState);
        if(filter === 'Completed') return tasks.filter(t => t.completed);
        if(filter === 'Incompleted') return tasks.filter(t => !t.completed);
        return tasks
    }
})