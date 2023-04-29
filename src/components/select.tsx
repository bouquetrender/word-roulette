import { useContext, useMemo } from "react";
import { WordsDispatchContext, WordsContext } from "../store";

interface lessonObj {
  name: string;
  unavailable: boolean;
}

interface Props {
  state: boolean;
}

const ListBox = (props: Props) => {
  const dispatch = useContext(WordsDispatchContext);
  const store = useContext(WordsContext);

  const lessonListData = useMemo(() => {
    const list: lessonObj[] = Array.from({
      length: Object.keys(store.vocabulary).length,
    }).map((_empty, index) => {
      return {
        name: index === 0 ? "ALL" : `Lesson${index}`,
        unavailable: false,
      };
    });
    return list;
  }, [store]);

  const lessonListOptions = useMemo(() => {
    return lessonListData.map((lesson) => {
      return (
        <option key={lesson.name} value={lesson.name}>
          {lesson.name}
        </option>
      );
    });
  }, [lessonListData]);

  return (
    <div className="inline-block">
      <span>Current : </span>
      <select
        id="small-select"
        disabled={props.state || lessonListData.length === 0}
        className="rounded select w-32 text-zinc-800 active:border-transparent focus:border-transparent focus:ring-transparent"
        onChange={(e) => {
          dispatch({
            type: "changeLesson",
            val: e.target.value,
          });
        }}
      >
        {lessonListOptions}
      </select>
    </div>
  );
};

export default ListBox;
