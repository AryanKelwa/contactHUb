import React from "react";
import './ContactList.css'; // Import CSS file for styling

const ContactList = ({ contacts,updateContact,updateCallback }) => {

    const onDelete = async (id)=>{
        const options={method:'DELETE'}
        try{
            const response= await fetch(`http://127.0.0.1:5000/delete_contact/${id}`,options)
            if (response.status===200){
                updateCallback()
            }
            else{
                console.log("failed to delete")
            }
        }catch(error){
            alert(error)
        }

    }

    return (
        <div className="contact-list-container">
            <h1 className="contact-list-heading">Contacts</h1>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick={()=>updateContact(contact)} className="action-button update-button">Update</button>
                                <button className="action-button delete-button" onClick={()=>onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList;
