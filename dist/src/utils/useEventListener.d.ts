import { RefObject } from 'react';
export default function useEventListener<T extends HTMLElement = HTMLDivElement, E = Event>(eventName: string, handler: (event: E) => void, element?: RefObject<T>): void;
