import * as R from 'rodin/main';
import VideoContainer from './VideoContainer/videoContainer.js';
import {WeatherInterface} from './weatherInterface/WeatherInterface.js';

const interfaceSculpt = new R.Sculpt();
const videoPanelHolder = new R.Sculpt();
const rightPanelHolder = new R.Sculpt();
let leftInterface = VideoContainer.mainContainer;
videoPanelHolder.add(leftInterface);
leftInterface.position.set(0, 2.4, -4);
videoPanelHolder.rotation.y = Math.PI / 2.8;
leftInterface.rotation.x = Math.PI /12;
interfaceSculpt.add(videoPanelHolder);

const weatherInterface = new WeatherInterface(VideoContainer.height);
rightPanelHolder.add(weatherInterface);

rightPanelHolder.rotation.y = -Math.PI / 2.8;
weatherInterface.position.set(0, 2.4, -4);
weatherInterface.rotation.x = Math.PI /12;
interfaceSculpt.add(rightPanelHolder);


R.Scene.add(interfaceSculpt);