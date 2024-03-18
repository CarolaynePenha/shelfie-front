import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Footer from "./Footer";
import HeaderProfile from "./HeaderProfile";
import TokenContext from "../context/TokenContext";
import { Rating } from "react-simple-star-rating";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [ranking, setRanking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookById() {
      const URL = process.env.REACT_APP_API_URL + `/ranking`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setRanking(data);
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
    getBookById();
  }, []);

  return (
    <>
      <HeaderProfile />
      <Container>
        {ranking && (
          <>
            <p>
              <strong>Ranking</strong>
            </p>
            {ranking.map((rank) => {
              return (
                <section>
                  <img src={rank.bookImage} alt="capa do livro" />
                  <div className="rating">
                    <Rating
                      fillColor="#574145"
                      allowFraction={true}
                      readonly={true}
                      size={40}
                      initialValue={rank.avgStars}
                    />
                    <p>Avaliado por {rank.totalOfRankings} pessoas</p>
                  </div>
                </section>
              );
            })}
          </>
        )}
        {!ranking || (!ranking.length && <p>Nenhum livro avaliado ainda.</p>)}
      </Container>
      <Footer />
    </>
  );
}

// -------------css
const Container = styled.section`
  width: 100%;
  margin-top: 19vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  p {
    padding: 10px;
  }
  strong {
    font-weight: bold;
    font-size: 25px;
  }
  section {
    width: 100%;
    display: flex;
    margin: 10px 0px;
    padding: 20px 0px;
    justify-content: space-evenly;
    background-color: #ffffff;
    filter: drop-shadow(1px 2px 2px #000000);
    img {
      height: 15vh;
    }
  }
`;
