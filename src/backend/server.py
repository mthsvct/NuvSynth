from fastapi import FastAPI
from pydantic import BaseModel
from gerador import *
from provedor import Provedor
from classe import Classe
from servico import Servico


# Pra rodar:
# unicorn server:app --reload


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/classes")
async def classes():
    return {"classes": CLASSES}

@app.get("/cpus")
async def cpus():
    return {"cpus": CPUS}

@app.get("/rams")
async def rams():
    return {"rams": RAMS}

@app.get("/classeRandom")
async def classeRandom():
    return {"classe": gerarClasseRandom().dicio()}

# ------------------  ----------------- #

class Qnts(BaseModel):
    prvs: int
    clss: int
    srvs: int

class NovoData(BaseModel):
    name: str
    qnts: Qnts
    classes: list

@app.post('/gerar')
async def gerar(dados:NovoData=None):
    if dados:
        prvs = sequencia(dados)
        return {"prvs": [x.dicio() for x in prvs]}
    else:
        return {"message": "Hello World - ELSE", "dados": dados}


