import React, { useState } from "react";

function Login({ onLogin, onClose, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
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
          <h2 className="login__title">Acceso Administrador</h2>
          <p className="login__subtitle">Gestiona tus propiedades</p>

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

          <button className="login__button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
