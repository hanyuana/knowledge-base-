"use strict";
window.onload = () => {
    class Wujie extends HTMLElement {
        constructor() {
            super();
            // shadowdom
            let dom = this.attachShadow({ mode: "open" });
            let template = document.querySelector("#wujie");
            dom.appendChild(template.content.cloneNode(true));
            console.log(this.getAttr("url"), this.getAttr("age"));
        }
        getAttr(attr) {
            return this.getAttribute(attr);
        }
    }
    // 类似于vue的组件 原生js的组件
    window.customElements.define("wu-jie", Wujie);
};
