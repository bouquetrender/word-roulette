import { useContext } from "react";
import { WordsContext } from "./store";

interface ExportProps {
  onBack: () => void;
}

const FW = "Forgotten Words";
const CWRL = "Current Word Roulette List";

const exportFileFlow = (type: string, words?: string[]) => {
  let wordList: string[] = [];

  if (type === FW) {
    wordList = Object.keys(JSON.parse(localStorage.getItem("forgetWordCount") || "{}"))
  }

  if (type === CWRL) {
    wordList = words as string[]
  }

  let testString = "";
  wordList.forEach((word) => {
    testString += `${word}\n`;
  });

  const blob = new Blob([testString], { type: "text/plain" });
  let downloadLink: HTMLAnchorElement | null = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = type;
  downloadLink.click();
  downloadLink = null;
};

const Export = (props: ExportProps) => {
  const store = useContext(WordsContext);

  return (
    <>
      <div
        className="text-2xl mt-6 mb-2 cursor-pointer hover:underline"
        onClick={() => {
          exportFileFlow(FW);
        }}
      >
        - Forgotten Words -
      </div>

      <div
        className="text-2xl mt-6 mb-2 cursor-pointer hover:underline"
        onClick={() => {
          exportFileFlow(CWRL, store.words)
        }}
      >
        - Current Word Roulette List -
      </div>

      <div data-info="btn-handle" className="mt-6">
        <a
          className="text-2xl cursor-pointer hover:underline"
          onClick={() => {
            props.onBack();
          }}
        >
          Back
        </a>
      </div>
    </>
  );
};

export default Export;
