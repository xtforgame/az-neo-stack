// import {
//   urlPrefix,
//   routerPrefix,
// } from 'config';
import React from 'react';
import { renderRoutes } from 'react-router-config';
import MainFrame from './MainFrame';
import Home from './Home';
import ArticlePage from './Blog/Articles';

import About from './About/About';

import SimpleLoginOnly from '../containers/SimpleLoginOnly';
import GoodsManagement from '../containers/GoodsManagement';

const DefaultRoute = ({ route }) => <React.Fragment>{renderRoutes(route.routes)}</React.Fragment>;

export const navigation = [
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: SimpleLoginOnly,
  },
  {
    name: 'DesktopMainFrame',
    component: MainFrame,
    path: '/',
    routes: [
      {
        name: '',
        path: '/',
        component: Home,
        exact: true,
      },
      {
        name: 'GoodsManagement',
        path: '/gm',
        component: GoodsManagement,
      },
      {
        name: 'Blog',
        component: DefaultRoute,
        path: '/blogc1',
        routes: [
          {
            name: 'Some Disabled Page',
            path: '/some-page',
            component: ArticlePage,
            disabled: true,
          },
          {
            name: 'Articles',
            path: '/blogc1',
            exact: true,
            component: ArticlePage,
          },
          {
            name: 'Article',
            path: '/blogc1/:articleId',
            dynamic: true,
            component: ArticlePage,
          },
        ],
      },
      {
        name: 'ABOUT',
        component: DefaultRoute,
        path: '/about',
        routes: [
          {
            name: 'About',
            path: '/about',
            component: About,
          },
        ],
      },
    ],
  },
];

export default navigation;

export const forEachNodeRecur = (node, cb) => {
  cb(node);
  if (node.routes) {
    node.routes.forEach(node => forEachNodeRecur(node, cb));
  }
};

export const forEachNode = (cb) => {
  navigation.forEach(node => forEachNodeRecur(node, cb));
};
