import { useContext, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../context/TokenContext";
import { Search } from "lucide-react";
import Logo from "./../assets/logo.png";

export default function HeaderSearch({ srcBar, setSrcBar, setBooks }) {
  const { token } = useContext(TokenContext);

  useEffect(() => {
    async function search() {
      const URL = process.env.REACT_APP_API_URL + `/srcBar?src=${srcBar}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(URL, config);
        setBooks(data);
      } catch (err) {
        console.log(err.response);
        alert("Houve um erro ao realizar sua busca!");
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
          debounceTimeout={500}
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
