<template>
  <div>
    <el-input
      v-model="findContent"
      placeholder="请输入标题关键字"
      style="width: 222px; margin-right: 12px; margin-bottom: 12px"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="serachPic"
      >搜索</el-button
    >
    <el-button type="danger" @click="delOssPic">批量删除</el-button>
    <div>
      <div style="display: flex">
        <!-- action是请求的地址,需要token所以加入请求头,自动上传关闭
      multiple批量选择文件 -->
        <el-upload
          class="upload-btn"
          :action="actionUrl"
          :headers="uploadHeaders"
          :auto-upload="false"
          ref="upload"
          :show-file-list="showFileList"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
          multiple
          style="height: 20px; width: 90px; padding-bottom: 10px"
        >
          <el-button size="small" type="primary">选取本地文件</el-button>
        </el-upload>
        <el-button
          type="success"
          style="margin-left: 20px; margin-bottom: 30px; margin-left: 30px"
          @click="handleUpload"
          size="small"
          >上传</el-button
        >
      </div>
    </div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%; border: 2px solid #ebeef5; border-color: #868686"
      :header-cell-style="tableHeaderCellStyle"
      border
      :cell-style="tableCellStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="id"
        label="id"
        width="100"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="picName"
        label="名称"
        width="100"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="url"
        label="图片"
      >
        <template v-slot="scope">
          <img :src="scope.row.url" width="190" height="95" />
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="fileSize"
        label="大小"
        width="100"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="createBy"
        label="创建人"
        width="100"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="createDate"
        label="创建时间"
        width="100"
      >
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="modify(scope.row)">修改</el-button>

          <el-button size="mini" type="danger" @click="delOssPic(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getOssList, delOssPic } from "@/api/pic.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: "",
      showFileList: false, //隐藏上传的文件列表
      dataListSelections: [], //用来存放多选的对象
      findContent: "", //搜索框内容
      uploadHeaders: {
        picToken: this.$cookie.get("picToken"), // 添加自定义请求头
      },
      actionUrl: "/api/sys/oss/ ",
    };
  },
  methods: {
    handleBeforeUpload(file) {
      // 处理上传前的逻辑
      console.log(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(isLt2M, isJPG);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleSuccess(response, file, fileList) {
      // 处理上传成功的逻辑
      console.log("处理上传成功的逻辑");
      this.getOssList();
    },
    //手动上传
    handleUpload() {
      this.$refs.upload.submit();
    },
    modify(obj) {
      this.$message.error("功能正在开发中....");
    },
    //获取图片列表
    getOssList() {
      let params = {
        picName: this.findContent || null,
        fromWhere: "cos桶",
        page: 1,
        limit: 100,
      };
      getOssList(params).then((res) => {
        this.$data.tableData = res.data.list;
      });
    },
    //删除图片
    delOssPic(obj) {
      if (this.dataListSelections.length === 0) {
        if (obj instanceof PointerEvent) {
          this.failMsg("请先选择要删除的框！");
          return;
        }
      }
      var ids = obj.id //处理完[]这种包着的
        ? [obj.id]
        : this.dataListSelections.map((item) => {
            return item.id;
          });

      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${obj.id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          //不管单还是多都是传一个数组就行
          delOssPic(ids).then((res) => {
            this.successMsg(res.msg);
            this.getOssList();
          });
        })
        .catch(() => {});
    },

    //复选框
    handleSelectionChange(val) {
      this.dataListSelections = val;
    },
    //查找图片
    serachPic() {
      this.getOssList();
    },
    // 每页条数改变时触发，选中一页显示多少行
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.currentPage = val;
    },
    //表格样式
    tableCellStyle() {
      return "border-color: #868686;";
    },

    tableHeaderCellStyle() {
      return "border-color: #868686; color: #606266;";
    },
  },
  created() {
    this.getOssList();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: blue;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
