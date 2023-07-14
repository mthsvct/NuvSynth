

class Limites:

    def __init__(self, 
                cpus:list, 
                minRAM:int, maxRAM:int,
                minHD:int, maxHD:int,
                minDisp:float=0, maxDisp:float=100,
                minTempRes:float=0, maxTempRes:float=1,
                minCusto:float=0, maxCusto:float=100):
        self.cpus = cpus
        self.ram = {"min": minRAM, "max": maxRAM}
        self.hd = {"min": minHD, "max": maxHD}
        self.disponibilidade = {"min": minDisp, "max": maxDisp}
        self.tempoResposta = {"min": minTempRes, "max": maxTempRes}
        self.custo = {"min": minCusto, "max": maxCusto}

    def __str__(self):
        return f"CPUs: {self.cpus}\nRAM: {self.ram}\nHD: {self.hd}\nDisponibilidade: {self.disponibilidade}\nTempo de Resposta: {self.tempoResposta}\nCusto: {self.custo}"


    def dicio(self):
        return {
            "cpus": self.cpus,
            "ram": self.ram,
            "hd": self.hd,
            "disponibilidade": self.disponibilidade,
            "tempoResposta": self.tempoResposta,
            "custo": self.custo
        }