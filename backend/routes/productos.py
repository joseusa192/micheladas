from flask import Blueprint, jsonify
from models.producto_md import Producto

productos_bp = Blueprint("productos", __name__)

@productos_bp.route("/productos", methods=["GET"])
def obtener_productos():
    productos = Producto.query.all()
    return jsonify([producto.to_dict() for producto in productos])