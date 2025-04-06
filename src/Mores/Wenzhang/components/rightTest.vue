<template>
  <div>
    <rightList :lists="datas" @chuandiData="eventData" />
    <!-- <rightList /> -->
  </div>
</template>

<script>
import rightList from './rightList.vue'

export default {
  components: {
    rightList,
  },
  data() {
    return {
      // right列表数组 [{name='xxx', isStyle=true, children:[{name:'yyy', isStyle=false, children:[]}]}]
      datas: [
        { name: 'a', isStyle: false },
        {
          name: 'b',
          isStyle: true,
          children: [
            {
              name: 'c-1',
              isStyle: true,
              children: [
                {
                  name: 'c-1-1', isStyle: true, children: [
                    { name: 'c-1-1-1', isStyle: false },
                    { name: 'c-1-1-2', isStyle: false },
                    { name: 'c-1-1-3', isStyle: true }
                  ]
                },
                { name: 'c-1-2', isStyle: false },
                { name: 'c-1-3', isStyle: false },
              ]
            },
            { name: 'c-2', isStyle: false },
            { name: 'c-3', isStyle: false },
          ]
        },
        { name: 'c', isStyle: false },
      ]
    }
  },
  methods: {
    eventData(item) {
      console.log('数据给父组件传递了', item);
    }
  }
}

</script>

<style scoped lang="less"></style>