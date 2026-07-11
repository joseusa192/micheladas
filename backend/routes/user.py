from flask import Blueprint, jsonify
from models.user_md import User

user_bp = Blueprint("user", __name__)
@user_bp.route("/users", methods=["GET"])
def obtener_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])