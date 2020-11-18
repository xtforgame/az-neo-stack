import App from './App';
import { navigation as desktopNavigation } from './desktop/navigation';
import { navigation as mobileNavigation } from './mobile/navigation';

export default [{
  component: App,
  routes: [
    ...mobileNavigation,
    ...desktopNavigation,
    // {
    //   component: DesktopMainFrame,
    //   path: '/',
    //   routes: desktopRoutes,
    // },
  ],
}];
