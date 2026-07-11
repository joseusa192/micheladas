from flask import Flask
from flask_cors import CORS

from models.producto_md import Producto
from routes.productos import productos_bp

from config import db

app = Flask(__name__)
app.register_blueprint(productos_bp)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

    if Producto.query.count() == 0:

        producto = Producto(
            name="Michelada Clásica",
            description="Cerveza, limón y salsa especial",
            price=18000,
            image_url="https://www.muydelish.com/wp-content/uploads/2023/04/michelada-beer.jpg",
            categoria="Clásicas"
        )

        db.session.add(producto)
        db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)