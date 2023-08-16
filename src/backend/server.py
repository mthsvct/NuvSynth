from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gerador import *
from provedor import Provedor
from classe import Classe
from servico import Servico
from time import sleep

# Pra rodar:
# uvicorn server:app --reload


app = FastAPI()

# Configurar as origens permitidas (permitir solicitações do seu aplicativo React)
origins = [
    "http://localhost:3000",  # Substitua pela origem real do seu aplicativo React
]

# Adicionar o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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


