import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { useClickAway } from "react-use";
import Title from "../Title";

import { Content } from "./styles";
import { IAppIconProps } from "./types";

export default function AppIcon({
    onDoubleClicked,
    onClick,
    defaultPosition,
    isDraggable,
    title,
    width = 80,
    height = 80,
    ...rest
}: IAppIconProps) {
    const [clickCount, setClickCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const onClickContent = () => {
        setClickCount((prev) => {
            if (prev === 1) {
                onDoubleClicked && onDoubleClicked();
                return 0;
            }
            return 1;
        });
    };

    useClickAway(ref, () => {
        setClickCount(0);
    });

    return (
        <>
            <Draggable
                disabled={isDraggable !== true}
                defaultPosition={defaultPosition}
                bounds="parent"
            >
                <Content
                    ref={ref}
                    onClick={onClickContent}
                    clicked={clickCount === 1}
                    width={width}
                    height={height}
                    {...rest}
                >
                    <div className="img" />
                    <Title className="title">{title}</Title>
                </Content>
            </Draggable>
        </>
    );
}
