import { memo, useEffect, useMemo, useState } from "react";
import Draggable from "react-draggable";
import { useWindowSize } from "react-use";
import { useApps } from "../../hooks/useApp";
import Title from "../Title";
import { Content } from "./styles";
import { IApplicationProps } from "./types";

function Application(props: IApplicationProps) {
    const [isDraggable, setIsDraggable] = useState(false);

    const [loading, setLoading] = useState(true);

    const { removeApp } = useApps();
    const { width, height } = useWindowSize();

    const cardWidth = 350;
    const cardHeight = 270;

    const position = useMemo(() => {
        if (props.x && props.y) {
            return {
                x: props.x,
                y: props.y,
            };
        } else {
            return {
                x: (width - cardWidth) / 2,
                y: (height - cardHeight) / 2,
            };
        }
    }, [props.x, props.y, width, height]);

    const move = () => {
        setIsDraggable(true);
    };
    const stop = () => {
        setIsDraggable(false);
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
        <Draggable
            defaultPosition={{
                x: position.x,
                y: position.y,
            }}
            disabled={!isDraggable}
        >
            <Content>
                <div className="title" onMouseOver={move} onMouseOut={stop}>
                    <div></div>
                    <Title className={`${loading === true ? "loading" : "loaded"}`}>
                        {props.title}
                    </Title>
                    <div className="close" onClick={close}></div>
                </div>

                <div className="back">
                    <div
                        className={`application ${loading === true ? "loading" : "loaded"}`}
                    >
                        <props.node appId={props.id} />
                    </div>
                </div>
            </Content>
        </Draggable>
    );
}

export default memo(Application);
