// const obj ={
//     name:"韩程远",
//     age:18
// }
// 监听单个属性
// Object.defineProperty(obj,"name",{
//     get(){
//         console.log(`监听到obj的name发生被访问了`)
//     },
//     set(){
//         console.log(`监听到obj的name发生被设置了`)
//     }
// })   

// 如果想要监听对象的所有属性：我们可以选择用Object.keys 来遍历出所有可以迭代的属性。
// Object.keys()接受一个对象，然后将所有的key收集起来，然后返回一个数组。

let obj = {
    name: "韩程远",
    age: 18
}
Object.keys(obj).forEach(keys => {
    console.log(keys)
    let value = obj[keys]
    Object.defineProperty(obj, keys, {
        get() {
            return value
        },
        set(newVal) {
            value = newVal
            console.log(`监听到obj的${keys}发生被设置了`)
        }
    })
})
obj.name = "韩大"
obj.age =30
console.log(obj.name)
console.log(obj.age)

obj.height = 188;

delete obj.name;