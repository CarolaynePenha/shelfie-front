import styled from "styled-components";

export default function Category({ search, setFilter, setSrcBar }) {
  const categoriesArr = [
    "Fantasia",
    "Suspense",
    "Ficção científica",
    "Romance",
    "Literatura infantil",
    "Literatura Nacional",
    "Terror",
  ];
  return (
    <DivCategory>
      <form onSubmit={search}>
        {categoriesArr.map((category) => {
          return (
            <div className="book-categories">
              <input
                type="radio"
                name="book-category"
                value={category}
                onClick={(e) => setSrcBar(e.target.value)}
              />
              <label>{category}</label>
            </div>
          );
        })}
        <div className="button">
          <button type="submit">ok</button>
          <button onClick={() => setFilter("Filtrar por:")}>cancelar</button>
        </div>
      </form>
    </DivCategory>
  );
}

// ----------------------css
const DivCategory = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 0;
  z-index: 3;
  form {
    height: fit-content;
    width: 70%;
    margin-top: 25vh;
    filter: drop-shadow(1px 2px 3px #000000);
    .button {
      background-color: #ffffff;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 15px;
    }
    button {
      height: 30px;
      width: 35%;
      background-color: #ffffff;
      color: #574145;
      font-size: 15px;
      font-weight: 500;
      border: 1px dashed #000000;
      font-weight: 600;
    }
  }

  .book-categories {
    background-color: #ffffff;
    padding: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    label {
      margin-left: 10px;
    }
  }
`;
