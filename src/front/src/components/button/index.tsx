import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode, // O QUE TEM DENTRO DO COMPONENTE POR EX: <Button>Nome do Butão</Button> o children é o "Nome do Butão"
}

export function Button({loading, children, ...rest}: ButtonProps){

    return (
        <button 
            className={styles.button}
            disabled={loading}
            {...rest}
            >
            { loading ? 
                (<FaSpinner color='#FFF' size={16} />) 
                :
                (<a className={styles.buttonText}>{children}</a>)
            }            
        </button>
    )
}

export function ProxVoltar({op, setOp}:{op: number, setOp: Function}){
    return (
        <div className={styles.botoes}>
            <Button onClick={() => {setOp(op - 1)}} > Voltar {'<'} </Button>
            <Button type="submit" > Próximo {'>'} </Button>
            {/*  */}
            {/* <Button onClick={() => {setOp(op + 1)}} > {'>'} Próximo </Button> */}
        </div>
    )
}


