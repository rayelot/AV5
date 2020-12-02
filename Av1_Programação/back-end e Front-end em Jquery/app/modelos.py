from configuracoes import *

class Personagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    vida = db.Column(db.Integer)
    ataque = db.Column(db.Integer)
    defesa = db.Column(db.Integer)
    pacto = db.Column(db.String(254))

    def __str__(self):
        return str(self.id) + ") " + self.nome + ", " + str(self.vida) + ", " + str(self.ataque) + ", " + str(self.defesa) + ", " + self.pacto  + ". "

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "vida": self.vida,
            "ataque": self.ataque,
            "defesa": self.defesa,
            "pacto": self.pacto
        }

class Aventura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(254))
    recompensa = db.Column(db.String(254))
    progresso = db.Column(db.String(254))
    data_inicio = db.Column(db.String(254))
    personagem_id = db.Column(db.Integer, db.ForeignKey(Personagem.id), nullable=False)
    contratado = db.relationship("Personagem")

    def __str__(self):
        resposta = f"Missão: {self.descricao}. Recompensa: {self.recompensa}."
        if self.contratado:
            self.progresso = "em andamento"
            resposta += f" Contratado: {self.contratado} Progresso da missão: {self.progresso}, iniciada em: {self.data_inicio}."
        return resposta

    def json(self):
        return {
            "id": self.id,
            "descricao" : self.descricao,
            "recompensa" : self.recompensa,
            "progresso" : self.progresso,
            "data_inicio" : self.data_inicio,
            "personagem_id" : self.personagem_id,
            "contratado" : self.contratado.json()
        }

class Armamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    tipo_dano = db.Column(db.String(254))
    personagem_id = db.Column(db.Integer, db.ForeignKey(Personagem.id))
    utilizado_por = db.relationship("Personagem")

    def __str__(self):
        resposta = f"Armamento: {self.nome}. Tipo de dano: {self.tipo_dano}."
        if self.utilizado_por:
            resposta += f" Utilizado por: {self.utilizado_por}"
        return resposta
    
    def json(self):
        if self.utilizado_por:
            personagem_id = self.personagem_id
            utilizado_por = self.utilizado_por.json()
        else:
            personagem_id = ""
            utilizado_por = ""
        return {
            "id" : self.id,
            "nome" : self.nome,
            "tipo_dano" : self.tipo_dano,
            "personagem_id" : personagem_id,
            "utilizado_por" : utilizado_por
        }
        


if __name__=="__main__":
    if os.path.exists(arquivo_bd):
        os.remove(arquivo_bd)

    db.create_all()

    p1 = Personagem(nome="Andre", vida=20, ataque=5, 
    defesa=13,pacto="N/D")
    p2 = Personagem(nome="Siegward", vida=50, ataque=10, 
    defesa=15, pacto="Cavaleiro de Catarina")
    p3 = Personagem(nome="Lautrec", vida=15, ataque=35,
    defesa=0, pacto="Ordem dos assassinos")
    p4 = Personagem(nome="Logan", vida=7, ataque=60,
    defesa=0, pacto="Ordem da magia")
    p5 = Personagem(nome="Queelag", vida=160, ataque=40,
    defesa=30, pacto="Bruxas do caos")

    a1 = Aventura(descricao="Matar 10 goblins", recompensa="5 pçs de ouro", 
    data_inicio="12/10/20", contratado=p1)
    a2 = Aventura(descricao="Recuperar artefato mágico", recompensa="20 pçs de ouro", 
    data_inicio="10/10/12", contratado=p2)

    e1 = Armamento(nome="Machado", tipo_dano="Cortante")
    e2 = Armamento(nome="Espada", tipo_dano="Cortante", utilizado_por=p1)

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(a1)
    db.session.add(a2)
    db.session.add(e1)
    db.session.add(e2)
    db.session.commit()

    print(p1)
    print(p1.json())
    print(f"{e1}")
    print(f"{e2}")
    print(f"{e1.json()}")
    print(f"{e2.json()}")






    