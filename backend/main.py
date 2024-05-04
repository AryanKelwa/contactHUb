from flask import request,jsonify
from models import Contacts
from config import app,db

################  To Create a contact #######################
@app.route('/create_contact',methods=['POST','GET'])
def create_contact():
    first_name=request.json.get('firstName')
    last_name=request.json.get('lastName')
    email=request.json.get('email')

    if not first_name or not last_name or not email:
        return jsonify({'message':"all fields are required"}),401
    
    new_contact=Contacts(first_name=first_name,last_name=last_name,email=email)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({'message':str(e)}),400
    
    return jsonify({'message':"user crated"}),201


##################  To get the contacts #########################
@app.route('/contacts',methods=['GET'])
def get_contacts():
    contacts=Contacts.query.all()
    json_contacts=list(map(lambda x:x.to_json(),contacts))
    data={'contacts':json_contacts}
    return jsonify(data)



################ To update the contact ##############################
@app.route('/update_contact/<int:user_id>',methods=['PATCH'])
def update_contact(user_id):
    contact=Contacts.query.get(user_id)

    if not contact:
        return jsonify({'message':'user not found'}),404
    
    data=request.json

    contact.first_name=data.get('firstName',contact.first_name)
    contact.last_name=data.get('lastName',contact.last_name)
    contact.email=data.get('email',contact.email)

    db.session.commit()

    return jsonify({'message':"updated successfully"}),200




############### To delete a contact###############################
@app.route('/delete_contact/<int:user_id>',methods=['DELETE'])
def delete_contact(user_id):
    contact=Contacts.query.get(user_id)

    if not contact:
        return jsonify({'message':'user not found'}),404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({'message':'deleted successfully !'}),200



#################### main function###################################
if __name__=='__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)




