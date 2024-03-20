import styled from "styled-components";
import { BookUser, Home, Rocket, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const menu = {
    shelf: "shelf",
    release: "release",
    search: "search",
    ranking: "ranking",
    profile: "profile",
  };
  return (
    <DivFooter>
      <Home
        className="icon-footer"
        onClick={() => {
          navigate(`/${menu.shelf}`);
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Rocket
        className="icon-footer"
        onClick={() => {
          navigate(`/${menu.release}`);
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Search
        className="icon-footer"
        onClick={() => {
          navigate(`/${menu.search}`);
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <Trophy
        className="icon-footer"
        onClick={() => {
          navigate(`/${menu.ranking}`);
        }}
        color="#574145"
        fill="#574145"
        fillOpacity={0.5}
        size={25}
      />
      <BookUser
        className="icon-footer"
        onClick={() => {
          navigate(`/${menu.profile}`);
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
  .icon-footer:hover {
    cursor: pointer;
  }
  @media (min-width: 800px) {
    flex-direction: column;
    width: 100px;
    height: 40vh;
    top: 30vh;
    left: 20px;

    .icon-footer {
      width: 32px;
      height: 32px;
    }
  }
  @media (min-width: 1250px) {
    margin-left: 100px;
  }
  @media (min-width: 1400px) {
    margin-left: 150px;
  }
`;
