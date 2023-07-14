


class QoS:

    def __init__(self, disponibilidade, tempoResposta, custo):
        self.disponibilidade = disponibilidade
        self.tempoResposta = tempoResposta
        self.custo = custo
    
    def __str__(self):
        return f"Disponibilidade: {self.disponibilidade}\nTempo de Resposta: {self.tempoResposta}\nCusto: {self.custo}"
    
    def dicio(self):
        return {
            "disponibilidade": self.disponibilidade,
            "tempoResposta": self.tempoResposta,
            "custo": self.custo
        }