<template>
  <div class="content">
    <div class="header">在表格上面写总计</div>
    <el-table :data="tableData" :span-method="arraySpanMethod" border>
      <el-table-column
        :prop="item.value"
        :label="item.title"
        v-for="(item, index) in tabelHeader"
        :key="index"
        align="center"
        :fixed="
          item.value == 'id' || item.value == 'name' || item.value == 'gender'
        "
        min-width="100"
      ></el-table-column>
    </el-table>
    <div class="sort" @click="goSort">排序</div>

    <div class="index" @click="goIndex">排序页</div>

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
        <el-button size="small" @click="cancelSubmit">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "merge",
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
          id: "12987122",
          name: "王小虎",
          gender: "男",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          gender: "男",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          gender: "男",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          gender: "男",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          gender: "男",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
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
          title: "ID",
          value: "id",
        },
        {
          title: "姓名",
          value: "name",
        },
        {
          title: "性别",
          value: "gender",
        },
        {
          title: "数值1",
          value: "amount1",
        },
        {
          title: "数值2",
          value: "amount2",
        },
        {
          title: "数值3",
          value: "amount3",
        },
      ],
      allSelectList: [],
      mergeArr: [],//固定的
    };
  },
  created() {
    // 因为不确定会选择哪几个固定在左侧，所以就先都写总计
    let obj = {};
    obj.id = "总计";
    obj.name = "总计";
    obj.gender = "总计";
    obj.amount1 = "1";
    obj.amount2 = "2";
    obj.amount3 = "3";
    this.tableData.unshift(obj);

    this.headerData.forEach((el) => {
      this.checkedData.push(el.title);
      this.allSelectList.push(el.title);
    });
    this.tabelHeader = this.headerData;
    this.selectedSort = this.checkedData;
    this.handleCheckedDataChange(this.checkedData);

    this.mergeLine()
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
      this.selectedSort = val;
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
      this.mergeLine()
    },
    cancelSubmit() {
      this.selectedSort = this.checkedData;
      this.showSort = false;
    },

    
    // 合并几格
    mergeLine() {
      let arr = [
        "id",
        "name",
        "gender",
      ];
      this.mergeArr = [];
      arr.forEach((el) => {
        this.tabelHeader.forEach((item) => {
          if (el == item.value) {
            this.mergeArr.push(el);
          }
        });
      });
    },
    // 合并合计第一行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (this.mergeArr.length >= 1) {
          if (columnIndex === 0) {
            return [1, this.mergeArr.length];
          }
        }
        if (this.mergeArr.length >= 2) {
          if (columnIndex === 1) {
            return [0, 0];
          }
        }
        if (this.mergeArr.length >= 3) {
          if (columnIndex === 2) {
            return [0, 0];
          }
        }
      }
    },

    // 跳转到首页
    goIndex() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
}
.header {
  margin-bottom: 20px;
}
.content .el-table {
  width: 500px;
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

.index {
  position: fixed;
  bottom: 10%;
  left: 10%;
  color: #20a0ff;
  cursor: pointer;
}
</style>
