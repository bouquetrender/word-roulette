import { useContext, useState } from "react";
import { WordsDispatchContext, WordsContext } from "./store";
import { ReactSVG } from "react-svg";
import openFolderSVG from "./assest/openFolder.svg";

interface Props {
  onBack: () => void;
  onSwitch: () => void;
}

interface lessonObj {
  name: string;
  unavailable: boolean;
}

const defaultWordPart = "2";

const ChangeContainer = (props: Props) => {
  const dispatch = useContext(WordsDispatchContext);
  const store = useContext(WordsContext);

  const [currSelectPartKey, setCurrSelectPartKey] = useState(
    store.partKey || defaultWordPart
  );

  const [currentSelection, setCurrentSelection] = useState(store.lesson);

  const vk = Object.keys(store.vocabulary[currSelectPartKey]);
  const lessonListData: lessonObj[] = Array.from({
    length: vk.length,
  }).map((_item, index) => {
    return {
      name: index === 0 ? 'All' : vk[index],
      unavailable: false,
    };
  });

  const onSave = () => {
    dispatch({
      type: "changeLesson",
      val: {
        currentSelection,
        currSelectPartKey,
      },
    });
    onBack();
  };

  const onBack = () => {
    props.onBack();
  };

  const onSwitch = () => {
    props.onSwitch();
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
      <div className="flex justify-between items-center">
        <div className="flex flex-row">
          {tabList.map((item, index) => {
            return (
              <div
                key={item.name}
                onClick={item.onClick}
                className={`select-none h-11 leading-[2.7rem] -mb-[2px] border-2 w-16 text-center ${
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
        <div className="hidden md:block">
          /system/roulette/data/{currSelectPartKey}
        </div>
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

      <div className="mt-6 text-2xl flex justify-between">
        <div>[ {store.lesson} ]</div>
        <div>
          <span
            className="hidden md:inline cursor-pointer hover:underline"
            onClick={onSwitch}
          >
            Import
          </span>
          <span
            className="cursor-pointer hover:underline ml-8"
            onClick={onBack}
          >
            Close
          </span>
          <span
            className="cursor-pointer hover:underline ml-8"
            onClick={onSave}
          >
            Save
          </span>
        </div>
      </div>
    </>
  );
};

export default ChangeContainer;
