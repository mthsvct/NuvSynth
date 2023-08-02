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


const inter = Inter({ subsets: ['latin'] })

function Titulo({op}: {op: number}){ return ["NuvSynth", "Provedores", "Classes", "Gerar", "Download"][op] }


export default function Home() {

	const [nome, setNome] = useState('');
	const [op, setOp] = useState(0);
	const [qntPrvs, setQntPrvs] = useState(1);


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
							op == 2 ? <Classes op={op} setOp={setOp}/>
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

