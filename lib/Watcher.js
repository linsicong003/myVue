// 发布订阅队列

class Watcher {
    constructor(node, attr, data, key) {
        this.node = node
        this.attr = attr
        this.data = data
        this.key = key
    }
    update() {
        this.node[this.attr] = this.data[this.key]
    }
}

export default Watcher