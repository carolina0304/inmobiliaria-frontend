import React, { useState } from "react";

function Login({ onLogin, onRegister, onClose, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // true = login, false = register

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // Modo Login
      onLogin(email, password);
    } else {
      // Modo Registro
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      onRegister(email, password);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  // Si no está abierto, no mostrar nada
  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="login-modal__close" onClick={onClose}>
          ✕
        </button>

        <form onSubmit={handleSubmit} className="login__form">
          <h2 className="login__title">
            {isLoginMode ? "Acceso Administrador" : "Crear Cuenta"}
          </h2>
          <p className="login__subtitle">
            {isLoginMode
              ? "Gestiona tus propiedades"
              : "Únete a nuestra plataforma"}
          </p>

          <div className="login__group">
            <input
              className="login__input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login__group">
            <input
              className="login__input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Campo adicional para registro */}
          {!isLoginMode && (
            <div className="login__group">
              <input
                className="login__input"
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button className="login__button" type="submit">
            {isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>

          {/* Botón para cambiar entre login y registro */}
          <div className="login__switch">
            <p>
              {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <button
                type="button"
                className="login__switch-btn"
                onClick={switchMode}
              >
                {isLoginMode ? "Regístrate" : "Inicia Sesión"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
