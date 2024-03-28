import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import { LogOut } from "lucide-react";
import Logo from "./../assets/logo.png";
import { logOut } from "../utils";
import TokenContext from "../context/TokenContext";

export default function HeaderProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  return (
    <DivHeader>
      <img className="logo" src={Logo} alt="Logo" />
      <LogOut
        onClick={() => logOut(setToken, setUser, navigate)}
        className="icon-logout"
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <img className="img" src={user.image} alt="Imagem do Usuario" />
    </DivHeader>
  );
}

// ----------------------css
const DivHeader = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fde8e9;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid #5741457a;
  .logo {
    width: 120px;
    position: absolute;
    top: 10px;
    left: 20px;
    @media (min-width: 600px) {
      width: 150px;
    }
    @media (min-width: 800px) {
      width: 180px;
      left: 25;
    }
    @media (min-width: 1250px) {
      left: 100px;
    }
    @media (min-width: 1400px) {
      left: 150px;
    }
  }
  .img {
    width: 40px;
    height: 50px;
    border-radius: 15px;
    position: absolute;
    top: 10px;
    right: 18%;
    @media (min-width: 800px) {
      position: absolute;
      right: 80px;
    }
    @media (min-width: 1250px) {
      left: calc(230px + (100vw - 570px));
    }
  }
  .img:hover {
    cursor: pointer;
  }
  .icon-logout {
    position: absolute;
    top: 10px;
    right: 20px;
    @media (min-width: 800px) {
      width: 30px;
      height: 30px;
    }
    @media (min-width: 1250px) {
      left: calc(230px + (100vw - 500px));
    }
  }
  .icon-logout:hover {
    cursor: pointer;
  }
`;
