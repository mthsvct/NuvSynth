from limites import Limites
from servico import Servico
from random import choice, randint, uniform

class Classe(Limites):

    def __init__(self, categoria:str, qntSrvs:int, cpus:list, 
            ram:list,
            minHD:int, maxHD:int,
            disponibilidade:float=0,
            tempResposta:float=1,
            custo:float=100
        ) -> None:
        self.qntSrvs = qntSrvs
        self.categoria = categoria
        self.servicos = []
        super().__init__(cpus, ram, minHD, maxHD, disponibilidade, tempResposta, custo)

    def __str__(self):
        return f"Categoria: {self.categoria}\nServicos: {self.servicos}\n{super().__str__()}"

    def newSrv(self, indice):
        return Servico(
            name=f"Service-{self.categoria}-{indice}",
            cpu=choice(self.cpus),
            ram=choice(self.ram),
            hd=randint(self.hd['min'], self.hd['max']),
            disponibilidade=uniform(self.disponibilidade, 100.0),
            tempoResposta=uniform(0.0, self.tempoResposta),
            custo=uniform(0.0, self.custo)
        )


    def gerar(self):
        self.servicos = [self.newSrv(x) for x in range(self.qntSrvs)]

    def dicio(self):
        return {
            "categoria": self.categoria,
            "servicos": [s.dicio() for s in self.servicos],
            # "limites": super().dicio()
        }