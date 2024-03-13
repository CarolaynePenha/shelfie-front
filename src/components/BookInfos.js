import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  BookDashed,
  BookDown,
  BookOpen,
  BookOpenCheck,
  Plus,
  Undo2,
} from "lucide-react";

import Footer from "./Footer";
import TokenContext from "../context/TokenContext";
import axios from "axios";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";

export default function BookInfos() {
  const { id } = useParams();
  const { token, setToken } = useContext(TokenContext);
  const [book, setBook] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const sizeIcon = 30;
  const existInShelf = { newBook: "newBook", existingBook: "existingBook" };
  const { newBook, existingBook } = existInShelf;

  useEffect(() => {
    async function getfBookById() {
      const URL = process.env.REACT_APP_API_URL + `/book/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setBook(data);
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          alert("Usuário inválido, faça login novamente");
          logOut(setToken, setUser, navigate);
        }
        if (err.response.status === 404) {
          alert("Livro não encontrado");
          navigate("/shelf");
        } else {
          alert("Houve um erro ao realizar sua busca!");
        }
      }
    }
    getfBookById();
  }, []);

  return (
    <>
      <Container>
        <div className="header">
          <Undo2 onClick={() => navigate(-1)} color="#574145" size={25} />
        </div>
        <section className="div-img">
          <img src={book.bookImage} alt="capa do livro" />
          {book.status === "done" ? (
            <BookOpenCheck
              className="icon-status"
              onClick={() =>
                navigate(`/addBook/${book.bookId}/${existingBook}`)
              }
              color="#00693e"
              fill="#00693e"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          ) : book.status === "reading" ? (
            <BookOpen
              className="icon-status"
              onClick={() =>
                navigate(`/addBook/${book.bookId}/${existingBook}`)
              }
              color="#f3b93f"
              fill="#f3b93f"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          ) : book.status === "wish" ? (
            <BookDashed
              className="icon-status"
              onClick={() =>
                navigate(`/addBook/${book.bookId}/${existingBook}`)
              }
              color="#175676"
              size={sizeIcon}
            />
          ) : book.status === "abandoned" ? (
            <BookDown
              className="icon-status"
              onClick={() =>
                navigate(`/addBook/${book.bookId}/${existingBook}`)
              }
              color="#000000"
              fill="#000000"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          ) : book.status === "rereading" ? (
            <BookOpen
              className="icon-status"
              onClick={() =>
                navigate(`/addBook/${book.bookId}/${existingBook}`)
              }
              color="#df6d2f"
              fill="#df6d2f"
              fillOpacity={0.5}
              size={25}
            />
          ) : (
            <Plus
              className="icon-status"
              onClick={() => navigate(`/addBook/${book.bookId}/${newBook}`)}
              color="#574145"
              size={sizeIcon}
            />
          )}
          <div className="book-infos">
            <strong>{book.title}</strong>
            <small>{book?.author?.name}</small>
          </div>
          <div className="reading-data">
            <p>x leram </p>
            <p>x querem ler</p>
            <p>x lendo</p>
          </div>
        </section>
        <section className="rating">
          <p>Avaliações</p>
        </section>
      </Container>
      <Footer />
    </>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  .header {
    height: 19vh;
    width: 100%;
    background-color: #fde8e9;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #5741457a;
  }
  section {
    height: 35vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .icon-status {
    position: fixed;
    top: 22vh;
    right: 50;
  }

  .book-infos {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    strong {
      font-weight: 600;
      padding: 10px;
    }
    small {
      padding-bottom: 15px;
    }
  }
  .reading-data {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #5741457a;
  }
  img {
    height: 25vh;
    position: fixed;
    top: 10vh;
  }
  .div-img {
    padding-top: 40%;
  }
  .rating {
    background-color: #fde8e9;
    filter: drop-shadow(1px 2px 2px #000000);
    display: flex;
    align-items: flex-start;
    p {
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid #5741457a;
      font-weight: 600;
    }
  }
`;
