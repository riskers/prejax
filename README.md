## PREJAX

一款在发布模块前(npm publish)检查分支的工具:

* 检查当前分支是否是规定分支（保证都在指定发布发布）
* 检查当前发布的分支是否和远程分支一致（保证每次发布的都是最新代码）

### Install

`npm install prejax --save-dev` or `yarn add prejax --dev`

### Usage

在 `package.json` 中添加 `prepublish`:

```json
{
  "scripts": {
    "prepublish": "prejax"
  }
}
```

会在 `npm publish` 的时候默认检查当前是否是 **master** 分支，否则不会通过。

****

另外，提供可配置选项，可检查多个分支:

```json
"jaxBranches": [
  "master"
  "aaa",
  "bbb"
]
```

这样，会在 `npm publish` 的时候检查当前分支是否是上述分支中的一个，否则不会通过。
