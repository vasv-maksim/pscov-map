import { pscov } from './pscov';

// Картографический параметр, GeoJSON 
export const spatialData = [
    { id:'KRS', data: pscov, title: 'Крупный рогатый скот' },
    { id:'Pig', data: pscov, title: 'Свиньи' },
    { id:'Horses', data: pscov, title: 'Лошади'},
    { id:'Ptica', data: pscov, title: 'Птицы'},
    { id:'Ships', data: pscov, title: 'Овцы'},
 ];

// Настройки легенды
export const legend =  [ 
    {
      id: 'KRS',
      title: 'Крупный рогатый скот, тыс.голов',
      grades: [
       { title: `Менее 1.0`, background: [155, 100, 200, 0.2], breakpoint: { min: Number.NEGATIVE_INFINITY, max: 1.0 } },
       { title: '1.0 - 2.0', background: [155, 100, 200, 0.4], breakpoint: { min: 1.0, max: 2.0 } },
       { title: '2.0 - 5.0', background: [155, 100, 200, 0.6], breakpoint: { min: 2.0, max: 5.0 } },
       { title: '5.0 - 9.0', background: [155, 100, 200, 0.8], breakpoint: { min: 5.0, max: 9.0 } },
       { title: 'Более 9.0', background: [155, 100, 200, 1], breakpoint: { min: 9.0, max: Number.POSITIVE_INFINITY } },
     ],
     stroke: [255, 255, 255, 1]
   }, 
   {
     id: 'Pig',
     title: 'Свиньи, тыс.голов',
     grades: [
       { title: 'Менее 1.0', background: [229, 204, 255, 0.8], breakpoint: { min: Number.NEGATIVE_INFINITY, max: 1.0 } },
       { title: '1.0 - 2.0', background: [153, 153, 255, 0.8], breakpoint: { min: 1.0, max: 2.0 } },
       { title: '2.0 - 5.0', background: [40, 50, 255, 0.8], breakpoint: { min: 2.0, max: 5.0 } },
       { title: '5.0 - 10.0', background: [0, 0, 154, 0.8], breakpoint: { min: 5.0, max: 10.0 } },
       { title: 'Более 10.0', background: [0, 0, 102, 0.8], breakpoint: { min: 10.0, max: Number.POSITIVE_INFINITY } },
     ],
     stroke: [255, 255, 255, 1]
   }, 
   {
     id: 'Horses',
     title: 'Лошади, тыс.голов',
     grades: [
       { title: 'Менее 1.0', background: [0, 255, 0, 0.2], breakpoint: { min: Number.NEGATIVE_INFINITY, max: 1.0 } },
       { title: '1.0 - 2.0', background: [0, 255, 0, 0.4], breakpoint: { min: 1.0, max: 2.0 } },
       { title: '2.0 - 5.0', background: [0, 255, 0, 0.6], breakpoint: { min: 2.0, max: 5.0 } },
       { title: '5.0 - 8.0', background: [0, 255, 0, 0.8], breakpoint: { min: 5.0, max: 8.0 } },
       { title: 'Более 8.0', background: [0, 255, 0, 1], breakpoint: { min: 8.0, max: Number.POSITIVE_INFINITY } },
     ],
     stroke: [255, 255, 255, 1]
   }, 
   {
     id: 'Ptica',
     title: 'Птицы, тыс.голов',
     grades: [
       { title: 'Менее 1.0', background: [255, 255, 0, 0.2], breakpoint: { min: Number.NEGATIVE_INFINITY, max: 1.0 } },
       { title: '1.0 - 2.0', background: [255, 255, 0, 0.4], breakpoint: { min: 1.0, max: 2.0 } },
       { title: '2.0 - 5.0', background: [255, 255, 0, 0.6], breakpoint: { min: 2.0, max: 5.0 } },
       { title: '5.0 - 10.0', background: [255, 255, 0, 0.8], breakpoint: { min: 5.0 , max: 10.0 } },
       { title: 'Более 10.0', background: [255, 255, 0, 1.0], breakpoint: { min: 8.0, max: Number.POSITIVE_INFINITY } },
     ],
     stroke: [255, 255, 255, 1]
   },
   {
    id: 'Ships',
    title: 'Овцы, тыс.голов',
    grades: [
      { title: 'Менее 1.0', background: [255, 0, 0, 0.2], breakpoint: { min: Number.NEGATIVE_INFINITY, max: 1.0 } },
      { title: '1.0 - 2.0', background: [255, 0, 0, 0.4], breakpoint: { min: 1.0, max: 2.0 } },
      { title: '2.0 - 5.0', background: [255, 0, 0, 0.6], breakpoint: { min: 2.0, max: 5.0 } },
      { title: '5.0 - 8.0', background: [255, 0, 0, 0.8], breakpoint: { min: 5.0, max: 8.0 } },
      { title: 'Более 8.0', background: [255, 0, 0, 1.0], breakpoint: { min: 8.0, max: Number.POSITIVE_INFINITY } },
    ],
    stroke: [255, 255, 255, 1]
  } 
];

// Карты-подложки
//  export const basemaps = [
//     URL: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
//     URL: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
// ];

