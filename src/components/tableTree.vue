<!--
 * @Author: 魏明丽 
 * @pageName: '树形表格带编辑汇总功能组件' 
 * @Date: 2022-01-18 13:53:59 
 * @Last Modified by:   魏明丽 
 * @Last Modified time: 2022-01-18 13:53:59 
 -->

<template>
  <div class="tableTree">
    <div class="title">树形表格带编辑汇总功能组件</div>
    <div class="expand_box">
      <div class="lt">
        <div class="toggleAll" @click="toggleAll">
          <span v-if="!expanded">展开</span>
          <span v-else>收起</span>
          <i v-if="!expanded" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
    <div class='table_box'>
      <el-table :data="tableData" ref='treeTable' max-height="600" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" stripe row-key="id" :header-cell-style="{background:'#f2f6f7'}" @row-click="clickRow">
        <el-table-column :show-overflow-tooltip="true" v-for="(column, index) in columns" :align="column.align" :key="column.value" :label="column.text" :prop="column.value">
          <template slot-scope="scope" v-if="!column.children">
            <span v-if="scope.row.parentId==-1||index==0">{{!column.formatter?scope.row[column.value]:column.formatter(scope.row,column,column.value,scope.$index)}}</span>
            <el-input v-if="scope.row.parentId!=-1&&index!=0" v-model="scope.row[column.value]" type="number" @blur="blur(scope.row,column.value)" placeholder=""></el-input>
          </template>
          <el-table-column :show-overflow-tooltip="true" v-if='column.children' :align="subColumn.align" v-for="(subColumn, subIndex) in column.children" :key="subIndex" :label="subColumn.text" :width="subColumn.width" :min-width="subColumn.minWidth" :prop="subColumn.value">
            <template slot-scope="scope" v-if="!subColumn.children || subColumn.children.length == 0">
              <span v-if="scope.row.parentId==-1">{{!subColumn.formatter ? scope.row[subColumn.value] : subColumn.formatter(scope.row, subColumn, subColumn.value, scope.$index)}}</span>
              <el-input v-if="scope.row.parentId!=-1" v-model="scope.row[subColumn.value]" type="number" @blur="blur(scope.row,subColumn.value)" placeholder=""></el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import elTableCol from './el-table-column.vue'
  import { addNum } from '../utils'
  export default {
    data() {
      return {
        expanded: true,
        columns: [{
          text: "项目名称",
          value: "name",
          align: "center",
        }, {
          text: "签约金额",
          value: "sign",
          align: "center",
          children: [{
            text: "签约1",
            value: "sign1",
            align: "center",
          }, {
            text: "签约2",
            value: "sign2",
            align: "center",
          }]
        }, {
          text: "回款金额",
          value: "remit",
          align: "center",
          children: [
          {
            text: "回款1",
            value: "remit1",
            align: "center",
          }, {
            text: "回款2",
            value: "remit2",
            align: "center",
          }]
        }],
        tableData: [
        {
          id: "0",
          name: "合计",
          parentId: "-1",
          sign1: 0,
          sign2: 0,
          remit1: 0,
          remit2: 0
        },
        {
          id: "1-3",
          name: "川渝",
          parentId: "-1",
          sign1: 0,
          sign2: 0,
          remit1: 0,
          remit2: 0,
          children: [
          {
            id: "2-2",
            name: "项目一",
            parentId: "1-3",
            sign1: 0,
            sign2: 0,
            remit1: 0,
            remit2: 0
          },
          {
            id: "2-4",
            name: "项目二",
            parentId: "1-3",
            sign1: 0,
            sign2: 0,
            remit1: 0,
            remit2: 0
          }]
        },
        {
          id: "1-4",
          name: "华东",
          parentId: "-1",
          sign1: 0,
          sign2: 0,
          remit1: 0,
          remit2: 0,
          children: [
          {
            id: "2-5",
            name: "项目一",
            parentId: "1-4",
            sign1: 0,
            sign2: 0,
            remit1: 0,
            remit2: 0
          },
          {
            id: "2-6",
            name: "项目二",
            parentId: "1-4",
            sign1: 0,
            sign2: 0,
            remit1: 0,
            remit2: 0
          }]
        }]
      }
    },
    components: {
      elTableCol
    },
    computed: {},
    watch: {},
    created() {},
    methods: {
      blur(row, column) {
        if (row[column] == "") {
          row[column] = 0;
        }
        this.recursive(this.tableData, column);
        this.getTotal(column);
      },
      recursive(data, column) {
        for (var k in data) {
          if (data[k].children) {
            data[k][column] = 0;
            for (var sk in data[k].children) {
              data[k][column] = addNum(data[k][column], parseFloat(data[k].children[sk][column] != null ? data[k].children[sk][column] : 0));
            }
            this.recursive(data[k].children, column);
          }
        }
      },
      getTotal(column) {
        this.tableData[0][column] = 0;
        for (var item of this.tableData) {
          this.tableData[0][column] = addNum(this.tableData[0][column], parseFloat(item[column] != null ? item[column] : 0));
        }
      },
      clickRow() {},
      toggleAll() {
        this.expanded = !this.expanded;
        this.forArr(this.tableData, this.expanded)
      },
      forArr(arr, isExpand) {
        arr.forEach(i => {
          this.$refs.treeTable.toggleRowExpansion(i, isExpand)
          if (i.children) {
            this.forArr(i.children, isExpand)
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .tableTree {
    width: 50%;
    margin: 0 auto;

    .title {
      font-weight: bold;
    }

    .expand_box {
      overflow: hidden;
      margin-bottom: 5px;

      .lt {
        float: left;

        .toggleAll {
          border: 1px solid #dddfe6;
          padding: 3px 6px;
          border-radius: 4px;
          cursor: pointer;

          /deep/ .el-icon-caret-right,
          /deep/ .el-icon-caret-bottom {
            color: #45c1fe;
          }
        }
      }
    }

    /deep/ .el-table td,
    /deep/ .el-table th {
      padding: 5px 0;
      height: 26px;
    }

    /deep/ .el-input__inner {
      height: 26px;
      line-height: 26px;
    }
  }
</style>