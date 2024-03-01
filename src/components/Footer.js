import styled from "styled-components";
import { Home, Rocket, Search, Trophy } from "lucide-react";

export default function Footer() {
  return (
    <DivFooter>
      <Home color="#574145" fill="#574145" fillOpacity={0.5} size={25} />
      <Rocket color="#574145" fill="#574145" fillOpacity={0.5} size={25} />
      <Search color="#574145" fill="#574145" fillOpacity={0.5} size={25} />
      <Trophy color="#574145" fill="#574145" fillOpacity={0.5} size={25} />
    </DivFooter>
  );
}

// ----------------------css
const DivFooter = styled.div`
  height: 8vh;
  width: 100%;
  background-color: #fde8e9;
  display: flex;
  justify-content: space-evenly;
  filter: drop-shadow(1px 2px 2px #000000);
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;
