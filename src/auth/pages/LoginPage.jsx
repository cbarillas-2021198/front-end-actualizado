import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { apiLogin } from "../api/apiAuthUser";
import './LoginPage.css';
import logo from '..//..//..//assets/slogan.jpg';

export const LoginPage = () => {
  const { userName, password, onInputChange, onResetForm } = useForm({
    userName: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";
    login("Victor Cancinos");
    navigate(lastPath, {
      replace: true,
    });
  };

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    const result = await apiLogin(userName, password);
    if (result === false) return null;

    const { nombre, rol } = result.data;
    const lastPath = localStorage.getItem("lastPath") || "/";
    login(nombre, rol);

    // Redirigir a la página correspondiente al rol
    switch (rol) {
      case "ADMIN_ROLE":
        navigate("/usersA", {
          replace: true,
        });
        break;
      case "USER_ROL":
        navigate("/home", {
          replace: true,
        });
        break;
      default:
        navigate(lastPath, {
          replace: true,
        });
    }

    onResetForm();
  };

  return (

    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div class="container-login">
        <input type="checkbox" id="flip" />
        <div class="cover">
          <div class="front">
            <img src={logo}  alt="" />
            <div class="text">
              <span class="text-1"></span>
              <br />
              <span class="text-1"></span>
              <span class="text-2"></span>
            </div>
          </div>
          <div class="back">
            
            
          </div>
        </div>
        <div class="forms">
          <div class="form-content">
            <div class="login-form">
              <div class="title">Login</div>
              <form onSubmit={onSubmitLogin}>
                <div class="input-boxes">
                  <div class="input-box">
                    <i class="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                      name="userName"
                      value={userName}
                      onChange={onInputChange}
                    />
                  </div>
                  <div class="input-box">
                    <i class="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      name="password"
                      value={password}
                      onChange={onInputChange}
                    />
                  </div>
                 
                  <div class="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};