/* Contributor view */
import React from "react";
import ContributorTabs from "../components/contributor/ContributorTabs";
import Container from "react-bootstrap/Container";

const Contributor = () => {
  return (
    <Container className="pt-3 pb-5">
      <ContributorTabs />
    </Container>
  );
};

export default Contributor;
