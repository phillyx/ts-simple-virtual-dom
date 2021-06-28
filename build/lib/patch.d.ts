import { patchesTypes } from '../interface';
export declare enum E_DIFF {
    REPLACE = 0,
    REORDER = 1,
    PROPS = 2,
    TEXT = 3,
    INSERT = 4,
    REMOVE = 5
}
export declare function patch(node: HTMLElement, patches: patchesTypes): HTMLElement;
