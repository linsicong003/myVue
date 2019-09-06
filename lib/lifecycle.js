import Watcher from './Watcher';
// 初始化计算属性
export function createComputed() {
    let vm = this;
    // 获取配置的计算属性项
    let computed = this.$options.computed;
    vm._computed = {};
    // 若为空则结束操作
    if (!computed || Object.isNull(computed)) { return };
    // 遍历加载
    Object.keys(computed).forEach((key) => {
        this._computed[key] = computed[key].call(this._vm);
        new Watcher(this._vm, key, val => {
            this._computed[key] = computed[key].call(this._vm)
        })
    })
}

// 初始化 mounted 生命周期
export function createMounted() {
    let mounted = this.$options.mounted;
    mounted && mounted.call(this);
}