import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fa from "./fa";
import fr from "./fr";

export const translations = {
  ar,
  de,
  en,
  es,
  fa,
  fr,
};

export type SupportedLang = keyof typeof translations;
