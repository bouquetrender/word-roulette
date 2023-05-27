import { useState } from "react";
import ImportContainer from "./ImportContainer";
import ChangeContainer from "./ChangeContainer";

interface Props {
  onBack: () => void;
}

const ChangeLesson = (props: Props) => {
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
          onSwitch={() => {
            onSwitch(false);
          }}
        />
      )}
    </>
  );
};

export default ChangeLesson;
