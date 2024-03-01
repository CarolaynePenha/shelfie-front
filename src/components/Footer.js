import styled from "styled-components";
import { BookUser, Home, Rocket, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <DivFooter>
      <Home
        onClick={() => {
          navigate("/shelf");
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Rocket
        onClick={() => {
          navigate("/release");
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Search
        onClick={() => {
          navigate("/search");
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Trophy
        onClick={() => {
          navigate("/ranking");
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <BookUser
        onClick={() => {
          navigate("/profile");
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
    </DivFooter>
  );
}

// ----------------------css
const DivFooter = styled.div`
  height: 8vh;
  width: 100%;
  background-color: #fde8e9;
  display: flex;
  justify-content: space-evenly;
  filter: drop-shadow(1px 2px 2px #000000);
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;
