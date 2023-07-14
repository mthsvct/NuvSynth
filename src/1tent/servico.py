

class Servico:

    id = 1

    def __init__(self, classe=None) -> None:
        self.id = Servico.id
        self.name = f'Serviço {self.id}'
        self.classe = classe
        Servico.id += 1 
    
    def __str__(self) -> str:
        return f'{self.name}.\nClasse: {self.classe}.'