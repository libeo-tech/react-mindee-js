import { Layer } from 'konva/lib/Layer';
import { KonvaEventObject } from 'konva/lib/Node';
import { Rect } from 'konva/lib/shapes/Rect';
import { Stage } from 'konva/lib/Stage';
import { AnnotationShape, AnnotationViewerOptions } from '../common/types';
export declare const createSelectionRect: (options: AnnotationViewerOptions) => Rect;
export declare const calculateSelectionPoint: (stage: Stage) => {
    x: number;
    y: number;
} | undefined;
export declare const onSelectionStart: (event?: KonvaEventObject<Stage>, layer?: Layer, rect?: Rect, selectionEnabled?: boolean) => void;
export declare const onSelectionMove: (layer?: Layer, rect?: Rect) => void;
export declare const onSelectionEnd: (layer?: Layer, rect?: Rect, onShapeMultiSelect?: ((shapes: AnnotationShape[]) => void) | undefined) => void;
