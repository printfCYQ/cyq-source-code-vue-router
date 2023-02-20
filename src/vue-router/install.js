export let Vue;
function install(_Vue) {
  Vue = _Vue; // 将传入的Vue变为全局函数

  // mergeOptions 所有组件初始化都会采用这个方法
  Vue.mixin({
    beforeCreate() {
      // 渲染：从父到子
      if (this.$options.router) {
        this._routerRoot = this; // 根实例
        this._router = this.$options.router;
      } else {
        // 在所有组件上都增加一个 _routerRoot 指向根实例
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      console.log(this);
    },
  });

  // $router
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot && this._routerRoot._router;
    },
  });
  console.log("install");
}
export default install;
