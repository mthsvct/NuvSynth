import { Input } from "@/components/input";
import Head from "next/head";
import styles from "./Classes.module.scss"
import { CiSettings } from "react-icons/ci";


export default function Classes({op, setOp}: {op: number, setOp: Function}){

    const cls = [
        'Computacao', 
        'Armazenamento',
        'Memoria', 
        'AI + Machine Learning',
        'Segurança', 
        'Análise de Dados e Estatíticas',
        'Internet das Coisas', 
        'Redes',
        'Big Data', 
        'Mídia'
    ]


    return (
        <>
            <Head><title>Classes</title></Head>
            <div className={styles.legenda}>
                <p>Selecione as classes de serviços dos provedores:</p>
            </div>
            <form className={styles.formulario}>
            
                {
                    cls.map((classe, index) => {
                        return (
                            <div className={styles.check}>
                                <Input className={styles.customize} type="checkbox" name={classe} id={classe} />
                                <label htmlFor={classe}>{classe}</label>
                                <CiSettings  />
                            </div>
                        )
                    })
                }



            </form>
        </>
    )
}