import { useContext } from "react";
import { applicationContext } from "../contexts/applicationContext";

export function useApps() {
  const context = useContext(applicationContext);
  if (!context)
    throw new Error("useApps must be used within an applicationProvider");
  return context;
}
