import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/vector';
import Map from 'ol/Map';

export class Toolbox {
    private point: Draw;
    private chain: Draw;
    private square: Draw;
    private rect: Draw;
    private circle: Draw;

    constructor(map: Map, source: VectorSource) {
        this.initializeInteractions(source);
    }

    private initializeInteractions(source: VectorSource): void {
        this.point = new Draw({
            source: source,
            type: 'Point'
        });

        this.chain = new Draw({
            source: source,
            type: 'LineString'
        });

        this.square = new Draw({
            source: source,
            type: 'Polygon',
            geometryFunction: Draw.createRegularPolygon(4)
        });

        this.rect = new Draw({
            source: source,
            type: 'Polygon',
            geometryFunction: Draw.createBox()
        });

        this.circle = new Draw({
            source: source,
            type: 'Circle'
        });
    }

}