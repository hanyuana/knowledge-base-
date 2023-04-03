const obj = { name: "韩程远", age: 18 }


// Proxy 接受两个参数
// 1. 代理对象
// 2. 捕获器对象
const objProxy = new Proxy(obj, {
    // 获取值得捕获器
    // 当用户获取值得时候自动回调，objProxy.name 自动get()
    // 接受三个参数  
    // target ---> objProxy 所代理得对象    
    // key --- > 对象的key
    // receiver ---> 当前代理的对象 
    get(target, key, receiver) {
        console.log(`监听到objProxy的${key}发生被获取了`)
        return target[key]
    },

    // 设置值的回调函数自动会掉 objProxy.name = "韩" 
    // 接受四个参数 target key newval  receiver
    // newVal 设置的值。
    set(target, key, newVal, receiver) {
        console.log(`监听到objProxy的${key}被设置`)
        target[key] = newVal;
    },

    // 监听in方法的捕获器,has捕获器
    // 接受两个参数  target 和 key
    has(target, key) {
        console.log(`监听到objProxy的${key}的in操作`, target)
        return key in target
    },

    // 监听到delect 捕获器
    deleteProperty(target, key) {
        console.log(`监听到objProxy的${key}的delect操作`, target)
        delete target[key]
    },
    // 当读取代理对象原型的时候进行的操作
    getPrototypeOf(target) {
        return target
    },
    defineProperty: function (target, key, descriptor) {
        console.log(target, key, descriptor)
        console.log('called: ' + key);
        return true;
    },
    isExtensible(target) {
        return Reflect.isExtensible(target)
    },
    // preventExtensions(target) {
    //     console.log(`操作了preventExtensions`)
    //     Object.preventExtensions(target);
    //     return true;
    // },
    getOwnPropertyDescriptor(target, key) {
        console.log("属性" + key)
        return { configurable: true, enumerable: true, value: 10 }
    },
    ownKeys(target){
        return Reflect.ownKeys(target)
    },
    setPrototypeOf(target,newProto){
        console.log("target",target)
        console.log("newProto",newProto)
    }

})
var newProto = {};
// console.log(Object.getOwnPropertyDescriptor(objProxy, 'a'));
Reflect.setPrototypeOf(objProxy, newProto); 
// Object.setPrototypeOf(objProxy,newProto)

// console.log(Object.keys(objProxy)) // 也会触发getOwnPropertyDescriptor 







// console.log(Object.getPrototypeOf(objProxy)) //{ name: '韩程远', age: 18 }
// 如果我们想判断一个属性是否在 原来对象里面
// obj 的 in操作
// 如何用代理的方式监听到呢？
// console.log("name" in objProxy);


// 如果我们想要直接删除某个属性那么 如何监听到呢。

// delete objProxy.name
// objProxy.height = 188

// 
// objProxy.name;

// console.log("name" in objProxy)
// console.log(objProxy)

// console.log(Object.getPrototypeOf(objProxy))

// console.log(objProxy(1, 2));


// defineProperty() 用来拦截对象Object.definePoroperty

// let heightDesc = { configurable: true, enumerable: true, value: 10 };
// Object.defineProperty(objProxy,"height",heightDesc  ); 



// console.log(Object.isExtensible(objProxy))


// Object.preventExtensions(objProxy);
// console.log(Object.isExtensible(objProxy))





















// apply() 方法用于拦截函数的调用。
function sum(a, b) {
    return a + b;
}
// thisArg 被调用的时候它的作用域对象
// argumentsList 被调用的时候的参数数组

const sumProxy = new Proxy(sum, {
    apply(target, thisArg, argumentsList) {
        console.log(`打印参数: ${argumentsList}`);
        return target(argumentsList[0], argumentsList[1]) * 10;
    }
})
// console.log(sum(1, 2));
// console.log(sumProxy(1, 2));




// construct 用来拦截new 操作符，为了使new操作符生成的Proxy对象上生效，
// 用于初始化代理的目标对象自身必须有[Construct]内部方法。new target必须有效

// function mosterl(disposition) {
//     this.disposition = disposition;
// }

// const mosterlProxy = new Proxy(mosterl,{
//     construct(target,args){
//         console.log(target)
//         console.log(`输出一下啊 ${target.name}`)
//         return new target(...args)
//     }
// })

// console.log(new mosterlProxy("fierce").disposition)