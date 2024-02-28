import styled from "styled-components";

export default function Book({ book }) {
  console.log("book: ", book);
  return book ? (
    <DivBook>
      <img src={book.bookImage} alt="Capa do livro" />
      <div>
        <strong>{book.title}</strong>
        <small>{book.author.name}</small>
        <p>{book.totalPages}</p>
      </div>
    </DivBook>
  ) : (
    ""
  );
}

// ---------------------------css
const DivBook = styled.div`
  padding: 10px;
  height: 20vh;
  img {
    height: 98%;
  }
`;
