import { useEffect, useState } from "react";
import { Container } from "./styles";

function Navigator() {
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
      {history[0] ? (
        <iframe sandbox="allow-same-origin" src={history.at(-1)} />
      ) : (
        <div className="background">
          <img
            src="/brand/duck.png"
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

export default Navigator;
