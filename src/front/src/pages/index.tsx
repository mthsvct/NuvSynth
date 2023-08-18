import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Cabecalho } from '@/components/cabecalho'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Inicio from './home'
import Logo from '@/components/logo'
import { useState } from 'react'
import Provedores from './provedores'
import Classes from './classes'
import Gerar from './gerar'
import { PrvsProps } from './gerar'
import Download from './download'

import { toast } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

function Titulo({op}: {op: number}){ 
	return ["NuvSynth", "Provedores", "Classes", "Gerar", "Download"][op] 
}


export default function Home() {

	const [nome, setNome] = useState('');
	const [op, setOp] = useState(0);
	const [qntPrvs, setQntPrvs] = useState(1);
	const [classes, setClasses] = useState([]);
	const [ind, setInd] = useState(-1);
	const [prvs, setPrvs] = useState<PrvsProps>(Object);

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

    const cpus = [
        'Intel Core 3', 
        'Intel Core 5', 
        'Intel Core 7', 
        'Intel Core 9', 
        'AMD Ryzen 5', 
        'AMD Ryzen 7', 
        'AMD Ryzen 9', 
        'Qualcomm Snapdragon', 
        'Apple A14 Bionic', 
        'Apple M1', 
        'AMD Threadripper',
        'IBM POWER9' 
    ]

    const rams: number[] = []
    for (let x = 1; x <= 9; x++) {
        rams.push(Math.pow(2, x));
    }

	


	return (
		<>
			<main>
                <Header op={op} setOp={setOp} />
				
				<div className={styles.conteudo}>
					<div className={styles.titulo}>
						<Logo texto={Titulo({op})} tamanho={3} />
					</div>
					
					<div className={styles.corpo}>
						{ 	op == 0 ? <Inicio nome={nome} setNome={setNome} op={op} setOp={setOp}/>
							: 
							op == 1 ? <Provedores qntPrvs={qntPrvs} setQntPrvs={setQntPrvs} op={op} setOp={setOp}/>
							: 
							op == 2 ? <Classes 
											op={op} 
											setOp={setOp}
											cls={cls}
											cpus={cpus}
											rams={rams}
											classes={classes}
											setClasses={setClasses}
											ind={ind}
											setInd={setInd}
											/>
							:
							op == 3 ? <Gerar 
											op={op}
											setOp={setOp}
											nome={nome}
											setNome={setNome}
											qntPrvs={qntPrvs}
											setQntPrvs={setQntPrvs}
											classes={classes}
											setClasses={setClasses}
											cls={cls}
											cpus={cpus}
											rams={rams}
											pvrs={prvs}
											setPrvs={setPrvs}
											/>
							:
							op == 4 ? <Download 
											op={op}
											setOp={setOp}
											nome={nome}
											setNome={setNome}
											qntPrvs={qntPrvs}
											setQntPrvs={setQntPrvs}
											classes={classes}
											setClasses={setClasses}
											cls={cls}
											cpus={cpus}
											rams={rams}
											pvrs={prvs}
											setPrvs={setPrvs}
											/>
							:
							<h1>Outros</h1>
						}	
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

