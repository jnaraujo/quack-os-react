import { App } from "../../types/ApplicationType"

interface IApplicationProps extends Omit<App, "start"> {}

export type { IApplicationProps }
