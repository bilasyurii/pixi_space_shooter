import { Sprite, Text } from "pixi.js";
import GameState from "../core/states/game-state";
import Localization from "../core/utils/localization";
import GameplayState from "../gameplay/gameplay-state";

export default class ResultState extends GameState {
  constructor(game) {
    super(game);

    this._overlay = null;
    this._winText = null;
    this._loseText = null;
    this._tutorialText = null;
  }

  onEntered(config) {
    this._initOverlay();
    this._initWinText();
    this._initLoseText();
    this._initTutorialText();
    this._setupEvents();
    this._showElements(config);
  }

  _initOverlay() {
    const overlay = new Sprite();
    this._overlay = overlay;
    this.addChild(overlay);
    overlay.interactive = true;
  }

  _initWinText() {
    const text = new Text(Localization.get('you_win'), {
      fontFamily: 'Montserrat',
      fontSize: 100,
      fill: 'chartreuse',
      stroke: 'darkgreen',
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

  _initTutorialText() {
    const str = (this.game.getDevice().desktop ? 'retry_tutorial_desktop' : 'retry_tutorial_mobile');
    const text = new Text(Localization.get(str), {
      fontFamily: 'Montserrat',
      fontSize: 50,
      align: 'center',
      fill: 'white',
      stroke: 'dimgrey',
      strokeThickness: 5,
    });
    this._tutorialText = text;
    this.addChild(text);
    text.anchor.set(0.5);
  }

  _setupEvents() {
    this.game.getScreen().onResize.add(this._onScreenResize, this);

    if (this.game.getDevice().desktop) {
      this._listenKeyboard();
    } else {
      this._listenOverlay();
    }
  }

  _showElements(config) {
    if (config.isWin) {
      this._winText.visible = true;
    } else {
      this._loseText.visible = true;
    }
  }

  _onScreenResize() {
    const screen = this.game.getScreen();
    const width = screen.getWidth();
    const height = screen.getHeight();
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const winText = this._winText;
    const loseText = this._loseText;
    const tutorialText = this._tutorialText;

    winText.position.set(centerX, centerY);
    loseText.position.set(centerX, centerY);
    tutorialText.position.set(centerX, height * 0.75);

    const maxTextWidth = width * 0.8;
    Localization.fitText(winText, maxTextWidth, 200);
    Localization.fitText(loseText, maxTextWidth, 200);
    Localization.fitText(tutorialText, maxTextWidth, 200);

    const overlay = this._overlay;
    overlay.width = width;
    overlay.height = height;
  }

  _listenKeyboard() {
    const keyboard = this.game.getInput().getKeyboard();
    const spaceKey = keyboard.addKey('Space');
    spaceKey.onUp.add(this._onSpaceKeyDown, this);
  }

  _listenOverlay() {
    this._overlay.on('pointerdown', this._onOverlayDown, this);
  }

  _onOverlayDown() {
    this._startNewGame();
  }

  _onSpaceKeyDown() {
    this._startNewGame();
  }

  _startNewGame() {
    this.setState(GameplayState);
  }
}
