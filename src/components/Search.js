import styled from "styled-components";
import Footer from "./Footer";
import HeaderSearch from "./HeaderSearch";
import { useContext, useState } from "react";
import Book from "./Book";
import SrcContext from "../context/SrcContext";
import { SearchIcon, Trash } from "lucide-react";

export default function Search() {
  const [srcBar, setSrcBar] = useState("");
  const [books, setBooks] = useState("");
  const { srcInfosArr, setSrcInfosArr } = useContext(SrcContext);

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
        {srcBar === "" && (
          <div className="lastlatest-src">
            <div className="src-top">
              <strong>Suas pesquisas recentes </strong>
              <Trash
                onClick={() => {
                  setSrcInfosArr([]);
                  localStorage.removeItem("srcInfosArr");
                }}
                color="#574145"
                fill="#574145"
                fillOpacity={0.5}
                size={20}
              />
            </div>
            {srcInfosArr.map((src) => (
              <div onClick={() => setSrcBar(src)} className="src-and-icon">
                <SearchIcon
                  color="#574145"
                  fill="#574145"
                  fillOpacity={0.5}
                  size={20}
                />
                <p>{src}</p>
              </div>
            ))}
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
  .lastlatest-src {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    strong {
      font-weight: 600;
    }
    p {
      margin: 10px;
    }
    .src-and-icon {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    .src-top {
      display: flex;
      align-items: center;
      margin-left: 20px;
      justify-content: space-evenly;
      margin: 20px 0px;
    }
  }
`;
