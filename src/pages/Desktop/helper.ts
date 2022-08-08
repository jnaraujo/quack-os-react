import Calculator from "../../components/Calculator";
import Clock from "../../components/Clock";
import Navigator from "../../components/Navigator";
import Terminal from "../../components/Terminal";

const AppsOnDesktop = [
    {
        title: "Clock",
        id: "clock",
        icon: "icons/clock/Clock_Face.svg",
        defaultPosition: {
            x: 20,
            y: 20,
        },
        node: Clock,
    },
    {
        title: "Terminal",
        id: "terminal",
        icon: "/icons/applications/Terminal.png",
        defaultPosition: {
            x: 20,
            y: 20,
        },
        node: Terminal,
    },
    {
        title: "Duck's Boat Navigator",
        id: "navigator",
        icon: "/icons/applications/Brosen_windrose.svg",
        defaultPosition: {
            x: 20,
            y: 20,
        },
        node: Navigator,
    },
    {
        title: "Calculator",
        id: "calculator",
        icon: "/icons/applications/calculator.svg",
        defaultPosition: {
            x: 20,
            y: 20,
        },
        node: Calculator,
    },
];

export { AppsOnDesktop };

