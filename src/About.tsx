import React from "react";

interface Props {
  onBack: () => void;
}

const About = React.memo((props: Props) => {
  return (
    <>
      <div className="text-2xl pt-10 pb-4">
        A self-use webpage for random vocabulary testing, built with TypeScript,
        React, TailwindCSS, and Vite.
      </div>

      <div className="text-2xl pt-4 pb-10">
        一个用于测试单词掌握的自用网页，基于 TypeScript、React、TailwindCSS 和 Vite 构建。
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
