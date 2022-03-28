import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux";
import { editProgram } from "../../redux/databaseSlice";

const ProgramTable = () => {

  const programs = useSelector((state) => state.db.programs)
  const userPrograms = useSelector((state) => state.profile.programs)
  const dispatch = useDispatch()
  const [userProgramsList, setUserProgramsList] = useState([])

  useEffect(() => {
    try {
      for (let program of userPrograms) {
        setUserProgramsList(userProgramsList => [...userProgramsList, program.programId])
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }, [userProgramsList])

  const handleOpen = (program) => dispatch(editProgram(program))

  const programsMap = programs.map((program) => {
    if (userProgramsList.includes(program.programId))
      return (
        <tr key={program.programId}>
          <td>{program.programId}</td>
          <td>{program.name}</td>
          <td>{program.category}</td>
          <td><Button onClick={() => handleOpen(program)}>edit</Button></td>
        </tr>
      )
  })
  return (
    <Table striped bordered hover size="sm" className="text-center">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
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