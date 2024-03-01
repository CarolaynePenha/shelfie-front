import { useContext } from "react";
import styled from "styled-components";
import { BookDown, BookHeart, Search } from "lucide-react";
import { BookMarked } from "lucide-react";
import { BookDashed } from "lucide-react";
import { BookOpen } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

import UserContext from "../context/UserContext";

export default function Header({
  search,
  setSrcBar,
  srcBar,
  setGetShelfBooks,
  getShelfBooks,
}) {
  const { user } = useContext(UserContext);

  return (
    <DivHeader>
      <div className="top-shelf">
        <p>
          <strong>Minha Estante</strong>
        </p>
        <img src={user.image} />
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
            <Search color="#574145" size={15} />
          </button>
        </div>
      </form>
      <div className="book-marker">
        <BookMarked
          onClick={() => setGetShelfBooks(!getShelfBooks)}
          color="#574145"
          fill="#574145"
          fillOpacity={0.5}
          size={25}
        />
        <BookOpenCheck
          onClick={(e) => {
            search(e, "done");
          }}
          color="#00693e"
          fill="#00693e"
          fillOpacity={0.5}
          size={25}
        />
        <BookOpen
          onClick={(e) => {
            search(e, "reading");
          }}
          color="#f3b93f"
          fill="#f3b93f"
          fillOpacity={0.5}
          size={25}
        />
        <BookDashed
          onClick={(e) => {
            search(e, "wish");
          }}
          color="#175676"
          size={25}
        />
        <BookOpen
          onClick={(e) => {
            search(e, "rereading");
          }}
          color="#df6d2f"
          fill="#df6d2f"
          fillOpacity={0.5}
          size={25}
        />
        <BookDown
          onClick={(e) => {
            search(e, "abandoned");
          }}
          color="#000000"
          fill="#000000"
          fillOpacity={0.5}
          size={25}
        />
        <BookHeart
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
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #5741457a;
  position: fixed;
  top: 0;
  z-index: 2;
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
    }
  }

  form {
    width: 100%;
  }
  .src-input {
    width: 70%;
    border: none;
    height: 30px;
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
  }
  .book-marker {
    width: 100%;
    margin: 10px 0px;

    border-top: 1px solid #5741457a;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0px;
  }
`;
