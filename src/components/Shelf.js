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
      } catch (err) {
        console.log("err: ", err);
        console.log(err.response);
        if (err.response?.status === 401) {
          alert("Usuário inválido, faça login novamente");
          logOut(setToken, setUser, navigate);
        } else {
          alert("Houve um erro na realizar sua busca!");
        }
      }
    }
    getShelfBooks();
  }, [getShelfBooks]);

  async function search(e, status) {
    e.preventDefault();
    let URL;
    if (status) {
      if (status === "favorite") {
        URL = process.env.REACT_APP_API_URL + `/shelf?filter=${status}`;
      } else {
        URL = process.env.REACT_APP_API_URL + `/shelf?src=${status}`;
      }
    } else {
      URL =
        process.env.REACT_APP_API_URL + `/shelf?src=${srcBar}&filter=${filter}`;
    }

    setFilter("Filtrar por:");
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

  const filterArr = ["Filtrar por:", "ano", "categoria"];
  return (
    <Container>
      <Header
        search={search}
        setSrcBar={setSrcBar}
        srcBar={srcBar}
        setGetShelfBooks={setGetShelfBooks}
        getShelfBooks={getShelfBooks}
      />
      <div className="content">
        <div className="shelf-top">
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
          <p>Minha Estante</p>
        </div>
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
      </div>
      <Footer />
    </Container>
  );
}

// ----------------------css
const Container = styled.div`
  width: 100%;
  .content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }
  .shelf-top {
    display: flex;
    justify-content: center;
  }
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
    height: 30px;
    border-radius: 10px;
    font-weight: bold;
    background-color: transparent;
  }
  @media (min-width: 600px) {
    select {
      font-size: 16px;
      margin-top: 25vh;
    }
  }
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-evenly;
    .content {
      width: calc(100vw - 250px);
    }
  }
  @media (min-width: 1250px) {
    .content {
      width: calc(100vw - 460px);
      position: fixed;
      left: 230px;
      align-items: center;
    }
    @media (min-width: 1400px) {
      .content {
        width: calc(100vw - 510px);
        left: 280px;
      }
    }
  }
`;
