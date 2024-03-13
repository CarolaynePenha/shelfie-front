import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("br", br);

export default function Calendar({
  setRatingInfos,
  ratingInfos,
  startOrEndDate,
  setShowCalendar,
  handleSubmitRating,
  existInShelfParams,
}) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DivCalendar>
      <div className="calendar">
        <DatePicker
          showIcon
          locale="br"
          selected={startDate}
          dateFormat="d MMMM, yyyy"
          onChange={(date) => {
            setStartDate(date);
            {
              startOrEndDate === "endDate"
                ? setRatingInfos({
                    ...ratingInfos,
                    endDate: date,
                  })
                : setRatingInfos({
                    ...ratingInfos,
                    startDate: date,
                  });
            }
          }}
        />
        <button
          className="confirm"
          onClick={() => {
            if (existInShelfParams === "existingBook") {
              handleSubmitRating(false);
            }
            setShowCalendar(false);
          }}
        >
          ok
        </button>
      </div>
    </DivCalendar>
  );
}

// ----------------------css
const DivCalendar = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ffffff99;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  z-index: 3;

  .calendar {
    margin-top: 25vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;

    button {
      height: 30px;
      width: 10px;
      background-color: transparent;
    }
    .react-datepicker__header {
      height: 75px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .react-datepicker {
      background-color: #fde8e9;
      border: 2px solid #574145;
    }
    .confirm {
      height: 30px;
      width: 40px;
      background-color: #574145;
      color: #ffffff;
      font-size: 14px;
      margin: 0;
    }
  }
`;
