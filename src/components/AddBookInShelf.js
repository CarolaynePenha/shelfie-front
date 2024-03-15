import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
import { CalendarDays, Heart, Undo2 } from "lucide-react";

import TokenContext from "../context/TokenContext";
import { convertToISOString, dateConverterToString, logOut } from "../utils";
import UserContext from "../context/UserContext";
import Calendar from "./Calendar";

export default function AddBookInShelf() {
  const { id, existInShelf } = useParams();
  const [existInShelfParams, setExistInShelfParams] = useState(existInShelf);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [book, setBook] = useState("");
  const [editable, setEditable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [infosPost, setInfosPost] = useState({
    iHave: false,
    bookId: Number(id),
    type: "Papel",
    status: "Lido",
  });
  const [ratingInfos, setRatingInfos] = useState({
    bookId: Number(id),
    shelfId: "",
    stars: 0.0,
    startDate: "",
    endDate: "",
  });

  const [rating, setRating] = useState(0);
  const { token, setToken } = useContext(TokenContext);
  const [favorite, setFavorite] = useState(false);

  const bookTypeMapper = {
    Papel: "paper",
    "E-book": "ebook",
    Áudio: "audio",
  };
  const bookStatusMapper = {
    Lido: "done",
    Lendo: "reading",
    "Quero ler": "wish",
    Abandonei: "abandoned",
    Relendo: "rereading",
  };
  let bookStatus = false;
  let bookType = false;

  useEffect(() => {
    async function getBookById() {
      let URL;
      if (existInShelfParams === "newBook") {
        URL = process.env.REACT_APP_API_URL + `/book/${id}`;
      } else {
        URL = process.env.REACT_APP_API_URL + `/shelf/${id}`;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setBook(data);

        if (data.status) {
          const typeBook = Object.keys(bookTypeMapper).find(
            (key) => bookTypeMapper[key] === data.type
          );
          const statusBook = Object.keys(bookStatusMapper).find(
            (key) => bookStatusMapper[key] === data.status
          );
          setInfosPost({
            ...infosPost,
            status: statusBook,
            type: typeBook,
            iHave: data.iHave,
          });
          setFavorite(data.favorite);
        }
        if (existInShelfParams === "newBook") {
          setRatingInfos({
            ...ratingInfos,
            startDate: new Date(),
            endDate: new Date(),
          });
        }

        if (existInShelfParams === "existingBook") {
          setRatingInfos({
            ...ratingInfos,
            startDate: data.startDate || new Date(),
            endDate: data.endDate || new Date(),
            shelfId: data.id,
          });
          setRating(data.totalstars);
        }
      } catch (err) {
        console.log("err: ", err);
        console.log("error.response", err.response);
        if (err.response?.status === 401) {
          alert("Usuário inválido, faça login novamente");
          logOut(setToken, setUser, navigate);
        } else if (err.response?.status === 404) {
          alert("Livro não encontrado");
          navigate("/shelf");
        } else if (err.response) {
          console.log("erro");
          alert("Houve um erro ao realizar sua busca!");
        }
      }
    }
    getBookById();
  }, [existInShelfParams]);

  async function post(event) {
    event.preventDefault();
    setEditable(false);
    const URL = `${process.env.REACT_APP_API_URL}/shelf`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const type = bookTypeMapper[infosPost.type];
    const status = bookStatusMapper[infosPost.status];

    try {
      const { data } = await axios.post(
        URL,
        { ...infosPost, type, status, favorite },
        config
      );
      if (infosPost.status === "Lido") {
        postRating(data.id);
      }
      if (infosPost.status !== "Lido") {
        setExistInShelfParams("existingBook");
      }
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  async function postRating(shelfId) {
    const URL = `${process.env.REACT_APP_API_URL}/rating`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        URL,
        {
          ...ratingInfos,
          startDate: new Date(ratingInfos.startDate).toISOString(),
          endDate: new Date(ratingInfos.endDate).toISOString(),
          stars: ratingInfos.stars,
          shelfId,
        },
        config
      );
      if (existInShelfParams === "newBook") {
        setExistInShelfParams("existingBook");
      }
      setBook({ ...book, ratingId: data.id });
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  async function updateShelfInfos({ bookStatus, bookType, iHaveBook }) {
    const URL = `${process.env.REACT_APP_API_URL}/shelf`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let status;
    let type;
    if (!bookType && bookStatus) {
      status = bookStatusMapper[bookStatus];
    } else if (bookType && !bookStatus) {
      type = bookTypeMapper[bookType];
    } else if (!bookType && !bookStatus) {
      type = bookTypeMapper[infosPost.type];
      status = bookStatusMapper[infosPost.status];
    }
    let iHave;
    if (iHaveBook === "true") {
      iHave = true;
    } else if (iHaveBook === "false") {
      iHave = false;
    } else {
      iHave = infosPost.iHave;
    }

    try {
      await axios.put(URL, { ...infosPost, type, status, iHave }, config);
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  async function updateFavoriteBook() {
    const URL = `${process.env.REACT_APP_API_URL}/shelf/favorite`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const updateInfos = {
      bookId: book.bookId,
      favorite: !favorite,
    };
    try {
      await axios.put(URL, updateInfos, config);
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  async function updateRating(rate) {
    const URL = `${process.env.REACT_APP_API_URL}/rating`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(
        URL,
        {
          ...ratingInfos,
          startDate: convertToISOString(ratingInfos.startDate),
          endDate: convertToISOString(ratingInfos.endDate),
          stars: rate || ratingInfos.stars,
        },
        config
      );
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  async function deleteBooksInShelf() {
    const URL = `${process.env.REACT_APP_API_URL}/shelf/${book.bookId}/${book.id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(URL, config);
      navigate("/shelf");
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  const { iHave, status, type } = infosPost;
  const bookStatusArr = ["Lido", "Lendo", "Quero ler", "Abandonei", "Relendo"];
  const bookTypeArr = ["Papel", "E-book", "Áudio"];

  const handleRating = (rate) => {
    setRating(rate);
    setRatingInfos({ ...ratingInfos, stars: rate });
    if (existInShelfParams === "existingBook") {
      handleSubmitRating(rate);
    }
  };

  const handleSubmitRating = (rate) => {
    if (book.ratingId) {
      updateRating(rate);
    } else {
      postRating(book.id);
    }
  };

  return (
    <>
      <Container>
        <div className="header">
          <Undo2 onClick={() => navigate(-1)} color="#574145" size={25} />
          {favorite && infosPost.status === "Lido" && (
            <Heart
              className="heart-icon"
              color="#850606"
              fill="#850606"
              onClick={() => {
                if (existInShelfParams === "newBook") {
                  setFavorite(!favorite);
                } else {
                  updateFavoriteBook();
                  setFavorite(!favorite);
                }
              }}
              fillOpacity={1}
              size={30}
            />
          )}
          {!favorite && infosPost.status === "Lido" && (
            <Heart
              className="heart-icon"
              color="#850606"
              fill="#850606"
              onClick={() => {
                if (existInShelfParams === "newBook") {
                  setFavorite(!favorite);
                } else {
                  updateFavoriteBook();
                  setFavorite(!favorite);
                }
              }}
              fillOpacity={0}
              size={30}
            />
          )}
        </div>
        <img src={book?.bookImage} alt="Capa do livro" />
        {book && existInShelfParams === "newBook" && (
          <form onSubmit={post}>
            <div className="have">
              <input
                required
                onClick={() => setInfosPost({ ...infosPost, iHave: true })}
                type="radio"
                name="Ihave"
                value="Tenho"
                defaultChecked={infosPost.iHave === true}
              />
              <label>Tenho</label>
            </div>
            <div className="have">
              <input
                required
                onClick={() => setInfosPost({ ...infosPost, iHave: false })}
                type="radio"
                name="Ihave"
                value="Não tenho"
                defaultChecked={infosPost.iHave === false}
              />
              <label>Não tenho</label>
            </div>
            {iHave && (
              <select
                required
                value={type}
                onChange={(e) => {
                  setInfosPost({ ...infosPost, type: e.target.value });
                }}
              >
                {bookTypeArr.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            )}
            <select
              required
              value={status}
              onChange={(e) => {
                setInfosPost({ ...infosPost, status: e.target.value });
              }}
            >
              {bookStatusArr.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            {infosPost.status === "Lido" ? (
              <>
                <div className="rating">
                  <p>Quantas estrelas?</p>
                  <Rating
                    onClick={handleRating}
                    fillColor="#574145"
                    allowFraction={true}
                    transition={true}
                    size={50}
                    tooltipDefaultText={"Avalie"}
                    showTooltip={true}
                    initialValue={rating}
                    tooltipArray={[
                      "Muito ruim:  0.5",
                      "Ruim:  1.0",
                      "Ruim:  1.5",
                      "Razoável:  2.0",
                      "Razoável:  2.5",
                      "Bom:  3.0",
                      "Bom:  3.5",
                      "Muito Bom:  4.0",
                      "Quase Perfeito:  4.5 ",
                      "Perfeito:  5.0",
                    ]}
                  />
                </div>
                <div className="date">
                  <label>Data de início da Leitura</label>
                  <div className="date-input">
                    <input
                      required
                      value={dateConverterToString(ratingInfos.startDate)}
                      onClick={() => setShowCalendar("startDate")}
                    />
                    <CalendarDays size={20} />
                  </div>
                  <label>Data de fim da Leitura</label>
                  <div className="date-input">
                    <input
                      required
                      value={dateConverterToString(ratingInfos.endDate)}
                      onClick={() => setShowCalendar("endDate")}
                    />
                    <CalendarDays size={20} />
                  </div>

                  {showCalendar === "startDate" ||
                  showCalendar === "endDate" ? (
                    <Calendar
                      setRatingInfos={setRatingInfos}
                      ratingInfos={ratingInfos}
                      startOrEndDate={showCalendar}
                      setShowCalendar={setShowCalendar}
                      existInShelfParams={existInShelfParams}
                      handleSubmitRating={handleSubmitRating}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            <button type="submit"> Salvar</button>
          </form>
        )}
        {book && existInShelfParams === "existingBook" && (
          <section>
            <div className="have">
              <input
                disabled={!editable}
                required
                onClick={() => {
                  setInfosPost({ ...infosPost, iHave: true });
                  updateShelfInfos({ bookStatus, bookType, iHaveBook: "true" });
                }}
                type="radio"
                name="Ihave"
                value="Tenho"
                defaultChecked={infosPost.iHave === true}
              />
              <label>Tenho</label>
            </div>
            <div className="have">
              <input
                disabled={!editable}
                required
                onClick={() => {
                  setInfosPost({ ...infosPost, iHave: false });
                  updateShelfInfos({
                    bookStatus,
                    bookType,
                    iHaveBook: "false",
                  });
                }}
                type="radio"
                name="Ihave"
                value="Não tenho"
                defaultChecked={infosPost.iHave === false}
              />
              <label>Não tenho</label>
            </div>
            {iHave && (
              <select
                disabled={!editable}
                required
                value={type}
                onChange={(e) => {
                  setInfosPost({ ...infosPost, type: e.target.value });
                  bookType = e.target.value;
                  updateShelfInfos({ bookStatus, bookType });
                }}
              >
                {bookTypeArr.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            )}
            <select
              required
              disabled={!editable}
              value={status}
              onChange={(e) => {
                setInfosPost({ ...infosPost, status: e.target.value });
                bookStatus = e.target.value;
                updateShelfInfos({ bookStatus, bookType });
              }}
            >
              {bookStatusArr.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            {infosPost.status === "Lido" ? (
              <>
                <div className="rating">
                  <p>Quantas estrelas?</p>
                  <Rating
                    onClick={handleRating}
                    fillColor="#574145"
                    allowFraction={true}
                    transition={true}
                    readonly={!editable}
                    size={40}
                    tooltipDefaultText={"Avalie"}
                    showTooltip={true}
                    initialValue={rating}
                    tooltipArray={[
                      "Muito ruim:  0.5",
                      "Ruim:  1.0",
                      "Ruim:  1.5",
                      "Razoável:  2.0",
                      "Razoável:  2.5",
                      "Bom:  3.0",
                      "Bom:  3.5",
                      "Muito Bom:  4.0",
                      "Quase Perfeito:  4.5 ",
                      "Perfeito:  5.0",
                    ]}
                  />
                </div>
                <div className="date">
                  <label>Data de início da Leitura</label>
                  <div className="date-input">
                    <input
                      disabled={!editable}
                      required
                      value={dateConverterToString(ratingInfos.startDate)}
                      onClick={() => {
                        setShowCalendar("startDate");
                      }}
                    />
                    <CalendarDays size={20} />
                  </div>
                  <label>Data de fim da Leitura</label>
                  <div className="date-input">
                    <input
                      disabled={!editable}
                      required
                      value={dateConverterToString(ratingInfos.endDate)}
                      onClick={() => {
                        setShowCalendar("endDate");
                      }}
                    />
                    <CalendarDays size={20} />
                  </div>

                  {showCalendar === "startDate" ||
                  showCalendar === "endDate" ? (
                    <Calendar
                      setRatingInfos={setRatingInfos}
                      ratingInfos={ratingInfos}
                      startOrEndDate={showCalendar}
                      setShowCalendar={setShowCalendar}
                      existInShelfParams={existInShelfParams}
                      handleSubmitRating={handleSubmitRating}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {!editable && (
              <>
                {" "}
                <button
                  onClick={() => {
                    setEditable(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    deleteBooksInShelf();
                  }}
                >
                  Excluir
                </button>
              </>
            )}
            {editable && (
              <button
                onClick={() => {
                  setEditable(false);
                }}
              >
                Parar de editar
              </button>
            )}
          </section>
        )}
      </Container>
    </>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .header {
    height: 15vh;
    width: 100%;
    background-color: #fde8e9;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #5741457a;
    .heart-icon {
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  img {
    height: 20vh;
    position: absolute;
    top: 5vh;
  }
  section {
    width: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }
  form {
    width: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid #5741457a;
    flex-direction: column;
  }
  button {
    width: 50%;
    height: 40px;
    border-radius: 5px;
    margin: 10px auto;
    border: none;
    background-color: #965361;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .delete {
    background-color: transparent;
    border: 2px dashed #790a1e;
    color: #790a1e;
  }
  .have {
    display: flex;
    margin: 10px auto;
  }
  .have:first-child {
    padding-top: 15px;
  }
  select {
    width: 60%;
    margin: 10px auto;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    &:focus {
      border: solid 2px #574145;
      outline: none;
    }
  }

  .rating {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #5741457a;
    p {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    .react-simple-star-rating {
      display: flex;
      margin-bottom: 5px;
    }
  }

  .date {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    input {
      width: 100%;
      height: 35px;
      border-radius: 5px;
      border: none;
      background-color: #ffffff;
      &:focus {
        border: solid 2px #574145;
        outline: none;
      }
    }
    .date-input {
      background-color: #ffffff;
      height: 35px;
      margin: 10px 10%;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    label {
      margin: 0 10%;
    }
  }
`;
