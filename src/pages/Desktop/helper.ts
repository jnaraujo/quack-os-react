import React from "react";

const Navigator = React.lazy(() => import("../../components/Apps/Navigator"));
const Terminal = React.lazy(() => import("../../components/Apps/Terminal"));
const Clock = React.lazy(() => import("../../components/Apps/Clock"));
const Calculator = React.lazy(() => import("../../components/Apps/Calculator"));

const AppsOnDesktop = [
  {
    title: "Clock",
    id: "clock",
    icon: "icons/clock/Clock_Face.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    Node: Clock,
  },
  {
    title: "Terminal",
    id: "terminal",
    icon: "/icons/applications/Terminal.png",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    Node: Terminal,
  },
  {
    title: "Duck's Boat Navigator",
    id: "navigator",
    icon: "/icons/applications/Brosen_windrose.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    Node: Navigator,
  },
  {
    title: "Calculator",
    id: "calculator",
    icon: "/icons/applications/calculator.svg",
    defaultPosition: {
      x: 20,
      y: 20,
    },
    Node: Calculator,
  },
];

export { AppsOnDesktop };

export function openApp(id: string) {
  const app = AppsOnDesktop.find((app) => app.id === id);
  if (app) {
    return app;
  }
  return null;
}
