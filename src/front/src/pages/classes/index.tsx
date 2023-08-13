import { Input } from "@/components/input";
import Head from "next/head";
import styles from "./Classes.module.scss"
import { CiSettings } from "react-icons/ci";
import { Button, ProxVoltar } from "@/components/button";
import { useState } from "react";
import { proximo } from "../home";
import cloneDeep from 'lodash/cloneDeep';

export interface ClassesProps {
    op: number,
    setOp: Function,
    cls: string[],
    cpus: string[],
    rams: number[],
    classes: any[],
    setClasses: Function,
    ind: number,
    setInd: Function
}


function SelecoesClasses({op, setOp, cls, cpus, rams, classes, setClasses, ind, setInd}: ClassesProps){

    function addClasse(index: number){

        let novo = {
            "id": index,
			"categoria": cls[index],
            "qntServs": 10,
			"cpus": cpus.map((_, index) => index),
			"rams": rams.map((_, index) => index),
			"hd": {
				"min": 1, 
				"max": 1000
			},
			"disponibilidade": 80.0,
			"tempoResposta": 1,
			"custo": 159.9,
        }

        setClasses([...classes, novo]);
    }

    console.log(classes);

    function gestao(index: number){

        const buscado = classes.find(classe => classe.id === index);
        const div = document.getElementsByClassName(styles.check)[index].getElementsByClassName(styles.settings)[0] as HTMLDivElement;

        

        if(buscado !== undefined){
            // Se já existe, remove
            setClasses(classes.filter(classe => classe.id !== index));
            div.style.display = "none";

        } else {
            // Se não existe, adiciona
            addClasse(index);
            div.style.display = "flex";
        }
    }

    function aparece(index: number){
        if(classes.find(classe => classe.id === index) !== undefined){
            return {
                display: "flex"
            }
        } else {
            return {
                display: "none"
            }
        }
    }


    return (
        <>
        <div className={styles.legenda}>
            <p>Selecione as classes de serviços dos provedores:</p>
        </div>

        <form onSubmit={(event) => {
            proximo(event, op, setOp)
        }} className={styles.formulario}>

            <div className={styles.entrada}>
                {
                    cls.map((classe, index) => {
                        return (
                            <div className={styles.check} key={index}>
                                <Input 
                                    onChange={() => gestao(index)} 
                                    className={styles.customize} 
                                    type="checkbox" 
                                    name={classe} 
                                    id={classe} 
                                    checked={
                                        classes.find(cl => cl.id === index) !== undefined
                                    }
                                />
                                <label htmlFor={classe}>{classe}</label>
                                <div 
                                    onClick={
                                        () => setInd(index)
                                    } 
                                    
                                    className={styles.settings} 
                                    
                                    style={
                                        aparece(index)
                                    }
                                >
                                    <CiSettings  />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className={styles.botoes}>
                <ProxVoltar op={op} setOp={setOp} />
            </div>

        </form>
        </>
    )

}


function EditaCls({op, setOp, cls, cpus, rams, classes, setClasses, ind, setInd}: ClassesProps){

    const cl = classes.find(classe => classe.id === ind);
    
    // Fazer uma deep copy do objeto
    const [clCopy, setClCopy] = useState(cloneDeep(cl));

    // console.log(cl);

    return (
        <div className={styles.editar}>

            <div className={styles.titulo}>
                <span>Configuração de classe</span>
                <h1>{cl.categoria}</h1>
            </div>

            <form className={styles.formulario} onSubmit={(e) => {
                e.preventDefault();
                setClasses(
                    classes.map(classe => {
                        if(classe.id === ind){
                            return clCopy;
                        } else {
                            return classe;
                        }
                    })
                );
                setInd(-1);
            }}>

                <div className={styles.qntServs}>
                    <label htmlFor="qntServs">Quantidade de serviços por provedor:</label>
                    <Input 
                        type="number" 
                        name="qntServs" 
                        id="qntServs" 
                        value={clCopy.qntServs} 
                        onChange={
                            (event) => {
                                setClCopy(
                                    {
                                        ...clCopy,
                                        qntServs: event.target.valueAsNumber
                                    }
                                );
                            }
                        }
                    />
                </div>

                <div className={styles.rams}>
                
                    <span>Selecione as memórias RAMS:</span>

                    <div className={styles.ops}>
                        {
                            rams.map((ram, index) => {
                                return (
                                    <div key={index} className={styles.check}>
                                        <Input 
                                            type="checkbox" 
                                            name="rams" 
                                            id={ram.toString()} 
                                            checked={
                                                (clCopy.rams as number[]).includes(index)
                                            }
                                            onChange={
                                                (event) => {
                                                    if(event.target.checked){
                                                        setClCopy(
                                                            {
                                                                ...clCopy,
                                                                rams: [...clCopy.rams, index]
                                                            }
                                                        );
                                                    } else {
                                                        setClCopy(
                                                            {
                                                                ...clCopy,
                                                                rams: clCopy.rams.filter((ram: number) => ram !== index)
                                                            }
                                                        );
                                                    }
                                                }
                                            }
                                        />
                                        <label htmlFor={ram.toString()}>{ram} GB</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    

                </div>

                <div className={styles.hd}>
                    <span>HD:</span>
                    
                    <div className={styles.minMax}>
                        <div className={styles.min}>
                            <label htmlFor="minHd"></label>
                            <Input 
                                value={clCopy.hd.min} 
                                type="number" 
                                name="minHd" 
                                id="minHd" 
                                min={1} 
                                max={10000} 
                                step={1}
                                onChange={
                                    (e) => {
                                        setClCopy(
                                            {
                                                ...clCopy,
                                                hd: {
                                                    ...clCopy.hd,
                                                    min: e.target.valueAsNumber
                                                }
                                            }
                                        );
                                    }
                                }
                                />
                            <span>gb</span>
                        </div>
                        
                        <div className={styles.ate}>
                            <h3>até</h3>
                        </div>

                        <div className={styles.min}>
                            <label htmlFor="maxHd"></label>
                            <Input 
                                type="number" 
                                name="maxHd" 
                                id="maxHd" 
                                min={
                                    document.getElementById("minHd") !== null ? 
                                        (document.getElementById("minHd") as HTMLInputElement).valueAsNumber
                                    : 
                                        1
                                } 
                                max={10000} 
                                value={clCopy.hd.max}
                                onChange={
                                    (event) => {

                                        if (event.target.valueAsNumber < clCopy.hd.min) {
                                            event.target.value = clCopy.hd.min.toString();
                                        } else if (event.target.valueAsNumber > 10000) {
                                            event.target.value = "10000";
                                        } else {
                                            setClCopy(
                                                {
                                                    ...clCopy,
                                                    hd: {
                                                        ...clCopy.hd,
                                                        max: event.target.valueAsNumber
                                                    }
                                                }
                                            );
                                        }
                                    }
                                }
                            />
                            <span>gb</span>
                        </div>

                    </div>

                    

                    
                </div>


                <div className={styles.cpus}>

                    <span>Selecione os CPUs que podem surgir na simulação:</span>

                    <div className={styles.ops}>
                        {
                            cpus.map((cpu, index) => {
                                return (
                                    <div key={index} className={styles.check}>
                                        <Input type="checkbox" name="cpus" id={cpu} checked={
                                            (clCopy.cpus as number[]).includes(index)
                                        } onChange={
                                            (e) => {
                                                if(e.target.checked){
                                                    setClCopy(
                                                        {
                                                            ...clCopy,
                                                            cpus: [...clCopy.cpus, index]
                                                        }
                                                    );
                                                } else {
                                                    setClCopy(
                                                        {
                                                            ...clCopy,
                                                            cpus: clCopy.cpus.filter((cpu: number) => cpu !== index)
                                                        }
                                                    );
                                                }
                                            }
                                        } 
                                        />
                                        <label htmlFor={cpu}>{cpu}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    

                </div>


                <div className={styles.disp}>
                    <label htmlFor="disp">
                        Disponibilidade Minima:
                    </label>
                    <Input 
                        type="number" 
                        name="disp" 
                        id="disp" 
                        min={1.00} 
                        value={clCopy.disponibilidade} 
                        onChange={
                            (e) => {
                                setClCopy(
                                    {
                                        ...clCopy,
                                        disponibilidade: e.target.valueAsNumber
                                    }
                                );
                            }
                        }
                        step={0.1}
                        />
                </div>


                <div className={styles.tempoRes}>
                    <label htmlFor="tempoRes">Tempo de resposta máximo:</label>

                    <Input
                        type="number" 
                        name="tempoRes" 
                        id="tempoRes" 
                        max={10000}
                        min={0.01}
                        value={clCopy.tempoResposta} 
                        onChange={
                            (e) => {
                                setClCopy(
                                    {
                                        ...clCopy,
                                        tempoResposta: e.target.valueAsNumber
                                    }
                                );
                            }
                        }
                        step={0.01}
                    />

                </div>

                <div className={styles.custo}>

                    <label htmlFor="custo">Custo:</label>
                    <Input
                        type="number" 
                        name="custo" 
                        id="custo" 
                        max={1000000}
                        min={0.01}
                        value={clCopy.custo} 
                        onChange={
                            (e) => {
                                setClCopy(
                                    {
                                        ...clCopy,
                                        custo: e.target.valueAsNumber
                                    }
                                );
                            }
                        }
                        step={0.01}
                    />

                </div>
                
                
                <div className={styles.botoes}>
                    <Button type="button" onClick={() => {
                        setInd(-1);
                    }}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </div>



            </form>

        
        </div>
    )

}




export default function Classes({op, setOp, cls, cpus, rams, classes, setClasses, ind, setInd}: ClassesProps){

    return (
        <>
            <Head><title>Classes</title></Head>
            {
                ind === -1 ? 
                    <SelecoesClasses 
                        cls={cls} 
                        cpus={cpus} 
                        rams={rams} 
                        classes={classes} 
                        setClasses={setClasses} 
                        op={op} 
                        setOp={setOp} 
                        ind={ind}
                        setInd={setInd}
                    /> 
                : 
                    <>
                        <EditaCls 
                            cls={cls} 
                            cpus={cpus} 
                            rams={rams} 
                            classes={classes} 
                            setClasses={setClasses} 
                            op={op} 
                            setOp={setOp} 
                            ind={ind}
                            setInd={setInd}
                        />
                    </>
            }
            
        </>
    )
}