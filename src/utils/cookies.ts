export const getCSRFToken = () =>
  document.cookie
    .split("; ")
    .find((el) => el.startsWith("csrftoken"))
    ?.split("=")[1];
