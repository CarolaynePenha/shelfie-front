import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BookDashed,
  BookDown,
  BookOpen,
  BookOpenCheck,
  Plus,
  Undo2,
} from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { Tooltip } from "react-tooltip";

import Footer from "./Footer";
import TokenContext from "../context/TokenContext";
import { handleError } from "../utils";
import UserContext from "../context/UserContext";
import Logo from "./../assets/logo.png";
import Loading from "./LoadingBall";

export default function BookInfos() {
  const { id } = useParams();
  const { token, setToken } = useContext(TokenContext);
  const [book, setBook] = useState(null);
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
        handleError(err, setToken, setUser, navigate);
      }
    }
    getfBookById();
  }, []);

  return (
    <>
      <Container>
        <div className="header">
          <Undo2
            className="undo2-icon"
            onClick={() => navigate(-1)}
            color="#574145"
            size={25}
          />
          <img
            className="logo"
            src={Logo}
            alt="Logo"
            onClick={() => navigate("/shelf")}
          />
        </div>

        {book === null ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          <div className="content">
            <div className="div-img">
              <img src={book.bookImage} alt="capa do livro" />
            </div>
            {book.status === "done" ? (
              <>
                <Tooltip id="done-books" />
                <BookOpenCheck
                  data-tooltip-id="done-books"
                  data-tooltip-content="Lido"
                  className="icon-status"
                  onClick={() =>
                    navigate(`/addBook/${book.id}/${existingBook}`)
                  }
                  color="#00693e"
                  fill="#00693e"
                  fillOpacity={0.5}
                  size={sizeIcon}
                />
              </>
            ) : book.status === "reading" ? (
              <>
                <Tooltip id="reading-books" />
                <BookOpen
                  data-tooltip-id="reading-books"
                  data-tooltip-content="Lendo"
                  className="icon-status"
                  onClick={() =>
                    navigate(`/addBook/${book.id}/${existingBook}`)
                  }
                  color="#f3b93f"
                  fill="#f3b93f"
                  fillOpacity={0.5}
                  size={sizeIcon}
                />
              </>
            ) : book.status === "wish" ? (
              <>
                <Tooltip id="wish-books" />
                <BookDashed
                  data-tooltip-id="wish-books"
                  data-tooltip-content="Quero ler"
                  className="icon-status"
                  onClick={() =>
                    navigate(`/addBook/${book.id}/${existingBook}`)
                  }
                  color="#175676"
                  size={sizeIcon}
                />
              </>
            ) : book.status === "abandoned" ? (
              <>
                <Tooltip id="abandoned-books" />
                <BookDown
                  data-tooltip-id="abandoned-books"
                  data-tooltip-content="Abandonado"
                  className="icon-status"
                  onClick={() =>
                    navigate(`/addBook/${book.id}/${existingBook}`)
                  }
                  color="#000000"
                  fill="#000000"
                  fillOpacity={0.5}
                  size={sizeIcon}
                />
              </>
            ) : book.status === "rereading" ? (
              <>
                <Tooltip id="rereading-books" />
                <BookOpen
                  data-tooltip-id="rereading-books"
                  data-tooltip-content="Relendo"
                  className="icon-status"
                  onClick={() =>
                    navigate(`/addBook/${book.id}/${existingBook}`)
                  }
                  color="#df6d2f"
                  fill="#df6d2f"
                  fillOpacity={0.5}
                  size={25}
                />
              </>
            ) : (
              <>
                <Tooltip id="add-books" />
                <Plus
                  data-tooltip-id="add-books"
                  data-tooltip-content="Adicionar"
                  className="icon-status"
                  onClick={() => navigate(`/addBook/${book.id}/${newBook}`)}
                  color="#574145"
                  size={sizeIcon}
                />
              </>
            )}
            <div className="book-infos">
              <strong>{book.title}</strong>
              <p>{book?.name}</p>
              <small> {book.metricDone} Avaliações </small>
            </div>
            <div className="reading-data">
              {book.metricDone >= 2 ? (
                <p>
                  <strong>{book.metricDone}</strong> Leram{" "}
                </p>
              ) : (
                <p>
                  <strong>{book.metricDone}</strong> Leu{" "}
                </p>
              )}
              {book.metricWish >= 2 ? (
                <p>
                  <strong>{book.metricWish}</strong> Querem ler
                </p>
              ) : (
                <p>
                  <strong>{book.metricWish}</strong> Quer ler
                </p>
              )}
              {book.metricReading >= 2 ? (
                <p>
                  <strong>{book.metricReading}</strong> Lendo
                </p>
              ) : (
                <p>
                  <strong>{book.metricReading}</strong> Lendo
                </p>
              )}
            </div>

            <section className="rating">
              <p>Avaliações</p>
              {book.totalstars && (
                <div className="stars">
                  <strong> {book.totalstars.toFixed(1)}</strong>
                  <Rating
                    fillColor="#574145"
                    allowFraction={true}
                    size={40}
                    readonly={true}
                    initialValue={book.totalstars}
                  />
                </div>
              )}
              {!book.totalstars && (
                <div className="stars">
                  <p> Livro sem avaliações. </p>
                </div>
              )}
            </section>
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
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;
  .loading {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
    margin-top: 30vh;
  }
  .header {
    height: 15vh;
    width: 100%;
    background-color: #fde8e9;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #5741457a;
    .logo {
      position: absolute;
      display: none;

      @media (min-width: 800px) {
        width: 180px;
        display: block;
        left: 25;
      }
      @media (min-width: 1250px) {
        left: 100px;
      }
      @media (min-width: 1400px) {
        left: 150px;
      }
    }
  }

  .content {
    @media (min-width: 800px) {
      width: calc(100vw - 250px);
      position: fixed;
      left: 140px;
      top: 150px;
    }
    @media (min-width: 1250px) {
      width: calc(100vw - 460px);
      position: fixed;
      left: 240px;
    }
    @media (min-width: 1400px) {
      left: 290px;
      width: calc(100vw - 510px);
    }
    img {
      height: 20vh;
      position: absolute;
      top: 5vh;

      @media (max-width: 400px) {
        top: 20px;
      }
      @media (min-width: 800px) {
        top: -100;
      }
      @media (min-width: 1250px) {
        height: 25vh;
      }
    }
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
    right: 20vw;
    @media (max-width: 400px) {
      right: 10vw;
    }
    @media (min-width: 800px) {
      width: 35px;
      height: 35px;
    }
  }
  .icon-status:hover {
    cursor: pointer;
  }
  .undo2-icon {
    @media (min-width: 800px) {
      display: none;
    }
  }
  .undo2-icon:hover {
    cursor: pointer;
  }
  .book-infos {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 600px) {
      margin-top: 40px;
    }
    strong {
      font-weight: 600;
      padding: 10px;
      font-size: 18px;
    }
    small {
      padding-bottom: 15px;
      font-size: 14px;
    }
    p {
      padding-bottom: 15px;
    }
  }
  .reading-data {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    filter: drop-shadow(1px 2px 3px #000000);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #ffffff;
    strong {
      font-weight: 600;
    }
  }
  .div-img {
    padding-top: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .rating {
    height: 15vh;
    padding-top: 10px;
    background-color: #ffffff;
    filter: drop-shadow(1px 2px 2px #000000);
    display: flex;
    align-items: flex-start;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    p {
      margin-left: 20px;
      font-size: 20px;
      font-weight: 600;
    }
    .stars {
      display: flex;
      align-items: center;
      margin-top: 20px;
      p {
        font-weight: 400;
      }
      strong {
        font-weight: 600;
        font-size: 30px;
        margin-left: 30px;
      }
      span {
        margin-left: 10;
      }
    }
  }
`;
