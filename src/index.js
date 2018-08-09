import './css/main.css'
import {animationFix} from './js/globalFunctions'
import GameRunner from './js/GameRunner'

animationFix();

// window.game = new GameRunner();  //to be used for development
new GameRunner();  //to be used in production
