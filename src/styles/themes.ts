import { DefaultTheme } from "styled-components"

const lightTheme: DefaultTheme = {
  colors: {
    boot: "rgba(0,0,170,1)",
    black: "rgba(0,0,0,1)",
    white: "rgba(255,255,255,1)",
    yellow: "rgba(255,255,87,1)",
    green: "rgba(87,255,87,1)",
    cyan: "rgba(87,255,255,1)",
    blue: "rgba(87,87,255,1)",
    magenta: "rgba(255,87,255,1)",
    red: "rgba(255,87,87,1)",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
}

export { lightTheme }
