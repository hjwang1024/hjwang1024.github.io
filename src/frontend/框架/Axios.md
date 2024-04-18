# Axios

## 取消请求

### 原生 xhr 取消请求

```js
var xhr = new XMLHttpRequest()
xhr.abort()
```

### axios 取消请求

-   使用 CancelToken.source 工厂方法创建 cancel token

    ```js
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get('/user/123', {
        cancelToken: source.token
    }).catch(function(thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
        // 处理错误
        }
    });
    ​
    axios.post('/user/123', {
        name: '小明'
    }, {
        cancelToken: source.token
    })
    ​
    // 取消请求（message 参数是可选的）
    source.cancel('canceled by the user.');
    ```

-   项目中 使用 axios 拦截器 和 vuex

    ```js
    // vuex
    const state = {
        cancel: {},
    }

    const mutations = {
        CANCEL(state, { funNames = [], msg = '用户手动取消网络请求' }) {
            if (!Object.keys(state.cancel).length) {
                return false
            }
            for (const key in state.cancel) {
                if (state.cancel.hasOwnProperty(key)) {
                    if (funNames.includes(key)) {
                        if (!state.cancel[key].response) {
                            state.cancel[key].cancel(msg)
                            state.cancel[key].response = true
                        }
                    }
                } else {
                    return false
                }
            }
        },
        SET_CANCEL(state, { cancel, funName }) {
            state.cancel[funName] = { cancel, response: false }
        },
        RESPONSE(state, funName) {
            if (Object.keys(state.cancel).includes(funName)) {
                state.cancel[funName].response = true
            }
        },
    }

    const actions = {
        setCancel({ commit }, fn) {
            commit('SET_CANCEL', fn)
        },
        response({ commit }, res) {
            commit('RESPONSE', res)
        },
        cancel({ commit }, res) {
            commit('CANCEL', res)
        },
    }
    // 为防止stroe的cancel存储数据过多 可在响应后删除相应属性
    ```

    ```js
    // axios拦截器
    import axios from "axios";
    import store from "@/store";

    var instance = axios.create({
      timeout: 30000,
      withCredentials: true
    });

    const CancelToken = axios.CancelToken;

    // 请求拦截
    instance.interceptors.request.use(
      req => {
          // 给每个请求加 CancelToken
        req.cancelToken = new CancelToken(cancel => {
          let url = req.url
          let str = url.split('/')
          str = Array.from(new Set(str))
          let index = str.length - 1
          let funName = str[index]
          // 取请求的最后一段
          store.dispatch("setCancel", { cancel, funName: funName })
        });
        return req;
      },
      err => Promise.reject(err)
    );

    // 响应拦截
    instance.interceptors.response.use(
      function (response) {
          // 相应后 置为true
        store.dispatch("response", response.config.funName);
        if (response.status === 200 && response.data.request_id) {
          if (response.data.code == 0) {
            return response.data;
          } else {
            let msg = response.data.msg
            Message.error({
              message: msg,
              duration: 3000,
              center: true,
              offset: 50,
              showClose: true
            });
            return Promise.reject(error);
          }
        }
        return response;
      }
    ```

    ```js
    // 页面中使用
    handleCancel() {
      this.$store.dispatch("cancel", { funNames: ["flavors","transerver_info"] })
    }
    ```
