import { GerarProps } from "../gerar";
import Head from 'next/head';
import styles from "./Download.module.scss"

export default function Download(
    {
        op,
        setOp,
        nome,
        setNome,
        qntPrvs,
        setQntPrvs,
        classes,
        setClasses,
        cls,
        cpus,
        rams,
        pvrs,
        setPrvs
    }: GerarProps
) {

    function calculaQntSer(pvr:any) {
        let qnt = 0;
        pvr.classes.forEach((cls:any) => {
            qnt += cls.servicos.length;
        })
        return qnt;
    }


    return (
        <>
            <Head>
                <title>
                    Download
                </title>
            </Head>

            <div className={styles.conteudo}>

                {
                    pvrs?.prvs?.map(
                        (pvr, index) => {
                            return (
                                <div key={index} className={styles.pvr}>
                                    <h1> {pvr.name} </h1>
                                    <h4>Qnt. de Serviços: {calculaQntSer(pvr)}</h4>
                                    <h4>Qnt. de Classes: {pvr.classes.length}</h4>
                                </div>
                            )
                        }
                            
                    )
                }

            </div>
        </>
    )
}