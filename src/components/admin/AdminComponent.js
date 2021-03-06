//The table of users displayed on admin page
import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  addContributorRole,
  completeContributorRequest,
  deleteProfileToApi,
  deleteUser,
} from "../API/Connection";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/adminSlice";
import { Container } from "react-bootstrap";

const AdminComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  const addContributorBtn = async (id) => {
    await addContributorRole(id);
    await completeContributorRequest(id);
    await dispatch(fetchUsers()).unwrap();
  };

  const deleteUserBtn = async (id) => {
    await deleteUser(id);
    await deleteProfileToApi(id);
    await dispatch(fetchUsers()).unwrap();
  };

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(fetchUsers()).unwrap();
    };
    getUsers();
  }, []);

  const UserList = users.map((user, index) => {
    try {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.firstName + " " + user.lastName}</td>
          {user.attributes && user.attributes.contributorRequest[0] === "true" ? (
            <td>
              <Button type="button" onClick={() => addContributorBtn(user.id)}>
                Add as Contributor
              </Button>
            </td>
          ) : (
            <td></td>
          )}
          <td>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete user " + user.username + "?"
                  )
                )
                  deleteUserBtn(user.id);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }
    catch (error) {
      console.log("Still fetching users, please wait...")
    }
  });

  return (
    <Container className="mb-5">
      <h2>Admin tools</h2>
      <Table striped bordered hover className="text-center mt-3" size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Contributor Request</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>{UserList}</tbody>
      </Table>
    </Container>
  );
};

export default AdminComponent;
