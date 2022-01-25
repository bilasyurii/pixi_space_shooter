import Game from "./core/game/game";
import SetupLocalization from "./data/localization/setup-localization";
import GameplayState from "./gameplay/gameplay-state";
import PreloadState from "./preload/preload-state";
import ResultState from "./result/result-state";

const game = new Game();
const states = game.getStates();

SetupLocalization(game);

states.register(PreloadState);
states.register(GameplayState);
states.register(ResultState);
states.setState(PreloadState);

game.start();
