import {
  urlPrefix,
} from 'config';
import articlePic1 from './StockSnap_3FOSIEZDTW.jpg';

// const articlePic1 = `${urlPrefix}images/logo2.png`;
const articlePic2 = `${urlPrefix}images/logo2.png`;
const articlePic3 = `${urlPrefix}images/logo2.png`;
const articlePic4 = `${urlPrefix}images/logo2.png`;

export const categories = {
  'blog/category1': {
    id: 1,
    routePathPrefix: 'blogc1/',
    paths: [
      { label: 'Blog', link: '' },
      { label: 'Category1', link: 'blogc1' },
    ],
  },
  'blog/category2': {
    id: 2,
    routePathPrefix: 'blogc2/',
    paths: [
      { label: 'Blog', link: '' },
      { label: 'Category2', link: 'blogc2' },
    ],
  },
};

export const tsArticles = [
  {
    id: 'ts-wiprp01',
    category: categories['blog/category1'],
    thumbnail: articlePic1,
    title: 'Title 01',
    description: 'description01 description01 description01 description01',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'ts-wiprp02',
    category: categories['blog/category1'],
    thumbnail: articlePic2,
    title: 'Title 02',
    description: 'description02 description02 description02 description02',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'ts-wiprp03',
    category: categories['blog/category1'],
    thumbnail: articlePic3,
    title: 'Title 03',
    description: 'description03 description03 description03 description03',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'ts-wiprp04',
    category: categories['blog/category1'],
    thumbnail: articlePic4,
    title: 'Title 04',
    description: 'description04 description04 description04 description04',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
];

export const anArticles = [
  {
    id: 'an-wiprp01',
    category: categories['blog/category2'],
    thumbnail: articlePic1,
    title: 'Title 01',
    description: 'description01 description01 description01 description01',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'an-wiprp02',
    category: categories['blog/category2'],
    thumbnail: articlePic2,
    title: 'Title 02',
    description: 'description02 description02 description02 description02',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'an-wiprp03',
    category: categories['blog/category2'],
    thumbnail: articlePic3,
    title: 'Title 03',
    description: 'description03 description03 description03 description03',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
  {
    id: 'an-wiprp04',
    category: categories['blog/category2'],
    thumbnail: articlePic4,
    title: 'Title 04',
    description: 'description04 description04 description04 description04',
    content: [
      { type: 'paragraph', text: 'Xxxxxx xxxxxxxx xxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxx' },
      { type: 'image', src: articlePic1 },
      { type: 'paragraph', text: 'ooooooo oooooo ooooooooo oooooo ooo ooooooooooo ooo oooo oooooooo oooooooo oooooooo' },
      { type: 'paragraph', text: 'zzzzz zzzzzz zzzzzzzzzz zzz zzzzzzzzzzzzzzzz zzzzzzzzzzz zzzzzzzzzzzzzz zzzzzzzzzz' },
    ],
  },
];


export const articleMap = {
  ...tsArticles.reduce((m, a) => ({ ...m, [a.id]: a }), {}),
  ...anArticles.reduce((m, a) => ({ ...m, [a.id]: a }), {}),
};
