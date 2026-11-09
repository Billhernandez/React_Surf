async function request(url, options) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error(
      "No pudimos conectar con el servidor. Verifica que la API esté en marcha."
    );
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.message || "No pudimos completar la solicitud.");
    error.fieldErrors = data.errors ?? {};
    error.status = response.status;
    throw error;
  }

  return data;
}

export const getPackages = () => request("/api/packages");

export const getMenu = () => request("/api/menu");

export const getHours = () => request("/api/hours");

export const createReservation = (payload) =>
  request("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
