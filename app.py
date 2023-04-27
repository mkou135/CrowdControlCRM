from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clients.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<Client {self.name}>"



@app.route('/api/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients_data = [{"id": client.id, "name": client.name, "phone": client.phone, "email": client.email, "address": client.address} for client in clients]
    return jsonify({"clients": clients_data})


@app.route('/api/add-client', methods=['POST'])
def add_client():
    client_data = request.get_json()

    new_client = Client(name=client_data['name'], phone=client_data['phone'], email=client_data['email'], address=client_data['address'])
    db.session.add(new_client)
    db.session.commit()

    return jsonify({'status': 'success'}), 200

@app.route('/api/clients/<int:client_id>', methods=['DELETE'])
def delete_client(client_id):
    client = Client.query.get(client_id)
    if client:
        db.session.delete(client)
        db.session.commit()
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Client not found'}), 404



class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Lead {self.name}>"

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    client = db.relationship('Client', backref=db.backref('invoices', lazy=True))
    tax = db.Column(db.Float, nullable=False)
    additional_charges = db.Column(db.Float, nullable=False)
    payment_terms = db.Column(db.Text, nullable=False)
    logo = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Invoice {self.id}>"

@app.route('/api/add-invoice', methods=['POST'])
def add_invoice():
    invoice_data = request.get_json()

    new_invoice = Invoice(client_id=invoice_data['client_id'], tax=invoice_data['tax'], additional_charges=invoice_data['additional_charges'], payment_terms=invoice_data['payment_terms'], logo=invoice_data['logo'])
    db.session.add(new_invoice)
    db.session.commit()

    return jsonify({'status': 'success', 'invoice_id': new_invoice.id}), 200


@app.route('/api/leads', methods=['GET'])
def get_leads():
    leads = Lead.query.all()
    leads_data = [{"id": lead.id, "name": lead.name, "company": lead.company, "email": lead.email, "phone": lead.phone} for lead in leads]
    return jsonify({"leads": leads_data})

@app.route('/api/add-lead', methods=['POST'])
def add_lead():
    lead_data = request.get_json()

    new_lead = Lead(name=lead_data['name'], company=lead_data['company'], email=lead_data['email'], phone=lead_data['phone'])
    db.session.add(new_lead)
    db.session.commit()

    return jsonify({'status': 'success'}), 200

@app.route('/api/clients/<int:client_id>', methods=['GET'])
def get_client(client_id):
    client = Client.query.get(client_id)
    if client:
        client_data = {"id": client.id, "name": client.name, "phone": client.phone, "email": client.email, "address": client.address}
        return jsonify({"client": client_data})
    else:
        return jsonify({'status': 'error', 'message': 'Client not found'}), 404


@app.route('/api/leads/<int:lead_id>', methods=['DELETE'])
def delete_lead(lead_id):
    lead = Lead.query.get(lead_id)
    if lead:
        db.session.delete(lead)
        db.session.commit()
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Lead not found'}), 404



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
