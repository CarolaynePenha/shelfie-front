import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserProvider } from "../context/UserContext";
import Shelf from "./Shelf";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/shelf" element={<Shelf />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
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
