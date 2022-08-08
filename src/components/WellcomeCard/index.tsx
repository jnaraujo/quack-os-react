import { useState } from "react";
import { useWindowSize } from "react-use";
import Card from "../Card";
import Text from "../Text";
import Title from "../Title";
import { Content } from "./styles";

function WellcomeCard() {
    const { width, height } = useWindowSize();
    const [isOpen, setIsOpen] = useState(true);

    const cardWidth = 350;
    const cardHeight = 270;

    const handleClose = () => setIsOpen(false);

    return (
        <Card
            defaultPosition={{
                x: width / 2 - cardWidth / 2,
                y: height / 2 - cardHeight / 2,
            }}
            width={cardWidth}
            height={cardHeight}
            isDraggable
            className="wellcomeCard"
            style={{
                display: isOpen ? "inherit" : "none",
            }}
        >
            <Content>
                <Title>Wellcome to QuackOS!</Title>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                </Text>
                <button className="button" onClick={handleClose}>
                    Ok!
                </button>
            </Content>
        </Card>
    );
}


export default WellcomeCard;