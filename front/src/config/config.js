// src/config/config.js

const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost";
const API_PORT = process.env.REACT_APP_API_PORT || "3000";

export const API_URL = `${API_HOST}:${API_PORT}/`;
