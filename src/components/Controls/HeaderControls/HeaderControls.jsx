import "./header-controls.css";
import Controls from "../Controls";

export default function HeaderControls({
  onPlayAgain,
  setLang,
  toggleKeyboard,
  showKeyboard,
  setShowInstructions,
}) {
  return (
    <Controls
      displayType="header"
      onPlayAgain={onPlayAgain}
      setLang={setLang}
      toggleKeyboard={toggleKeyboard}
      showKeyboard={showKeyboard}
      setShowInstructions={setShowInstructions}
    />
  );
}
