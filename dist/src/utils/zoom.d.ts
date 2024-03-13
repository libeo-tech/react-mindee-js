import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { AnnotationViewerOptions, ImageBoundingBox, PointerPosition } from '../common/types';
export declare const calculateZoomScale: (stage: Konva.Stage, zoomScale: number, imageBoundingBox: ImageBoundingBox) => {
    newScale: number;
    newPos: {
        x: number;
        y: number;
    };
};
export declare const handleZoomScale: (stage: Konva.Stage | null, zoomScale: number, imageBoundingBox: ImageBoundingBox | null) => void;
export declare const calculateStageZoom: (stage: Konva.Stage, deltaY: number, options: AnnotationViewerOptions) => {
    newScale: number;
    newPos: {
        x: number;
        y: number;
    };
};
export declare const handleStageZoom: (stage: Konva.Stage | null, imageBoundingBox: ImageBoundingBox | null, event: KonvaEventObject<WheelEvent>, options: AnnotationViewerOptions) => void;
export declare const calculateLensZoom: (pointerPosition: PointerPosition, imageBoundingBox: ImageBoundingBox, stage: Konva.Stage, zoomLevel: number) => PointerPosition;
export declare const handleLensZoom: (stage: Konva.Stage | null, imageBoundingBox: ImageBoundingBox | null, pointerPosition: PointerPosition, zoomLevel?: number) => void;
