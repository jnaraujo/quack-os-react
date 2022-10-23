import React from "react";

const Navigator = React.lazy(() => import("../../components/Navigator"));
const Terminal = React.lazy(() => import("../../components/Terminal"));
const Clock = React.lazy(() => import("../../components/Clock"));
const Calculator = React.lazy(() => import("../../components/Calculator"));

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
