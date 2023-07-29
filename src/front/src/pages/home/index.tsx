import { Cabecalho } from "@/components/cabecalho"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import styles from "@/styles/Home.module.scss"
import Head from "next/head"
import sty2 from "./Inicio.module.scss"
import { Input } from "@/components/input"
import { useState } from "react"

import { BsDatabaseFillAdd } from "react-icons/bs"
import { Button } from "@/components/button"


function Topico(props: { titulo: string, conteudo: string }) {
	return (
		<div className={sty2.topico}>
			<h3>{props.titulo}</h3>
			<p>{props.conteudo}</p>
		</div>
	)
}


export default function Inicio({nome, setNome}:{nome:string, setNome:Function}) {



    return (
		<>
        <div className={sty2.topicos}>
			<Topico
				titulo="Conjunto de dados"
				conteudo="Conjunto de dados são coleções de dados que podem ser dos mais variados tipos como numéricos, textuais, imagens, sons, bivariados, multivariados, correlação e entre outros. Dados reais podem ser coletados a partir das mais diversas formas como formulários. Com os dados então coletados, é formado o conjunto."
				/>

			<Topico
				titulo="Dados sintéticos"
				conteudo="Dados sintéticos são conjunto de informações gerados artificialmente que possuem propriedades estatísticas semelhantes aos dados reais. Qualquer que seja a abordagem usada para criar conjuntos de dados sintéticos, o objetivo fundamental é manter sua utilidade garantindo o compromisso de evitar a divulgação da identidade de respondentes de dados originais onde aqueles dados sintéticos se baseiam."
				/>

			<Topico
				titulo="Serviços de nuvem"
				conteudo="Um serviço é uma coleção de sistemas, componentes e recursos de TI que trabalham juntos para fornecer valor aos usuários. Provedor é uma empresa contratada que fornece uma plataforma, infraestrutura, aplicativo ou serviços de diversos tipos baseados em nuvem. Serviços são fornecidos por provedores de nuvem e geralmente os critérios de escolha de um serviço por parte do cliente vem do preço e dos valores levantados e comprometidos no acordo de nível de serviço (i.e. SLA, do inglês Service Level Agreement). "
				/>
		</div>
		
		<form className={sty2.formulario}>

			<div className={sty2.infosEntrada}>
				<BsDatabaseFillAdd className={sty2.icon} />

				<div className={sty2.entrada}>
					<label htmlFor="name"><h4>Mas antes, dê um nome ao novo dataset:</h4></label>

					<Input
						id="name"
						type="text"
						placeholder="Nome do dataset"
						value={nome || ''}
						onChange={(e) => setNome(e.target.value)}
					/>
				</div>
			</div>

			<div className={sty2.botoes}>
				<Button type="submit" onClick={(e) => {
					e.preventDefault()
					console.log(nome)
				}}
				> {'>'} Próximo 
				</Button>

			</div>

		</form>

		</>
    )
}

// Função que redireciona o usuário para a página home
export async function getServerSideProps() {
	return {
		redirect: {
			destination: '/',
			permanent: false,
		},
	}
}



