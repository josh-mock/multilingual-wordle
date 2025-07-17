import Controls from "../Controls";
import "./dropdown-controls.css";

export default function DropdownControls({
  onPlayAgain,
  setLang,
  toggleKeyboard,
  showKeyboard,
}) {
  return (
    <Controls
      displayType="dropdown"
      onPlayAgain={onPlayAgain}
      setLang={setLang}
      toggleKeyboard={toggleKeyboard}
      showKeyboard={showKeyboard}
    />
  );
}
