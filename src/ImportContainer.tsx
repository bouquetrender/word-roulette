import { ChangeEvent, DragEvent } from "react";
import DownArrow from "./assest/down-arrow.svg";
import { ReactSVG } from "react-svg";

interface Props {
  onSwitch: () => void;
}

const downloadExampleFile = () => {
  fetch("/word.txt")
    .then((response) => response.text())
    .then((content) => {
      const element = document.createElement("a");
      const file = new Blob([content], { type: "text/plain" });

      element.href = URL.createObjectURL(file);
      element.download = "word-file-example.txt";
      element.click();
    })
    .catch((error) => console.error("Error:", error));
};

const ImportContainer = (props: Props) => {
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as Blob;
    handleFiles(file);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type !== "text/plain") {
      return alert("Please drop a TXT file.");
    }

    handleFiles(file);
  };

  const handleFiles = (file: Blob) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      console.log(text);
    };

    reader.onerror = (e) => {
      console.error("Error reading file:", e.target?.error);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div
        onDrop={onDrop}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        className="flex items-center justify-center w-full mt-2 h-2/6"
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-[#464440] transition duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-center">
              <span className="font-semibold">
                Click to upload or drag and drop
                <br />
                TXT files only
                <br />
              </span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept=".txt"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>

      <div className="flex justify-center">
        <ReactSVG src={DownArrow} className="opacity-85 mt-6 w-8" />
      </div>

      <div className="mt-2 text-xl text-center">Import List</div>
      <div className="text-xl border-2 rounded-lg h-2/6 overflow-y-auto p-4 mt-2"></div>

      <div className="mt-6 text-2xl flex justify-between">
        <a
          className="cursor-pointer hover:underline"
          onClick={() => {
            downloadExampleFile();
          }}
        >
          Download Example file
        </a>
        <div>
          <a
            className="cursor-pointer hover:underline"
            onClick={props.onSwitch}
          >
            Back
          </a>
          <a
            className="cursor-pointer hover:underline ml-8"
            onClick={props.onSwitch}
          >
            Confirm
          </a>
        </div>
      </div>
    </>
  );
};

export default ImportContainer;
