// 给定一个数字，生成一个数组
function numToArr(int) {
    // 参数校验
    if(!(Number.isInteger(int) && int >= 1 && int < 1e4)) return null;
    
    const arr = []
     for(let i = 1; i <= int; i++) {
        arr.push(i)
    }
    arr.sort();
    
    return arr
}


// 生成n个Fibonacci数列 0,1,1,2,3,5,8,13...
function numToFbi(n) {
    // 参数校验
    if(!(Number.isInteger(n) && n > 0 && n < 1e10)) return null

    const arr = [];

    for(let i = 0; i < n; i++) {
        arr[i] = fbi(i);
    }

    return arr
}

// Febonacci函数
function fbi(n) {
    // 参数校验
    if (!(Number.isInteger(n) && n >= 0 && n <=1e10)) return -1
    
    if(n < 2) {
        return n === 0 ? 0 : 1
    } else {
        return fbi(n - 1) + fbi(n - 2)
    }
}

// 简单选择排序
function selectSort(arr) {
    if(!Array.isArray(arr)) return null;
    
    const len = arr.length;
    for(let i = 0; i < len; i++) {
        let min = i;
        for(let j = i + 1; j < len; j++) {
            if(arr[min] > arr[j]) min = j;
        }

        if(min !== i) swap(arr, i, min);
    }

    return arr;
}

// 交换数组项
function swap(arr, i, j) {
    const isInteger = Number.isInteger;
    if(Array.isArray(arr) && arr.length >= 2 && isInteger(i) && i >= 0 && i < arr.length && isInteger(j) && j >= 0 && j < arr.length) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;   
    }
}

/**
 * @param {number[]} mountain
 * @return {number[]}
 * 找数组里的峰值（峰值：一个数严格大于相邻的两个数。注意：首尾都不是峰值。）
 */
var findPeaks2 = function(mountain) {
    const result = [];
    // 参数校验
    if(Array.isArray(mountain) && mountain.length > 2) {
        const len = mountain.length
        
        // 两值比较的结果类型
        const compareMap = {
            'less': -1,
            'equal': 0,
            'greater': 1,
            'notTypeof': 2
        };
        const compare = (i, j) => {
            const iData = mountain[i];
            const jData = mountain[j];
            if(typeof iData === typeof jData) {
                if(iData > jData) {
                    return compareMap['greater'];
                } else if(iData === jData) {
                    return compareMap['equal'];
                } else if(iData < jData) {
                    return compareMap['less'];
                }
            } else {
                console.log(typeof iData, typeof jData, typeof iData !== typeof jData)
                return compareMap['notTypeof'];
            }
        }

        for(let i = 0, leftCompare = false;i < len - 1; i++) {
            const compareRes = compare(i, i + 1);
            const rightCompare = compareRes === compareMap['greater']; // 计算右值比较的结果
            if(leftCompare && rightCompare) result.push(i);

            leftCompare = compareRes === compareMap['less'];// 为下一个循环传递左值比较
        }
    }

    return result;
};

// 闭包计数器
const createCounter = function(init) {
    // 参数校验
    if(!(Number.isInteger(init) && init >= -1e3 && init <= 1e3)) return null;

    let curr = init;

    return {
        increment: () => {
            if(this.curr - init > 1e3) return this.curr;

            return ++this.curr;
        },
        decrement: () => {
            if(init - this.curr > 1e3) return this.curr;

            return --this.curr;
        },
        reset: () => {
            this.curr = init;
            return this.curr;
        }
    };
};

// sort()练习
const arr = [
    { name: "Edward", value: 21 },
    { name: "Sharpe", value: 37 },
    { name: "And", value: 45 },
    { name: "The", value: -12 },
    { name: "Magnetic", value: 13 },
    { name: "Zeros", value: 37 }
];
// 按照value升序排列
arr.sort((a, b) => a.value - b.value);

// 按照name升序排列
arr.sort((a, b) => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();
    if(aName < bName) {
        return -1;
    } else if(aName > bName) {
        return 1;
    } else {
        return 0;
    }
})

/**
 * @param {string} url
 * @param {object} params
 * @return {string}
 * 拼接url查询参数
 */
function addURLParams(url, params = null) {
    // 参数校验
    if(!(url && typeof url === 'string' && params && typeof params === 'object')) return '';

    for(const name in params) {
        if(!params.hasOwnProperty(name)) continue;

        url += url.indexOf('?') === -1 ? '?' : '&';
        url += encodeURIComponent(name) + '=' + encodeURIComponent(params[name]);
    }

    return url;
}

// 原型式继承
function object(o) {
    function F () {};
    F.prototype = o;
    return new F();
}

// 生成器对象
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

// 使用生成器实现范围数组
function *range(start, end) {
    while(start <= end) {
        yield start++;
    }
}
for(let i of range(1, 5)) {
    console.log(i);
}

// 使用生成器实现填充数组
function *zeros(n) {
    while(n--) {
        yield 0;
    }
}
console.log(Array.from(zeros(5)));

// yield增强
function *generatorFn() {
    for(let i of [1, 2, 3, 4, 5]) {
        yield i;
    }
}
const g = generatorFn();
for(let x of g) {
    if(x > 1) {
        g.return(9);
    }
    
    console.log(x);
}

// 手动实现call函数
Function.prototype.myCall = function(context) {
    // 参数校验
    if(!(typeof this === 'function' && context && typeof context === 'object')) return;

    // 改变函数作用域
    context.fn = this;
    const args = [...arguments].slice(1);
    let result = null;

    result = args.length ? context.fn(...args) : context.fn();
    delete context.fn;

    return result;
}

// 手动实现bind函数
Function.prototype.myBind = function(context) {
    // 入参校验
    if(!(typeof this === 'function' && context && typeof context === 'object')) return () => {};

    const args = [...arguments].slice(1);
    return (...secondArgs) => {
        secondArgs = args.concat(secondArgs);
        return secondArgs.length ? this.apply(context, secondArgs) : this.apply(context);
    }
}

/**
 * 防抖。即：持续触发不执行；不触发的一段时间之后再执行
 * @param {*} fn 
 * @param {*} wait 
 * @returns function
 */
 function debounce(fn, wait) {
    let timer;

    return function(event) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.call(this, event);
        }, wait);
    }
}

// 节流
function throttle(fn, wait) {
    let timer;
    return function(event) {
        if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.call(this, event);
            }, wait);
        }
        
    }
}

// 单例模式的构造函数
const CreateSingleton = (function() {
    let obj;

    return function(name) {
        if(obj) return obj;

        this.name = name;

        return obj = this;
    }
})();

CreateSingleton.prototype.getName = function() {
    return this.name;
}

// 拍平数组（用扩展符号）
function flattenArray(arr) {
    if(!Array.isArray(arr)) return [];

    for(let i = 0, item; i < arr.length; i++) {
        item = arr[i];
        if(Array.isArray(item)) {
            arr.splice(i, 1, ...item);
            i--; // 删除了一项元素，故指针要退一。不然会漏遍历掉第一个插入的元素。
        }
    }
    
    return arr;
}

// 拍平数组（不用扩展符号，重新申请一个数组空间）
function flattenArr2(arr) {
    const result = [];

    const fn = function(arr2) {
        arr2.forEach(item => {
            if(Array.isArray(item)) {
                fn(item)
            } else {
                result.push(item);
            }
        })
    }

    Array.isArray(arr) && fn(arr);

    return result;
}

// 拍平数组（不用扩展符号，在原数组上做改变）。可读性不友好，不用这个。
function flattenArr3(arr) {
    // 入参校验
    if(!Array.isArray(arr)) return [];

    let i = 0, n = 1; // n代表遍历时，指针移动多少位，默认1位
    // 核心代码：递归，遍历要拍平的元素，符合便插入原数组
    const fn = function(item) {
        item.forEach(item2 => {
            if(Array.isArray(item2)) {
                fn(item2);
            } else {
                // 插入几个元素，指针就往后移n+1位。即，插入的元素，跳过遍历
                arr.splice(i + n++, 0, item2);
            }
        })
    }
    while(i < arr.length) {
        const item = arr[i];
        // 每遍历完一个元素，n就要恢复成默认值
        n = 1;

        if(Array.isArray(item)) {
            // 删除数据类型是数组的元素
            arr.splice(i, 1);
            // 每删除一个元素，n就减少一位，即指针不动（因为删了一个嘛）
            n--;

            fn(item);
        }

        i += n;
    }

    return arr;
}

/**
 * 数组去重
 * 用reduce。声明新数组
*/ 
function arrayDeduplication(arr) {
    // 入参校验
    if(!Array.isArray(arr)) return [];

    return arr.reduce((prev, curr) => {
        if(!prev.includes(curr)) prev.push(curr);

        return prev;
    }, []);
}

/**
 * 数组去重
 * 用Set。声明新数组
*/ 
function arrayDeduplication2(arr) {
    // 入参校验
    if(!Array.isArray(arr)) return [];

    return [...new Set(arr)];
}

// 构建树。扁平--->树
function toTree(arr, parentId = null) {
    // 参数校验
    if(!Array.isArray(arr)) return [];
  
    arr = cloneDeep(arr);// 深复制，避免改原数据。
  
    /**
     * 构建tree，返回tree
     * 用闭包，避免重复深复制arr占内存
     */
    const fn = function(id) {
      const tree = [];
  
      arr.forEach(item => {
        if(item.parentId === id) {
          const children = fn(item.id);
          if(children.length) item.children = children;
    
          tree.push(item);
        }
      });
  
      return tree;
    }
  
    return fn(parentId);
  }
  
  // todo:暂时用JSON
  function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

// 异步加载图片
function imageAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.addEventListener('error', (error) => {
            reject(error);
        })
        img.src = url;
    });
}