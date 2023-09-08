import React from "react";

interface Props {
  onBack: () => void;
}

const About = React.memo((props: Props) => {
  return (
    <>
      <div className="text-2xl pt-10 pb-4">
        A self-use webpage for random vocabulary testing, built with TypeScript,
        React, TailwindCSS, and Vite. You can check out the project's source
        code on{" "}
        <a
          className="underline"
          href="https://github.com/bouquetrender/word-roulette"
          target="_blank"
        >
          GitHub
        </a>
        .
      </div>

      <div className="text-2xl pt-4 pb-10">
        一个用于随机测试单词的自用网页，基于TypeScript、React、TailwindCSS和Vite构建。您可以在{" "}
        <a
          className="underline"
          href="https://github.com/bouquetrender/word-roulette"
          target="_blank"
        >
          GitHub
        </a>{" "}
        上查看项目的源代码。
      </div>

      <div className="mt-6 text-2xl flex justify-between">
        <span className="cursor-pointer hover:underline" onClick={props.onBack}>
          Back
        </span>
      </div>
    </>
  );
});

export default About;
