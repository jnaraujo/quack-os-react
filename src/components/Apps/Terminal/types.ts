interface Commands {
  [key: string]: TerminalCommand
}

interface TerminalCommand {
  description: string
  usage: string
  fn: (...args: string[]) => string | Promise<string>
}

export type { Commands }
