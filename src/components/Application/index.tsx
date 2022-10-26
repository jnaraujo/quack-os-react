import { useEffect, useMemo, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useWindowSize } from "react-use";
import { useApps } from "../../hooks/useApp";
import Title from "../Title";
import AppWrapper from "./AppWrapper";
import { Content } from "./styles";
import { IApplicationProps } from "./types";

const cardWidth = 350;
const cardHeight = 270;

function Application({ Node, ...props }: IApplicationProps) {
  const controls = useDragControls();
  const [loading, setLoading] = useState(true);

  const { removeApp } = useApps();
  const { width, height } = useWindowSize();

  const position = useMemo(() => {
    if (props.x && props.y) {
      return {
        x: props.x,
        y: props.y,
      };
    }
    return {
      x: (width - cardWidth) / 2,
      y: (height - cardHeight) / 2,
    };
  }, [props.x, props.y, width, height]);

  const move = (event: any) => {
    controls.start(event);
  };

  const close = () => {
    setTimeout(() => {
      removeApp(props.id);
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      drag
      dragControls={controls}
      dragMomentum={false}
      style={{
        position: "absolute",
        zIndex: 9999,
        x: position.x,
        y: position.y,
        width: cardWidth,
        height: cardHeight,
      }}
    >
      <Content>
        <div className="title" onPointerDown={move}>
          <div></div>
          <Title className={`${loading === true ? "loading" : "loaded"}`}>
            {props.title}
          </Title>
          <div className="close" onClick={close}>
            <span>x</span>
          </div>
        </div>

        <div className="back">
          <div
            className={`application ${loading === true ? "loading" : "loaded"}`}
          >
            <AppWrapper Node={Node} appID={props.id} />
          </div>
        </div>
      </Content>
    </motion.div>
  );
}

export default Application;
