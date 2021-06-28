import { IVNode, patchesTypes } from '../interface';
/** props diff or node replace */
export declare function diff(oldNode: IVNode, newNode: IVNode): patchesTypes;
/**node removed */
export declare function diff(oldNode: IVNode, newNode: null): patchesTypes;
/**node replaced by textNode */
export declare function diff(oldNode: IVNode, newNode: string): patchesTypes;
/**textnode replaced by IVNode */
export declare function diff(oldNode: string, newNode: IVNode): patchesTypes;
/**textNode changed? */
export declare function diff(oldNode: string, newNode: string): patchesTypes;
/**textNode removed */
export declare function diff(oldNode: string, newNode: null): patchesTypes;
