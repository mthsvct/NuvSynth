import Logo from '../logo'
import styles from './styles.module.scss'

export function Header({ indice } : any){
    const lista = ["Home", "Provedores", "Classes", "Gerar", "Download"]


    return (
        <header className={styles.Header}>

            <div className={styles.conteudo}>
            
            <div className={styles.logo}>
                <Logo />
            </div>
            <nav>
                <ul>
                    {
                        lista.map(
                            (item, index) => (
                                <a 
                                    key={index}
                                    href={
                                        index === 0 ? 
                                            "/"
                                        :
                                            `${item.toLowerCase()}/`
                                    } 
                                    className={
                                        index === indice ? 
                                            styles.activate 
                                        : 
                                            styles.normal
                                    }>
                                    <>{item}</>
                                </a>
                            )
                        )
                    }
                </ul>
            </nav>
            
            </div>
        </header>
    )
}


