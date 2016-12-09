<template>
  <main class="assets-container">
    <el-button type="primary" @click="handleAdd()" icon="plus" class="btn-add-assets">
      添加资产
    </el-button>
    <el-table
      :data="assetsData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="ip"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        :context="_self"
        inline-template
        label="操作">
        <div>
          <el-button
            size="small"
            @click="handleEdit($index, row)">
            编辑
          </el-button>
          <el-button
            size="small"
            @click="handleTestLink($index, row)">
            测试链接
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)">
            删除
          </el-button>
        </div>
      </el-table-column>
    </el-table>
    <el-dialog title="更新资产" v-model="assetsVisible">
      <edit-assets :data="activeAssets" @change="assetsVisible=false"/>
    </el-dialog>

    <el-dialog title="提示" v-model="dialogVisible" size="tiny">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Client from 'ftp'

  import editAssets from './add-assets'
  export default {
    name: 'assets',
    computed: {
      ...mapGetters({
        assetsData: 'assets'
      })
    },
    data() {
      return {
        assetsVisible: false,
        activeAssets: {}
      }
    },
    components: {
      editAssets
    },
    methods: {
      handleAdd() {
        this.activeAssets = {}
        this.assetsVisible = true
      },
      handleEdit(index, row) {
        this.activeAssets = Object.assign({}, row)
        this.assetsVisible = true
      },
      handleTestLink(index, row) {
        console.log('连接....')
        if (row.type === 'ftp') {
          this.ftpLink(row)
        }
      },
      handleDelete(index, row) {
        this.$confirm('(╥╯^╰╥) 主人饶命啊～～', '(╯#-_-)╯~~~~~~~~~╧═╧ ', {
          confirmButtonText: '要你何用',
          cancelButtonText: '饶你狗命',
          type: 'info'
        }).then(
          _ => {
            this.$store.commit('ASSETS_DELETE', row)
            this.$message({
              message: '╰（‵□′）╯ 我还会回来的！！'
            });
          }, 
          _ => {
            this.$message({
              message: '✿◡‿◡ 感谢主子不杀之恩!'
            });
          }
        )
      },
      ftpLink(ftp) {
        const c = new Client()

        c.on('ready', _ => {
          this.$message({
            message: ':.ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ  主子, 成功了',
            type: 'success'
          });
        })
        c.on('error', err => this.$message({
          message: '(..•˘_˘•..)  主子, 失败了 ',
          type: 'error'
        }))

        c.connect({
          host: ftp.ip,
          port: ftp.port,
          user: ftp.account,
          password: ftp.password
        })
      }
    }
  }
</script>
<style type="text/css">
  .assets-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn-add-assets {
    width: 200px;
    margin-bottom: 30px;
  }
</style>