// 配置文档: https://eslint.nodejs.cn/

export default {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  // 指定如何解析语法
  parser: '@typescript-eslint/parser',
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  // 继承某些已有的规则
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  /*
   * 'off' 或 0    ==>  关闭规则
   * 'warn' 或 1   ==>  规则提示为警告（不影响代码执行）
   * 'error' 或 2  ==>  规则提示为错误（代码不能执行，界面报错）
   */
  rules: {
    /*
     * Eslint规则配置
     * 配置文档: https://eslint.nodejs.cn/docs/latest/rules/
     */
    // 需要 let 或 const 而不是 var
    'no-var': 'error',
    // 禁止在定义变量之前使用变量
    'no-use-before-define': 'off',
    // 声明后永远不会重新分配的变量需要 const 声明
    'prefer-const': 'error',
    // 禁止不规则空格
    'no-irregular-whitespace': 'off',
    // 禁止使用 debugger
    'no-debugger': 'off',
    // 禁止未使用的变量
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // 使用 prettier 插件
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],

    /*
     * TypeScript规则配置
     * 配置文档: https://typescript-eslint.nodejs.cn/rules/)
     */
    // 根据参数、属性和变量的默认值或初始值推断其类型
    '@typescript-eslint/no-inferrable-types': 'off',
    // 禁止使用自定义 ts 模块和命名空间
    '@typescript-eslint/no-namespace': 'off',
    // 禁止使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 禁止使用特定类型
    '@typescript-eslint/ban-types': 'off',
    // 不允许对初始化为数字、字符串或布尔值的变量或参数进行显式返回类型声明
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 不允许在 import 语句中使用 require 语句
    '@typescript-eslint/no-var-requires': 'off',
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 'off',
    // 禁止在变量定义之前使用它们
    '@typescript-eslint/no-use-before-define': 'off',
    // 禁止 @ts-<directive> 注释代码
    '@typescript-eslint/ban-ts-comment': 'off',
    // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 要求导出函数和类的公共类方法的显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 使用顶层 type 限定符进行导入
    '@typescript-eslint/no-import-type-side-effects': 'error',
    // 禁止定义未使用的变量
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // 允许在导入上指定 type 关键字
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports'
      }
    ],
    // 允许枚举成员的值是多种不同类型的有效 js 表达式
    '@typescript-eslint/prefer-literal-enum-member': [
      'error',
      {
        allowBitwiseExpressions: true
      }
    ],

    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
