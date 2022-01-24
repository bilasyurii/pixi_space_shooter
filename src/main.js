import Game from "./core/game/game";
import GameplayState from "./gameplay/gameplay-state";
import PreloadState from "./preload/preload-state";

const game = new Game();
const states = game.getStates();

states.register(PreloadState);
states.register(GameplayState);
states.setState(PreloadState);

game.start();
