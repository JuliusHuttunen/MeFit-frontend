import Button from "react-bootstrap/Button"
import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { getKeycloakUsers } from '../API/Connection'

const AdminComponent = () => {

    const addContributor = (id) => {
        console.log("Added " + id + " as Contributor.")
    }

    const deleteUser = (id) => {
        console.log("Deleted user " + id + ".")
    }

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const [error, data] = await getKeycloakUsers()
            console.log(data)
            setUsers(data)
        }
        fetchUsers()

    },[])   

    const UserList = users.map((user, index) => {
            return(
                <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.firstName + " " + user.lastName}</td>
                    {user.attributes ? 
                    <td>
                        <Button type="button" onClick={() => addContributor(user.id)}>Add as Contributor</Button>
                    </td> : <td></td>}
                
                    <td>
                        <Button type="button" variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                    </td>
                </tr>
            )
    })

    return (
        <Table>
            <tbody>
                <tr>
                    <td>Username</td>
                    <td>Full Name</td>
                    <td>Contributor Request</td>
                    <td>Delete User</td>
                </tr>
                {UserList}
            </tbody>
        </Table>
    )
}

export default AdminComponent