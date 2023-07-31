from limites import Limites
from servico import Servico
from random import choice, randint, uniform

class Classe(Limites):

    def __init__(self, 
            categoria:str, qntSrvs:int,  
            cpus:list, ram:list, minHD:int, maxHD:int,
            taxaSemelhanca:int=80,
            disponibilidade:float=0,
            tempResposta:float=1,
            custo:float=100,
            Naptidao:int=1, geracoes:int=300
        ) -> None:
        
        self.qntSrvs = qntSrvs
        self.categoria = categoria
        self.servicos = []
        self.taxaSemelhanca = taxaSemelhanca
        self.Naptidao = Naptidao if Naptidao != -1 else qntSrvs  # Quantidade de serviços que devem ser semelhantes ao modelo. Serve para definir a aptidão da classe e estabelecer um fim para o algoritmo
        self.geracoes = {'limite': geracoes, 'populacoes': [], 'qntGer': 0} # Quantidade de gerações que serão feitas para gerar os serviços
        self.ranking = self.montaRanking() # Ranking para a seleção proporcional
        self.casais = [] # Casais que serão gerados para o crossover

        self.atrs = ['cpu', 'ram', 'hd', 'disponibilidade', 'tempoResposta', 'custo']
        
        super().__init__(cpus, ram, minHD, maxHD, disponibilidade, tempResposta, custo)

        self.modelo = Servico(
            name=f"Service-Modelo-Classe-{self.categoria}",
            cpu=choice(self.cpus),
            ram=self.ram[-1],
            hd=self.hd['max'],
            disponibilidade=100,
            tempoResposta=0.001,
            custo=0.01
        )

    def __str__(self): return f"Categoria: {self.categoria}\nServicos: {self.servicos}\n{super().__str__()}"
    
    def dicio(self):
        # Retorna um dicionário com os dados da classe
        return {
            "categoria": self.categoria,
            "servicos": [ s.dicio() for s in self.servicos ],
            # "limites": super().dicio()
        }

    def newSrv(self, indice):
        # Cria-se um um novo serviço com base nos limites estabelecidos para a classe
        srv = Servico(
            cpu=choice(self.cpus),
            ram=choice(self.ram),
            hd=randint(self.hd['min'], self.hd['max']),
            disponibilidade=uniform(self.disponibilidade, 100.0),
            tempoResposta=uniform(0.0, self.tempoResposta),
            custo=uniform(0.0, self.custo)
        )
        srv.taxa = self.porcentagem(srv)
        return srv
    
    
    def porcentagem(self, srv:Servico):
        # O calculo da porcentagem é feito com base na quantidade de atributos iguais do serviço com o modelo
        porc = 0
        aum = 100 / len(self.atrs)
        if self.modelo.cpu == srv.cpu: porc += aum
        if self.modelo.ram == srv.ram: porc += aum
        if (srv.hd > self.modelo.hd - 10 and srv.hd < self.modelo.hd + 10): porc += aum
        if (srv.disponibilidade > self.modelo.disponibilidade - 7 and srv.disponibilidade < self.modelo.disponibilidade + 7): porc += aum
        if (srv.tempoResposta > self.modelo.tempoResposta - 0.7 and srv.tempoResposta < self.modelo.tempoResposta + 0.7 ): porc += aum
        if (srv.custo > self.modelo.custo - 7 and srv.custo < self.modelo.custo + 7): porc += aum
        return porc
    
    # Compara o serviço com o modelo. Retorna True se for semelhante (porcentagem do novo serviço é maior ou igual a 80%).
    def comparar(self, srv:Servico): return self.porcentagem(srv) >= self.taxaSemelhanca

    # Retorna True se a classe tiver mais de N serviços semelhante ao modelo
    def aptidao(self): return len( [x for x in self.servicos if self.comparar(x) ] )+1 > self.Naptidao

    # Fazer o processo de geração com base no algoritmo genético. Onde serão gerados os serviços
    def gerar(self): 
        # Inicia a população:
        self.servicos = sorted([ self.newSrv(x) for x in range(self.qntSrvs) ], key=lambda x: x.taxa, reverse=True)

        # Adiciona primeira geração a lista de populações
        self.geracoes['populacoes'].append(self.servicos)
        # print("taxas: ", [x.taxa for x in self.servicos])
        
        g = 1
        melhores = []
        # Verifica a aptidão    
        while (not self.aptidao()) and (self.geracoes['qntGer'] < self.geracoes['limite']):
            
            self.selecao() # Realiza a seleção proporcional ao ranking. Monta uma lista (casais)
            self.crossover() # Pega cada casal e realiza o cruzamento. Gera dois novos serviços.
            self.mutacao() # Sorteia um serviço, sorteia um atributo e altera o valor.
            

            if g != 0 and g % 10:
                melhores.insert(0, self.servicos[0])
                melhores = sorted(melhores, key=lambda x: x.taxa, reverse=True)
                if len(melhores) > 10: melhores.pop() 
                # self.servicos[-1] = melhores[0]
                # self.servicos = sorted(self.servicos, key=lambda x: x.taxa, reverse=True)
            
            self.geracoes['populacoes'].append(self.servicos) # Adiciona a nova população a lista de populações
            self.geracoes['qntGer'] += 1 # Incrementa a quantidade de gerações    
            g += 1 # Contador de gerações é incrementado

        # print(self.um)
        
        if len(self.servicos) > self.qntSrvs: 
            self.servicos.pop()
        
        self.servicos = sorted(self.servicos, key=lambda x: x.taxa, reverse=True)
        
            

    def montaRanking(self):
        # Monta um ranking baseados nas taxas dos serviços. Onde o primeiro serviço é o que tem a maior taxa.
        p = [50, 30, 10, 5, 1, 1, 1, 1, 1]
        
        if len(p) > self.qntSrvs:
            p = p[:self.qntSrvs]

        print("p: ", p)
        ranking = []
        index = 0

        for i in p:
            for _ in range(i):
                ranking.append(index)
            index += 1
        
        return ranking
    
    def selecao(self):
        # Formação dos casais. Cada casal é formado por dois serviços que serão cruzados. Eles gerarão dois novos serviços (filhos) da prox ger.
        # Por isso, a função deve formar uma lista de casais que possua a metade da qnt de serviços da classe.
        self.casais = [] # Zero
        metade = self.qntSrvs // 2 if self.qntSrvs % 2 == 0 else (self.qntSrvs // 2) + 1
        while len(self.casais) < metade:
            novo = []
            c1, c2 = choice(self.ranking), choice(self.ranking)
            while c1 == c2: c2 = choice(self.ranking)
            novo.append(c1)
            novo.append(c2)
            self.casais.append(novo)


    def crossover(self):
        # Pega o casal e realiza o cruzamento dos atributos.
        sel = []

        # print(self.um, self.qntSrvs)

        for i in self.casais:
            # Crio dois serviços a partir dos atributos dos serviços do casal. Vou alternando os atributos de cada serviço para efetuar o cruzamento.
            # print("---------:> i[0] e i[1]", i[0], i[1])

            
            nv1 = Servico(
                name=f"Service-{self.categoria}",
                cpu= self.servicos[i[0]].cpu,
                ram= self.servicos[i[1]].ram,
                hd=self.servicos[i[0]].hd,
                disponibilidade= self.servicos[i[1]].disponibilidade,
                tempoResposta=self.servicos[i[0]].tempoResposta,
                custo= self.servicos[i[1]].custo )
            nv1.taxa = self.porcentagem(nv1)

            nv2 = Servico(
                name=f"Service-{self.categoria}",
                cpu= self.servicos[i[1]].cpu,
                ram= self.servicos[i[0]].ram,
                hd=self.servicos[i[1]].hd,
                disponibilidade= self.servicos[i[0]].disponibilidade,
                tempoResposta=self.servicos[i[1]].tempoResposta,
                custo= self.servicos[i[0]].custo )
            nv2.taxa = self.porcentagem(nv2)

            # Adiciona os novos serviços na lista de serviços da classe
            sel.append(nv1)
            sel.append(nv2)
        
        # Ordena os serviços de acordo com a taxa e atribui a lista de serviços da classe
        self.servicos = sorted(sel, key=lambda x: x.taxa, reverse=True)


    def altera(self, ind, atr):
        # Altera o atributo do serviço
        if atr == 'cpu': self.servicos[ind].cpu = choice(self.cpus)
        elif atr == 'ram': self.servicos[ind].ram = choice(self.ram)
        elif atr == 'hd': self.servicos[ind].hd = randint(self.hd['min'], self.hd['max'])
        elif atr == 'disponibilidade': self.servicos[ind].disponibilidade = uniform(self.disponibilidade, 100.0)
        elif atr == 'tempoResposta': self.servicos[ind].tempoResposta = uniform(0.0, self.tempoResposta)
        elif atr == 'custo': self.servicos[ind].custo = uniform(0.0, self.custo)
        self.servicos[ind].taxa = self.porcentagem(self.servicos[ind])

    def mutacao(self):
        # Sorteia um serviço e um atributo para ser alterado
        for _ in range(1):  
            ind = choice(range(self.qntSrvs))
            self.altera(ind, choice(self.atrs))
            self.servicos = sorted(self.servicos, key=lambda x: x.taxa, reverse=True)