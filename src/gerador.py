import random
import string


class Gerador:

    def __init__(self, numProviders, name=None) -> None:
        self.numProviders = numProviders
        self.rams = [4, 8, 16, 32, 64, 128, 256, 512]
        self.cpus = [
            'Intel Core 3', 
            'Intel Core 5', 
            'Intel Core 7', 
            'Intel Core 9', 
            'AMD Ryzen 5', 
            'AMD Ryzen 7', 
            'AMD Ryzen 9', 
            'Qualcomm Snapdragon', 
            'Apple A14 Bionic', 
            'Apple M1', 
            'AMD Threadripper']
        if name == None or name == '':
            self.name = ''.join( random.choice(string.ascii_letters+string.digits) for _ in range(50) )
        else:
            self.name = name

    def __str__(self) -> str:
        return f'Database: {self.name}.\nQnt de Provedores: {self.num}.'

    def gerar(self):
        pass


