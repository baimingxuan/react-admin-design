// 配置文档: https://prettier.nodejs.cn/

module.exports = {
  // 每行最大列，超过换行
  printWidth: 120,
  // 使用制表符而不是空格缩进
  useTabs: false,
  // 缩进字节数
  tabWidth: 2,
  // 结尾不用分号(true有，false没有)
  semi: false,
  // 使用单引号(true单引号，false双引号)
  singleQuote: true,
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: true,
  // 在对象、数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 箭头函数里面，如果是一个参数的时候，去掉括号(avoid：省略括号, always：不省略括号)
  arrowParens: 'avoid',
  // 尾随逗号
  trailingComma: 'none',
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'lf'
}
