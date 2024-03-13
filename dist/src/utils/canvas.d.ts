import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { AnnotationLensOptions, AnnotationShape, AnnotationViewerOptions, ImageBoundingBox, PointerPosition } from '../common/types';
export declare const mapShapesToPolygons: (shapesLayer: Layer, shapes: any[] | undefined, useEvents: boolean | undefined, imageBoundingBox: ImageBoundingBox | null, options: AnnotationLensOptions | AnnotationViewerOptions, onClick?: ((shape: AnnotationShape) => void) | undefined, onShapeMouseEnter?: ((shape: AnnotationShape) => void) | undefined, onShapeMouseLeave?: ((shape: AnnotationShape) => void) | undefined) => void;
export declare const scalePointToImage: (point: PointerPosition, imageBoundingBox: ImageBoundingBox) => {
    x: number;
    y: number;
};
export declare const getMousePosition: (stage: Konva.Stage | null, imageBoundingBox: ImageBoundingBox | null) => {
    x: number;
    y: number;
} | undefined;
