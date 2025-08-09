#Contains all my Flask routes 

#Opening a web server
from flask import Flask, render_template, url_for, request, flash, redirect
from flask_sqlalchemy import SQLAlchemy

from app import app, db

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:365Pass@localhost/stocksync_db'
# db = SQLAlchemy(app)

class  Product(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    stock = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return f"<Product {self.name}>"
    
with app.app_context():
    db.create_all()


@app.route('/add_part', methods = ['POST'])
def add_part():
    if request.method == 'POST':
        id = request.form.get("id")
        name = request.form.get("name")
        stock = request.form.get("stock")

        if not id:
            flash('ID IS REQUIRED!')
        elif not name:
            flash('NAME IS REQUIRED')

        if stock != '' and name != '' and id is not None:
            p = Product(id =id, name = name, stock = stock)
            db.session.add(p)
            db.session.commit()
            return redirect('/')
        else:
            return redirect('/')




@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)




