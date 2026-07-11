from config import db

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    total = db.Column(db.Float, nullable=False)

    def __init__(self, cliente, direccion, total):
        self.cliente = cliente
        self.direccion = direccion
        self.total = total

    def to_dict(self):
        return {
            'id': self.id,
            'cliente': self.cliente,
            'direccion': self.direccion,
            'total': self.total
        }