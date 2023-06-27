import random
import string


class Gerador:

    def __init__(self, num, name=None) -> None:
        self.num = num
        if name == None or name == '':
            self.name = ''.join( random.choice(string.ascii_letters+string.digits) for _ in range(50) )
        else:
            self.name = name

    def __str__(self) -> str:
        return f'Database: {self.name}.\nQnt de Provedores: {self.num}.'

    def gerar(self):
        pass


