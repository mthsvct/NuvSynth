from hardware import Hardware
from qos import Qos

class Classe(Hardware, Qos):

    def __init__(
            self, name:str='', qntSer:int=1, 
            minRAM:int=None, maxRAM:int=None,
            minCPU:int=None, maxCPU=None, 
            minHD=None, maxHD=None,
            minDisp=None, maxDisp=None,
            minTempo=None, maxTempo=None,
            minCusto=None, maxCusto=None
        ) -> None:
        self.name = name
        self.qntSer = qntSer
        Qos.__init__(self, minDisp, maxDisp, minTempo, maxTempo, minCusto, maxCusto)
        Hardware.__init__(self, minRAM, maxRAM, minCPU, maxCPU, minHD, maxHD)
        
    def __str__(self) -> str:
        return f'{self.name}.\n{self.qntSer} serviços.'