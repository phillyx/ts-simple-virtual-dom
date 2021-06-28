import { E_DIFF } from '../lib/patch';
export declare type T_OBJ = {
    [key: string]: any;
};
export declare type T_KEY = string | number;
export declare type T_ArrayNode = Array<IVNode | string | null>;
export interface IVNode {
    tagName: string;
    children: T_ArrayNode;
    key?: T_KEY;
    text?: string;
    count: number;
    props: T_OBJ;
    parentVNode?: IVNode;
    render(): HTMLElement | Text;
}
export declare type _patchType = {
    type?: E_DIFF;
    node?: IVNode;
    content?: string;
    moves?: T_OBJ[];
    props?: T_OBJ | null;
    parentNode?: IVNode;
};
export declare type patchTypes = Array<_patchType>;
export declare type patchesTypes = {
    [key: number]: patchTypes;
};
