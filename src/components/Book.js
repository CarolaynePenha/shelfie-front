import {
  BookDashed,
  BookDown,
  BookOpen,
  BookOpenCheck,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
            <BookOpenCheck
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              color="#00693e"
              fill="#00693e"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "reading" ? (
          <div className="status">
            <BookOpen
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              color="#f3b93f"
              fill="#f3b93f"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "wish" ? (
          <div className="status">
            <BookDashed
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              color="#175676"
              size={25}
            />
          </div>
        ) : book.status === "abandoned" ? (
          <div className="status">
            <BookDown
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              color="#000000"
              fill="#000000"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : book.status === "rereading" ? (
          <div className="status">
            <BookOpen
              onClick={() => navigate(`/addBook/${book.id}/${existingBook}`)}
              color="#df6d2f"
              fill="#df6d2f"
              fillOpacity={0.5}
              size={25}
            />
          </div>
        ) : (
          <div className="status">
            <Plus
              onClick={() => navigate(`/addBook/${book.id}/${newBook}`)}
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
  }
  p {
    padding: 5px;
  }
  .status {
    display: flex;
    width: 80px;
    justify-content: center;
  }
`;
