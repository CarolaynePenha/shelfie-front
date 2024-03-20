import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {
  BookDashed,
  BookDown,
  BookHeart,
  BookMarked,
  BookOpenCheck,
  Layers3,
} from "lucide-react";
import axios from "axios";

import Footer from "./Footer";
import HeaderProfile from "./HeaderProfile";
import TokenContext from "../context/TokenContext";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "../utils";

export default function Profile() {
  const sizeIcon = 25;
  const { token, setToken } = useContext(TokenContext);
  const { setUser } = useContext(UserContext);
  const [metrics, setMetrics] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMetrics() {
      const URL = process.env.REACT_APP_API_URL + `/shelf/metrics`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setMetrics(data);
      } catch (err) {
        console.log(err.response);
        if (err.response.status === 401) {
          alert("Usuário inválido, faça login novamente");
          logOut(setToken, setUser, navigate);
        } else {
          alert("Houve um erro ao realizar sua busca!");
        }
      }
    }
    getMetrics();
  }, []);
  return (
    <>
      <HeaderProfile />
      <Container>
        <div className="metrics">
          <div className="metric">
            <p>
              <strong>{metrics.doneBooks}</strong> livros lidos
            </p>
            <BookOpenCheck
              color="#00693e"
              fill="#00693e"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          </div>
          <div className="metric">
            <p>
              <strong>{metrics.totalBooks}</strong> livros na estante
            </p>
            <BookMarked
              color="#574145"
              fill="#574145"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          </div>
          <div className="metric">
            <p>
              <strong> {metrics.totalPages}</strong> páginas lidas
            </p>
            <Layers3
              color="#00693e"
              fill="#00693e"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          </div>
          <div className="metric">
            <p>
              <strong>{metrics.abandonedBooks}</strong> livros abandonados
            </p>
            <BookDown
              color="#000000"
              fill="#000000"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          </div>
          <div className="metric">
            <p>
              <strong>{metrics.wishBooks}</strong> livros que você quer ler{" "}
            </p>
            <BookDashed color="#175676" size={sizeIcon} />
          </div>
          <div className="metric">
            <p>
              <strong>{metrics.favoriteBooks}</strong> livros favoritados
            </p>
            <BookHeart
              color="#850606"
              fill="#850606"
              fillOpacity={0.5}
              size={sizeIcon}
            />
          </div>
        </div>
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
  @media (min-width: 800px) {
    width: calc(100vw - 250px);
    position: fixed;
    left: 140px;
  }
  @media (min-width: 1250px) {
    width: calc(100vw - 460px);
    position: fixed;
    left: 230px;
  }
  @media (min-width: 1400px) {
    left: 280px;
    width: calc(100vw - 510px);
  }

  .metrics {
    width: 100%;
    margin-top: 20vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 20px;
    filter: drop-shadow(1px 2px 2px #000000);
    p {
      font-size: 18px;
      margin-bottom: 20px;
      strong {
        font-weight: bold;
        padding-right: 10px;
      }
    }
  }
  .metric {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
