import Game from "../../core/game/game";
import Debug from "../../core/utils/debug";
import Localization from "../../core/utils/localization";
import strings from "./strings.json";

/**
 * @param {Game} game 
 */
export default function SetupLocalization(game) {
  Localization.setFromJSON(strings);

  const browserLanguage = game.getDevice().language;
  Debug.info(`Detected language: ${browserLanguage}.`);
  Localization.setLanguage(browserLanguage);
}
