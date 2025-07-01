from flask import Blueprint, request, jsonify
from .models import db, User, Payment, Contribution
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

bp = Blueprint('api', __name__, url_prefix='/api')

# -------------------------
# Register New User
# -------------------------
@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    phone = data.get('phone')
    is_admin = data.get('is_admin', False)

    if not username or not password or not phone:
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 409

    hashed_password = generate_password_hash(password)
    user = User(
        username=username,
        password=hashed_password,
        phone=phone,
        is_admin=is_admin
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'User created successfully',
        'user': {
            'id': user.id,
            'username': user.username,
            'phone': user.phone,
            'is_admin': user.is_admin
        }
    }), 201

# -------------------------
# Login Route
# -------------------------
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'phone': user.phone,
                'is_admin': user.is_admin
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# -------------------------
# Get All Members (Non-admin Users)
# -------------------------
@bp.route('/members', methods=['GET'])
def get_members():
    members = User.query.filter_by(is_admin=False).all()
    members_list = [{
        'id': member.id,
        'username': member.username,
        'phone': member.phone
    } for member in members]

    return jsonify(members_list), 200

# -------------------------
# Add Payment
# -------------------------
@bp.route('/users/<int:user_id>/payments', methods=['POST'])
def add_payment(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    amount = data.get('amount')

    if not amount:
        return jsonify({'error': 'Amount is required'}), 400

    payment = Payment(amount=amount, user=user)
    db.session.add(payment)
    db.session.commit()

    return jsonify({
        'message': 'Payment added successfully',
        'payment': {
            'id': payment.id,
            'amount': payment.amount,
            'date': payment.date.isoformat(),
            'confirmed': payment.confirmed
        }
    }), 201

# -------------------------
# Get Payments for a User
# -------------------------
@bp.route('/users/<int:user_id>/payments', methods=['GET'])
def get_payments(user_id):
    user = User.query.get_or_404(user_id)
    payments = [{
        'id': p.id,
        'amount': p.amount,
        'date': p.date.isoformat(),
        'confirmed': p.confirmed
    } for p in user.payments]

    return jsonify(payments), 200

# -------------------------
# Add Contribution
# -------------------------
@bp.route('/users/<int:user_id>/contributions', methods=['POST'])
def add_contribution(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    amount = data.get('amount')

    if not amount:
        return jsonify({'error': 'Amount is required'}), 400

    contribution = Contribution(amount=amount, user=user)
    db.session.add(contribution)
    db.session.commit()

    return jsonify({
        'message': 'Contribution added successfully',
        'contribution': {
            'id': contribution.id,
            'amount': contribution.amount,
            'date': contribution.date.isoformat()
        }
    }), 201

# -------------------------
# Get Contributions for a User
# -------------------------
@bp.route('/users/<int:user_id>/contributions', methods=['GET'])
def get_contributions(user_id):
    user = User.query.get_or_404(user_id)
    contributions = [{
        'id': c.id,
        'amount': c.amount,
        'date': c.date.isoformat()
    } for c in user.contributions]

    return jsonify(contributions), 200

# -------------------------
# Add or Update Monthly Contribution
# -------------------------
@bp.route('/users/<int:user_id>/monthly-contribution', methods=['POST'])
def add_or_update_monthly_contribution(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    amount = data.get('amount')

    if not amount:
        return jsonify({'error': 'Amount is required'}), 400

    now = datetime.utcnow()
    year = now.year
    month = now.month

    # Check for existing monthly contribution
    existing = Contribution.query.filter(
        Contribution.user_id == user.id,
        db.extract('year', Contribution.date) == year,
        db.extract('month', Contribution.date) == month
    ).first()

    if existing:
        existing.amount = amount
        existing.date = now
        message = 'Monthly contribution updated'
    else:
        new_contribution = Contribution(amount=amount, user=user, date=now)
        db.session.add(new_contribution)
        message = 'Monthly contribution added'

    db.session.commit()

    return jsonify({'message': message}), 200
