from provedor import Provedor
from classe import Classe
from servico import Servico
import copy
from random import choice, randint, uniform


CLASSES = [
    'Computacao', 
    'Armazenamento',
    'Memoria', 
    'AI + Machine Learning',
    'Segurança', 
    'Análise de Dados e Estatíticas',
    'Internet das Coisas', 
    'Redes',
    'Big Data', 
    'Mídia' 
    ]

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
    ]

RAMS = [ (2**x) for x in range(1, 11) ]


class Dataset:

    def __init__(self, 
            name:str='', 
            qntPrvd:int=5, 
            clsSel:list=[]
        ) -> None:

        self.name = name
        self.qntPrvd = qntPrvd
        self.clsSel = clsSel
        





def gerar(clsSel:list, qntPrv:int=5, qntSer:int=10):
    # Esta Função é apenas para testes.
    prvs = [ Provedor() for _ in range(qntPrv) ]
    
    for i in prvs: i.classes = [ copy.deepcopy(x) for x in clsSel ]
    
    for i in prvs:
        for j in i.classes:
            j.qntSrvs = qntSer
    
    for i in prvs: #.......... Para cada provedor
        for j in i.classes: #. Para cada classe que está no provedor
            j.gerar() #....... Gera os servicos da classe
    
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