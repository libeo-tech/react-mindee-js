import { MutableRefObject } from 'react';
import Konva from 'konva';
interface Props {
    stage: Konva.Stage | null;
    isSelectionActiveRef: MutableRefObject<boolean>;
}
export default function useMultiSelection({ stage, isSelectionActiveRef, }: Props): void;
export {};
