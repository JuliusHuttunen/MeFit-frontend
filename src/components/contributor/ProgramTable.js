import React from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux";

const ProgramTable = () => {

  const programs = useSelector((state) => state.db.programs)

  const programsMap = programs.map((program, index) => {
      return(
        <tr key={index}>
          <td>{program.programId}</td>
          <td>{program.name}</td>
          <td>{program.category}</td>
          <td><Button>edit</Button></td>
        </tr>
      )
  })
  return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Target Muscle</th>
            <th>Level</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {programsMap}
        </tbody>
      </Table>
  );
};

export default ProgramTable;