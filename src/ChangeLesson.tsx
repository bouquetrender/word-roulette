import { useContext, useState } from "react";
import { WordsDispatchContext, WordsContext } from "./store";
import { ReactSVG } from "react-svg";
import openFolderSVG from "./assest/openFolder.svg";

interface Props {
  onBack: () => void;
}

interface lessonObj {
  name: string;
  unavailable: boolean;
}

const ChangeLesson = (props: Props) => {
  const dispatch = useContext(WordsDispatchContext);
  const store = useContext(WordsContext);

  const [currSelectPartKey, setCurrSelectPartKey] = useState("2");

  const [currentSelection, setCurrentSelection] = useState(store.lesson);

  const lessonListData: lessonObj[] = Array.from({
    length: Object.keys(store.vocabulary[currSelectPartKey]).length,
  }).map((_empty, index) => {
    return {
      name: index === 0 ? "ALL" : `Lesson${index}`,
      unavailable: false,
    };
  });

  const onConfirm = () => {
    dispatch({
      type: "changeLesson",
      val: currentSelection,
    });
    onBack();
  };

  const onBack = () => {
    props.onBack();
  };

  const tabList = Object.keys(store.vocabulary).map((partKey) => {
    return {
      name: partKey,
      onClick: () => {
        setCurrSelectPartKey(partKey);
      },
    };
  });

  return (
    <>
      <div className="flex">
        {tabList.map((item, index) => {
          return (
            <div
              key={item.name}
              onClick={item.onClick}
              className={`select-none h-11 -mb-[2px] border-2 w-16 leading-[2.7rem] text-center ${
                currSelectPartKey === item.name
                  ? "bg-[#E5E7EB] text-zinc-600"
                  : "cursor-pointer"
              } ${tabList.length === index + 1 ? "" : "border-r-0"}`}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <div className=" text-xl border-2 rounded-tr rounded-br rounded-bl h-2/3 overflow-y-auto p-4">
        {lessonListData.length > 0 &&
          lessonListData.map((lesson) => {
            return (
              <div
                key={lesson.name}
                className={`rounded text-2xl pl-4 h-12 leading-[3rem] ${
                  lesson.name === currentSelection
                    ? "bg-[#837d73]"
                    : "hover:bg-[#635e57] cursor-pointer"
                }`}
                onClick={() => {
                  setCurrentSelection(lesson.name);
                }}
              >
                {lesson.name}
              </div>
            );
          })}
        {lessonListData.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <ReactSVG src={openFolderSVG} />
            <div className=" ml-1">Empty</div>
          </div>
        )}
      </div>

      <div className="mt-6 text-2xl  flex justify-between">
        <div>[ {store.lesson} ]</div>
        <div>
          <span className="cursor-pointer hover:underline" onClick={onBack}>
            Close
          </span>
          <span
            className="cursor-pointer hover:underline ml-8"
            onClick={onConfirm}
          >
            Save
          </span>
        </div>
      </div>
    </>
  );
};

export default ChangeLesson;
