


class QoS:

    def __init__(self, disponibilidade, tempoResposta, custo):
        self.disponibilidade = round(disponibilidade, 2)
        self.tempoResposta = round(tempoResposta,2)
        self.custo = round(custo, 2)
    
    def __str__(self):
        return f"Disponibilidade: {self.disponibilidade}\nTempo de Resposta: {self.tempoResposta}\nCusto: {self.custo}"
    
    def dicio(self):
        return {
            "disponibilidade": self.disponibilidade,
            "tempoResposta": self.tempoResposta,
            "custo": self.custo
        }