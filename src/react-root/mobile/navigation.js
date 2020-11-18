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
    name: 'MobileLogin',
    path: '/mobile/login',
    exact: true,
    component: SimpleLoginOnly,
  },
  {
    name: 'MobileMainFrame',
    component: MainFrame,
    path: '/mobile',
    routes: [
      {
        name: '',
        path: '/mobile',
        component: Home,
        exact: true,
      },
      {
        name: 'GoodsManagement',
        path: '/mobile/gm',
        component: GoodsManagement,
      },
      {
        name: 'Blog',
        component: DefaultRoute,
        path: '/mobile/blogc1',
        routes: [
          {
            name: 'Some Disabled Page',
            path: '/mobile/some-page',
            component: ArticlePage,
            disabled: true,
          },
          {
            name: 'Articles',
            path: '/mobile/blogc1',
            exact: true,
            component: ArticlePage,
          },
          {
            name: 'Article',
            path: '/mobile/blogc1/:articleId',
            dynamic: true,
            component: ArticlePage,
          },
        ],
      },
      {
        name: 'ABOUT',
        component: DefaultRoute,
        path: '/mobile/about',
        routes: [
          {
            name: 'About',
            path: '/mobile/about',
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
