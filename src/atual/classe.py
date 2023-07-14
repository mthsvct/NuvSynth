from limites import Limites
from servico import Servico
from random import choice, randint, uniform

class Classe(Limites):

    def __init__(self, categoria:str, qntSrvs:int, cpus: list, 
                minRAM:int, maxRAM:int, 
                minHD:int, maxHD:int, 
                minDisp:float = 0, maxDisp:float = 100, 
                minTempRes:float = 0, maxTempRes:float = 1, 
                minCusto:float=0, maxCusto:float=100):
        self.qntSrvs = qntSrvs
        self.categoria = categoria
        self.servicos = []
        super().__init__(cpus, minRAM, maxRAM, minHD, maxHD, minDisp, maxDisp, minTempRes, maxTempRes, minCusto, maxCusto)

    def __str__(self):
        return f"Categoria: {self.categoria}\nServicos: {self.servicos}\n{super().__str__()}"
    

    def newSrv(self, indice):
        return Servico(
            name=f"Service-{self.categoria}-{indice}",
            cpu=choice(self.cpus),
            ram=randint(self.ram['min'], self.ram['max']),
            hd=randint(self.hd['min'], self.hd['max']),
            disp=uniform(self.disponibilidade['min'], self.disponibilidade['max']),
            tempRes=uniform(self.tempoResposta['min'], self.tempoResposta['max']),
            custo=uniform(self.custo['min'], self.custo['max'])
        )


    def gerar(self):
        self.servicos = [self.newSrv(x) for x in range(self.qntSrvs)]

    def dicio(self):
        return {
            "categoria": self.categoria,
            "servicos": [s.dicio() for s in self.servicos],
            "limites": super().dicio()
        }