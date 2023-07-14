import json


class Provedor:

    total = 0

    def __init__(self):
        self.id = Provedor.total
        Provedor.total += 1
        self.name = f"Provedor - {self.id}"
        self.classes = []
    
    def __str__(self):
        cl = [] if len(self.classes) == 0 else [f"{c}" for c in self.classes]
        return f"Id: {self.id}\nNome: {self.name}\nClasses: {cl}"
    
    def dicio(self):
        return {
            "id": self.id,
            "name": self.name,
            "classes": [c.dicio() for c in self.classes]
        }