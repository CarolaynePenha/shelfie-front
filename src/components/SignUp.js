import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

import Logo from "./../assets/logo.png";
import Loading from "./Loading";
import { ButtonRegisterLogin, Container, Form } from "./SignIn";

export default function SignUp() {
  const [infosSignUp, setInfosSignUp] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    image: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("Enviar");
  const navigate = useNavigate();
  const [messagedisplay, setMessageDisplay] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [type, setType] = useState({
    passwordType: "password",
    repeatPasswordType: "password",
    eyeTypePassword: "Eye",
    eyeTypeRepeatPassword: "Eye",
  });

  async function post() {
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = `${process.env.REACT_APP_API_URL}/signUp`;
    try {
      delete infosSignUp.repeatPassword;
      await axios.post(URL, infosSignUp);
      navigate("/");
    } catch (err) {
      console.log(err.response);
      setButtonState(false);
      setButtonLoading("Enviar");
      if (err.response.status === 409) {
        alert("E-mail já existe!");
      } else {
        alert("Algo deu errado, tente novamente");
      }
    }
  }

  const handleChange = (e) => {
    if (e.target.className === "repeat-password") {
      setInfosSignUp({ ...infosSignUp, repeatPassword: e.target.value });
      if (e.target.value !== password) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
    if (e.target.className === "password-input") {
      setInfosSignUp({ ...infosSignUp, password: e.target.value });
      if (e.target.value !== repeatPassword && repeatPassword !== "") {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
      if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}/.test(
          e.target.value
        )
      ) {
        setMessageDisplay(true);
      } else {
        setMessageDisplay(false);
      }
    }
  };

  function releaseFormSubmission(e) {
    e.preventDefault();
    if (!passwordMatchError && !messagedisplay) {
      post();
    }
  }

  function togglePasswordVisibility(passType) {
    if (passType === "password") {
      if (type.passwordType === "password") {
        setType({ ...type, passwordType: "text", eyeTypePassword: "EyeOff" });
      } else {
        setType({ ...type, passwordType: "password", eyeTypePassword: "Eye" });
      }
    }

    if (passType === "repeat-password") {
      if (type.repeatPasswordType === "password") {
        setType({
          ...type,
          repeatPasswordType: "text",
          eyeTypeRepeatPassword: "EyeOff",
        });
      } else {
        setType({
          ...type,
          repeatPasswordType: "password",
          eyeTypeRepeatPassword: "Eye",
        });
      }
    }
  }

  const { email, password, repeatPassword, name, image } = infosSignUp;

  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <Form
        onSubmit={releaseFormSubmission}
        passwordMatchError={passwordMatchError}
      >
        <input
          type="text"
          disabled={buttonState}
          required
          placeholder="name"
          value={name}
          onChange={(e) =>
            setInfosSignUp({ ...infosSignUp, name: e.target.value })
          }
        ></input>
        <input
          type="url"
          disabled={buttonState}
          required
          placeholder="Imagem ex: https://i.pinimg.com/..."
          value={image}
          onChange={(e) =>
            setInfosSignUp({ ...infosSignUp, image: e.target.value })
          }
        ></input>
        <input
          disabled={buttonState}
          required
          placeholder="e-mail"
          value={email}
          onChange={(e) =>
            setInfosSignUp({ ...infosSignUp, email: e.target.value })
          }
        />
        <div className="div-password">
          <input
            className="password-input"
            disabled={buttonState}
            type={type.passwordType}
            required
            placeholder="senha"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}"
            value={password}
            onChange={handleChange}
          />

          {type.eyeTypePassword === "Eye" ? (
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

        <DivPasswordMessage>
          {messagedisplay &&
            ` A senha deve ter entre 8 e 15 caracteres, sendo ao menos uma letra
          maiúscula, uma minuscula, um número e um caractere especial(@$!%*?&)`}
        </DivPasswordMessage>

        <div className="div-password">
          <input
            className="repeat-password"
            disabled={buttonState}
            type={type.repeatPasswordType}
            required
            placeholder="repita a senha"
            value={repeatPassword}
            onChange={handleChange}
          />

          {type.eyeTypeRepeatPassword === "Eye" ? (
            <Eye
              onClick={() => togglePasswordVisibility("repeat-password")}
              className="eye"
              color="#574145"
              size={25}
            />
          ) : (
            <EyeOff
              onClick={() => togglePasswordVisibility("repeat-password")}
              className="eye"
              color="#574145"
              size={25}
            />
          )}
        </div>

        <DivErrorMessage>
          {passwordMatchError && "As senhas não correspondem"}
        </DivErrorMessage>

        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/"}>
        <ButtonRegisterLogin disabled={buttonState}>
          <p>Não tem uma conta? Cadastre-se!</p>
        </ButtonRegisterLogin>
      </Link>
    </Container>
  );
}

// -------------------------css

const DivPasswordMessage = styled.div`
  color: #574145;
  font-size: 14px;
  padding-top: 5px;
`;
const DivErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  padding-top: 5px;
`;
