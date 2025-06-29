from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, create_access_token
from .models import User, Payment
from .extensions import db

def create_api(app):
    api = Api(app)
    
    # User Registration
    class UserRegistration(Resource):
        def post(self):
            parser = reqparse.RequestParser()
            parser.add_argument('username', help='This field cannot be blank', required=True)
            parser.add_argument('password', help='This field cannot be blank', required=True)
            parser.add_argument('phone', help='This field cannot be blank', required=True)
            
            data = parser.parse_args()
            
            if User.query.filter_by(username=data['username']).first():
                return {'message': 'User already exists'}, 400
                
            new_user = User(
                username=data['username'],
                password=data['password'],  # In production, hash this password!
                phone=data['phone']
            )
            
            db.session.add(new_user)
            db.session.commit()
            
            return {'message': 'User created successfully'}, 201
    
    # User Login
    class UserLogin(Resource):
        def post(self):
            parser = reqparse.RequestParser()
            parser.add_argument('username', help='This field cannot be blank', required=True)
            parser.add_argument('password', help='This field cannot be blank', required=True)
            
            data = parser.parse_args()
            current_user = User.query.filter_by(username=data['username']).first()
            
            if not current_user:
                return {'message': 'User not found'}, 404
                
            if current_user.password == data['password']:  # In production, use proper password verification
                access_token = create_access_token(identity=data['username'])
                return {
                    'message': 'Logged in as {}'.format(current_user.username),
                    'access_token': access_token,
                    'is_admin': current_user.is_admin
                }
            else:
                return {'message': 'Wrong credentials'}, 401
    
    # Payments
    class Payments(Resource):
        @jwt_required()
        def get(self):
            payments = Payment.query.all()
            return [
                {
                    'id': payment.id,
                    'amount': payment.amount,
                    'date': payment.date.isoformat(),
                    'user_id': payment.user_id,
                    'confirmed': payment.confirmed
                } for payment in payments
            ]
        
        @jwt_required()
        def post(self):
            parser = reqparse.RequestParser()
            parser.add_argument('amount', type=float, help='This field cannot be blank', required=True)
            parser.add_argument('user_id', type=int, help='This field cannot be blank', required=True)
            
            data = parser.parse_args()
            
            new_payment = Payment(
                amount=data['amount'],
                user_id=data['user_id']
            )
            
            db.session.add(new_payment)
            db.session.commit()
            
            return {'message': 'Payment recorded'}, 201
    
    api.add_resource(UserRegistration, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(Payments, '/payments')
    
    return api