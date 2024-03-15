import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Footer from "./Footer";
import HeaderProfile from "./HeaderProfile";
import TokenContext from "../context/TokenContext";
import { Rating } from "react-simple-star-rating";

export default function Ranking() {
  const { token } = useContext(TokenContext);
  const [ranking, setRanking] = useState(null);

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
        console.log("error.response", err.response);
        alert("Houve um erro ao realizar sua busca!");
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
