import './css/main.css'
import {animationFix} from './js/globalFunctions'
import GameRunner from './js/GameRunner'

animationFix();

// window.game = new GameRunner();  //to be used for development
new GameRunner();  //to ve used for production


// done: untill game is not started to be unable to make any other moves
// todo: planes should move relative to the ground, and keep moving out of the view when game is over
// done: no obstacles at game start
// done: prevent double jump
// done: save next action
// done: display score
// todo: implement collision
// todo: take into account the current speed when setting the distance between obstacles
// todo: display game over at game over
// todo: dispay high score

