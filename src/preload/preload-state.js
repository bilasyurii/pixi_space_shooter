import { Loader } from "pixi.js";
import GameState from "../core/states/game-state";
import Debug from "../core/utils/debug";
import GameplayState from "../gameplay/gameplay-state";

export default class PreloadState extends GameState {
  onEntered() {
    const loader = Loader.shared;

    loader.add('background', 'assets/img/background.png');
    loader.add('asteroid', 'assets/img/asteroid.png');
    loader.add('spaceship', 'assets/img/spaceship.png');

    loader.load(() => this._onAssetsLoaded());
  }

  _onAssetsLoaded() {
    Debug.info('Assets loaded.');

    this.game.getStates().setState(GameplayState);
  }
}
