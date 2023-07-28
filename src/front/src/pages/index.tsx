import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Cabecalho } from '@/components/cabecalho'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Inicio from './home'
import Logo from '@/components/logo'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<main>
                <Header indice={0} />
				
				<div className={styles.conteudo}>
					<div className={styles.titulo}>
						<Logo />	
					</div>
					<div className={styles.corpo}>
						<Inicio />
					</div>
				</div>
            
			</main>
			<Footer />
		</>
	)
}

