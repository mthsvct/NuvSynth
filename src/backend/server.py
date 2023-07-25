from fastapi import FastAPI
from gerador import *
from provedor import Provedor
from classe import Classe
from servico import Servico


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


