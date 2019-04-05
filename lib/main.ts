import Map from 'ol/Map';
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

var draw: Draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    var geometryFunction;
    if (value === 'Square') {
      value = 'Circle';
      geometryFunction = Draw.createRegularPolygon(4);
    } else if (value === 'Box') {
      value = 'Circle';
      geometryFunction = Draw.createBox();
    } else if (value === 'Point') {
      value = 'Point';
      geometryFunction = undefined;
    } else if (value === 'Line') {
      value = 'LineString';
      geometryFunction = undefined;
    }
    draw = new Draw({
      source: source,
      type: value,
      geometryFunction: geometryFunction
    });
    map.addInteraction(draw);
    console.log(map);
    textArea.value = vector.getSource().getFeatures().toString();
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();