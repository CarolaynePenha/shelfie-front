import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

import TokenContext from "../context/TokenContext";
import { dateCodateConverter, logOut } from "../utils";
import UserContext from "../context/UserContext";
import { CalendarDays, Undo2 } from "lucide-react";
import Calendar from "./Calendar";

export default function AddBookInShelf() {
  const { id } = useParams();
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

  useEffect(() => {
    async function getBookById() {
      const URL = process.env.REACT_APP_API_URL + `/book/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        console.log("data: ", data);
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
        }
        if (data.status && data.status === "done") {
          const inicialDate = dateCodateConverter(data.startDate);
          const finalDate = dateCodateConverter(data.endDate);
          setRatingInfos({
            ...ratingInfos,
            startDate: inicialDate,
            endDate: finalDate,
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
  }, []);

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
        { ...infosPost, type, status },
        config
      );
      setRatingInfos({ ...ratingInfos, shelfId: data.id });
    } catch (err) {
      console.log(err.response);
      alert("Algo deu errado, tente novamente");
    }
  }

  useEffect(() => {
    async function postRating() {
      const URL = `${process.env.REACT_APP_API_URL}/rating`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.post(
          URL,
          {
            ...ratingInfos,
            startDate: new Date(ratingInfos.startDate).toISOString(),
            endDate: new Date(ratingInfos.endDate).toISOString(),
            stars: ratingInfos.stars,
          },
          config
        );
      } catch (err) {
        console.log(err.response);
        alert("Algo deu errado, tente novamente");
      }
    }
    if (infosPost.status === "Lido" && ratingInfos.shelfId !== "") {
      postRating();
    }
  }, [ratingInfos.shelfId]);

  const { iHave, status, type } = infosPost;
  const bookStatus = ["Lido", "Lendo", "Quero ler", "Abandonei", "Relendo"];
  const bookType = ["Papel", "E-book", "Áudio"];

  const handleRating = (rate) => {
    setRating(rate);
    setRatingInfos({ ...ratingInfos, stars: rate });
  };
  console.log("editable: ", editable);

  return (
    <>
      <Container>
        <div className="header">
          <Undo2 onClick={() => navigate(-1)} color="#574145" size={25} />
        </div>
        <img src={book?.bookImage} alt="Capa do livro" />
        {book && (
          <form onSubmit={post}>
            <div className="have">
              <input
                disabled={!editable}
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
                disabled={!editable}
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
                disabled={!editable}
                required
                value={type}
                onChange={(e) => {
                  setInfosPost({ ...infosPost, type: e.target.value });
                }}
              >
                {bookType.map((value, index) => {
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
              }}
            >
              {bookStatus.map((value, index) => {
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
                    disabled={!editable}
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
                      disabled={!editable}
                      required
                      value={ratingInfos.startDate}
                      onClick={() => setShowCalendar("startDate")}
                    />
                    <CalendarDays size={20} />
                  </div>
                  <label>Data de fim da Leitura</label>
                  <div className="date-input">
                    <input
                      disabled={!editable}
                      required
                      value={ratingInfos.endDate}
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
                    />
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {editable && <button type="submit"> Salvar</button>}
            {!editable && (
              <button
                onClick={() => {
                  setEditable(true);
                }}
              >
                Editar
              </button>
            )}
          </form>
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
    height: 19vh;
    width: 100%;
    background-color: #fde8e9;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-bottom: 1px solid #5741457a;
  }
  img {
    height: 20vh;
    position: fixed;
    top: 8vh;
  }

  form {
    width: 100%;
    margin-top: 10vh;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid #5741457a;
    flex-direction: column;
    button {
      width: 50%;
      height: 40px;
      border-radius: 5px;
      margin: 20px auto;
      border: none;
      background-color: #965361;
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .have {
    display: flex;
    padding-top: 10px;
    margin: 10px auto;
  }
  .have:last-child {
    padding-bottom: 10px;
    border-bottom: 1px solid #5741457a;
  }
  select {
    width: 60%;
    margin: 20px auto;
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
    height: 20vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #5741457a;
    p {
      font-size: 20px;
      font-weight: 600;
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
      height: 30px;
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
      height: 30px;
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
