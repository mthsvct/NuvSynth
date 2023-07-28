import styles from './styles.module.scss'

export default function Logo({tamanho=2.1}) {

    return (
        <h1 
            className={styles.logo}
            style={{fontSize: `${tamanho}rem`}}
        >
            NuvSynth</h1>
    )



}