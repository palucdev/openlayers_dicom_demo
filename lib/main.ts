import Map from 'ol/Map';
import { Toolbox } from "./toolbox";
import View from 'ol/View';
import Polygon from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';

var raster = new TileLayer({
  source: new XYZ({
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  })
});

var source = new VectorSource({wrapX: false});

var vector = new VectorLayer({
  source: source
})

var map = new Map({
  target: 'map',
  layers: [
    raster,
    vector
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var typeSelect: any = document.getElementById('type');
var textArea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('textarea');

var toolbox: Toolbox = new Toolbox(map, source);

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  toolbox.activate(typeSelect.value)
};

toolbox.activate(typeSelect.value)
