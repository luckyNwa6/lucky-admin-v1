<template>
  <div>
    <div id="myDiagramDiv" class="diagram-box"></div>
    <ul id="contextMenu" class="menu">
      <li id="cut" class="menu-item" @click="cxcommand($event)">Cut</li>
      <li id="copy" class="menu-item" @click="cxcommand($event)">Copy</li>
      <li id="paste" class="menu-item" @click="cxcommand($event)">Paste</li>
      <li id="delete" class="menu-item" @click="cxcommand($event)">Delete</li>
    </ul>
  </div>
</template>
<script>
import go from 'gojs'
export default {
  computed: {},
  data() {
    return {
      myDiagram: {},
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      /*
                图表(Diagram)
                基本元素：点(Node)、线(Link)
                点和线自由组合就是 组(Group)
                所有的元素都处在 图层(Layer) 上，并且可以对他们进行 布局(Layout)
                每一个点和线都是通过模板来描述他们的文本、形状、颜色等信息以及交互行为。每一个模板其实就是一个 面板(Panel)
                每个图表都是通过 数据模型(Model) 来填充和确定 点 的信息和 线 的所属关系
                并且我们只需创建好 点 和 线 的模板以及数据模型，其他事情都交给gojs处理
                Model又分为了以下三种类型：
                Model：最基本的（不带连线）
                GraphLinksModel ：高级点的动态连线图
                TreeModel：树形图的模型
                gojs通过Model.nodeDataArray方法和GraphLinksModel.linkDataArray方法自动加载模型并构建元素
                通过ToolManager对象管理工具类(交互行为)，譬如管理CommandHandler对象用来添加一些键盘命令
                gojs定义了一个用于创建GraphObject对象的静态函数GraphObject.make
                GraphObject是所有图形对象的抽象类，这个类的子类包括Panel、Shape、TextBlock、Picture和Placeholder。其中Panel派生的子类Part是Node和Link的父类
                Part是一个图表对象，它继承自Panel。它是所有用户操作级别对象的基类
                Shape:形状——Rectangle（矩形）、RoundedRectangle（圆角矩形），Ellipse（椭圆形），Triangle（三角形），Diamond（菱形），Circle（圆形）等
                TextBlock:文本域（可编辑）
                Picture:图片
                Panel:容器来保存其他Node的集合
            */
      var $ = go.GraphObject.make // 给go.GraphObject.make起简称
      // var diagram = new go.Diagram('myDiagramDiv');
      // diagram.model = new go.GraphLinksModel([{ key: 'Hello' }, { key: 'World!' }], [{ from: 'Hello', to: 'World!' }]);
      // 创建Diagram对象 定义画布的基本属性
      var myDiagram = (this.myDiagram = $(
        go.Diagram,
        'myDiagramDiv', // 必须命名或引用DIV HTML元素 画布绑定的Div的ID
        {
          LinkDrawn: showLinkLabel, // 监听线生成事件
          LinkRelinked: showLinkLabel, // 线重新连接事件
          initialContentAlignment: go.Spot.Center, // 任何初始图都位于视口中的中心
          InitialLayoutCompleted: loadDiagramProperties, // 在加载新模型之前不要初始化一些属性
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 鼠标滚轮事件放大和缩小，而不是向上和向下滚动
          // 允许通过双击创建一个新节点，与nodeTemplate里TextBlock绑定的属性值new go.Binding('text', 'key')有关
          'clickCreatingTool.archetypeNodeData': { key: 'new node66', color: 'green', size: '10 10', background: 'lightgreen' },
          'undoManager.isEnabled': true, // 允许取消和重做 undo & redo
          allowZoom: false, // 不允许用户改变图表的规模
          'grid.visible': true, // 画布上面是否出现网格
        }
      ))

      function loadDiagramProperties(e) {}

      myDiagram.add(
        $(
          go.Node,
          { resizable: true },
          { location: new go.Point(80, 130) },
          'Auto',
          $(go.Shape, 'RoundedRectangle', { fill: $(go.Brush, 'Linear', { 0.0: 'Violet', 1.0: 'Lavender' }) }),
          $(go.TextBlock, 'Haaaello!', { margin: 5 })
        )
      )

      myDiagram.add(
        $(
          go.Node,
          'Auto',
          $(go.Shape, 'RoundedRectangle', {
            fill: 'white',
            portId: '',
            cursor: 'pointer',

            // 允许可以更改连线的端口，配合linkTemplate的relinkableFrom和relinkableTo属性使用
            fromLinkable: true,
            fromLinkableSelfNode: true,
            fromLinkableDuplicates: true,
            toLinkable: true,
            toLinkableSelfNode: false,
            toLinkableDuplicates: true,
          }),
          { contextMenu: myContextMenu },
          $(go.TextBlock, { text: 'Hello!', margin: 5, editable: true }),
          makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
          makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
          makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true)
        )
      )

      // TextBlock案例
      myDiagram.add(
        $(
          go.Part,
          'Vertical',
          $(
            go.Panel,
            'Vertical',
            // TextBlock是用于显示文本信息的对象 font属性设置文本的字体 stroke属性设置文本字体的颜色
            $(go.TextBlock, {
              text: 'a Text Block\nwith three logical lines\nof text',
              background: 'lightgreen',
              margin: 2,
              stroke: 'skyblue',
              isMultiline: false, // 设置是否开启内嵌文本中的换行符作用
            }),
            $(go.TextBlock, {
              text: 'a Text Block\nwith three logical lines\nof text',
              background: 'lightgreen',
              margin: 2,
              isMultiline: true,
            }),
            $(go.TextBlock, {
              text: '文本块\n中有三行居中\n文本',
              background: 'lightgreen',
              margin: 2,
              isMultiline: true,
              textAlign: 'center', // 对齐方式
              font: 'bold 14pt serif',
            }),
            $(go.TextBlock, {
              text: 'a single line of centered text that should wrap because we will limit the width',
              background: 'lightgreen',
              margin: 2,
              width: 80,
              wrap: go.TextBlock.WrapFit, // 根据TextBlock的尺寸自动对文本进行换行
              textAlign: 'center',
            })
          ),
          $(
            go.Panel,
            'Vertical',
            { width: 150, defaultStretch: go.GraphObject.None },
            $(go.TextBlock, { text: 'alignment: Left', background: 'lightgreen', margin: 2, alignment: go.Spot.Left }),
            $(go.TextBlock, { text: 'alignment: Center', background: 'lightgreen', margin: 2, alignment: go.Spot.Center }),
            $(go.TextBlock, { text: 'alignment: Right', background: 'lightgreen', margin: 2, alignment: go.Spot.Right })
          ),
          // editable对TextBlock文本的编辑功能
          // 设置TextBlock.textValidation属性编写验证规则，该属性的值为function。设置TextBlock.textEditor属性更换文本编辑器
          $(go.TextBlock, { text: 'select and then click to edit', background: 'lightblue', editable: true, isMultiline: false }),
          $(go.TextBlock, { text: 'this one allows embedded newlines', background: 'lightblue', editable: true })
        )
      )

      // 单独创建能够复用的对象，比如样式刷（Brush）
      var violetbrush = $(go.Brush, go.Brush.Linear, { 0.0: 'Violet', 1.0: 'Lavender' })

      // Shape案例
      myDiagram.add(
        $(
          go.Part,
          'Table',
          // 通过Shape可以构建一个几何图形
          // fill属性设置填充颜色。
          // 如果设置为null，那么只能点击图形的轮廓才能选中，点击图形里面是无法选中的。而如设置为transparent，点击图形的任何地方都可以选中该图形。
          $(go.Shape, 'RoundedRectangle', { row: 0, column: 0, width: 40, height: 40, margin: 4, fill: violetbrush }),
          $(go.TextBlock, 'green', { row: 1, column: 0 }),
          $(go.Shape, { row: 0, column: 1, figure: 'RoundedRectangle', width: 40, height: 40, margin: 4, fill: 'white' }),
          $(go.TextBlock, 'white', { row: 1, column: 1 }),
          $(go.Shape, { row: 0, column: 2, figure: 'Ellipse', width: 40, height: 40, margin: 4, fill: 'transparent' }),
          $(go.TextBlock, 'transparent', { row: 1, column: 2 }),
          // angle和.scale属性设置Shape的角度和比例
          $(go.Shape, { row: 0, column: 13, figure: 'Ellipse', width: 40, height: 40, margin: 4, fill: null, angle: 30, scale: 1.5 }),
          $(go.TextBlock, 'null', { row: 1, column: 3 })
        )
      )

      // 右键菜单
      var cxElement = document.getElementById('contextMenu')
      var myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu,
        hide: hideContextMenu,
      })

      cxElement.addEventListener(
        'contextmenu',
        function (e) {
          e.preventDefault()
          return false
        },
        false
      )

      // 显示右键菜单回调函数
      function showContextMenu(obj, diagram, tool) {
        // 只显示当前状态下的相关按钮。
        var cmd = diagram.commandHandler
        var hasMenuItem = false
        function maybeShowItem(elt, pred) {
          if (pred) {
            elt.style.display = 'block'
            hasMenuItem = true
          } else {
            elt.style.display = 'none'
          }
        }
        // 重写键盘工具类commandHandler，去拦截调用deleteSelection 实现取消删除的功能
        maybeShowItem(document.getElementById('cut'), cmd.canCutSelection())
        maybeShowItem(document.getElementById('copy'), cmd.canCopySelection())
        maybeShowItem(document.getElementById('paste'), cmd.canPasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint))
        maybeShowItem(document.getElementById('delete'), cmd.canDeleteSelection())
        // Now show the whole context menu element
        if (hasMenuItem) {
          cxElement.classList.add('show-menu')
          // we don't bother overriding positionContextMenu, we just do it here:
          var mousePt = diagram.lastInput.viewPoint
          cxElement.style.left = mousePt.x + 5 + 'px'
          cxElement.style.top = mousePt.y + 'px'
        }
        // 可选:使用' window '的单击监听与事件捕获
        // 如果用户单击页面上其他地方，则删除上下文菜单
        window.addEventListener('click', hideCX, true)
      }
      function hideCX() {
        if (myDiagram.currentTool instanceof go.ContextMenuTool) {
          myDiagram.currentTool.doCancel()
        }
      }
      // 隐藏右键菜单回调函数
      function hideContextMenu() {
        cxElement.classList.remove('show-menu')
        // 可选:使用' window '的单击监听与事件捕获
        // 如果用户单击页面上其他地方，则删除上下文菜单
        window.removeEventListener('click', hideCX, true)
      }
      // 全局（图表空白处）绑定自定义右键菜单
      myDiagram.contextMenu = myContextMenu

      // 定义一个函数来创建一个新连线用来连接两个节点
      function makePort(name, align, spot, output, input) {
        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
        return $(go.Shape, {
          fill: 'transparent', // 定义锚点颜色
          strokeWidth: 0, // no stroke
          width: horizontal ? NaN : 3,
          height: !horizontal ? NaN : 3,
          alignment: align, // 规定锚点的位置
          stretch: horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical,
          portId: name, // 规定锚点的名称
          fromSpot: spot, // 输出点
          fromLinkable: output, // 是否可以作为新连线的末节点
          toSpot: spot, // 输入点
          toLinkable: input, // 是否可以作为新连线的初始节点
          cursor: 'pointer', // 显示不同的光标以指示潜在的链接点
          mouseEnter: function (e, port) {
            // the PORT argument will be this Shape 鼠标移入
            if (!e.diagram.isReadOnly) port.fill = 'red'
          },
          mouseLeave: function (e, port) {
            port.fill = 'transparent'
          },
        })
      }
      // 监听线生成和重新连接事件
      function showLinkLabel(e) {
        var label = e.subject.findObject('LABEL')
        if (label !== null) label.visible = e.subject.fromNode.data.category === 'Conditional'
      }

      // Link案例
      // 自定义Nodes案例
      // 节点面板子元素布局定义
      // Auto：子元素叠加布局、Vertical：子元素垂直布局、Horizontal：子元素水平布局、Position:子元素坐标布局、Table:子元素表格布局
      // Spot: Node里的元素都排列在这个Node中的各个锚点上
      myDiagram.nodeTemplate = $(
        go.Node,
        'Auto',
        { resizable: true },
        new go.Binding('location', 'loc', go.Point.parse), // 申明动态绑定指定属性，将数据源中提供指定字段的值赋值给当前的指定属性
        // new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify) 双向绑定
        // $(go.Shape, 'RoundedRectangle', {
        //   fill: 'white',
        //   portId: '',
        //   cursor: 'pointer',
        //   // 允许可以更改连线的端口，配合linkTemplate的relinkableFrom和relinkableTo属性使用
        //   fromLinkable: true,
        //   fromLinkableSelfNode: true,
        //   fromLinkableDuplicates: true,
        //   toLinkable: true,
        //   toLinkableSelfNode: false,
        //   toLinkableDuplicates: true,
        // }),
        $(
          go.Picture,
          {
            width: 100,
            height: 100,
            background: 'transparent',
            imageStretch: go.GraphObject.UniformToFill,
            portId: '',
            cursor: 'pointer',
            // 允许可以更改连线的端口，配合linkTemplate的relinkableFrom和relinkableTo属性使用
            fromLinkable: true,
            fromLinkableSelfNode: true,
            fromLinkableDuplicates: true,
            toLinkable: true,
            toLinkableSelfNode: false,
            toLinkableDuplicates: true,
          },
          new go.Binding('source', 'img'),
          new go.Binding('height').makeTwoWay(),
          new go.Binding('width').makeTwoWay()
        ),

        $(go.TextBlock, { margin: new go.Margin(65, 0, 0, 0), editable: true }, new go.Binding('text', 'key')),
        // 鼠标悬浮title
        {
          toolTip: $(
            go.Adornment,
            'Auto',
            $(
              go.Shape,
              { fill: '#F3F3C3' },
              new go.Binding('visible', 'info', function (i) {
                return i ? true : false
              })
            ),
            $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'info'))
          ),
        },
        { contextMenu: myContextMenu },
        makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
        makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true)
      )

      // 构建一个连线模板
      myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.AvoidsNodes, // 设置默认规则，可被后续绑定的new go.Binding覆盖
          curve: go.Link.JumpGap, // 当两条连线相交时，JumpOver：一条线越过了交叉的另一条线。Bezier：设置连线的弯曲度；JumpGap：在相交处会断开
          corner: 10, // 设置连线折角的弧度
          toShortLength: 4,
          relinkableFrom: true, // 可以更改线的初始点
          relinkableTo: true, // 可以更改线的末端点
          reshapable: true, // 重塑(改变shape形状边界时使用，将影响节点大小)
          resegmentable: true, // 连线中直线可更改
          // mouse-overs subtly highlight links: 鼠标移入事件
          mouseEnter: function (e, link) {
            link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)'
            link.findObject('HIGHLIGHT').strokeWidth = 5
          },
          mouseLeave: function (e, link) {
            link.findObject('HIGHLIGHT').stroke = '#000'
            link.findObject('HIGHLIGHT').strokeWidth = 1
          },
          selectionAdorned: true, // 显示选中边框
        },
        { contextMenu: myContextMenu },
        $(
          go.Shape, // 线的悬浮高亮
          {
            isPanelMain: true,
            strokeWidth: 1,
            name: 'HIGHLIGHT',
          }
        ),
        new go.Binding('routing', 'routing'),
        $(
          go.Shape, // 箭头OpenTriangle正常箭头（standard）、空心箭头（open）或闭合箭头（closed）
          { toArrow: 'standard', fill: null }
        ),
        $(
          go.Panel,
          'Auto', // 连线标签，默认不可见
          {
            visible: true,
            name: 'LABEL',
            segmentIndex: 2,
            segmentFraction: 0.5,
          },
          new go.Binding('visible', 'visible').makeTwoWay(),
          $(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8', strokeWidth: 0 }),
          $(
            go.TextBlock,
            '标666签',
            {
              textAlign: 'center',
              font: '10pt helvetica, arial, sans-serif',
              stroke: '#333333',
              editable: true,
            },
            new go.Binding('text').makeTwoWay()
          )
        )
      )
      // 为图表背景定义行为:
      function diagramInfo(model) {
        // diagram's model工具提示信息
        return '模板:\n' + model.nodeDataArray.length + ' 节点(node), ' + model.linkDataArray.length + ' 连线(Links)'
      }
      // 当不在任何Part上时，为Diagram的背景提供工具提示
      myDiagram.toolTip = $('ToolTip', $(go.TextBlock, { margin: 4 }, new go.Binding('text', '', diagramInfo)))

      myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)

      // var nodeDataArray = [
      //   { key: 'Alpha', width: 100, height: 100, loc: '0 0', img: require('@/assets/logo.png'), info: '' },
      //   { key: 'Beta', width: 100, height: 100, loc: '200 350', img: require('@/assets/logo.png'), info: 'shredded curtains' },
      //   { key: 'Gamma', width: 100, height: 100, loc: '300 125', img: require('@/assets/logo.png'), info: 'shredded' },
      // ]
      // var linkDataArray = [
      //   { from: 'Alpha', to: 'Beta', routing: go.Link.Normal }, // routing改变连线的路径,Orthogonal:正交，AvoidsNodes：自动避开Node

      //   { from: 'Alpha', to: 'Gamma', routing: go.Link.Orthogonal },
      //   { from: 'Beta', to: 'Gamma', routing: go.Link.AvoidsNodes },
      // ]
      // myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
    },
    // 右键菜单点击事件
    cxcommand(event) {
      var val = event.currentTarget.id
      var diagram = this.myDiagram
      switch (val) {
        case 'cut':
          diagram.commandHandler.cutSelection()
          break
        case 'copy':
          diagram.commandHandler.copySelection()
          break
        case 'paste':
          diagram.commandHandler.pasteSelection(diagram.toolManager.contextMenuTool.mouseDownPoint)
          break
        case 'delete':
          diagram.commandHandler.deleteSelection() // 删除选中的节点或线
          break
      }
      diagram.currentTool.stopTool()
    },
  },
}
</script>

<style scoped>
.diagram-box {
  border: solid 1px blue;
  width: 1500px;
  height: 650px;
  margin-top: 100px;
}

#myDiagramDiv {
  flex: 1;
  border: 1px solid rgb(212, 212, 212);
}
.menu {
  display: none;
  position: absolute;
  opacity: 0;
  margin: 0;
  padding: 8px 0;
  z-index: 999;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  list-style: none;
  background-color: #ffffff;
  border-radius: 4px;
}

.menu-item {
  display: block;
  position: relative;
  min-width: 60px;
  margin: 0;
  padding: 6px 16px;
  font: bold 12px sans-serif;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
}

.menu-item::before {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  content: '';
  width: 100%;
  height: 100%;
  background-color: #000000;
}

.menu-item:hover::before {
  opacity: 0.04;
}

.menu .menu {
  top: -8px;
  left: 100%;
}

.show-menu,
.menu-item:hover > .menu {
  display: block;
  opacity: 1;
}
</style>
