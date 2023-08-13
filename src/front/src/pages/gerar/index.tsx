
import { useEffect, useState } from 'react';
import { ClassesProps } from '../classes';
import Head from 'next/head';
import { api } from '@/service/api';

export default function Gerar({op, setOp, cls, cpus, rams, classes, setClasses, ind, setInd}: ClassesProps) {
        
    const [teste, setTeste] = useState<any>([])
    
    useEffect(() => {
        api.get('/classes').then(response => {
            setTeste(response.data)
        })
    }, []);

    console.log(teste);

    return (
        <>
            <Head>
                <title>Gerar</title>
            </Head>
            <h2>Hello World! {op}</h2>
        </>
        
    )

}