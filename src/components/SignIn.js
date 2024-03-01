import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

import TokenContext from "../context/TokenContext";
import Logo from "./../assets/logo.png";
import Loading from "./Loading";
import UserContext from "../context/UserContext";

export default function SignIn() {
  const [infosLogin, setinfosLogin] = useState({ email: "", password: "" });
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Entrar");
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [type, setType] = useState({
    passwordType: "password",
    eyeType: "Eye",
  });

  useEffect(() => {
    if (token) {
      navigate("/shelf");
    }
  }, [token, navigate]);

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = `${process.env.REACT_APP_API_URL}/signIn`;
    try {
      const { data } = await axios.post(URL, infosLogin);
      setToken(data.token);
      setUser({ ...user, name: data.name, image: data.image });
      const stringifyUser = JSON.stringify({
        name: data.userName,
        image: data.image,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", stringifyUser);

      navigate("/shelf");
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Entrar");
      if (err.response.status === 401) {
        alert("Usuário ou senha inválidos");
      } else {
        alert("Algo deu errado, tente novamente");
      }
    }
  }
  function togglePasswordVisibility(passType) {
    if (passType === "password") {
      if (type.passwordType === "password") {
        setType({ ...type, passwordType: "text", eyeType: "EyeOff" });
      } else {
        setType({ ...type, passwordType: "password", eyeType: "Eye" });
      }
    }
  }

  const { email, password } = infosLogin;

  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          required
          placeholder="e-mail"
          value={email}
          onChange={(e) =>
            setinfosLogin({ ...infosLogin, email: e.target.value })
          }
        />
        <div className="div-password">
          <input
            disabled={buttonState}
            type={type.passwordType}
            required
            placeholder="senha"
            value={password}
            onChange={(e) =>
              setinfosLogin({ ...infosLogin, password: e.target.value })
            }
          />
          {type.eyeType === "Eye" ? (
            <Eye
              onClick={() => togglePasswordVisibility("password")}
              className="eye"
              color="#574145"
              size={25}
            />
          ) : (
            <EyeOff
              onClick={() => togglePasswordVisibility("password")}
              className="eye"
              color="#574145"
              size={25}
            />
          )}
        </div>

        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/signUp"}>
        <ButtonRegisterLogin disabled={buttonState}>
          <p>Não tem uma conta? Cadastre-se!</p>
        </ButtonRegisterLogin>
      </Link>
    </Container>
  );
}

// -------------------------------------css
export const Container = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    width: 300px;
  }
`;

export const ButtonRegisterLogin = styled.button`
  border: none;
  color: #574145;
  margin-top: 30px;
  background-color: transparent;
  p {
    font-size: 16px;
  }
  @media (min-width: 600px) {
    p {
      font-size: 22px;
    }
  }
  @media (min-width: 1500px) {
    p {
      font-size: 24px;
    }
  }
`;

export const Form = styled.form`
  width: 80%;
  .save-button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    border: none;
    background-color: #965361;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: none;
    margin-top: 20px;
    background-color: #ffffff;
    font-size: 18px;
    text-align: center;
    &:focus {
      border: solid 2px #574145;
      outline: none;
    }
  }
  .div-password {
    position: relative;
    .eye {
      position: absolute;
      right: 15px;
      top: 45%;
    }
  }
  .repeat-password {
    border: ${(props) => (props.passwordMatchError ? "solid 2px red" : "none")};
    &:focus {
      border: ${(props) =>
        props.passwordMatchError ? "solid 1px red" : "solid 2px  #574145"};
      outline: none;
    }
  }

  @media (min-width: 600px) {
    input {
      height: 70px;
      font-size: 22px;
    }
    .save-button {
      height: 70px;
      font-size: 22px;
    }
  }
  @media (min-width: 1500px) {
    input {
      height: 85px;
      font-size: 26px;
    }
    .save-button {
      height: 85px;
      font-size: 26px;
    }
  }
`;
