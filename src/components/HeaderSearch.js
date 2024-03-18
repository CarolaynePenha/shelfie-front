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
import { useState } from "react";

export default function HeaderSearch({ srcBar, setSrcBar, setBooks }) {
  const { token, setToken } = useContext(TokenContext);
  const { srcInfosArr, setSrcInfosArr } = useContext(SrcContext);
  const { setUser } = useContext(UserContext);
  const [index, setIndex] = useState(9);
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
        <img src={Logo} alt="Logo" />
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
  height: 15vh;
  background-color: #fde8e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  .src {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    .debounce-input {
      width: 60%;
      border: none;
      height: 35px;
      z-index: 3;
    }
    img {
      width: 40%;
      position: absolute;
      top: 2;
      left: 2;
    }
    .icon-src {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      height: 35px;
      background-color: #ffffff;
    }
  }
`;
