import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </DivApp>
  );
}
export default App;

// --------------------------------css

const DivApp = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
`;
