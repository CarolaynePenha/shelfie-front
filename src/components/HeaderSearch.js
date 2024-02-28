import { useContext, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import TokenContext from "../context/TokenContext";
import axios from "axios";
import Book from "./Book";

export default function HeaderSearch() {
  const [srcBar, setSrcBar] = useState("");
  const [books, setBooks] = useState("");
  const { token } = useContext(TokenContext);

  useEffect(() => {
    async function search() {
      const URL = process.env.REACT_APP_API_URL + `/srcBar?src=${srcBar}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setBooks(data);
      } catch (err) {
        console.log(err.response);
        alert("Houve um erro na realizar sua busca!");
      }
    }
    search();
  }, [srcBar]);
  return (
    <DivHeader>
      <DebounceInput
        minLength={3}
        className="debounce-input"
        debounceTimeout={500}
        placeholder={"Pesquise por livros"}
        onChange={(event) => setSrcBar(event.target.value)}
      />
      {books && srcBar && (
        <div className="src-box">
          {books.map((book, index) => {
            return <Book key={index} book={book} />;
          })}
        </div>
      )}
    </DivHeader>
  );
}

// ----------------------css
const DivHeader = styled.div`
  height: 15vh;
  background-color: #fde8e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .debounce-input {
    width: 70%;
  }
`;
