<template>
  <div>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <div>
      <input v-model="message">
      <p>{{obj.message}}</p>
    </div>
  </div>
</template>

<script>
  //  import store from "../store";
  import {mapState} from 'vuex'

  export default {
    name: "store",

    computed:{
      ...mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
        obj: "obj",

        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState(state) {
          return state.count + this.localCount
        }
      }),
      message: {
        get () {
          return this.$store.state.obj.message
        },
        set (value) {
          this.$store.commit('updateMessage', value)
        }
      }
    } ,

    methods: {
      increment() {
        store.commit('increment')
      },
      decrement() {
        store.commit('reduce')
      },
      updateMessage(e) {
        this.$store.commit('updateMessage', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
