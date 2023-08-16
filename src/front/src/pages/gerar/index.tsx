import { useEffect, useState } from 'react';
import { ClassesProps } from '../classes';
import Head from 'next/head';
import { api } from '@/service/api';
import Loading from '@/components/loading';
import styles from './Gerar.module.scss'
import { proximo } from '../home';

export interface PrvsProps {
    prvs: any[] | undefined;
}


export interface GerarProps {
    op: number;
    setOp: Function;
    nome: string;
    setNome: Function;
    qntPrvs: number;
    setQntPrvs: Function;
    classes: any[],
    setClasses: Function;
    cls: string[],
    cpus: string[],
    rams: number[],
    pvrs: PrvsProps | undefined,
    setPrvs: Function
}


export default function Gerar(
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
        
    const [loading, setLoading] = useState<boolean>(true)

    async function gerarPrvd() {
        api.post(
            "/gerar",
            {
                "name": "DataSet-0001",
                "qnts": {
                    "prvs": qntPrvs,
                    "clss": classes.length,
                    "srvs": classes[0].qntServs,
                },
                "classes": ajustaClasses(classes),
            }
        ).then(response => {
            // console.log(response.data);
            setPrvs(response.data);
            setLoading(false);

            // Aguarde 3 segundos
            setTimeout(() => { proximo(undefined, op, setOp) }, 3000);


        }
        ).catch(error => {
            console.log(error);
        });
    }


    function ajustaClasses(classes: any){
        let i;
        let novaClasse = [];
        let novo;
        for(i=0; i<classes.length; i++){
            novo = {
                "categoria": classes[i].id,
                "cpus": classes[i].cpus,
                "ram": classes[i].rams,
                "hd": {
                    "min": classes[i].hd.min, 
                    "max": classes[i].hd.max 
                },
                "disponibilidade": classes[i].disponibilidade,
                "tempoResposta": classes[i].tempoResposta,
                "custo": classes[i].custo,
            }
            novaClasse.push(novo);
        }
        return novaClasse;
    }


    useEffect(() => {
        gerarPrvd();
    }, [op]);


    console.log("loading: ", loading);
    console.log(pvrs);


    return (
        <>
            <Head> <title>Gerar</title> </Head>
            <div className={styles.conteudo}>

                {
                    loading == true ? (
                        <div className={styles.carregando}>
                            <h2>Gerando...</h2>
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <h2>
                                Provedores gerados, sendo direcionado em breve...
                            </h2>
                            {/* {
                                pvrs?.prvs?.map((prv, index) => {
                                    return (
                                        <div key={index} style={{marginBottom: "50px"}}>
                                            <p>Prvd: {prv.id}</p>
                                            <p>Name: {prv.name}</p>
                                            <p>{prv.classes[0].categoria}</p>
                                        </div>
                                    )
                                })
                            } */}
                        </>
                    )
                }


            </div>


        </>
        
    )

}