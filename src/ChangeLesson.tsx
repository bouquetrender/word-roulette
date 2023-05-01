import { useContext, useState } from "react";
import { WordsDispatchContext, WordsContext } from "./store";

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

  const [currentSelection, setCurrentSelection] = useState(store.lesson);

  const lessonListData: lessonObj[] = Array.from({
    length: Object.keys(store.vocabulary).length,
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

  return (
    <>
      <div className="mt-8 text-xl border-2 rounded h-2/3 overflow-y-auto p-4">
        {/* <span>Current </span>
        <select
          id="small-select"
          disabled={lessonListData.length === 0}
          className="rounded select w-32 text-zinc-800 active:border-transparent focus:border-transparent focus:ring-transparent"
          onChange={(e) => {
            dispatch({
              type: "changeLesson",
              val: e.target.value,
            });
          }}
        >
          {lessonListData.map((lesson) => {
            return (
              <option key={lesson.name} value={lesson.name}>
                {lesson.name}
              </option>
            );
          })}
        </select> */}

        {lessonListData.map((lesson) => {
          return (
            <div
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
      </div>

      <div className="mt-6 text-2xl  flex justify-between">
        <div>Current Selection [ {store.lesson} ]</div>
        <div>
          <span className="cursor-pointer hover:underline" onClick={onConfirm}>
            Save
          </span>
          <span
            className="cursor-pointer hover:underline ml-8"
            onClick={onBack}
          >
            Close
          </span>
        </div>
      </div>
    </>
  );
};

export default ChangeLesson;
