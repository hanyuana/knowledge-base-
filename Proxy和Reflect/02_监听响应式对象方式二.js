const obj = {name:"韩程远",age:18}

// Proxy 接受两个参数
// 1. 代理对象
// 2. 捕获器对象
const objProxy = new Proxy(obj,{
    // 获取值得捕获器
    // 当用户获取值得时候自动回调，objProxy.name 自动get()
    // 接受三个参数  
            // target ---> objProxy 所代理得对象    
            // key --- > 对象的key
            // receiver ---> 当前代理的对象 
    get(target,key,receiver){
        console.log(`监听到objProxy的${key}发生被获取了`)
        return target[key]
    },

    // 设置值的回调函数自动会掉 objProxy.name = "韩" 
    // 接受四个参数 target key newval  receiver
    // newVal 设置的值。
    set(target,key,newVal,receiver){
        console.log(`监听到objProxy的${key}被设置`)
        target[key]= newVal;
    }
})
console.log(objProxy.name)
console.log(objProxy.age)

objProxy.age = 20
objProxy.name = "韩大"
console.log(objProxy)