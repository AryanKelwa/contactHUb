import { useState } from 'react'
import './ContactForm.css'

const ContactForm = ({existingContact={},updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")

    const updating=Object.entries(existingContact).length!==0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = { firstName, lastName, email }
        const url='http://127.0.0.1:5000/'+ (updating ? `update_contact/${existingContact.id}`:'create_contact')
        const options={
            method :updating?"PATCH":"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body : JSON.stringify(data)
        }

        const response = await fetch(url,options)
        console.log(response)



        if (response.status !==200 && response.status!==201){
            const data=response.json()
            console.log(data)
            alert(data.message)
        }else{
            // setFirstName(""),
            // setLastName(""),
            // setEmail("")

            updateCallback()
        }

    }

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <label htmlFor="firstName">firstName</label>
                <input
                    type="text"
                    id='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">lastName</label>
                <input
                    type="text"
                    id='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="email">email</label>
                <input
                    type="text"
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type='submit'>{updating? "update" : "create"}</button>
            </form>
        </div>
    )
}

export default ContactForm