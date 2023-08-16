import { GerarProps } from "../gerar";
import Head from 'next/head';
import styles from "./Download.module.scss"

import { GetServerSideProps, NextPage } from 'next';
import fs from 'fs';
import path from 'path';

const DownloadPage: NextPage<{ data: Record<string, any>, nameFile:string }> = ({ data, nameFile }) => {
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
			<h1>Download JSON Data</h1>
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

				{
					pvrs?.prvs?.map(
						(pvr, index) => {
							return (
								<div key={index} className={styles.pvr}>
									<div className={styles.infos}>
										<h1> {pvr.name} </h1>
										<h4>Qnt. de Serviços: {calculaQntSer(pvr)}</h4>
										<h4>Qnt. de Classes: {pvr.classes.length}</h4>
										{/* <div className={styles.classes}>
											{
												pvr.classes.map(
													(cls:any, index:number) => {
														return(
															<div  className={styles.classe}>
																<h5>{cls.categoria}</h5>
																<p></p>
															</div>
														)
													}
												)
											}
										</div> */}
									</div>
									<DownloadPage data={pvr} nameFile={`${pvr.name}.json`} />
								</div>
							)
						}
							
					)
				}

			</div>
		</>
	)
}