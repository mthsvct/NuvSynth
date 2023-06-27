

class Qos:

    def __init__(self, minDisp=None, maxDisp=None, minTempo=None, maxTempo=None, minCusto=None, maxCusto=None) -> None:
        self.disponibilidade = {'min': minDisp, 'max': maxDisp}
        self.tempo = {'min': minTempo, 'max': maxTempo}
        self.custo = {'min': minCusto, 'max': maxCusto}
    
    def __str__(self) -> str:
        return f'Disponibilidade: {self.disponibilidade[0]}%\nTempo de Resposta: {self.tempo[0]}ms\nCusto: R${self.custo[0]}'

    def impriQos(self):
        print(f"Oi Teste {self.disponibilidade['min']}")

# Compare this snippet from src/gerador.py: