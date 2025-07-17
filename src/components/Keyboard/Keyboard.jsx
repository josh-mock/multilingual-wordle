import "./keyboard.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useLang } from "../../contexts/LanguageContext";
import keyboards from "./keyboards";

export default function Keyboard({ usedKeys, onKeyClick }) {
  const { lang } = useLang();
  const rows = keyboards[lang] || en;
  return (
    <div className="keyboard">
      <div className="keyboard__inner">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard__row">
            {row.map((key) => {
              const color = usedKeys[key];
              let content = key;

              if (key === "Backspace") {
                content = <BackspaceIcon />;
              } else if (key === "Enter") {
                content = <KeyboardReturnIcon />;
              }

              return (
                <button
                  key={key}
                  className={`keyboard__key keyboard__key--${color} ${
                    key === "Backspace" || key === "Enter"
                      ? `keyboard__key--${key} keyboard__key--${key}-${lang}`
                      : ""
                  }`}
                  onClick={() => onKeyClick({ key })}
                  aria-label={
                    key === "Backspace" || key === "Enter"
                      ? key
                      : `Letter ${key}`
                  }
                >
                  {content}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
