interface App {
  id: string;
  Node: ({}: { appId: string }) => JSX.Element;
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
