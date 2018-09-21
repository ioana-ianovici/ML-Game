import './css/main.css'
import GameRunner from './js/GameRunner'
import FirstAI from "../AI/FirstAI"
import AIControls from "../AI/AIControls"


window.game = new GameRunner();
new AIControls(FirstAI);
