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
    bold: { icon: 'icon-cuti', title: 'toolbar.inline.bold' },
    italic: { icon: 'icon-xieti', title: 'toolbar.inline.italic' },
    underline: { icon: 'icon-xiahuaxian', title: 'toolbar.inline.underline' },
    strikethrough: { icon: 'icon-shanchuxian', title: 'toolbar.inline.strikethrough' },
    monospace: { icon: 'icon-dakuohao', title: 'toolbar.inline.monospace' },
    superscript: { icon:'icon-sup', title: 'toolbar.inline.superscript' },
    subscript: { icon: 'icon-sub', title: 'toolbar.inline.subscript' }
  },
  blockType: {
    options: [
      "H1",
      "H2",
      "H3",
      "Blockquote",
      "Code"
    ],
    H1: { icon: 'icon-h1', title: 'toolbar.blockType.h1' },
    H2: { icon: 'icon-h2', title: 'toolbar.blockType.h2' },
    H3: { icon: 'icon-h3', title: 'toolbar.blockType.h3' },
    Blockquote: { icon: 'icon-yinyong', title: 'toolbar.blockType.quote' },
    Code: { icon: 'icon-daima', title: 'toolbar.blockType.code' }
  },
  fontSize: {
    options: [12, 14, 16, 18, 24, 30, 36, 48],
    title: 'toolbar.fontsize.title',
    icon: 'icon-fontsize'
  },
  list: {
    options: [
      "unordered",
      "ordered",
      "indent",
      "outdent"
    ],
    unordered: { icon: 'icon-wuxuliebiao', title: 'toolbar.list.unordered' },
    ordered: { icon: 'icon-youxuliebiao', title: 'toolbar.list.ordered' },
    indent: { icon: 'icon-yousuojin', title: 'toolbar.list.indent' },
    outdent: { icon: 'icon-zuosuojin', title: 'toolbar.list.outdent' },
  },
  textAlign: {
    options: [
      "left",
      "center",
      "right",
      "justify"
    ],
    left: { icon: 'icon-juzuoduiqi', title: 'toolbar.textAlign.left' },
    center: { icon: 'icon-juzhongduiqi', title: 'toolbar.textAlign.center' },
    right: { icon: 'icon-juyouduiqi', title: 'toolbar.textAlign.right' },
    justify: { icon: 'icon-liangduanduiqi', title: 'toolbar.textAlign.justify' }
  },
  image: {
    icon: 'icon-shangchuantupian',
    title: 'toolbar.image.title',
    altEnabled: false,
    alignmentEnabled: true,
    defaultSize: {
      width: 'auto',
      height: 'auto'
    },
    upto: 'base64',
    accept: '',
    maxSize: 0,
    server: {
      url: '',
      file: 'file',
      headers: {},
      data: {},
      resultFn: (res) => res,
      withCredentials: false,
    },
    qiniu: {
      area: 'z0',
      key: '',
      token: '',
      domain: '',
      style: '',
      dataFn: undefined,
    },
  },
  remove: {
    icon: 'icon-xiangpica',
    title: 'toolbar.remove.title'
  },
  history: {
    options: ["undo", "redo"],
    undo: { icon: 'icon-chexiao', title: 'toolbar.history.undo' },
    redo: { icon: 'icon-chongzuo', title: 'toolbar.history.redo' }
  }
};
