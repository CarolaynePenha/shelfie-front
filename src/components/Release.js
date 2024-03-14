import styled from "styled-components";
import Footer from "./Footer";

export default function Release() {
  return (
    <Container>
      <p> Em implementação </p>
      <Footer />
    </Container>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
