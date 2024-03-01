import styled from "styled-components";
import Footer from "./Footer";

export default function Ranking() {
  return (
    <Container>
      <Footer />
    </Container>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;
