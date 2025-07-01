from werkzeug.security import generate_password_hash
from server.app.models import db, User
from server.app.app import create_app

app = create_app()

with app.app_context():
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        hashed_pw = generate_password_hash('admin2025')
        admin = User(username='admin', password=hashed_pw, phone='0700000000', is_admin=True)
        db.session.add(admin)
        db.session.commit()
        print('✅ Admin user created.')
    else:
        admin.password = generate_password_hash('admin2025')  # Reset password
        db.session.commit()
        print('✅ Admin password reset to admin2025')
