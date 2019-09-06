import myVue3 from "./myVue.js"

new myVue3({
    el: '#app',
    data: {
        count: 0,
        other: 10
    },
    methods: {
        changeCount() {
            console.log('值增加啦');
            this.count++;
        },
        changeOther() {
            console.log('值减少啦')
            this.other--;
        }
    }
})
