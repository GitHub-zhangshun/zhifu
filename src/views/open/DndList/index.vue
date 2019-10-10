<template>
  <div class="dndList">
    <div :style="{width:width2}" class="dndList-list">
      <el-card shadow="hover">
        <div slot="header">
          <div class="header">
            <div class="title">
              <el-button type="danger">数据源</el-button>
              <el-select v-model="gatewayInterfaces.search.form.ocelotId" placeholder="请选择网关" clearable>
                <ElOption v-for="item in gatewayInterfaces.search.gatewayList" :key="item.id" :label="item.name"
                  :value="item.id"></ElOption>
              </el-select>
              <el-select v-model="gatewayInterfaces.search.form.businessId" placeholder="请选择业务" clearable>
                <ElOption v-for="item in gatewayInterfaces.search.businessList" :key="item.id" :label="item.name"
                  :value="item.id"></ElOption>
              </el-select>
            </div>
            <div class="search">
              <el-input v-model="gatewayInterfaces.search.form.name" placeholder="接口名"></el-input>
              <el-input v-model="gatewayInterfaces.search.form.apiKey" placeholder="apiKey"></el-input>
            </div>
          </div>
        </div>
        <div class="content">
          <draggable :list="gatewayInterfaces.list" :options="{group:'article'}" class="dragArea">
            <div v-for="(element, index) in gatewayInterfaces.list" :key="index" class="list-complete-item">
              <div class="list-complete-item-handle2" @click="pushEle(element)">
                <span>接口：{{element.name}}</span><br>
                <span>AppKey：{{element.apiKey}}</span><br>
                <span>链接：{{element.link}}</span>
              </div>
            </div>
          </draggable>
        </div>
      </el-card>
    </div>
    <div :style="{width:width1}" class="dndList-list">
       <el-card shadow="hover">
        <div slot="header">
          <div class="header">
            <div class="title">
              <el-button type="primary" @click="$emit('interfacesSubmit')">提交</el-button>
            </div>
          </div>
        </div>
        <div class="content">
          <draggable :list="subData" :options="{group:'article'}" class="dragArea">
        <div v-for="element in subData" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">
            <span>接口：{{element.name}}</span><br>
            <span>AppKey：{{element.apiKey}}</span>
          </div>
          <div style="position:absolute;right:0px;">
            <span style="float: right ;margin-top: -20px;margin-right:5px;" @click="deleteEle(element)">
              <i style="color:#ff4949" class="el-icon-delete" />
            </span>
          </div>
        </div>
      </draggable>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'DndList',
    components: {
      draggable
    },
    props: {
      subData: {
        type: Array,
        default () {
          return []
        }
      },
      width1: {
        type: String,
        default: '48%'
      },
      width2: {
        type: String,
        default: '48%'
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    data() {
      return {
        gatewayInterfaces: {
          list: [],
          search: {
            form: {},
            gatewayList: [],
            businessList: []
          }
        }
      }
    },
    watch: {
      'gatewayInterfaces.search.form' : {
        handler(nd) {
          this.getGatewayInterfaces()
        },
        deep: true
      }
    },
    created() {
      // 获取网关列表
      this.$request({
        url: this.hiddenActions['O_GATEWAYS'],
        data: {
          index: '1',
          size: '10000'
        }
      }).then(data => {
        this.gatewayInterfaces.search.gatewayList = data.result
      })
      // 获取业务分组列表
      this.$request({
        url: this.hiddenActions['O_BUSINESS'],
        data: {
          index: '1',
          size: '10000'
        }
      }).then(data => {
        this.gatewayInterfaces.search.businessList = data.result
      })
      this.getGatewayInterfaces()
    },
    methods: {
      isNotInSubData(v) {
        return this.subData.every(k => v.id !== k.id)
      },
      isNotInSourceData(v) {
        return this.gatewayInterfaces.list.every(k => v.id !== k.id)
      },
      deleteEle(ele) {
        for (const item of this.subData) {
          if (item.id === ele.id) {
            const index = this.subData.indexOf(item)
            this.subData.splice(index, 1)
            break
          }
        }
        if (this.isNotInSourceData(ele)) {
          this.gatewayInterfaces.list.unshift(ele)
        }
      },
      pushEle(ele) {
        for (const item of this.gatewayInterfaces.list) {
          if (item.id === ele.id) {
            const index = this.gatewayInterfaces.list.indexOf(item)
            this.gatewayInterfaces.list.splice(index, 1)
            break
          }
        }
        if (this.isNotInSubData(ele)) {
          this.subData.push(ele)
        }
      },
      // 获取运行时接口
      getGatewayInterfaces() {
        this.$request({
          url: this.hiddenActions['O_RUN_INTERFACES'],
          data: {
            index: '1',
            size: '100000',
            ocelotId: this.gatewayInterfaces.search.form.ocelotId || null,
            apiKey: this.gatewayInterfaces.search.form.apiKey || null,
            name: this.gatewayInterfaces.search.form.name || null,
            businessId: this.gatewayInterfaces.search.form.businessId || null
          }
        }).then(data => {
          // 将id 替换为action id
          data.result.map(item => {
            item.id = item.actionId
          })
          this.gatewayInterfaces.list = data.result
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dndList {
    background: #fff;
    padding-bottom: 40px;

    &:after {
      content: "";
      display: table;
      clear: both;
    }

    .dndList-list {
      float: left;
      padding-bottom: 30px;

      &:first-of-type {
        margin-right: 2%;
      }

      .dragArea {
        margin-top: 15px;
        min-height: 50px;
        padding-bottom: 30px;
      }
    }
  }

  .list-complete-item {
    cursor: pointer;
    position: relative;
    font-size: 14px;
    padding: 5px 12px;
    margin-top: 4px;
    border: 1px solid #bfcbd9;
    transition: all 1s;
  }

  .list-complete-item-handle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
  }

  .list-complete-item-handle2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 20px;
  }

  .list-complete-item.sortable-chosen {
    background: #4AB7BD;
  }

  .list-complete-item.sortable-ghost {
    background: #30B08F;
  }

  .list-complete-enter,
  .list-complete-leave-active {
    opacity: 0;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
    }
  }

  .content {
    height: 700px;
    overflow: auto;
  }

</style>
