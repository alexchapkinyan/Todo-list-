import styles from './style.module.scss';

const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <svg
                viewBox="0 0 50 50"
                className={styles.spinner}
            >
                <circle className={styles.circle} />
            </svg>
        </div>
    );
};

export default Spinner;