import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Bookshelf from "./BookShelf";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";
import TokenContext from "../context/TokenContext";
import Header from "./Header";
import Footer from "./Footer";
import CalendarToYear from "./CalendarToYear";
import Category from "./Category";

export default function Shelf() {
  const [shelfBooks, setShelfBooks] = useState("");

  const { token, setToken } = useContext(TokenContext);
  const [filter, setFilter] = useState("");
  const { setUser } = useContext(UserContext);
  const [srcBar, setSrcBar] = useState("");
  const navigate = useNavigate();
  const [getShelfBooks, setGetShelfBooks] = useState(false);

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
  }, [getShelfBooks]);

  async function search(event) {
    event.preventDefault();
    console.log("filter: ", filter);
    console.log("srcBar: ", srcBar);
    const URL =
      process.env.REACT_APP_API_URL + `/shelf?src=${srcBar}&filter=${filter}`;
    setFilter("filtrar por:");
    setSrcBar("");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(URL, config);
      setShelfBooks(data);
    } catch (err) {
      console.log(err.response);
      alert("Houve um erro na realizar sua busca!");
    }
  }

  const filterArr = ["filtrar por:", "ano", "categoria"];
  return (
    <>
      <Header
        search={search}
        setSrcBar={setSrcBar}
        srcBar={srcBar}
        setGetShelfBooks={setGetShelfBooks}
        getShelfBooks={getShelfBooks}
      />
      <Conteiner>
        <select
          required
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          onClick={() => window.scrollTo(0, 500)}
        >
          {filterArr.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
        {filter === "ano" && (
          <CalendarToYear
            setFilter={setFilter}
            search={search}
            setSrcBar={setSrcBar}
          />
        )}
        {filter === "categoria" && (
          <Category
            search={search}
            setFilter={setFilter}
            setSrcBar={setSrcBar}
          />
        )}

        <div className="shelf">
          {shelfBooks?.length >= 1 &&
            shelfBooks.map((shelfBook, index) => {
              return <Bookshelf key={index} shelfBook={shelfBook} />;
            })}
        </div>
      </Conteiner>
      <Footer />
    </>
  );
}

// ----------------------css
const Conteiner = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  .shelf {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  select {
    margin-top: 21vh;
    border: none;
    margin-left: 20px;
    color: #574145;
    border: 1px solid #574145;
  }
`;