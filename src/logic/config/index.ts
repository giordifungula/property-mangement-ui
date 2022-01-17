if (process.env.REACT_APP_API_HOST == null) {
  throw new Error("REACT_APP_API_HOST missing");
}

export const SERVER_HOST = process.env.REACT_APP_API_HOST;

export const SERVER_URL = `${process.env.REACT_APP_API_HOST}${
  process.env.NODE_ENV === "development" ? "" : process.env.REACT_APP_API_PATH
}`;

export const APP_NAME = process.env.REACT_APP_APP_NAME;
export const APP_LOGO = process.env.REACT_APP_LOGO;

export const SOCKET_PATH = process.env.REACT_APP_SOCKET_PATH;
