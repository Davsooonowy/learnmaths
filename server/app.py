from datetime import timedelta
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt, set_access_cookies, unset_jwt_cookies
)
from werkzeug.security import generate_password_hash, check_password_hash

blacklist = set()

app = Flask(__name__)
CORS(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=150)
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

# Konfiguracja bazy danych SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'  # Poprawiona konfiguracja dla SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash

with app.app_context():
    db.create_all()


@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"msg": "Login successful"}))
    response.set_cookie('access_token_cookie', access_token, httponly=True, samesite='Strict')
    set_access_cookies(response, access_token)
    return response

@app.route('/register', methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    password_hash = generate_password_hash(password)
    new_user = User(username=username, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"msg": "Registration successful"}))
    response.set_cookie('access_token_cookie', access_token, httponly=True, samesite='Strict')
    return response

@app.route('/logout', methods=["POST"])
@jwt_required()
def logout():
    try:
        jti = get_jwt()['jti']
        print("JWT ID (jti):", jti)
        blacklist.add(jti)
        response = make_response(jsonify({"msg": "Logout successful"}))
        unset_jwt_cookies(response)  # Usuń cookies z tokenem
        return response
    except Exception as e:
        print("Error during logout:", e)
        return jsonify({"msg": "Error during logout"}), 500

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    jti = get_jwt()['jti']
    if jti in blacklist:
        return jsonify({"msg": "Token has been revoked"}), 401

    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
