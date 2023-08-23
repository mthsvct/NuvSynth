import { AiFillGithub } from "react-icons/ai";
import { BiSolidInfoCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import styles from './Footer.module.scss';
import Logo from "../logo";


export function Footer({ op, setOp } : { op: number, setOp: Function }){

    return (
        <footer className={styles.rodape}>

            <div className={styles.logo}><Logo tamanho={2.7} /></div>

            <div className={styles.icones}>
                <div className={styles.icone}>
                    <a href="https://github.com/mthsvct/NuvSynth" target="_blank">
                        <AiFillGithub />
                    </a>
                </div>
                
                <div className={styles.icone}>
                    <a href="sobre/">
                        <BiSolidInfoCircle />
                    </a>
                </div>                
                
                <div className={styles.icone}>
                    <a href="https://mail.google.com/" target="_blank">
                        <MdEmail />
                    </a>
                </div>                
            </div>
        </footer>
    )
}