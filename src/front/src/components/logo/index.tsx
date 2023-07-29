import styles from './styles.module.scss'

export default function Logo({texto="NuvSynth", tamanho=2.1}: {texto?: string, tamanho?: number}) {

    return (
        <h1 
            className={styles.logo}
            style={{fontSize: `${tamanho}rem`}}
        >
            {texto}</h1>
    )



}