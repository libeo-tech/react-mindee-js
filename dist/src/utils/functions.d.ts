import Konva from 'konva';
import { LineConfig } from 'konva/lib/shapes/Line';
import { Stage } from '..';
export declare const drawLayer: (stage: Konva.Stage) => void;
export declare const drawShape: (stage: Konva.Stage, id: string | number, config: LineConfig) => void;
export declare const drawShapes: (stage: Stage, config: LineConfig) => void;
export declare const setShapeConfig: (stage: Konva.Stage, id: string | number, config: LineConfig) => void;
export declare const toBase64: (base64: string, type?: 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/svg+xml') => string;
