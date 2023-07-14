


class Hardware:

    # Perguntar a professora sobre o tipo de HD

    def __init__(self, minRAM=None, maxRAM=None, cpus=None, minHD=None, maxHD=None) -> None:
        self.ram = {'min': minRAM, 'max': maxRAM}
        self.hd = {'min': minHD, 'max': maxHD}
        self.cpus = cpus

    def __str__(self) -> str:
        return f'{self.ram}.\n{self.hd}.\n{self.cpus}.'

    def imprimirHard(self):
        print(f"Oi Teste {self.ram['min']}")

