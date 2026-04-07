import { createContext, useEffect, useState } from "react";

const ChatContext = createContext({});
const THEME_STORAGE_KEY = "ssapp_theme";

type ThemeMode = "dark" | "light";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const ChatContextProvider = ({ children }: any) => {
  const [appOption, setAppOption] = useState("Chat");
  const [picShow, setPicShow]: any = useState({ status: false });
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#04121c" : "#eef7fb");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <ChatContext.Provider value={{ picShow, setPicShow, appOption, setAppOption, theme, setTheme, toggleTheme }}>{children}</ChatContext.Provider>;
};

export default ChatContext;
