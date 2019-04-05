import Map from 'ol/Map';
import { Toolbox } from "./toolbox";
import View from 'ol/View';
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
var selectionList: HTMLElement = <HTMLElement>document.getElementById('selection-list');

var toolbox: Toolbox = new Toolbox(map, source);


/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  toolbox.activate(typeSelect.value);
};

source.on('change', () => {
  console.log('Layer change');
  selectionList.innerHTML = formatSelections(toolbox.getSelections());
})

function formatSelections(selections: Array<{type: string, data: any[]}>): string {
  let selectionHtmlString = "";

  selections.forEach((selection) => {
    console.log('Selection: ', selection);

    let formatedData: string = selection.type === "Circle" ? selection.data.toString() : selection.data.join("<br>");
    formatedData = formatedData.replace(new RegExp(" ", "g"), "<br>");
    formatedData = formatedData.replace(new RegExp(",", "g"), " : ");

    selectionHtmlString += selection.type + ":: " + formatedData + '<br>';
  });

  return selectionHtmlString;
}

toolbox.activate(typeSelect.value)
