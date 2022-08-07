import { ReactNode } from "react";

interface App {
  id: string;
  node: ReactNode;
  title: string;

  x?: number;
  y?: number;
}

export type { App };

interface ApplicationType {
  apps: App[];
  addApp: (app: App) => void;
  removeApp: (id: string) => void;
}

export type { ApplicationType };
