import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin1234") {
      const data = { role: "admin" };
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return "admin";
    }

    if (email === "customer@gmail.com" && password === "customer1234") {
      const data = { role: "customer" };
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return "customer";
    }

    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
