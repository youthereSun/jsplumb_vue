<template>
    <div id="home">
        <div>
            <button @click="recordPosition">save position</button>
            <button @click="recoverPosition">recover Position</button>
            <button @click="deleteEveryConnection">deleteEveryConnection</button>
            <button @click="getAllConnections">getAllConnections</button>
            <button @click="getAllNodes">getAllNodes</button>
        </div>
        <div id="container">
            <div style="top:0px;left: 480px" :uuid="-1" id="start" class="item">
                <div class="drop_item drop_item_start">

                </div>
                start
            </div>
            <div style="left:480px;top:690px" :uuid="1000" id="end" class="item">
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
        <div id="content">
            <div :key="index" v-for="(item,index) in coonList_new">
                {{item.sourceId}}===>{{item.targetId}}
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
                    {index: 0, name: "总部", id: "node_1", uuid: 1, position: {top: "90px", left: "480px"}},
                    {index: 1, name: "分部1", id: "node_2", uuid: 2, position: {top: "90px", left: "90px"}},
                    {index: 2, name: "分部2", id: "node_3", uuid: 3, position: {top: "390px", left: "90px"}},
                    {index: 3, name: "分部3", id: "node_4", uuid: 4, position: {top: "210px", left: "480px"}},
                    {index: 4, name: "分部4", id: "node_5", uuid: 5, position: {top: "390px", left: "480px"}},
                    {index: 5, name: "分部5", id: "node_6", uuid: 6, position: {top: "480px", left: "720px"}},
                    {index: 6, name: "分部6", id: "node_7", uuid: 7, position: {top: "540px", left: "480px"}}
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
                    {sourceId: "start", targetId: "node_1"},
                    {sourceId: "node_1", targetId: "node_2"},
                    {sourceId: "node_2", targetId: "node_3"},
                    {sourceId: "node_1", targetId: "node_3"},
                    {sourceId: "node_3", targetId: "node_4"},
                    {sourceId: "node_4", targetId: "node_5"},
                    {sourceId: "node_5", targetId: "node_6"},
                    {sourceId: "node_6", targetId: "node_7"},
                    {sourceId: "node_5", targetId: "node_7"},
                    {sourceId: "node_1", targetId: "node_4"},
                    {sourceId: "node_7", targetId: "end"},
                ],
                coonList_new: []
            }
        },
        mounted() {
            // this.list=JSON.parse(localStorage.getItem("coon_list"));

            //全局设置配置
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
                gradient: {     //渐变色
                    stops: [[0, "#89D751"]]
                },
                strokeWidth: 2,
                stroke: '#EA473A',
                outlineWidth: 5,
                outlineStroke: ""
            }

            config.baseStyle = {
                Container: "container",
                //endpoint: ['Rectangle', {}], // 端点的形状
                connectorStyle: config.connectorPaintStyle, // 连接线的颜色，大小样式
                connectorHoverStyle: config.connectorHoverStyle,
                paintStyle: {//连接点样式
                    stroke: "transparent",
                    fill: "transparent",
                    width: 10,
                    height: 10,
                    //strokeWidth: 1
                    // lineWidth: 0
                }, // 端点的颜色样式
                hoverPaintStyle: {//连接点悬浮样式
                    stroke: "transparent",
                    fill: "transparent",
                    // strokeWidth: 1
                    // lineWidth: 0
                },
                // isSource: true, // 是否可以拖动（作为连线起点）
                connector: ['Flowchart', {
                    gap: 5,//gap：可选，默认为0px。在连接线的一端和连接的元素之间指定一个间隙。
                    cornerRadius: 5,//连线转向处的圆角，默认 0
                    stub: 0,//连线两端短截线的最小长度
                    alwaysRespectStubs: false,//true–固定短截线长度；false–当两个元件彼此非常接近（小于两个短截线的总和），则调整短截线。默认 false,
                    midpoint: 0.5//设置连线的中点位置，默认 0.5
                }], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
                // isTarget: true, // 是否可以放置（连线终点）
                maxConnections: 10, // 设置连接点最多可以连接几条线
                // dragOptions: {cursor: 'pointer', zIndex: 2000},

                dropOptions: {
                    hoverClass: 'labelClass1'
                },
                connectionsDetachable: true,//连接是否可拆卸（使用鼠标），默认 true
                reattachConnections: false,//是否重新连接用户已使用鼠标分离然后删除的连接。 默认值为 false
                connectorOverlays: [
                    ['Arrow', {
                        width: 15,
                        length: 15,
                        location: 1,//在线条上的位置，0 在起点，1 在终点，默认 0.5
                        foldback: 1,//箭头尾部缩进程度，设置为 1 则尾部不缩进，小于 1 向内缩进，大于 1 向外突出，小于等于 0 取默认值。 默认 0.623
                        direction: 1,//方向，从起点指向终点为 1，反之为 -1
                        visible: true,// Boolean 是否可见，默认 true
                    }],
                    /*        ['Label', {
                              label: '',
                              cssClass: 'labelClass_delete',
                              events: {
                                click: function (labelOverlay, originalEvent) {
                                  console.log('click on label overlay for :' + labelOverlay.component)
                                  console.log(labelOverlay)
                                  console.log(originalEvent)
                                }
                              }
                            }]*/
                ]
            }
            this.config = config.baseStyle;
            //=================================
            //创建实例
            this.jsPlumb = this.$jsPlumb.getInstance();
            //init节点
            this.init("start");
            this.init("end")
            for (let i = 0; i < this.list.length; i++) {
                this.init(this.list[i].id)
            }
            //创建已有连线
            this.connectAll(this.connlist);
            //绑定实例方法
            //建立连接线
            this.jsPlumb.bind('connection', (info) => {
                console.log(info)
                // info 中包含connection，sourceId ，targetId 等值
            })
            //双击连接线删除链接
            this.jsPlumb.bind("dblclick", (conn) => {
                if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?")) {
                    this.jsPlumb.deleteConnection(conn);

                }
            });
            //单击连接线查看连线信息
            this.jsPlumb.bind("click", (conn) => {
                console.log(conn)
            });
            //创建连接线之前检查,true在其它已注册事件之前触发
            this.jsPlumb.bind('beforeDrop', (conn) => {
                if (conn.sourceId === conn.targetId) {
                    return false
                } else {
                    return true
                }

            }, true);
            //cleanupListeners()移除所有事件
            //insertAtStart: 是否置顶此事件（在其它已注册事件之前触发），默认 false，选填
            //beforeDetach: 连接断开前事件
            //connectionDetached: 连接断开事件
            //connectionDrag: 连线开始拖拽事件（端点）
            //connectionDragStop: 连线拖拽结束事件（端点）
            //connectionMoved: 连线更换端点事件
            //reset 清空所有端点、连接及事件。

        },
        methods: {
            getAllNodes() {
                let ins=this.jsPlumb;
                ins.reset(false)
            },
            //获取所有链接信息
            getAllConnections() {
                let ins = this.jsPlumb;
                let list = ins.getAllConnections();
                let connectionList = [];
                for (let i = 0; i < list.length; i++) {
                    let conn = {};
                    conn.sourceId = list[i].sourceId
                    conn.targetId = list[i].targetId
                    connectionList.push(conn)
                }
                this.coonList_new = connectionList;


            },
            //删除所有连接线
            deleteEveryConnection() {
                let ins = this.jsPlumb;
                ins.deleteEveryConnection();
            },
            init(id) {
                let self_config = JSON.parse(JSON.stringify(this.config));
                if (id == "start") {
                    self_config.isTarget = false
                } else if (id == "end") {
                    self_config.isSource = false
                }
                const ins = this.jsPlumb

                ins.makeSource(id, {
                    filter: ".drop_item",
                    anchor: "Continuous",
                }, self_config)
                ins.makeTarget(id, {
                    //   dropOptions: { hoverClass: "labelClass1" },
                    anchor: "Continuous",
                }, self_config)
                //stop: 结束拖拽的回调
                ins.draggable(id, {
                    containment: 'parent', grid: [30, 30], stop: function (e) {
                        console.log(e)
                    }
                })
            },
            connectAll(list) {
                const ins = this.jsPlumb;
                for (let i = 0; i < list.length; i++) {
                    ins.connect({source: list[i].sourceId, target: list[i].targetId});
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
                let a = [1, 2, 3];
                console.log(typeof a)
                //this.list=[];
                console.log(typeof this.list)
                console.log(typeof JSON.parse(localStorage.getItem("coon_list")))
                const ins = this.jsPlumb;
                const items = document.querySelectorAll(".item");
                for (let i = 0; i < items.length; i++) {
                    let id = items[i].attributes.id.value;
                    //   ins.detachAllConnections(id);//删除divID所有连接线
                    // ins.removeAllEndpoints(id);//删除divID所有端点
                    // ins.detach(id);//删除连接线
                    ins.remove(id);//移除节点
                }
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
