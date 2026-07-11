from config import db

class Producto(db.Model):
    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)

    def __init__(self, name, description, price, image_url, categoria):
        self.name = name
        self.description = description
        self.price = price
        self.image_url = image_url
        self.categoria = categoria

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'categoria': self.categoria
        }
    