import { createContext, useState, ReactNode, useMemo } from "react";
import { ApplicationType, App } from "../types/ApplicationType";

const ApplicationContext = createContext<ApplicationType>(
  {} as ApplicationType
);

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

  const value = useMemo(
    () => ({
      apps,
      addApp,
      removeApp,
      clearApps,
    }),
    [apps]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext };

export default ApplicationProvider;
