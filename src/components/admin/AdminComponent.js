import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import {
  addContributorRole,
  completeContributorRequest,
  deleteUser,
} from "../API/Connection";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/adminSlice";

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
    await dispatch(fetchUsers()).unwrap();
  };

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(fetchUsers()).unwrap();
    };
    getUsers();
  }, []);

  const UserList = users.map((user, index) => {
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
  });

  return (
    <Table striped bordered hover className="text-center" size="sm">
      <thead>
        <tr>
          <td>Username</td>
          <td>Full Name</td>
          <td>Contributor Request</td>
          <td>Delete User</td>
        </tr>
      </thead>
      <tbody>{UserList}</tbody>
    </Table>
  );
};

export default AdminComponent;
