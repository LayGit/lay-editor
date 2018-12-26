export default {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "image",
    "remove",
    "history",
  ],
  inline: {
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
    bold: { icon: 'icon-cuti', title: '加粗' },
    italic: { icon: 'icon-xieti', title: '斜体' },
    underline: { icon: 'icon-xiahuaxian', title: '下划线' },
    strikethrough: { icon: 'icon-shanchuxian', title: '删除线' },
    monospace: { icon: 'icon-dakuohao', title: '强调字体' },
    superscript: { icon:'icon-sup', title: '上标' },
    subscript: { icon: 'icon-sub', title: '下标' }
  },
  blockType: {
    options: [
      "H1",
      "H2",
      "H3",
      "Blockquote",
      "Code"
    ],
    H1: { icon: 'icon-h1', title: '大标题' },
    H2: { icon: 'icon-h2', title: '中标题' },
    H3: { icon: 'icon-h3', title: '小标题' },
    Blockquote: { icon: 'icon-yinyong', title: '引用' },
    Code: { icon: 'icon-daima', title: '代码' }
  },
  fontSize: {
    options: [12, 14, 16, 18, 24, 30, 36, 48],
    title: '字号',
    icon: 'icon-fontsize'
  },
  list: {
    options: [
      "unordered",
      "ordered",
      "indent",
      "outdent"
    ],
    unordered: { icon: 'icon-wuxuliebiao', title: '无序列表' },
    ordered: { icon: 'icon-youxuliebiao', title: '有序列表' },
    indent: { icon: 'icon-yousuojin', title: '增加缩进' },
    outdent: { icon: 'icon-zuosuojin', title: '减少缩进' },
  },
  textAlign: {
    options: [
      "left",
      "center",
      "right",
      "justify"
    ],
    left: { icon: 'icon-juzuoduiqi', title: '左对齐' },
    center: { icon: 'icon-juzhongduiqi', title: '居中对齐' },
    right: { icon: 'icon-juyouduiqi', title: '右对齐' },
    justify: { icon: 'icon-liangduanduiqi', title: '两端对齐' }
  },
  image: {
    icon: 'icon-shangchuantupian',
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
    title: '插入图片',
  },
  remove: {
    icon: 'icon-xiangpica',
    title: '清除样式'
  },
  history: {
    options: ["undo", "redo"],
    undo: { icon: 'icon-chexiao', title: '撤销' },
    redo: { icon: 'icon-chongzuo', title: '重做' }
  }
};
