import { useContext, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import axios from "axios";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TokenContext from "../context/TokenContext";
import SrcContext from "../context/SrcContext";
import Logo from "./../assets/logo.png";
import { logOut } from "../utils";
import UserContext from "../context/UserContext";

export default function HeaderSearch({ srcBar, setSrcBar, setBooks }) {
  const { token, setToken } = useContext(TokenContext);
  const { srcInfosArr, setSrcInfosArr } = useContext(SrcContext);
  const { setUser } = useContext(UserContext);
  let srcArr = [];
  const navigate = useNavigate();

  useEffect(() => {
    async function search() {
      const URL = process.env.REACT_APP_API_URL + `/srcBar?src=${srcBar}`;
      srcArr = [...srcInfosArr];
      if (srcBar !== "") {
        for (let i = 0; i < 10; i++) {
          if (srcArr.length < 10) {
            srcArr.unshift(srcBar);
            setSrcInfosArr([...srcArr]);
            const stringifySrcInfosArr = JSON.stringify([...srcArr]);
            localStorage.setItem("srcInfosArr", stringifySrcInfosArr);
            i = 10;
          } else {
            srcArr.pop();
            srcArr.unshift(srcBar);
            i = 10;
            const stringifySrcInfosArr = JSON.stringify([...srcArr]);
            localStorage.setItem("srcInfosArr", stringifySrcInfosArr);
            setSrcInfosArr([...srcArr]);
          }
        }
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get(URL, config);
        setBooks(data);
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
    search();
  }, [srcBar]);

  return (
    <DivHeader>
      <div className="src">
        <img src={Logo} alt="Logo" onClick={() => navigate("/shelf")} />
        <DebounceInput
          minLength={3}
          className="debounce-input"
          debounceTimeout={700}
          placeholder={"Pesquise por livros"}
          onChange={(event) => setSrcBar(event.target.value)}
        />
        <div className="icon-src">
          <Search color="#574145" size={15} />
        </div>
      </div>
    </DivHeader>
  );
}

// ----------------------css
const DivHeader = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fde8e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  border-bottom: 1px solid #5741457a;
  top: 0;
  z-index: 2;

  .src {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .debounce-input {
      width: 60%;
      border: none;
      height: 35px;
      z-index: 3;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      @media (min-width: 600px) {
        font-size: 14px;
        margin-top: 5px;
      }
      @media (min-width: 800px) {
        height: 40px;
        width: 480px;
        position: absolute;
        top: 20px;
        left: 250px;
      }
      @media (min-width: 1250px) {
        left: 380px;
      }
    }
    img {
      width: 120px;
      position: absolute;
      top: 0;
      left: 5;
      @media (min-width: 600px) {
        width: 150px;
      }
      @media (min-width: 800px) {
        width: 180px;
        top: 12px;
        left: 25;
      }
      @media (min-width: 1250px) {
        left: 100px;
      }
      @media (min-width: 1400px) {
        left: 150px;
      }
    }

    .icon-src {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      background-color: #ffffff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      @media (min-width: 600px) {
        margin-top: 5px;
      }
      @media (min-width: 800px) {
        position: absolute;
        height: 40px;
        top: 20px;
        left: 730px;
      }
      @media (min-width: 1250px) {
        left: 860px;
      }
    }
  }
`;
