import type { LazyExoticComponent, ComponentType } from "react";

interface App {
  id: string;
  Node: LazyExoticComponent<ComponentType<any>>;
  title: string;

  start?: number;

  x?: number;
  y?: number;
}

export type { App };

interface ApplicationType {
  apps: App[];
  addApp: (app: App) => void;
  removeApp: (id: string) => void;
  clearApps: () => void;
}

export type { ApplicationType };
