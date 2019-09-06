// 编译 HTML 元素
import Watcher from './Watcher'

class Compile {
    constructor(el, vm) {
        // 取已做好拦截操作的数据源
        this.data = vm._data;
        // 获取根节点
        let root = this.root = document.querySelector(el);
        // 获取根节点下所有子节点集合
        let nodes = root.childNodes;
        this.nodes = nodes;
        // 存储全局 this
        this.vm = vm;
        // 订阅列表
        this.binding = vm.binding;
        // 开始编译
        this.compile(nodes);
    }
    // 编译函数
    compile(nodes) {
        let vm = this.vm;
        let data = vm._data;
        // 遍历子节点
        Array.from(nodes).forEach(node => {
            // 获取节点类型
            // 1: 元素节点  3： 内容节点
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
            let type = node.nodeType;

            // 文字节点
            if (type === 3) {
                let text = node.textContent.trim();
                if (!text) return true;
                this.compileText(node, 'textContent')
            }
            // 编译元素节点
            else if (type === 1) {
                // 如果有子节点则先放入递归
                if (node && node.children.length > 0) this.compile(node);
                // 处理 input 或 textarea 中的 v-model
                if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
                    node.addEventListener('input', (() => {
                        let key = node.getAttribute('v-model').trim();
                        // 加入该项至监听队列
                        this.vm.binding.addSub(new Watcher(node, 'value', data, key));
                        // 删除该项属性
                        node.removeAttribute('v-model');
                        // 修改值
                        return () => {
                            data[key] = node.value;
                        }
                    })());
                }
                // 处理 v-html 
                if (node.hasAttribute('v-html')) {
                    let key = node.getAttribute('v-html').trim();
                    this.vm.binding.addSub(new Watcher(node, 'innerHTML', data, key))
                    node.removeAttribute('v-html');
                }
                // 处理点击事件 onClick || @click || onTap || @tap
                if (node.hasAttribute('onClick') || node.hasAttribute('@click')) {
                    const methods = vm.$options.methods;
                    if (!methods) return;
                    let key = node.getAttribute('onClick') || node.getAttribute('@click');
                    // 转发至对应处理方法
                    let method = methods[key].bind(data);
                    // 绑定点击事件
                    node.addEventListener('click', method);
                    // 删除对应的属性
                    node.hasAttribute('onClick') && node.removeAttribute('onClick');
                    node.hasAttribute('@click') && node.removeAttribute('@click');
                }
                this.compileText(node, 'innerHTML');
            }
        })
    }
    // 编译文字节点
    compileText(node, type) {
        let vm = this.vm;
        let txt = node.textContent;
        let data = vm._data;
        let reg = /\{\{(.*?)\}\}/g;
        // 存放该节点下的键值数组
        let valueArr = [];
        // 编译双花括号
        if (reg.test(txt)) {
            // 将原 HTML 中的花括号写法替换
            node.innerHTML = txt.replace(reg, (matched, value) => {
                // node.textContent = txt.replace(reg, (matched, value) => {
                valueArr.push(value.trim())
                // 返回对应值
                // value 是正则第一个括号匹配到的子串
                if (value.split('.').length > 1) {
                    let v = null;
                    // 返回花括号中的属性的值
                    value.split('.').forEach((val, i) => {
                        v = !v ? vm[val] : v[val];
                    })
                    return `<span myvue>${v}</span>`;
                } else {
                    return `<span myvue>${data[value.trim()]}</span>`;
                }
            })
            // 过滤出新编译进去的元素
            let tArr = [];
            node.childNodes.forEach((item) => {
                // 判断是否为双向绑定编译后的标签
                if (item.nodeType === 1 && item.hasAttribute('myvue')) tArr.push(item);
            })
            // 放置监听
            // 订阅花括号包裹内容
            tArr.forEach((item, index) => {
                this.vm.binding.addSub(new Watcher(item, type, data, valueArr[index]))
            })
        }
    }
}

export default Compile