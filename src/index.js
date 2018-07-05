import './css/main.css'
import {animationFix} from './js/globalFunctions'
import GameRunner from './js/GameRunner'

animationFix();

window.game = new GameRunner();


//done: untill game is not started to be unable to make any other moves
//todo: planes should move relative to the ground, and keep moving out of the view when game is over
//todo: take acceleration into account when estimating position of the plane
//done: no obstacles at game start
//done: prevent double jump
//done: save next action
//todo: display score
//todo: implement collision
//todo: take into account the current speed when setting the distance between obstacles

