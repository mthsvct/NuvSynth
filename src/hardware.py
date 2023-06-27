


class Hardware:

    # Perguntar a professora sobre o tipo de HD

    def __init__(self, minRAM=None, maxRAM=None, minCPU=None, maxCPU=None, minHD=None, maxHD=None) -> None:
        self.ram = {'min': minRAM, 'max': maxRAM}
        self.cpu = {'min': minCPU, 'max': maxCPU}
        self.hd = {'min': minHD, 'max': maxHD}
    
    def __str__(self) -> str:
        return f'RAM: {self.ram[0]}GB\nCPU: {self.cpu[0]}GHz\nHD: {self.hd[0]}GB'



