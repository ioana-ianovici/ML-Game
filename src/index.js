import './css/main.css'
import GameRunner from './js/GameRunner'
import BasicAI from "../AI/BasicAI";


window.game = new GameRunner();  //to be used for development
window.AI = new BasicAI();
// new GameRunner();  //to be used in production
