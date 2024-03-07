import styled from "styled-components";
import Footer from "./Footer";
import HeaderSearch from "./HeaderSearch";
import { useState } from "react";
import Book from "./Book";

export default function Search() {
  const [srcBar, setSrcBar] = useState("");
  const [books, setBooks] = useState("");
  return (
    <>
      <HeaderSearch
        srcBar={srcBar}
        setSrcBar={setSrcBar}
        books={books}
        setBooks={setBooks}
      />
      <Container>
        {books && srcBar && (
          <div className="src-box">
            {books.map((book, index) => {
              return <Book key={index} book={book} />;
            })}
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  margin-top: 16vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;
