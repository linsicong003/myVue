// 全部函数
import Binding from './Binding'
import Compile from './Compile'
// import { createComputed, createMounted } from './lifecycle'

class myVue3 {
    // 初始化
    constructor(options = {}) {
        // 保留配置项
        this.$options = options;
        // 获取数据
        let data = this._data = this.$options.data;
        // 初始化监听数组
        this.binding = new Binding();
        // 订阅数据
        this._data = this.observe.call(this, data);
        // 初始化计算属性
        // createComputed.call(this);
        // 编译 DOM 中的 Vue 语法元素
        new Compile(options.el, this)
    }
    // 双向绑定订阅数据
    observe(data) {
        const that = this;
        // 如果不存在或不是对象则返回原数据
        if (!data || typeof data !== 'object') return data;
        // 否则加入订阅
        return new Proxy(data, {
            get: (target, prop) => {
                return Reflect.get(target, prop);
            },
            set: (target, prop, value) => {
                // 更新对应数据
                let result = Reflect.set(target, prop, value);
                // 发布订阅
                that.binding.subs[prop].forEach(item => {
                    item.update();
                });
                return result;
            }
        })
    }
}

export default myVue3;