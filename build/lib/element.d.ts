import { T_OBJ, T_KEY, T_ArrayNode, IVNode } from '../interface';
export declare class Element implements IVNode {
    tagName: string;
    props: T_OBJ;
    children: T_ArrayNode;
    key?: T_KEY;
    text?: string | undefined;
    count: number;
    parentVNode?: IVNode;
    constructor(_tagName: string, props?: T_OBJ, children?: T_ArrayNode);
    render(): HTMLElement | Text;
}
export default function (_tagName: string): IVNode;
export default function (_tagName: string, children: T_ArrayNode): IVNode;
export default function (_tagName: string, props: T_OBJ): IVNode;
export default function (_tagName: string, props: T_OBJ, children: T_ArrayNode): IVNode;
