import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Bookshelf({ shelfBook }) {
  const navigate = useNavigate();
  return shelfBook?.book ? (
    <DivShelfBook onClick={() => navigate(`/bookInfos/${shelfBook.bookId}`)}>
      <img src={shelfBook.book.bookImage} alt={shelfBook.book.title} />
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
  img:hover {
    cursor: pointer;
  }
  @media (min-width: 600px) {
    height: 22vh;
  }
`;
