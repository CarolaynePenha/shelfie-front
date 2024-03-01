import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("br", br);

export default function CalendarToYear({ setFilter, setSrcBar, search }) {
  const [startDate, setStartDate] = useState(new Date());
  setSrcBar(startDate.getUTCFullYear());

  return (
    <DivCalendar>
      <div className="calendar">
        <DatePicker
          showIcon
          locale="br"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setSrcBar(date.getUTCFullYear());
          }}
          showYearPicker
          dateFormat="yyyy"
        />

        <button onClick={search}>ok</button>
        <button onClick={() => setFilter("filtrar por:")}>cancelar</button>
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
  position: absolute;
  top: 0;
  z-index: 3;

  .calendar {
    margin-top: 25vh;
    display: flex;
    align-items: center;
    width: 70%;

    button {
      height: 30px;
      background-color: #ffffff;
      color: #574145;
      font-size: 14px;
      border: 1px dashed #000000;
    }
  }
`;
