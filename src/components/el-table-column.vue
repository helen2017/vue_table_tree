<template>
  <Fragment>
    <el-table-column :show-overflow-tooltip="true" v-for="(column, index) in columns" :align="column.align" :key="column.value" :label="column.text" :prop="column.value">
      <template slot-scope="scope" v-if="!column.children">
        <span>{{!column.formatter?scope.row[column.value]:column.formatter(scope.row,column,column.value,scope.$index)}}</span>
      </template>
      <elTableCol v-if='column.children&&column.children.length>0' :columns="column.children"></elTableCol>
    </el-table-column>
  </Fragment>
</template>
<script>
  import { Fragment } from 'vue-fragment'
  export default {
    name: 'elTableCol',
    props: {
      columns: {
        type: Array,
        default: []
      }
    },
    data() {
      return {}
    },
    components: {
      Fragment
    },
    created() {
      console.log(this.columns);
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
</style>