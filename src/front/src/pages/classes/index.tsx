import { Input } from "@/components/input";
import Head from "next/head";
import styles from "./Classes.module.scss"
import { CiSettings } from "react-icons/ci";
import { Button, ProxVoltar } from "@/components/button";


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

    const clsSel = []


    function addClasse(indice:number){

        // alert(clsSel.length);
        let novo = {
			"categoria": indice,
			"cpus": [8, 3, 7],
			"ram": [0,1,2,3],
			"hd": {
				"min": 66, 
				"max": 961
			},
			"disponibilidade": 35.36,
			"tempoResposta": 1.0,
			"custo": 679.14
		}


    }


    return (
        <>
            <Head><title>Classes</title></Head>
            <div className={styles.legenda}>
                <p>Selecione as classes de serviços dos provedores:</p>
            </div>
            <form className={styles.formulario}>

                <div className={styles.entrada}>
                    {
                        cls.map((classe, index) => {
                            return (
                                <div className={styles.check}>
                                    <Input className={styles.customize} type="checkbox" name={classe} id={classe} />
                                    <label htmlFor={classe}>{classe}</label>
                                    <div>
                                        <CiSettings  />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className={styles.botoes}><ProxVoltar op={op} setOp={setOp} /></div>
                

            </form>
        </>
    )
}