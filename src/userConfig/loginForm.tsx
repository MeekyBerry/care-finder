import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"
import useLogin from "@/hooks/login";
import { Login } from "@/services/user";
import { Button } from "@/components/button";
import { BG } from "@/components/bg";
import Header from "@/layouts/header/nav";
import style from "./style/scss/signup.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [Key: string]: string }>({});
  const { loading, error, login } = useLogin();
  const { loginWithRedirect } = useAuth0();

  // validate form
  const validateForm = () => {
    let errors: { [key: string]: string } = {};

    if (!email.trim()) {
      errors["username"] = "Username cannot be empty";
      return false;
    }
    if (!password.trim()) {
      errors["password"] = "Password cannot be empty";
      return false;
    }
    setErrors(errors);
    return true;
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: Login = { email, password };
    login(user);
    if (!validateForm()) return;
    resetForm();
  };

  return (
    <>
      <Header />
      <section className={style.section}>
        <BG />
        <section className={`${style.padding_top} ${style.wrapper}`}>
          <h1 className={style.title}>Welcome Back</h1>
          <h2 className={style.socialbtn}>Login with
            <button onClick={() => loginWithRedirect()} className={style.social}>
              <FcGoogle className={style.icon} />
              <FaFacebook className={style.icon} />
              <FaTwitter className={style.icon} />
              <FaLinkedin className={style.icon} />
            </button>
          </h2>
          <h3 className={style.or}>or</h3>
          <form onSubmit={handleLogin} className={style.form}>
            <div className={style.form_group}>
              <label htmlFor="email" className={style.form_label}>Email</label>
              <input
                type="text"
                placeholder="Enter Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={style.form_input}
              />
              {errors.username && <p className={style.form_error}>{errors.email}</p>}
            </div>
            <div className={style.form_group}>
              <label htmlFor="password" className={style.form_label}>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={style.form_input}
              />
              <svg width="20" height="15" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14.0005 8.34057 13.943 8.67873 13.83 9L10 5.17C10.3213 5.05698 10.6594 4.99949 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.1839 10.0732 19.7969 11.8727 18 13.19L16.58 11.76C17.9629 10.8034 19.0782 9.50906 19.82 8C19.0116 6.34994 17.7564 4.95977 16.1973 3.9875C14.6381 3.01524 12.8375 2.49988 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C2.98844 9.65006 4.24357 11.0402 5.80273 12.0125C7.36189 12.9848 9.16254 13.5001 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C10.0242 10.9254 9.37483 10.6149 8.87998 10.12C8.38513 9.62518 8.07458 8.97584 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z" fill="#C1C1C1" />
              </svg>
              {errors.password && <p className={style.form_error}>{errors.password}</p>}
            </div>
            {error && <p className={style.form_error}>{error}</p>}
            <Button
              disabled={loading}
              children={loading ? "Get In..." : "Login"}
              className={style.form_button}
            />
          </form>
          <p className={style.link}>Don't have an account? <Link to="/signUp" className={style.login}>Sign-up!</Link></p>
        </section>
      </section>
    </>
  );
}

export default LoginForm