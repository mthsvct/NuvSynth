from provedor import Provedor
from classe import Classe
from servico import Servico
import copy
from random import choice, randint, uniform


CLASSES = [
    'Computacao', 'Armazenamento','Memoria', 
    'AI + Machine Learning', 'Segurança', 
    'Análise de Dados e Estatíticas',
    'Internet das Coisas', 'Redes', 
    'Big Data',  'Mídia' 
    ] # len(classes) == 10

CPUS = [
    'Intel Core 3', 
    'Intel Core 5', 
    'Intel Core 7', 
    'Intel Core 9', 
    'AMD Ryzen 5', 
    'AMD Ryzen 7', 
    'AMD Ryzen 9', 
    'Qualcomm Snapdragon', 
    'Apple A14 Bionic', 
    'Apple M1', 
    'AMD Threadripper',
    'IBM POWER9' 
    ] # len(cpus) == 12

RAMS = [ (2**x) for x in range(1, 11) ] # len(rams) == 10


# class Dataset:
#     def __init__(self, 
#             name:str='', 
#             qntPrvd:int=5, 
#             clsSel:list=[]) -> None:
#         self.name = name
#         self.qntPrvd = qntPrvd
#         self.clsSel = clsSel
def sequencia(dados):
    qntPrv = dados.qnts.prvs
    qntSer = dados.qnts.srvs

    um = None
    
    if qntSer == 1:
        qntSer = 2
        um = True

    print(um, qntSer)
    
    classes = []
        
    for i in dados.classes:
        novo = Classe(
            categoria=CLASSES[ i['categoria'] ],
            qntSrvs=qntSer,
            cpus=[ CPUS[x] for x in i['cpus'] ],
            ram=[ RAMS[x] for x in i['ram'] ],
            minHD=i['hd']['min'], maxHD=i['hd']['max'],
            disponibilidade=i['disponibilidade'],
            tempResposta=i['tempoResposta'],
            custo=i['custo']
        )
        classes.append(novo)
    
    return run(classes, qntPrv, qntSer, um)



def run(clsSel:list, qntPrv:int=5, qntSer:int=10, um:bool=False):
    # Esta Função é apenas para testes.
    prvs = [ Provedor() for _ in range(qntPrv) ]
    
    for i in prvs: 
        i.classes = [ copy.deepcopy(x) for x in clsSel ]
    
    for i in prvs:
        for j in i.classes:
            j.qntSrvs = qntSer
    
    for i in prvs: #............ Para cada provedor
        for j in i.classes: #... Para cada classe que está no provedor
            j.gerar() #......... Gera os servicos da classe
    
    if um:
        # Dá pop na lista de serviços de cada classe dos provedores
        for i in prvs:
            for j in i.classes:
                j.servicos.pop()

    return prvs


def gerarClasseRandom(qntSers:int=10):
    return Classe(
        categoria=choice(CLASSES),
        qntSrvs=qntSers,
        cpus=list(set([choice(CPUS) for x in range(randint(1, 5))])),
        ram=sorted(list(set([choice(RAMS) for x in range(randint(1, 5))]))),
        minHD=randint(1, 100),
        maxHD=randint(100, 1000),
        disponibilidade=round(uniform(0.0, 100.0), 2),
        tempResposta=round(uniform(0, 100.0), 2),
        custo=round(uniform(0.0, 1000.0), 2)
    )