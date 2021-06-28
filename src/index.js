import cr from "./lib/element";

export const el = cr;

function reactive(obj) {
  let p = new Proxy(obj, {
    get(obj, prop, reciever) {
      return Reflect.get(obj, prop, reciever);
    },
    set(obj, pro, value) {
      const res = Reflect.set(obj, pro, value);
    },
  });
}
