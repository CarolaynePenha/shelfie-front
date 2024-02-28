import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Bookshelf from "./BookShelf";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";
import TokenContext from "../context/TokenContext";
import Header from "./Header";

export default function Shelf() {
  const [shelfBooks, setShelfBooks] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [srcBar, setSrcBar] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getShelfBooks() {
      const URL = process.env.REACT_APP_API_URL + `/shelf`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setShelfBooks(data);
        console.log("data: ", data);
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          alert("Usuário inválido, faça login novamente");
          logOut(setToken, setUser, navigate);
        } else {
          alert("Houve um erro na realizar sua busca!");
        }
      }
    }
    getShelfBooks();
  }, []);

  async function search(event) {
    event.preventDefault();
    const URL = process.env.REACT_APP_API_URL + `/shelf?src=${srcBar}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(URL, config);
      console.log("dataDoSrc: ", data);
      setShelfBooks(data);
    } catch (err) {
      console.log(err.response);
      alert("Houve um erro na realizar sua busca!");
    }
  }
  return (
    <>
      <Header search={search} setSrcBar={setSrcBar} />
      <Conteiner>
        {shelfBooks?.length >= 1 &&
          shelfBooks.map((shelfBook, index) => {
            return <Bookshelf key={index} shelfBook={shelfBook} />;
          })}
      </Conteiner>
    </>
  );
}

// ----------------------css
const Conteiner = styled.section`
  width: 100%;
  margin-top: 20px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
