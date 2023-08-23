import Logo from '../logo'
import styles from './styles.module.scss'

export function Header({ op, setOp } : { op: number | any, setOp: Function | any }){
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
                                    // href={
                                    //     index === 0 ? 
                                    //         "/"
                                    //     :
                                    //         `${item.toLowerCase()}/`
                                    // } 
                                    // onClick={() => {
                                    //     if (index != 3){
                                    //         setOp(index)
                                    //     }
                                    //     }}
                                    className={
                                        index === op ? 
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


