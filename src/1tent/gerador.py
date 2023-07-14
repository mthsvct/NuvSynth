import random
import string
from provedor import Provedor

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
            'AMD Threadripper',
            'IBM POWER9'
        ]
        self.classes = [
            'Computacao', 
            'Armazenamento',
            'Memoria', 
            'AI + Machine Learning',
            'Segurança', 
            'Análise de Dados e Estatíticas',
            'Internet das Coisas', 
            'Redes',
            'Big Data', 
            'Mídia'
        ]
        self.name = ''.join( random.choice(string.ascii_letters+string.digits) for _ in range(50) ) if name in ['', None] else name
        self.providers = []
        self.classesSel = []

    def __str__(self) -> str:
        return f'Database: {self.name}.\nQnt de Provedores: {self.numProviders}.'

    def run(self): 
        self.selClasses()
        self.gerarProviders()
        self.gerar()
    
    def gerarProviders(self):
        self.providers = [self.gerarProv() for _ in range(self.numProviders)]
    
    def gerarProv(self):
        return Provedor()

    def menuClasses(self):
        print('Selecione as classes que o provedor oferece:')
        for i, classe in enumerate(self.classes): 
            print(f'{i+1} - {classe}')
        print('0 - Sair')
        return int(input('Opção: '))
    
    def selQntSer(self): 
        return int(input('Quantidade de serviços: '))

    def selQos(self):
        print('\nSelecione a QoS:')

        minDisp, maxDisp = 0, 0
        while minDisp >= maxDisp:
            minDisp = float(input('Disponibilidade mínima: '))
            maxDisp = float(input('Disponibilidade máxima: '))
            if minDisp >= maxDisp: print('A disponibilidade mínima deve ser menor que a disponibilidade máxima.')
        print()
        minTempo, maxTempo = 0, 0
        while minTempo >= maxTempo:
            minTempo = float(input('Tempo de resposta mínimo: '))
            maxTempo = float(input('Tempo de resposta máximo: '))
            if minTempo >= maxTempo: print('O tempo de resposta mínimo deve ser menor que o tempo de resposta máximo.')
        print()
        minCusto, maxCusto = 0, 0
        while minCusto >= maxCusto:
            minCusto = float(input('Custo mínimo: '))
            maxCusto = float(input('Custo máximo: '))
            if minCusto >= maxCusto: print('O custo mínimo deve ser menor que o custo máximo.')
        print()
        return {
            'disponibilidade': {'min': minDisp, 'max': maxDisp},
            'tempoResposta': {'min': minTempo, 'max': maxTempo},
            'custo': {'min': minCusto, 'max': maxCusto}
        }

    def menu(self, lista, msg='Selecione um item:'):
        print()
        print(msg)
        for i, item in enumerate(lista): print(f'{i+1} - {item}')
        print('0 - Sair')
        return int(input('Opção: '))

    def selItemLista(self, lista, msg='Selecione um item:'):
        ops = -1
        while ops != 0:
            ops = self.menu(lista, msg)
            if ops != 0:
                return lista[ops-1]
    
    def selManyItens(self, lista, msg='Selecione um item:'):
        ops = -1
        itens = []
        while ops != 0:
            ops = self.menu(lista, msg)
            if ops != 0:
                itens.append(lista[ops-1])
        return itens

    def selHardware(self):
        print()
        print('Selecione o Hardware:')
        minHD, maxHD = 0, 0
        
        while minHD >= maxHD:
            minHD = int(input('HD mínimo: '))
            maxHD = int(input('HD máximo: '))
            if minHD >= maxHD: print('O HD mínimo deve ser menor que o HD máximo.')
        print()
        minRAM, maxRAM = 0, 0
        while minRAM >= maxRAM:
            minRAM = self.selItemLista(self.rams, msg='Selecione o minimo de RAM:')
            maxRAM = self.selItemLista(self.rams, msg='Selecione o máximo de RAM:')
            if minRAM >= maxRAM: print('O minimo de RAM deve ser menor que o máximo de RAM.')
        print()
        cpus = self.selManyItens(self.cpus, msg='Selecione as CPUs:')
        return {
            'ram': {'min': minRAM, 'max': maxRAM},
            'cpu': cpus,
            'hd': {'min': minHD, 'max': maxHD}
        }
                
    def selClasses(self):
        op = -1
        while op != 0:
            op = self.menuClasses()
            if op != 0:
                aux = {
                    'classe': self.classes[op-1],
                    'qntSer': self.selQntSer(),
                    'qos': self.selQos(),
                    'hardware': self.selHardware()
                }
                self.classesSel.append(aux)
        print(self.classesSel)

    def gerar(self):
        for i in range(self.numProviders):
            novoProv = Provedor()
            novoProv.gerar(self.classesSel)
            self.providers.append(novoProv)



