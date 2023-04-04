const obj = {
    _name:"han",
    get name(){
        return this._name
    },
    set name(newVal){
        this._name = newVal
    },
}

console.log()
const objProxy = new Proxy(obj,{
    // receiver 是创建出来的代理对象 就等于ObjProxy
    get:function(target,key,receiver){
       return Reflect.get(target,key,receiver)
    },
    set:function(target,key,newVal,receiver){
        Reflect.set(target,key,newVal)
    }
})
objProxy.name = "hanA";
console.log(objProxy.name)
