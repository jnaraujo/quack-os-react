import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 600px;
  height: 400px;

  > div {
    display: flex;
    height: 25px;

    button {
      all: unset;
      display: flex;
      align-items: center;
      justify-content: center;

      background-image: url("icons/arrows/arrow/left.svg");
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      width: 25px;
      height: 25px;
      min-height: 25px;
      min-width: 25px;
      padding: 0;
      margin: 0;
    }

    button:active {
      box-shadow: inset -1px -1px 6px 0px rgba(0, 0, 0, 0.43);
      cursor: pointer;
    }
    input {
      flex: 1;
    }
  }

  iframe {
    width: 100%;
    height: 100%;
  }

  .background {
    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 200px;
      height: 200px;
    }
  }
`;

export default function Navigator(props: any) {
  const [url, setUrl] = useState("");

  const [history, setHistory] = useState<string[]>([]);

  const backHistory = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setUrl(newHistory[newHistory.length - 1]);
  };

  const addHistory = (url: string) => {
    if (!url) {
      setHistory([]);
      return;
    }
    if (history.at(-1) === url) return;

    const newHistory = [...history];

    if (url.startsWith("http://") || url.startsWith("https://")) {
      newHistory.push(url);
    } else {
      newHistory.push(`https://${url}`);
    }
    setHistory(newHistory);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = e.currentTarget.value;
      addHistory(url);
    }
  };

  return (
    <Container>
      <div>
        <button onClick={backHistory} />
        <input
          type={"url"}
          value={url}
          onChange={(e: any) => setUrl(e.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
      </div>
      {history[0] != undefined ? (
        <iframe sandbox="allow-same-origin" src={history.at(-1)} />
      ) : (
        <div className="background">
          <img
            src="/public/brand/duck.png"
            width={200}
            height={200}
            alt="quack os logo"
          />
          <h2>Quack!</h2>
        </div>
      )}
    </Container>
  );
}
