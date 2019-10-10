import {
  isNullOrUndefined,
  isObject
} from "util"
import {
  parseTime
} from '@/utils/index'
import {
  Decimal
} from 'decimal.js'
import store from '@/store'
import {
  Message
} from 'element-ui'
import router from '@/router'
import {
  request
} from '@/utils/request'

/** 公共函数库 */
export default function () {
  return {
    /** 获取菜单视图数据 */
    async getData() {
      // 禁用搜索框
      this.$store.dispatch('user/DisabledSearch', true)
      // 重置分页
      if (store.getters.resetTablePage && this.pageForm && Object.keys(this.pageForm).length > 0) {
        this.pageForm = {
          total: 0,
          index: 1,
          size: 5,
          
        }
        // 恢复重置分页状态
        store.dispatch('user/ResetTablePage', false)
      }
      this.table.loading = true
      let data = ''
      // console.log('21323', this.tableListQuery)
      // 处理condition类型搜索
      // if(this.tableListQuery && this.tableListQuery.condition && Object.keys(this.tableListQuery.condition).length > 0 ) {
      //   console.log('21323')
      //   let condition =  Object.assign(this.search && this.search.form.condition || {}, this.tableListQuery.condition)
      //   console.log('tag', condition)
      //   this.search.form.condition = condition
      //   this.tableListQuery.condition = condition
      // }
      // return
      // 处理搜索数据
      if (this.search && this.search.form && Object.keys(this.search.form).length > 0) {
        Object.keys(this.search.form).map(item => {
          if (this.search.form[item] === '') {
            this.search.form[item] = null
          }
        })
      }
      // 多参数
      if (this.pageForm && Object.keys(this.pageForm).length > 0) {
        // 分页数据存在必定为多参数
        data = Object.assign(this.pageForm, this.tableListQuery || {}, this.search && this.search.form || {})
      } else {
        if (this.search && this.search.form && Object.keys(this.search.form).length > 1) {
          // 搜索数据存在且参数大于1个
          data = Object.assign(this.pageForm || {}, this.tableListQuery || {}, this.search.form || {})
        } else if (isObject(this.tableListQuery) && Object.keys(this.tableListQuery).length > 0) {
          // 查询数据存在且参数大于一个
          data = Object.assign(this.pageForm || {}, this.search.form || {}, this.tableListQuery || {})
        } else if (this.search && this.search.form && Object.keys(this.search.form).length > 0 && this.tableListQuery && Object.keys(this.tableListQuery).length > 0) {
          // 搜索数据存在并且查询数据存在
          data = Object.assign(this.pageForm || {}, this.search.form || {}, this.tableListQuery || {})
        } else {
          // 剩余的为单参数 搜索数据为1个 或者 查询数据为1个
          if (this.search && isObject(this.search.form) && Object.keys(this.search.form).length === 1) {
            data = this.search.form[Object.keys(this.search.form)[0]]
          } else if (isObject(this.tableListQuery) && Object.keys(this.tableListQuery).length === 1) {
            data = this.tableListQuery[Object.keys(this.tableListQuery)[0]]
          } else {
            data = this.tableListQuery
          }
        }
      }

      // 数据源地址
      const url = this.$route.meta.actions.hiddenActions['F_TABLE_LIST']
      await this.$request({
        url,
        data
      }).then(data => {
        // 基础搜索框禁用
        this.$store.dispatch('user/DisabledSearch', false)
        if (this.pageForm) {
          this.pageForm.total = data.total
        }
        this.table.list = data.result
        // 拷贝一份源数据 做匹配用
        this.copy_table_list = JSON.parse(JSON.stringify(data.result))
        this.table.loading = false
      }).catch(() => {
        // 基础搜索框禁用
        this.$store.dispatch('user/DisabledSearch', false)
        this.table.loading = false
      })
    },
    /** 执行顶部对应函数 */
    top_execute(action) {
      this[action.jsName](action, this.table.tableChangeList)
    },
    /** 执行右侧函数 */
    right_execute({
      action,
      row
    }) {
      // row 构造成数组
      const rowArr = []
      // 转换为数组
      if (!isNullOrUndefined(row)) {
        rowArr.push(row)
      }
      this[action.jsName](action, rowArr)
    },
    /** 删除 */
    func_del(action, row) {
      // 是否为单参数
      const isOnePara = action.routeKey === 'one-para'
      if (isOnePara && row.length !== 1) {
        this.$message.info('请选择一条数据')
        return
      }
      if (!isOnePara && row.length === 0) {
        this.$message.info('请选择数据')
        return
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        row.forEach(item => {
          ids.push(item.id)
        })
        this.table.loading = true
        this.$request({
          url: action.apiKey,
          data: isOnePara ? row[0].id : ids
        }).then(data => {
          this.table.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
          this.getData()
        }).catch(() => {
          this.table.loading = false
        })
      }).catch(() => {
        this.$message.success('数据无价 三思而后行 点赞 👍')
      })
    },
    /** 带参数基础路由跳转事件 */
    func_jump(action, row) {
      if (row.length !== 1) {
        this.$message.info('请选择一条数据')
        return
      }
      // 构建跳转参数
      const query = {
        id: row[0].id,
        name: row[0].title || row[0].name || row[0].realName || this.$route.query.name || row[0].orderCode
      }
      this.$router.push({
        path: action.routeKey,
        query
      })
    },
    /** 无参数基础路由跳转事件 */
    func_jump_no_arg(action, row) {
      this.$router.push({
        path: action.routeKey
      })
    },
    /** dialog 数据构造 */
    constructDialogData({
      dialogData,
      title,
      apiKey,
      edit = false,
      ownData = null,
      treeList = []
    }) {
      let data = JSON.parse(JSON.stringify(dialogData))
      // 级联选择器的数据源
      data.columns.map(item => {
        if (item.type === 'cascader') {
          item.options = treeList
        }
      })
      // 构造已有数据
      if (edit) {
        let _ownData = JSON.parse(JSON.stringify(ownData))
        data.columns.map(item => {
          data.form[item.prop] = item.type === 'select' ? _ownData[item.prop] !== null && _ownData[item.prop] !== undefined && _ownData[item.prop].toString() : _ownData[item.prop]
          // 需要初始为数组的
          if (item.type === 'spec-tag-list') {
            data.form[item.prop] = _ownData[item.prop] || []
          }
          // 级联
          if (item.type === 'cascader') {
            // 多种匹配
            data.form['cascader'] = _ownData.typeList || []
          }
          // 主键ID
          data.form['id'] = _ownData.id
        })
      } else {
        // 取默认值
        data.columns.map(item => {
          data.form[item.prop] = item.value
          // 需要初始为数组的
          if (item.type === 'spec-tag-list') {
            data.form[item.prop] = []
          }
        })
      }
      data.loading = false
      data.title = title
      data.status = true
      data.apiKey = apiKey
      return data
    },
    /** 统一类型弹窗提交事件 */
    dialogSubmit() {
      // 是否改变父ID
      const cascader = this.dialog.form.cascader
      if (cascader && cascader.length > 0) {
        // 多种适配
        this.dialog.form.parentId = cascader[cascader.length - 1]
        this.dialog.form.typeId = cascader[cascader.length - 1]
      }
      this.dialog.loading = true
      this.$request({
        url: this.dialog.apiKey,
        data: this.dialog.form
      }).then(data => {
        this.dialog.status = !data.result
        this.dialog.loading = false
        data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
        this.getData()
      }).catch(() => {
        this.dialog.loading = false
      })
    },
    // 转时间戳为时间格式 `${y}-${m}-${d}`
    getTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    // 加法 精度运算
    numAdd() {
      let som = 0
      for (let index = 0; index < arguments.length; index++) {
        arguments[index] = arguments[index] || 0
        som = new Decimal(arguments[index]).add(new Decimal(som)).toNumber()
      }
      return som
    },
    // 根据ID获取枚举信息
    getEnumById(id) {
      const dicList = store.getters.dictionaryList
      return dicList && dicList.find(i => i.id === id) || {}
    },
    getEnumArrayToString(array) {
      let str = ''
      array.forEach(item => {
        str += this.getEnumById(item) && this.getEnumById(item).title + '/'
      })
      return str
    },
    // 根据字典ID获取简化序列号
    getEnumSimplifyById(id) {
      const dic = this.getEnumById(id)
      return dic && dic.simplify || ''
    },
    // 根据字典ID获取title
    getEnumTitleById(id) {
      const dic = this.getEnumById(id)
      return dic && dic.title || ''
    },
    // 根据简化序列号获取枚举信息
    getEnumBySimplify(simplify) {
      const dicList = store.getters.dictionaryList
      return dicList && dicList.find(i => i.simplify === simplify) || {}
    },
    // 根据父级简化序列号获取字典列表
    getDicListByParentSimplify(simplify) {
      return this.$request({
        url: this.$route.meta.actions.hiddenActions['O_DIC_CHILDREN_LIST'],
        data: simplify
      })
    },
    // 根据外层简化序列号获取字典列表
    getDicListByOuterSimplify(simplify) {
      return this.$request({
        url: this.$route.meta.actions.hiddenActions['O_DIC_CHILDREN_LIST_OUTER'],
        data: simplify
      })
    },
    // 图片上传
    uploadImgRequest(fileResult) {
      // 利用html5的fileReader函数监听 获取图片的base_64
      const reader = new FileReader()
      reader.readAsDataURL(fileResult.file)
      reader.onload = (e) => {
        request({
          url: fileResult.action,
          data: {
            fileId: '', // 唯一标识
            base64: e.target.result.split(',')[1],
            fileType: fileResult.file.type,
            title: fileResult.file.name,
            dirPath: 'image', // 文件夹路径
            suffix: '' // 后缀 eg:.jpg
          },
          onUploadProgress: event => {
            event.percent = event.loaded / event.total * 100
            fileResult.onProgress(event)
          }
        }).then(data => {
          // link  key
          fileResult.file.link = data.result.link
          fileResult.file.key = data.result.key
          fileResult.onSuccess()
        }).catch(() => {
          fileResult.onError()
        })
      }
    },
    // 文件上传
    uploadFileRequest(fileResult) {
      // 利用html5的fileReader函数监听 获取图片的base_64
      const reader = new FileReader()
      reader.readAsDataURL(fileResult.file)
      reader.onload = (e) => {
        this.$request({
          url: fileResult.action,
          data: {
            fileId: '', // 唯一标识
            base64: e.target.result.split(',')[1],
            fileType: fileResult.file.type,
            title: fileResult.file.name,
            dirPath: 'contract-template', // 文件夹路径
            suffix: '.docx'
          },
          onUploadProgress: event => {
            event.percent = event.loaded / event.total * 100
            fileResult.onProgress(event)
          }
        }).then(data => {
          fileResult.file.link = data.result.link
          fileResult.file.key = data.result.key
          fileResult.onSuccess()
        }).catch(() => {
          fileResult.onError()
        })
      }
    },
    // 构造为树形
    getTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function (item) {
        delete item.children
      })
      var map = {}
      data.forEach(function (item) {
        map[item.id] = item
      })
      var val = []
      data.forEach(function (item) {
        var parent = map[item.parentId]
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          val.push(item)
        }
      });
      return val
    },
    // 删除等于null 的children
    delChildrenNull(treeData) {
      treeData.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
        } else {
          this.delChildrenNull(item.children)
        }
      })
    },
    highLight(json) {
      if (!json) {
        return '<span class="key">no data</span>'
      } else {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
          })
      }
    },
    /**
     * 金额格式化
     * 格式化后默认保留两位小数
     * @param {*} number
     * @param {*} toNoBoth 是否不保留两位小数
     * @returns
     */
    numberFormat(number, toNoBoth) {
      if (!number) {
        return !toNoBoth ? '0.00' : '0'
      }
      // 格式化
      let str = number.toLocaleString('en-US')
      // 是否保留两位小数
      if (!toNoBoth) {
        const subStr = str.split('.')
        if (subStr && subStr.length === 1) {
          str = `${str}.00`
        } else if (subStr && subStr.length > 1) {
          const _str = subStr[1]
          _str.length === 1 && (str = `${str}0`)
        }
      }
      return str
    },
    /**
     * 对象取值 基础方法 不对外调用
     * @param {*} obj
     * @param {*} str
     */
    _getObjValBase(obj, str, objV) {
      if (isNullOrUndefined(obj) || isNullOrUndefined(str)) {
        return
      }
      const realKeys = str.split('_')
      let count = realKeys.length
      for (let index = 0; index < realKeys.length; index++) {
        count--
        if (count === 0) {
          objV['val'] = obj[realKeys[index]]
        } else {
          if (!isNullOrUndefined(obj[realKeys[index]])) {
            this._getObjValBase(obj[realKeys[index]], str.substr(str.indexOf('_') + 1, str.length), objV)
          }
          break
        }
      }
    },
    /**
     * 对象取值自动判断空指针带数据格式转换 对外方法
     * @param {*} obj 数据源 对象
     * @param {*} str 参数层级 e.g.: user_info_amount
     * @param {*} type 转换类型或者自定义默认值
     * nf/nf_t(numberFormat)金额格式化(nf: 只格式化/nf_t: 格式化并保留两位小数)
     * t_y|t_s时间格式化(_y: yyyy-MM-dd/_s: yyyy-MM-dd hh:mm:ss)
     * 如果type不给默认返回空字符串 如果给的值为nf/t_y/t_s则自动匹配类型 如果给其他值则为自定义默认值 e.g.:'---'
     */
    getObjVal(obj, str, type) {
      const objV = {}
      this._getObjValBase(obj, str, objV)
      let val = objV.val
      switch (type) {
        case 'nf':
          val = this.numberFormat(val)
          break
        case 'nf_t':
          val = this.numberFormat(val, true)
          break
        case 't_y':
          val = this.getTime(val, '{y}-{m}-{d}')
          break
        case 't_s':
          val = this.getTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
          break
        default:
          val = val || type || ''
          break
      }
      return val
    },
    /**
     * 双击选中table row
     *
     * @param {*} row
     * @param {*} event
     */
    pitchRow(row, event) {
      console.log()
      store.state.settings.doubleClick && this.$refs['table'].toggleRowSelection(row)
    },
    /**
     * url to file
     *
     * @param {*} dataUrl
     * @param {*} filename
     * @returns
     */
    dataURLtoFile(dataUrl, filename) {
      var arr = dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }
  }
}
