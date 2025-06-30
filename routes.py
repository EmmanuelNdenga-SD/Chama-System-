from flask import Blueprint, jsonify, request

bp = Blueprint('routes', __name__)

members = []
next_id = 0

@bp.route('/')
def home():
    return jsonify({
        'status': 'running',
        'message': 'Chama System API is running'
    })

@bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == "admin" and password == "admin2025":
        return jsonify({
            "message": "Login successful",
            "access_token": "mocked-jwt-token-123"
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@bp.route('/members', methods=['POST'])
def add_member():
    global next_id

    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    amount_paid = data.get('amount_paid', 0)

    if not name or not phone:
        return jsonify({"error": "Missing name or phone"}), 400

    new_member = {
        "id": next_id,
        "name": name,
        "phone": phone,
        "amount_paid": amount_paid
    }
    members.append(new_member)
    next_id += 1

    return jsonify({
        "message": "Member added successfully",
        "member": new_member
    }), 201

@bp.route('/members', methods=['GET'])
def get_members():
    return jsonify(members), 200

@bp.route('/members/<int:member_id>', methods=['DELETE'])
def delete_member(member_id):
    global members
    for i, member in enumerate(members):
        if member.get('id') == member_id:
            deleted = members.pop(i)
            return jsonify({
                "message": "Member deleted successfully",
                "deleted_member": deleted
            }), 200

    return jsonify({"error": "Member not found"}), 404

@bp.route('/members/register', methods=['POST'])
def register_member():
    global members, next_id

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check for existing username
    for member in members:
        if member.get('username') == username:
            return jsonify({"error": "Username already exists"}), 409

    new_member = {
        "id": next_id,
        "username": username,
        "password": password,  # Note: use hashing in production
        "contributions": []
    }
    members.append(new_member)
    next_id += 1

    return jsonify({
        "message": "Member registered successfully",
        "member": {"id": new_member["id"], "username": new_member["username"]}
    }), 201
    
@bp.route('/members/login', methods=['POST'])
def login_member():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    for member in members:
        if member.get('username') == username and member.get('password') == password:
            return jsonify({
                "message": "Login successful",
                "access_token": f"mock-token-for-member-{member['id']}"
            }), 200

    return jsonify({"error": "Invalid username or password"}), 401


