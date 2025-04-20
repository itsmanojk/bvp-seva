from app import create_app, db
from app.models import User, Restaurant, MenuItem, Order, OrderItem

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Restaurant': Restaurant,
        'MenuItem': MenuItem,
        'Order': Order,
        'OrderItem': OrderItem
    }

if __name__ == '__main__':
    app.run(debug=True)