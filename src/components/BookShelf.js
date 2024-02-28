import styled from "styled-components";

export default function Bookshelf({ shelfBook }) {
  console.log("shelfBook: ", shelfBook);
  return shelfBook?.book ? (
    <DivShelfBook>
      <img src={shelfBook.book.bookImage} alt="Capa do livro" />
    </DivShelfBook>
  ) : (
    ""
  );
}

// ---------------------------css
const DivShelfBook = styled.div`
  padding: 10px;
  height: 20vh;
  img {
    height: 98%;
  }
`;
