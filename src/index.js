import './css/main.css'
import {animationFix} from './js/globalFunctions'
import GameRunner from './js/GameRunner'

animationFix();

window.game = new GameRunner();


//done: untill game is not started to be unable to make any other moves
//todo: planes should move relative to the ground, and keep moving out of the view when game is over
//todo: no obstacles at game start
//todo: prevent double jump
//todo: save next action
//todo: display score
//todo: implement collision