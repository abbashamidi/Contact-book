export default function EachContact({Contacts}) {
    return (
        <div>
            
        {Contacts.map((contact,index)=> {
            return <p key={index}>{contact}</p>
        })}
        </div>
    )
}