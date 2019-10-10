export default {
  /**公告列表页面 */
  list: {
    tableColumns: [
      { title: '类型', prop: 'typeName', fixed: true },
      { title: 'KEY', prop: 'key', fixed: true, copy: true, overflow: true },
      { title: '标题', prop: 'title' }, { title: '描述', prop: 'brief' },
      { title: '链接', prop: 'link', copy: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '创建人', prop: 'createName' },
      { title: '状态', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
    ]
  }
}
