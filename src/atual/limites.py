

class Limites:

    def __init__(self, 
            cpus:list, 
            ram:list,
            minHD:int, maxHD:int,
            disponibilidade:float=0,
            tempResposta:float=1,
            custo:float=100
        ) -> None:
        self.cpus = cpus
        self.ram = sorted(ram)
        self.hd = {"min": minHD, "max": maxHD}
        self.disponibilidade = disponibilidade      # Disponibilidade Mínima
        self.tempoResposta = tempResposta           # Tempo de Resposta Máximo
        self.custo = custo                          # Custo Máximo

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