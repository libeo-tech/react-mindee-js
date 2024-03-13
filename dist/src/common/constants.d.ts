import { Line } from 'konva/lib/shapes/Line';
import { AnnotationData } from '..';
export declare const DEFAULT_STYLE: {
    height: number;
    width: number;
    display: string;
    backgroundColor: string;
};
export declare enum KONVA_REFS {
    shapesLayer = "shapes-layer",
    shape = "shape"
}
export declare const DEFAULT_LENS_ZOOM_LEVEL: number;
export declare const DEFAULT_POINTER_POSITION: {
    x: number;
    y: number;
};
export declare const PDF_RESOLUTION: number;
export declare const MAX_PDF_SCALE = 5.5;
export declare const DEFAULT_DATA: AnnotationData;
export declare const DEFAULT_ANNOTATION_VIEWER_OPTIONS: {
    enableSelection: boolean;
    selectionRectConfig: {
        fill: string;
    };
    onMouseLeave: (polygon: Line) => void;
    onMouseEnter: (polygon: Line) => void;
    shapeConfig: {
        stroke: string;
        strokeWidth: number;
        listening: boolean;
    };
    zoom: {
        modifier: number;
        max: number;
        defaultZoom: number;
    };
    fullWidth: boolean;
};
export declare const DEFAULT_ANNOTATION_LENS_OPTIONS: {
    shapeConfig: {
        stroke: string;
        strokeWidth: number;
        listening: boolean;
    };
    fullWidth: boolean;
};
