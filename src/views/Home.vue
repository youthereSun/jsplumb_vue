<template>
    <div id="home">
        <h1>This is an home page</h1>
        <div>
            <button @click="recordPosition">save position</button>
            <button @click="recoverPosition">recover Position</button>
        </div>
        <div id="container">
            <div style="top:30px;left: 500px" :uuid="-1" id="start" class="item">
                <div class="drop_item drop_item_start">

                </div>
                start
            </div>
            <div style="left:500px;top:700px" :uuid="1000" id="end" class="item">
                <div class="drop_item drop_item_end"></div>
                end
            </div>
            <div @dblclick="deleteNode(item.id)" :id="item.id" :uuid="item.uuid" :style="item.position" class="item"
                 v-for="(item,index) in list"
                 :key="index">
                <div class="drop_item drop_item_conmon"></div>
                {{item.name}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                config: {},
                jsPlumb: {},
                list: [
                    {index: 0, name: "总部", id: "node_1", uuid: 1, position: {top: "50px", left: "20px"}},
                    {index: 1, name: "分部1", id: "node_2", uuid: 2, position: {top: "200px", left: "120px"}},
                    {index: 2, name: "分部2", id: "node_3", uuid: 3, position: {top: "300px", left: "330px"}},
                    {index: 3, name: "分部3", id: "node_4", uuid: 4, position: {top: "400px", left: "540px"}},
                    {index: 4, name: "分部4", id: "node_5", uuid: 5, position: {top: "500px", left: "750px"}},
                    {index: 5, name: "分部5", id: "node_6", uuid: 6, position: {top: "600px", left: "960px"}},
                    {index: 6, name: "分部6", id: "node_7", uuid: 7, position: {top: "700px", left: "300px"}}
                ],
                list1: [
                    {index: 0, name: "总部", id: "node_1", uuid: 1, position: {top: "50px", left: "20px"}},
                    {index: 1, name: "分部1", id: "node_2", uuid: 2, position: {top: "200px", left: "120px"}},
                    {index: 2, name: "分部2", id: "node_3", uuid: 3, position: {top: "300px", left: "330px"}},
                    {index: 3, name: "分部3", id: "node_4", uuid: 4, position: {top: "400px", left: "540px"}},
                    {index: 4, name: "分部4", id: "node_5", uuid: 5, position: {top: "500px", left: "750px"}},
                    {index: 5, name: "分部5", id: "node_6", uuid: 6, position: {top: "600px", left: "960px"}},
                    {index: 6, name: "分部6", id: "node_7", uuid: 7, position: {top: "700px", left: "300px"}}
                ],
                connlist: [
                    {sourceUuid: 1, targetUuid: 2},
                    {sourceUuid: 2, targetUuid: 3},
                    {sourceUuid: 3, targetUuid: 4},
                    {sourceUuid: 4, targetUuid: 5},
                    {sourceUuid: 5, targetUuid: 6},
                    {sourceUuid: 6, targetUuid: 7}
                ]
            }
        },
        mounted() {
            // this.list=JSON.parse(localStorage.getItem("coon_list"));


            var config = {}
            //基础连接线配置
            config.connectorPaintStyle = {
                strokeWidth: 2,//线的宽度
                stroke: "#20A0FF",//线色
                joinstyle: "round",
                outlineStroke: "",//轮廓颜色
                outlineWidth: 0,//轮廓宽度
                //dashstyle: "2 4"
            }

            // 鼠标悬浮在连接线上的样式
            config.connectorHoverStyle = {
                strokeWidth: 2,
                stroke: '#FF4200',
                outlineWidth: 5,
                outlineStroke: ""
            }

            config.baseStyle = {
                endpoint: ['Rectangle', {}], // 端点的形状
                connectorStyle: config.connectorPaintStyle, // 连接线的颜色，大小样式
                connectorHoverStyle: config.connectorHoverStyle,
                paintStyle: {//连接点样式
                    stroke: "#FFE793",
                    fill: "#FFE793",
                    width: 10,
                    height: 10,
                    //strokeWidth: 1
                    // lineWidth: 0
                }, // 端点的颜色样式
                hoverPaintStyle: {//连接点悬浮样式
                    stroke: "#FFE793",
                    fill: "#FFE793",
                    // strokeWidth: 1
                    // lineWidth: 0
                },
                isSource: true, // 是否可以拖动（作为连线起点）
                connector: ['Flowchart', {
                    gap: 5,//gap：可选，默认为0px。在连接线的一端和连接的元素之间指定一个间隙。
                    cornerRadius: 5,
                    alwaysRespectStubs: true
                }], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
                isTarget: true, // 是否可以放置（连线终点）
                maxConnections: 10, // 设置连接点最多可以连接几条线,-1为不限制
                dragOptions: {cursor: 'pointer', zIndex: 2000},
                connectorOverlays: [
                    ['Arrow', {
                        width: 10,
                        length: 10,
                        location: 1
                    }],
                    ['Label', {
                        label: '流转',
                        cssClass: 'labelClass',
                        cssClassHover: 'labelClass1',
                        events: {
                            click: function (labelOverlay, originalEvent) {
                                console.log('click on label overlay for :' + labelOverlay.component)
                                console.log(labelOverlay)
                                console.log(originalEvent)
                            }
                        }
                    }]
                ]
            }
            this.config = config.baseStyle;
            //=================================

            this.jsPlumb = this.$jsPlumb.getInstance({
                DragOptions: {cursor: "pointer", zIndex: 2000},//拖动的时候
            });
            this.jsPlumb.setContainer("container")
            this.init("start");
            this.init("end")
            for (let i = 0; i < this.list.length; i++) {
                this.init(this.list[i].id, this.list[i].uuid)
            }

            this.connectAll(this.connlist)
            this.jsPlumb.bind('connection', (info) => {
                console.log(info)
                // info 中包含connection，sourceId ，targetId 等值
            })
            this.jsPlumb.bind("dblclick", (conn) => {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {
                    this.jsPlumb.deleteConnection(conn);

                }
            });
            this.jsPlumb.bind("click", (conn) => {
                console.log(conn)
            });

            this.jsPlumb.bind('beforeDrop', (conn) => {
                if (conn.sourceId === conn.targetId) {
                    return false
                } else {
                    return true
                }

            });
        },
        methods: {
            init(id, uuid) {
                let self_config = JSON.parse(JSON.stringify(this.config));
                if (id == "start") {
                    self_config.isTarget = false
                } else if (id == "end") {
                    self_config.isSource = false
                }
                const ins = this.jsPlumb
                ins.addEndpoint(id, {
                        anchors: "AutoDefault",
                        uuid: uuid
                    },
                    self_config);
                ins.addEndpoint(id, {
                        anchors: "AutoDefault",
                        uuid: uuid
                    },
                    self_config);
                ins.addEndpoint(id, {
                        anchors: "AutoDefault",
                        uuid: uuid
                    },
                    self_config);

                ins.draggable(id, {containment: 'parent', grid: [10, 10]})
            },
            connectAll(list) {
                const ins = this.jsPlumb;
                for (let i = 0; i < list.length; i++) {
                    ins.connect({uuids: [list[i].sourceUuid, list[i].targetUuid]})
                }
            },
            recordPosition() {
                const ins = this.jsPlumb;
                //获取实例中所有链接
                let connections = ins.getAllConnections();
                console.log(connections)
                const items = document.querySelectorAll(".item");
                let newList = [];
                //console.log(items)
                for (let i = 0; i < items.length; i++) {
                    let conn_item = {};
                    conn_item.name = items[i].innerText;
                    conn_item.id = items[i].attributes.id.value;
                    conn_item.uuid = items[i].attributes.uuid.nodeValue;
                    conn_item.position = {
                        top: items[i].style.top,
                        left: items[i].style.left
                    }
                    newList.push(conn_item);
                }
                localStorage.setItem("coon_list", JSON.stringify(newList))
            },
            recoverPosition() {
              /*  const ins = this.jsPlumb;
                ins.clear();*/
                const ins = this.jsPlumb
           this.list[0].position={top: "0px", left: "0px"}
           ins.repaintEverything()
                //恢复位置
   /*             this.list = JSON.parse(localStorage.getItem("coon_list"))
                const ins = this.jsPlumb;
                ins.repaintEverything();*/
                /*               const ins = this.jsPlumb;
                               const items = document.querySelectorAll(".item");
                               for (let i = 0; i < items.length; i++) {
                                   let id = items[i].attributes.id.value;
                                   //   ins.detachAllConnections(id);//删除divID所有连接线
                                   // ins.removeAllEndpoints(id);//删除divID所有端点
                                   // ins.detach(id);//删除连接线
                                   ins.remove(id);//移除节点
                               }*/
                //  this.list=this.list1;
                /*               console.log(this.list.length)
                               for (let i = 0; i < this.list1.length; i++) {

                                this.init(this.list1[i].id, this.list1[i].uuid)
                               }

                               this.connectAll(this.connlist)*/

            },
            deleteNode(id) {
                let ins = this.jsPlumb;
                if (confirm("Delete node  " + id + " and reletive connections?")) {
                    ins.remove(id)
                }
            }
        }
    }
</script>
