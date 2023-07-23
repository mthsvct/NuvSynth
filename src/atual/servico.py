from hardware import Hardware
from qos import QoS

class Servico(Hardware, QoS):
    total = 0
    def __init__(self,
                name:str,
                cpu, ram, hd,
                disponibilidade,
                tempoResposta,
                custo,
                taxa=0):
        self.id = Servico.total
        Servico.total += 1
        self.name = name
        self.taxa = taxa
        Hardware.__init__(self, cpu, ram, hd)
        QoS.__init__(self, disponibilidade, tempoResposta, custo)

    def __str__(self): return f"Nome: {self.name}\n{Hardware.__str__(self)}\n{QoS.__str__(self)}"

    def dicio(self): return { "name": self.name, "hardware": Hardware.dicio(self), "qos": QoS.dicio(self) }

