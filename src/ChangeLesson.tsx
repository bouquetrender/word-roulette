import React, { useState } from "react";
import ImportContainer from "./ImportContainer";
import ChangeContainer from "./ChangeContainer";

interface Props {
  onBack: () => void;
}

const ChangeLesson = React.memo((props: Props) => {
  const [importSwitch, setImportSwitch] = useState(false);

  const onSwitch = (state: boolean) => {
    setImportSwitch(state);
  };

  return (
    <>
      {!importSwitch ? (
        <ChangeContainer
          onBack={props.onBack}
          onSwitch={() => {
            onSwitch(true);
          }}
        />
      ) : (
        <ImportContainer
          onCancel={() => {
            onSwitch(false);
          }}
          onConfirm={() => {
            onSwitch(false);
          }}
        />
      )}
    </>
  );
});

export default ChangeLesson;
