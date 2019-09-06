// 观察者队列

class Binding {
    // 初始化
    constructor() {
        this.subs = {};
    }
    // 增加订阅
    addSub(sub) {
        if (sub.key) this.subs[sub.key.trim()] = [];
        this.subs[sub.key.trim()].push(sub)
    }
    // 通知事件
    notify() {
        this.subs.filter((item) => typeof item !== 'string').forEach((sub) => {
            sub.update()
        })
    }
}

export default Binding;