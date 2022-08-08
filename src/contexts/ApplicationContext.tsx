import { createContext, useState, ReactNode } from "react";
import { ApplicationType, App } from "../types/ApplicationType";

const ApplicationContext = createContext<ApplicationType>({
  apps: [],
  addApp: (app: App) => {},
  removeApp: (id: string) => {},
  clearApps: () => {},
});

function randomFixedInteger(length: number) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
}

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);

  const addApp = (app: App) => {
    app.id = app.id + "-" + randomFixedInteger(10);
    app.start = Date.now();
    setApps([...apps, app]);
  };

  const removeApp = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  const clearApps = () => {
    setApps([]);
  };

  return (
    <ApplicationContext.Provider
      value={{
        apps,
        addApp,
        removeApp,
        clearApps,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext };

export default ApplicationProvider;
