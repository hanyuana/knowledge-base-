const obj = {
    name: "韩程远",
    age: 18
}
const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
        console.log(`get-----------`)
        //return target[key] //  这样做也是直接操作原来的对象，使用代理的原因不想直接操作Objcet

        // 所以我们要用Reflect 在方法内部获取对象
        // get 接收三个参数。第一个参数是 要对那个对象进行操作，第二个参数是获取对象里面的哪一个属性。
        return Reflect.get(target, key)
    },
    set(target, key, newVal, receiver) {
        console.log(`set-----------`)

        // target[key] = newVal 赋值成功还是失败,是无法得知的,如果赋值的是冻结freeze 属性 就不可以设置值.
        //  Reflect.set(target, key, newVal, receiver) 设置值的时候,返回值是一个boolean类型 可以根据返回值来看是否成功
        const result = Reflect.set(target, key, newVal, receiver)
    }
})

objProxy.name = "kobe";
console.log(objProxy.name);