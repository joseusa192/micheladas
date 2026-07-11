from flask import Blueprint, jsonify
from models.pedido_md import Pedido

pedidos_bp = Blueprint("pedidos", __name__)

@pedidos_bp.route("/pedidos", methods=["GET"])
def obtener_pedidos():
    pedidos = Pedido.query.all()
    return jsonify([pedido.to_dict() for pedido in pedidos])