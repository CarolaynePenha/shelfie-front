import { useContext } from "react";
import styled from "styled-components";
import { BookDown, BookHeart, Search } from "lucide-react";
import { BookMarked } from "lucide-react";
import { BookDashed } from "lucide-react";
import { BookOpen } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";
import Logo from "./../assets/logo.png";

export default function Header({
  search,
  setSrcBar,
  srcBar,
  setGetShelfBooks,
  getShelfBooks,
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <DivHeader>
      <div className="top-shelf">
        <img className="logo" src={Logo} alt="Logo" />
        <img
          className="profile"
          onClick={() => navigate("/profile")}
          src={user.image}
          alt="userImage"
        />
      </div>
      <form onSubmit={search}>
        <div className="div-src">
          <input
            className="src-input"
            placeholder={"Buscar na minha estante"}
            value={srcBar}
            onChange={(event) => setSrcBar(event.target.value)}
          />
          <button type="submit">
            <Search color="#574145" size={18} />
          </button>
        </div>
      </form>
      <div className="book-marker">
        <Tooltip id="all-books" />
        <BookMarked
          data-tooltip-id="all-books"
          data-tooltip-content="Todos"
          onClick={() => setGetShelfBooks(!getShelfBooks)}
          className="icon-status"
          color="#574145"
          fill="#574145"
          fillOpacity={0.5}
          size={25}
        />
        <Tooltip id="done-books" />
        <BookOpenCheck
          data-tooltip-id="done-books"
          data-tooltip-content="Lidos"
          className="icon-status"
          onClick={(e) => {
            search(e, "done");
          }}
          color="#00693e"
          fill="#00693e"
          fillOpacity={0.5}
          size={25}
        />
        <Tooltip id="reading-books" />
        <BookOpen
          data-tooltip-id="reading-books"
          data-tooltip-content="Lendo"
          className="icon-status"
          onClick={(e) => {
            search(e, "reading");
          }}
          color="#f3b93f"
          fill="#f3b93f"
          fillOpacity={0.5}
          size={25}
        />
        <Tooltip id="wish-books" />
        <BookDashed
          data-tooltip-id="wish-books"
          data-tooltip-content="Quero ler"
          className="icon-status"
          onClick={(e) => {
            search(e, "wish");
          }}
          color="#175676"
          size={25}
        />
        <Tooltip id="rereading-books" />
        <BookOpen
          data-tooltip-id="rereading-books"
          data-tooltip-content="Relendo"
          className="icon-status"
          onClick={(e) => {
            search(e, "rereading");
          }}
          color="#df6d2f"
          fill="#df6d2f"
          fillOpacity={0.5}
          size={25}
        />
        <Tooltip id="abandoned-books" />
        <BookDown
          data-tooltip-id="abandoned-books"
          data-tooltip-content="Abandonados"
          className="icon-status"
          onClick={(e) => {
            search(e, "abandoned");
          }}
          color="#000000"
          fill="#000000"
          fillOpacity={0.5}
          size={25}
        />
        <Tooltip id="favorite-books" />
        <BookHeart
          data-tooltip-id="favorite-books"
          data-tooltip-content="Favoritos"
          className="icon-status"
          onClick={(e) => {
            search(e, "favorite");
          }}
          color="#850606"
          fill="#850606"
          fillOpacity={0.5}
          size={25}
        />
      </div>
    </DivHeader>
  );
}

// ----------------------css
const DivHeader = styled.div`
  height: 19vh;
  width: 100%;
  background-color: #fde8e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #5741457a;
  position: fixed;
  top: 0;
  z-index: 2;
  @media (min-width: 800px) {
    height: 10vh;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
  .top-shelf {
    width: 100%;
    padding: 5px 15px;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 40px;
      height: 50px;
      border-radius: 15px;
      @media (min-width: 600px) {
        margin-right: 15px;
        margin-top: 15px;
        @media (min-width: 800px) {
          margin-right: 0px;
          margin-top: 0px;
        }
      }
    }
    .logo {
      width: 180px;
      @media (min-width: 800px) {
        padding-top: 0;
        margin-bottom: 10px;
      }
      @media (min-width: 1250px) {
        margin-left: 100px;
      }
      @media (min-width: 1400px) {
        margin-left: 150px;
      }
    }
    .profile {
      @media (min-width: 1250px) {
        margin-right: 100px;
      }
      @media (min-width: 1400px) {
        margin-right: 150px;
      }
    }
    .profile:hover {
      cursor: pointer;
    }
  }

  form {
    width: 100%;
  }
  .src-input {
    width: 70%;
    border: none;
    height: 30px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    @media (min-width: 600px) {
      height: 40px;
      font-size: 14px;
    }
    @media (min-width: 800px) {
      width: 480px;
      position: absolute;
      top: 20px;
      left: 230px;
    }
    @media (min-width: 1250px) {
      margin-left: 100px;
      left: 250px;
    }
    @media (min-width: 1400px) {
      margin-left: 150px;
    }
  }
  .div-src {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    background-color: #ffffff;
    border: none;
    height: 30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    @media (min-width: 600px) {
      height: 40px;
    }
    @media (min-width: 800px) {
      margin-bottom: 20px;
      position: absolute;
      top: 20px;
      left: 710px;
    }
    @media (min-width: 1250px) {
      margin-left: 100px;
      left: 730px;
    }
    @media (min-width: 1400px) {
      margin-left: 150px;
    }
  }
  .book-marker {
    width: 100%;
    margin: 10px 0px;
    margin-top: 20px;
    border-top: 1px solid #5741457a;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0px;
    @media (min-width: 800px) {
      width: 100px;
      height: 50vh;
      position: fixed;
      background-color: #fde8e9;
      filter: drop-shadow(1px 2px 2px #000000);
      flex-direction: column;
      top: 28vh;
      right: 20px;
      .icon-status {
        width: 32px;
        height: 32px;
      }
      .icon-status:hover {
        cursor: pointer;
      }
    }
    @media (min-width: 1250px) {
      margin-right: 100px;
    }
    @media (min-width: 1400px) {
      margin-right: 150px;
    }
  }
`;
