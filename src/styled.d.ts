import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      boot: string
      black: string
      white: string
      yellow: string
      green: string
      cyan: string
      blue: string
      magenta: string
      red: string
    }
    breakpoints: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
