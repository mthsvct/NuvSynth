


class Hardware:

    def __init__(self, cpu, ram, hd):
        self.cpu = cpu
        self.ram = ram
        self.hd = hd
    
    def __str__(self):
        return f"CPU: {self.cpu}\nRAM: {self.ram}\nHD: {self.hd}"
    
    def dicio(self):
        return {
            "cpu": self.cpu,
            "ram": self.ram,
            "hd": self.hd
        }