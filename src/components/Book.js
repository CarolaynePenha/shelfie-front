import {
  BookDashed,
  BookDown,
  BookOpen,
  BookOpenCheck,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";

export default function Book({ book }) {
  const navigate = useNavigate();
  const existInShelf = { newBook: "newBook", existingBook: "existingBook" };
  const { newBook, existingBook } = existInShelf;

  return book ? (
    <DivBook>
      <img
        onClick={() => navigate(`/bookInfos/${book.id}`)}
        src={book.bookImage}
        alt="Capa do livro"
      />
      <div className="infos">
        <strong>{book.title}</strong>
        <p> {book.author.name}</p>
        <p>{book.totalPages} páginas</p>

        {book.status === "done" ? (
          <div className="status">
            <Tooltip id="done-books" />
            <BookOpenCheck
              data-tooltip-id="done-books"
              data-tooltip-content="Lido"
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              className="status-icon"
              color="#00693e"
              fill="#00693e"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "reading" ? (
          <div className="status">
            <Tooltip id="reading-books" />
            <BookOpen
              data-tooltip-id="reading-books"
              data-tooltip-content="Lendo"
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              className="status-icon"
              color="#f3b93f"
              fill="#f3b93f"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "wish" ? (
          <div className="status">
            <Tooltip id="wish-books" />
            <BookDashed
              data-tooltip-id="wish-books"
              data-tooltip-content="Quero ler"
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              className="status-icon"
              color="#175676"
              size={25}
            />
          </div>
        ) : book.status === "abandoned" ? (
          <div className="status">
            <Tooltip id="abandoned-books" />
            <BookDown
              data-tooltip-id="abandoned-books"
              data-tooltip-content="Abandonado"
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              className="status-icon"
              color="#000000"
              fill="#000000"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "rereading" ? (
          <div className="status">
            <Tooltip id="rereading-books" />
            <BookOpen
              data-tooltip-id="rereading-books"
              data-tooltip-content="Relendo"
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              className="status-icon"
              color="#df6d2f"
              fill="#df6d2f"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : (
          <div className="status">
            <Tooltip id="add-books" />
            <Plus
              data-tooltip-id="add-books"
              data-tooltip-content="Adicionar"
              onClick={() => navigate(`/addBook/${book.id}/${newBook}`)}
              className="status-icon"
              color="#574145"
              size={25}
            />
          </div>
        )}
      </div>
    </DivBook>
  ) : (
    ""
  );
}

// ---------------------------css
const DivBook = styled.div`
  padding: 10px;
  height: fit-content;
  margin-bottom: 10px;
  display: flex;
  img {
    height: 14vh;
    margin-right: 10px;
    @media (min-width: 800px) {
      height: 20vh;
    }
  }
  img:hover {
    cursor: pointer;
  }
  .infos {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  strong {
    font-weight: 600;
    padding: 5px;
    font-size: 16px;
    line-height: 130%;
  }
  p {
    padding: 5px;
  }
  .status {
    display: flex;
    width: 80px;
    justify-content: center;
    .status-icon:hover {
      cursor: pointer;
    }
  }
`;
