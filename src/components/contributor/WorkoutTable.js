import React from "react";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

const WorkoutTable = () => {
    return (
        <div>
            Workouts in table
            <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Target Muscle</th>
            <th>Level</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Leg raise</td>
            <td>Abs</td>
            <td>2</td>
            <td><Button>edit</Button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Bicep curl</td>
            <td>Biceps</td>
            <td>3</td>
            <td><Button>edit</Button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Pull up</td>
            <td>Biceps</td>
            <td>2</td>
            <td><Button>edit</Button></td>
          </tr>
        </tbody>
      </Table>
        </div>
    );
};

export default WorkoutTable;