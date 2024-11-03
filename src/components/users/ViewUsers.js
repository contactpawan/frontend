import { useEffect, useState } from "react";
import {Row, Col} from "react-bootstrap";
import { XSquareFill } from 'react-bootstrap-icons';
import axios from "axios";
import { BE_URLS } from "../../utils/constants";

export default function ViewUser () {
    const [users, setUsers] = useState([]);

    const updateUserList = () => {
        axios.get(BE_URLS.USERS_LIST)
        .then(response => {
            setUsers(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() => {
        updateUserList();
    },[]);

    const removeUser = (_id) => {
        axios.delete(`${BE_URLS.REMOVE_USER}/${_id}`)  
        .then(res => {  
            updateUserList();
        })  
    };

    return(
        <Row className="sections">
            <Col lg="12" className="formBlock">
                <h2>Existing Users</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Email</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return(
                                <tr>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.uemail}</td>
                                    <td><XSquareFill color="red" className="deleteIcon" size={20} onClick={ ()=>removeUser(user._id) } /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Col>
        </Row>
    );
}