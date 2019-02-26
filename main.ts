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
    } else if (value === 'Star') {
      value = 'Circle';
      geometryFunction = (coordinates: any, geometry: any) => {
        var center = coordinates[0];
        var last = coordinates[1];
        var dx = center[0] - last[0];
        var dy = center[1] - last[1];
        var radius = Math.sqrt(dx * dx + dy * dy);
        var rotation = Math.atan2(dy, dx);
        var newCoordinates = [];
        var numPoints = 12;
        for (var i = 0; i < numPoints; ++i) {
          var angle = rotation + i * 2 * Math.PI / numPoints;
          var fraction = i % 2 === 0 ? 1 : 0.5;
          var offsetX = radius * fraction * Math.cos(angle);
          var offsetY = radius * fraction * Math.sin(angle);
          newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
        }
        newCoordinates.push(newCoordinates[0].slice());
        if (!geometry) {
          geometry = new Polygon(newCoordinates);
        } else {
          geometry.setCoordinates([newCoordinates]);
        }
        return geometry;
      };
    }
    draw = new Draw({
      source: source,
      type: value,
      geometryFunction: geometryFunction
    });
    map.addInteraction(draw);
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