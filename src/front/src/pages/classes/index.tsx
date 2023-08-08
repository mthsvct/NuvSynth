import { Input } from "@/components/input";
import Head from "next/head";
import styles from "./Classes.module.scss"
import { CiSettings } from "react-icons/ci";
import { Button, ProxVoltar } from "@/components/button";


interface ClassesProps {
    op: number,
    setOp: Function,
    cls: string[],
    cpus: string[],
    rams: number[],
    classes: any[],
    setClasses: Function
}


export default function Classes({op, setOp, cls, cpus, rams, classes, setClasses}: ClassesProps){



    function addClasse(index: number){

        // console.log(cls[index]);

        let novo = {
			"categoria": cls[index],
			"cpus": cpus.map((_, index) => index),
			"rams": rams.map((_, index) => index),
			"hd": {
				"min": 1, 
				"max": 1000
			},
			"disponibilidade": 80.0,
			"tempoResposta": 1,
			"custo": 159.9
		}

        setClasses([...classes, novo]);

    }


    console.log(classes);

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
                                <div className={styles.check} key={index}>
                                    <Input onChange={() => addClasse(index)} className={styles.customize} type="checkbox" name={classe} id={classe} />
                                    <label htmlFor={classe}>{classe}</label>
                                    <div>
                                        <CiSettings  />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className={styles.botoes}>
                    <ProxVoltar op={op} setOp={setOp} />
                </div>
                

            </form>
        </>
    )
}