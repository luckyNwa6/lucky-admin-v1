<template>
  <div class="dnd-app">
    <div class="dnd-wrap" ref="dndContainer">
      <div data-type="rect" class="dnd-rect" @mousedown="startDrag">Rect</div>
      <div data-type="circle" class="dnd-circle" @mousedown="startDrag">Circle</div>
    </div>

    <div class="app-content" ref="container"></div>
  </div>
</template>
<script>
import { Graph } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Snapline } from '@antv/x6-plugin-snapline'

export default {
  data() {
    return {
      graph: null,
      dnd: null,
    }
  },

  mounted() {
    const graph = new Graph({
      container: this.$refs.container,
      background: {
        color: '#F2F7FA',
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
    })

    graph.use(
      new Snapline({
        enabled: true,
        sharp: true,
      })
    )

    graph.centerContent()

    this.dnd = new Dnd({
      target: graph,
      scaled: false,
      dndContainer: this.$refs.dndContainer,
    })
    this.graph = graph
  },

  methods: {
    startDrag(e) {
      console.log('进入了')

      const target = e.currentTarget
      const type = target.getAttribute('data-type')
      const node =
        type === 'rect'
          ? this.graph.createNode({
              width: 100,
              height: 40,
              label: 'Rect',
              attrs: {
                body: {
                  stroke: '#8f8f8f',
                  strokeWidth: 1,
                  fill: '#fff',
                  rx: 6,
                  ry: 6,
                },
              },
            })
          : this.graph.createNode({
              width: 60,
              height: 60,
              shape: 'circle',
              label: 'Circle',
              attrs: {
                body: {
                  stroke: '#8f8f8f',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            })

      console.log('2122')

      this.dnd.start(node, e)
    },
  },
}
</script>

<style scoped>
.dnd-app {
  display: flex;
  padding: 0;
  font-family: sans-serif;
}

.dnd-app .app-content {
  flex: 1;
  height: 240px;
  margin-right: 8px;
  margin-left: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}

.dnd-app .dnd-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  user-select: none;
}

.dnd-app .dnd-wrap .dnd-rect {
  width: 100px;
  height: 40px;
  margin: 16px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  cursor: move;
}

.dnd-app .dnd-wrap .dnd-circle {
  width: 60px;
  height: 60px;
  margin: 16px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #8f8f8f;
  border-radius: 100%;
  cursor: move;
}
</style>
