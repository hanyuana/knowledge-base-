const obj = {
    _name: "Han",
    get name() {
        return this._name
    },
    set name(newVal) {
        this._name = newVal
    }
}


// obj.name = "韩程远"  //访问的时set方法
// console.log(obj.name)  //访问的是get方法


// 监听obj 
let objProxy = new Proxy(obj, {
    get(target, key,receiver) {
        // receiver 是创建出来的代理对象
        console.log(`get 方法被访问-----------`,key,receiver)

        console.log(receiver === objProxy)

        // Reflect 在调用get 方法的时候也可以传入 receiver,可以把reciver  传入到get方法 可以改变调用对象里面的get方法里面的this指向
        return Reflect.get(target, key,receiver)
    },
    set(target, key, newVal,receiver) {
        console.log(`set方法被访问----------`,key)
        Reflect.set(target, key, newVal,receiver)
    }
})

// objProxy.name = "kobe";
// console.log(objProxy.name) // 现在我们想去看objProxy.name 的访问过程是什么样子的呢
// 1. 因为是objProxy的name，所以会来到proxy的get方法里面
// 2. get捕获器里面通过Reflect的get捕获器 去拿target 里面的key 
// 3. 最终访问的还是get name() 方法 

console.log(objProxy.name = "韩");