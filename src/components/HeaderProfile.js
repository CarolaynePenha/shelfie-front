import { useContext } from "react";
import styled from "styled-components";

import { LogOut } from "lucide-react";

import Logo from "./../assets/logo.png";
import UserContext from "../context/UserContext";

export default function HeaderProfile() {
  const { user } = useContext(UserContext);
  return (
    <DivHeader>
      <LogOut
        className="icon-logout"
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <img className="logo" src={Logo} />
      <div className="user">
        <img className="img" src={user.image} />
        <p>{user.name}</p>
      </div>
    </DivHeader>
  );
}

// ----------------------css
const DivHeader = styled.div`
  width: 100%;
  height: 16vh;
  background-color: #fde8e9;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  position: fixed;
  top: 0;
  z-index: 2;
  filter: drop-shadow(1px 2px 2px #000000);
  .logo {
    width: 40%;
    position: absolute;
    top: 2;
    left: 2;
  }
  .img {
    width: 40px;
    height: 50px;
    border-radius: 15px;
    margin-bottom: 10px;
  }
  .icon-logout {
    position: absolute;
    top: 12;
    right: 20;
  }
  .user {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-left: 15px;
    p {
      font-weight: 600;
      font-style: italic;
      font-size: 18px;
      padding-left: 6px;
      margin-bottom: 10px;
    }
  }
`;
