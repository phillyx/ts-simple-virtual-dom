import { noop } from "./shared.util";
import { handleError } from "./error";
import { isIE, isIOS, isNative } from "./env";

export let isUsingMicroTask = false;

const callbacks = [];

let pending = false;

function flushCallbacks() {
  pedning = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let timeFunc;

if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();

  timeFunc = () => {
    p.then(flushCallbacks);

    if (isIOS) setTimeout(noop);
  };

  isUsingMicroTask = true;
} else if (
  (!isIE &&
    typeof MutationObserver !== "undefined" &&
    isNative(MutationObserver)) ||
  MutationObserver.toString() === "[object MutationOBserverConstructor]"
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  // 每次执行timerFunc都会让文本节点的内容在0/1之间切换,
  // 不用true/false可能是有的浏览器对于文本节点设置内容为true/false有bug？
  // 切换之后将新值赋值到那个我们MutationObserver观测的文本节点上去
  timeFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timeFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  timeFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timeFunc();
  }

  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
