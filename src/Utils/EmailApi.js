const sendEmail = async (formData) => {
  try {
    const response = await fetch("URL_DEL_SERVICIO", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el mensaje");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
