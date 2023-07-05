import Cookies from "js-cookie";

export const getCsrfCookie = () => {
  let csrfCookie = Cookies.get("csrftoken");
  if (!csrfCookie) {
    throw new Error("No CSRF cookie found");
  }
  csrfCookie = csrfCookie.trim();
  return csrfCookie;
};
