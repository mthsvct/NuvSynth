import {FaSpinner} from 'react-icons/fa';
import styles  from './styles.module.scss';

export default function Loading() {

    return (
        <div className={styles.caixa}>
            <FaSpinner className={styles.icone} />
        </div>
    )


}