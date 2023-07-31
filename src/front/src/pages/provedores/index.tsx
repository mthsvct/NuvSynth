import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Head from "next/head";
import { Input } from "@/components/input";
import styles from "./Provedor.module.scss"



export default function Provedores({qntPrvs, setQntPrvs}:{qntPrvs: number, setQntPrvs: Function}){
    return (
        <> 
            <Head>
                <title>Provedores</title>
            </Head>

            <form className={styles.formulario}>
                
                <label htmlFor="qntPrvs">
                    Primeiro, defina a quantidade de provedores a serem gerados no simulador:
                </label>

                <div className={styles.entrada}>
                    <input 
                        id="qntPrvs"
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={qntPrvs}
                        onChange={(e) => {
                            // console.log(e.target.value);
                            setQntPrvs(e.target.value);
                        }}
                        className={styles.deslize}
                    />

                    <h3>{qntPrvs}</h3>

                </div>

            </form>
        </>
    )
}