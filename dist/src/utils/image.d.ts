import Konva from 'konva';
import { ImageData } from '../common/types';
import { Stage } from '..';
import { ImageBoundingBox, PointerPosition } from './../common/types';
export declare const dataURItoBlob: (dataURI: string) => Blob;
export declare const prepareImage: (image: string) => Promise<string>;
export declare const urlToBlob: (url: string) => Promise<Blob>;
export declare const tiffToJpg: (blob: Blob) => Promise<string>;
export declare const heicToJpg: (blob: Blob) => Promise<string>;
export declare const computeImageBoundingBox: ({ clientWidth, clientHeight }: HTMLDivElement, imageObj: HTMLImageElement, fullWidth: boolean) => {
    scale: number;
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const handleResizeImage: (stage: Konva.Stage | null, container: HTMLDivElement | null, { element, shape }: ImageData, fullWidth: boolean) => {
    scale: number;
    x: number;
    y: number;
    width: number;
    height: number;
} | undefined;
export declare const setStageBasedImagePosition: ({ imageBoundingBox, stage, newPosition, }: {
    imageBoundingBox: ImageBoundingBox;
    stage: Stage;
    newPosition: PointerPosition;
}) => void;
