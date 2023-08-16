import { GerarProps } from "../gerar";
import Head from 'next/head';
import styles from "./Download.module.scss"

import { GetServerSideProps, NextPage } from 'next';
import fs from 'fs';
import path from 'path';

import { BsDownload } from "react-icons/bs";
import { Button } from "@/components/button";

const DownloadPage: NextPage<{ data: any, nameFile:string }> = ({ data, nameFile }) => {
	const handleDownload = () => {
		const jsonData = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = nameFile;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className={styles.download} onClick={handleDownload}>
			<BsDownload />
			<h1>Download</h1>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const filePath = path.join(process.cwd(), 'data', 'data1.json');
	const jsonData = fs.readFileSync(filePath, 'utf-8');
	const data = JSON.parse(jsonData);

	return {
		props: {
		data,
		},
	};
};



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

				<div className={styles.completo}>
					<div className={styles.ajuste}>
						<span>Download de todos os dados gerados:</span>
						<DownloadPage data={pvrs} nameFile={`${nome.replace(" ", "_")}.json`} />
					</div>
				</div>

				<div className={styles.titulozinho}>
					<span>Download de provedores separados:</span>
				</div>
				<div className={styles.separado}>

					{
						pvrs?.prvs?.map(
							(pvr, index) => {
								return (
									<div key={index} className={styles.pvr}>
										<div className={styles.infos}>
											<h1> {pvr.name.replace("_", " ")} </h1>
											<span>Qnt. de Serviços: {calculaQntSer(pvr)}</span>
											<span>Qnt. de Classes: {pvr.classes.length}</span>
										</div>
										<DownloadPage data={pvr} nameFile={`${nome.replace(" ", "_")}_${pvr.name}.json`} />
									</div>
								)
							}
								
						)
					}
				</div>

				<Button>Voltar</Button>

			</div>

			

		</>
	)
}