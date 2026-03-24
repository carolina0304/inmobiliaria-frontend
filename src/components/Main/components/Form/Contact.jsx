import emailjs from "@emailjs/browser";

import React, { useState } from "react";
import "../../../../blocks/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.send(
        "service_n3cokds", // Service ID
        "template_caaq97k", // Template ID
        {
          name: formData.nombre, // Para {{name}} en el template
          email: formData.email, // Para {{email}} en el template
          telefono: formData.telefono, // Para {{telefono}} en el template
          message: formData.mensaje, // Para {{message}} en el template
          to_email: "terraqro26@gmail.com", // Agregar email destino
        },
        "ir3tuKUrVQzq3rox", // Public Key
      );

      console.log("Email enviado:", result.text);
      setMessage("¡Mensaje enviado exitosamente!");

      // Limpiar el formulario
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      setMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contáctanos</h1>
        <p className="contact__subtitle">
          Déjanos tus datos y uno de nuestros asesores se pondrá en contacto
          contigo.
        </p>
        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre Completo"
            className="contact__input"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Correo Electronico"
            className="contact__input"
            required
          />

          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="Telefono"
            className="contact__input"
          />

          <textarea
            name="mensaje"
            id="mens"
            placeholder="Mensaje"
            className="contact__textarea"
            value={formData.mensaje}
            onChange={handleInputChange}
          ></textarea>

          <button
            type="submit"
            className="contact__button"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
      {showSuccessPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>¡Mensaje enviado exitosamente! ✅</h3>
            <p>
              Gracias por contactarnos. Uno de nuestros asesores se pondrá en
              contacto contigo pronto.
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="popup-button"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
