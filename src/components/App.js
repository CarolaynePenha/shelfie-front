import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TokenProvider } from "../context/TokenContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserProvider } from "../context/UserContext";
import Shelf from "./Shelf";
import Release from "./Release";
import Search from "./Search";
import Ranking from "./Ranking";
import Profile from "./Profile";
import BookInfos from "./BookInfos";
import AddBookInShelf from "./AddBookInShelf";

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
              <Route path="/release" element={<Release />} />
              <Route path="/search" element={<Search />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookInfos/:id" element={<BookInfos />} />
              {/* <Route
                path="/addBook/:id/:existInShelf"
                element={<AddBookInShelf />}
              /> */}
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
