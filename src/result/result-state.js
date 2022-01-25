import { Text } from "pixi.js";
import GameState from "../core/states/game-state";
import Localization from "../core/utils/localization";

export default class ResultState extends GameState {
  constructor(game) {
    super(game);

    this._winText = null;
    this._loseText = null;
  }

  onEntered() {
    this._initWinText();
    this._initLoseText();
    this._setupEvents();
  }

  _initWinText() {
    const text = new Text(Localization.get('you_win'), {
      fontFamily: 'Montserrat',
      fontSize: 100,
      fill: 'black',
      stroke: 'white',
      strokeThickness: 10,
    });
    this._winText = text;
    this.addChild(text);
    text.anchor.set(0.5);
    text.visible = false;
  }

  _initLoseText() {
    const text = new Text(Localization.get('you_lose'), {
      fontFamily: 'Montserrat',
      fontSize: 100,
      fill: 'red',
      stroke: 'darkred',
      strokeThickness: 10,
    });
    this._loseText = text;
    this.addChild(text);
    text.anchor.set(0.5);
    text.visible = false;
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const winText = this._winText;
    const loseText = this._loseText;

    winText.position.set(centerX, centerY);
    loseText.position.set(centerX, centerY);

    const maxTextWidth = width * 0.8;
    Localization.fitText(winText, maxTextWidth, 200);
    Localization.fitText(loseText, maxTextWidth, 200);
  }
}
