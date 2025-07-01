from server.app.app import create_app

app = create_app()  # This is the WSGI app Gunicorn needs
