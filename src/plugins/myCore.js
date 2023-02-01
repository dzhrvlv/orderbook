export default {
    install(Vue) {
        const { DataBus } = require('./DataBus');
        const { SDK } = require("./SDK")
        Vue.prototype.$bus = DataBus;
        Vue.prototype.$sdk = SDK;
    }
};