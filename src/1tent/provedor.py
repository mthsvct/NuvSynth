from classe import Classe


class Provedor:

    total = 1

    def __init__(self) -> None:
        self.id = Provedor.total
        self.name = f'Provider {self.id}'
        self.classes = [] 
        Provedor.total += 1

    def __str__(self) -> str:
        return f'{self.name}.\n{len(self.classes)} classes.'

    def gerar(self, selCls):
        self.criaClasses(selCls)

    def criaClasses(self, selCls):
        self.classes = [
            Classe() for x in selCls
        ]