import React from "react";
import "../../../../blocks/contact.css";

function Contact() {
  return (
    <section className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contáctanos</h1>
        <p className="contact__subtitle">
          Déjanos tus datos y uno de nuestros asesores se pondrá en contacto
          contigo.
        </p>
        <form className="contact__form">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="contact__input"
          />

          <input
            type="email"
            placeholder="Correo Electronico"
            className="contact__input"
          />

          <input type="tel" placeholder="Telefono" className="contact__input" />

          <textarea
            name="mensaje"
            id="mens"
            placeholder="Mensaje"
            className="contact__textarea"
          ></textarea>

          <button type="submit" className="contact__button">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
