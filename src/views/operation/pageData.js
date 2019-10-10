export default {
  /**banner列表页面 */
  banner: {
    tableColumns: [
      { title: '标题', prop: 'name', fixed: true },
      { title: '类型', prop: 'typeList', type: 'enum-array', overflow: true }, { title: '链接', prop: 'link', overflow: true, copy: true },
      { title: '图片', prop: 'imgLink', type: 'img' },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '创建人', prop: 'createName' },
      { title: '状态', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
    ],
    dialog: { form: {}, columns: [
      { label: '显示位置', prop: 'cascader', plc: '请选择', type: 'cascader', options: [], props: { value: 'id', label: 'title' } },
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: '链接', prop: 'link', plc: '链接' },
      { label: '图片', prop: 'imgLink', plc: '图片', type: 'single-img' },
      { label: '状态', prop: 'isShow', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }
      ] }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /**银行管理列表页面 */
  bank: {
    tableColumns: [
      { title: '银行名称', prop: 'title', fixed: true },
      { title: '银行编码', prop: 'brief', fixed: true },
      { title: '图片', prop: 'link', type: 'img' },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '创建人', prop: 'createName' },
      { title: '状态', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
    ],
    dialog: { form: {}, columns: [
      { label: '银行名称', prop: 'title', plc: '请输入名称' }, { label: '银行编码', prop: 'brief', plc: '请输入编码' },
      { label: '图片', prop: 'link', plc: '图片', type: 'single-img' },
      { label: '状态', prop: 'isShow', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }
      ] }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /**合作伙伴列表页面 */
  partners: {
    tableColumns: [
      { title: '名称', prop: 'title', fixed: true },
      { title: '图片', prop: 'link', type: 'img' },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '创建人', prop: 'createName' },
      { title: '状态', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' },
      { label: '图片', prop: 'link', plc: '图片', type: 'single-img' },
      { label: '状态', prop: 'isShow', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }
      ] }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /**问答列表页面 */
  question: {
    tableColumns: [
      { title: '标题', prop: 'title', fixed: true },
      { title: '答案', prop: 'content', overflow: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '创建人', prop: 'createName' },
      { title: '状态', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
    ],
    dialog: { form: {}, columns: [
      { label: '标题', prop: 'title', plc: '请输入标题' },
      { label: '答案', prop: 'content', plc: '答案', type: 'textarea' },
      { label: '状态', prop: 'isShow', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }
      ] }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  }
}
