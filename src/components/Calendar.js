import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import br from "date-fns/locale/pt-BR";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("br", br);

export default function Calendar() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DivCalendar>
      <div className="calendar">
        <DatePicker
          showIcon
          locale="br"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
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
    display: flex;
    justify-content: center;
    width: 70%;
    margin-top: 25vh;
  }
`;
