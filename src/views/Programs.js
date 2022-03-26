import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import ProgramsList from "../components/programviews/ProgramsList";
import { useSelector } from "react-redux";
import Program from "../components/templates/Program";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Programs = () => {
  const [programList, setProgramList] = useState(<ProgramsList />);
  const programs = useSelector((state) => state.db.programs);
  const [categories, setCategories] = useState([]);

  //Generate categories
  useEffect(() => {
    const generateFilters = () => {
      for (let program of programs) {
        if (!categories.includes(program.category)) {
          setCategories([...categories, program.category]);
        }
      }
    };
    generateFilters();
  }, [programs, categories]);

  const filterList = (category) => {
    setProgramList(
      programs.map((program, index) => {
        if (program.category === category || category === null) {
          return (
            <Program key={index} program={program} index={index}></Program>
          );
        }
        return <></>;
      })
    );
  };

  const filters = categories.map((category, index) => {
    return (
      <Button
        variant="outline-dark"
        className="p-3 m-3"
        key={index}
        onClick={() => filterList(category)}
      >
        <h5>{category}</h5>
      </Button>
    );
  });

  return (
    <div className="cardcontainer">
      <h2>Programs</h2>
      {programs === null || programs.length === 0 ? (
        <p>No programs found.</p>
      ) : (
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                className="p-3 m-3 "
                onClick={() => filterList(null)}
              >
                <h5>All</h5>
              </Button>
              {filters}
            </Col>
          </Row>
        </Container>
      )}
      <Container className="p-3 mb-5">
        <div className="accordiongrid">{programList}</div>
      </Container>
    </div>
  );
};

export default Programs;
