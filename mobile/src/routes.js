import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Main from './pages/Main';
import LikesDislikes from './pages/LikesDislikes';
export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main,
    LikesDislikes,
  }),
);
