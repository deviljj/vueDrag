<template>
  <div class="content">
    <el-table :data="tableData">
      <el-table-column
        :prop="item.value"
        :label="item.title"
        v-for="(item, index) in tabelHeader"
        :key="index"
        align="center"
      ></el-table-column>
    </el-table>
    <div class="sort" @click="goSort">排序</div>

    <el-dialog title="排序" :visible.sync="showSort" width="700px" center>
      <div class="sortBox">
        <div class="leftBox">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="checkedData"
            @change="handleCheckedDataChange"
          >
            <el-checkbox
              v-for="(item, index) in headerData"
              :label="item.title"
              :key="index"
              >{{ item.title }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div class="rightBox">
          <draggable v-model="selectedSort" :options="dragOptions">
            <transition-group tag="div" class="item-ul">
              <div v-for="item in selectedSort" class="drag-list" :key="item">
                {{ item }}
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
        <el-button size="small" @click="cancelSubmit"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "index",
  components: {
    draggable,
  },
  data() {
    return {
      showSort: false,
      checkAll: false,
      isIndeterminate: true,
      checkedData: [], //选择了的数据
      selectedSort: [], //选择后排序的数据
      tabelHeader: [],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style",
      },
      headerData: [
        {
          title: "日期",
          value: "date",
        },
        {
          title: "姓名",
          value: "name",
        },
        {
          title: "省份",
          value: "province",
        },
        {
          title: "市区",
          value: "city",
        },
        {
          title: "地址",
          value: "address",
        },
        {
          title: "邮编",
          value: "zip",
        },
      ],
      allSelectList: [],
    };
  },
  created() {
    this.headerData.forEach((el) => {
      this.checkedData.push(el.title);
      this.allSelectList.push(el.title);
    });
    this.tabelHeader = this.headerData;
    this.selectedSort = this.checkedData;
    this.handleCheckedDataChange(this.checkedData);
  },
  methods: {
    goSort() {
      this.showSort = true;
    },
    handleCheckAllChange(val) {
      this.checkedData = val ? this.allSelectList : [];
      this.selectedSort = val ? this.allSelectList : [];
      this.isIndeterminate = false;
    },
    handleCheckedDataChange(val) {
      let checkedCount = val.length;
      this.selectedSort = val
      this.checkAll = checkedCount === this.headerData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.headerData.length;
    },
    submit() {
      this.tabelHeader = [];
      this.selectedSort.forEach((item) => {
        this.headerData.forEach((el) => {
          if (item == el.title) {
            this.tabelHeader.push(el);
          }
        });
      });
      this.showSort = false;
    },
    cancelSubmit() {
      this.selectedSort = this.checkedData
      this.showSort = false
    }
  },
};
</script>

<style scoped>
.content {
  width: 100%;
}
.content .el-table {
  width: 80%;
  margin: 0 auto;
}
.sort {
  position: absolute;
  right: 10%;
  top: 20px;
  color: #409eff;
  cursor: pointer;
}
.sortBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
}
.sortBox .leftBox {
  width: 300px;
  border: 1px solid #ebeef5;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
}
.sortBox .leftBox label {
  margin-bottom: 15px;
}
.sortBox .rightBox {
  border: 1px solid #ebeef5;
  width: 300px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow-y: auto;
}
.rightBox .defaultSort {
  position: absolute;
  top: -27px;
  right: 165px;
  cursor: pointer;
  height: auto;
}
.rightBox .defaultSort:hover {
  color: #409eff;
}
.rightBox .drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 0 15px 15px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
.rightBox .drag-list:hover {
  border: 1px solid #20a0ff;
}
</style>
