import Game from "./core/game/game";
import Gameplay from "./states/gameplay";
import Preload from "./states/preload";

class SpaceShooterGame extends Game {
  _create() {
    const states = this._states;
    states.register(Preload);
    states.register(Gameplay);
    states.setState(Preload);
  }
}

const game = new SpaceShooterGame();
game.start();
