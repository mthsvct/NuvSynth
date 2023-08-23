import { Header } from "@/components/header"
import Logo from "@/components/logo"
import Head from "next/head"

import styles from "./Sobre.module.scss"

import { AiFillHome } from "react-icons/ai"
import Link from "next/link"


export default function Sobre() {



    return (
        <>
            <Head><title>Sobre o Nuv!</title></Head>
            <div className={styles.conteudo}>
                <Logo />
                <h1>Um pouquinho sobre o Nuv!</h1>
                <div className={styles.texto}>

                    <p>Um dataset pode ser essencial para o sucesso do desenvolvimento de um software, especialmente na etapa de experimentos. No entanto, conseguir um conjunto de dados ideal em diversas áreas é uma tarefa complexa. Uma delas é a da computação em nuvem, que apesar estar atraindo empresas interessadas no desenvolvimento de novas tecnologias na área, ainda assim <mark> o número de conjunto de dados disponíveis no domínio da pesquisa é muito baixo e enfrentam problemas com a disponibilidade, falta de atualizações e o alto custo. </mark></p>

                    <p>Um provedor de nuvem é uma companhia de tecnologia da informação (TI) que fornece a seus clientes recursos de computação pela Internet e os entrega sob demanda. Provedores de nuvens tem visto a necessidade de ter constantes atualizações em seus serviços para tentar suprir as necessidades do número de clientes que aumenta a cada ano, de acordo com os relatórios de <a href="https://resources.flexera.com/web/media/documents/rightscale-2019-state-of-the-cloud-report-from-flexera.pdf" target="_blank"><b>Flexera</b></a>, estima-se que cerca de 94% das empresas utilizem pelo menos um serviço de provedor de nuvem. </p>

                    <p>A partir deste contexto, este trabalho tem como objetivo desenvolver um gerador de dados sintéticos que forneça dados que simulem dados de serviços de provedores de múltiplas nuvens baseada nas preferências do usuário, que será possível pela a extração de características levantadas em trabalhos voltados para geradores de dados sintéticos e também de serviços de provedores de nuvem</p>
                </div>

                <Link className={styles.home} href={`/`}>
                    <AiFillHome />
                    <h3>Voltar ao ínicio</h3>
                </Link>

            </div>
        </>
    )

}