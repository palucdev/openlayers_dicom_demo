import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/vector';
import Map from 'ol/Map';

export class Toolbox {
    private point!: Draw;
    private chain!: Draw;
    private square!: Draw;
    private rect!: Draw;
    private circle!: Draw;

    private currentActive!: string;

    constructor(map: Map, source: VectorSource) {
        this.initializeInteractions(source);

        map.addInteraction(this.point);
        this.point.setActive(false);
        map.addInteraction(this.chain);
        this.chain.setActive(false);
        map.addInteraction(this.square);
        this.square.setActive(false);
        map.addInteraction(this.rect);
        this.rect.setActive(false);
        map.addInteraction(this.circle);
        this.circle.setActive(false);
    }

    public activate(toolName: string): void {
        if (this.currentActive) {
            this.changeToolActivity(this.currentActive, false);
        }
        this.changeToolActivity(toolName, true);
        this.currentActive = toolName;
    }

    private changeToolActivity(toolName: string, acitivityFlag: boolean): void {
        let tool = this.getTool(toolName);
        if (tool) {
            (<Draw>tool).setActive(acitivityFlag);
        } else {
            console.error('Cannot find ' + toolName + ' tool!');
        }
    }

    private getTool(name: string): Draw | null {
        switch(name) {
            case 'Point':
                return this.point;
            case 'Chain':
                return this.chain;
            case 'Square':
                return this.square;
            case 'Rectangle':
                return this.rect;
            case 'Circle':
                return this.circle;
        }

        return null;
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
            type: 'Circle', // One click drawing like Circle
            geometryFunction: Draw.createRegularPolygon(4)
        });

        this.rect = new Draw({
            source: source,
            type: 'Circle', // One click drawing like Circle
            geometryFunction: Draw.createBox()
        });

        this.circle = new Draw({
            source: source,
            type: 'Circle'
        });
    }

}