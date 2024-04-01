## 发布npm包

1. `npm login` 输入用户名和密码后登陆成功
2. 发包  `npm publish`
   - package.json 中的 name 在 npm 上还未存在
   - 每次发布需要修改版本号：version  `npm version major | minor | patch`
   - .npmignore 文件，它和 .gitignore 文件差不多
   - main 规定了包的主要入口点，默认值为 index.js。