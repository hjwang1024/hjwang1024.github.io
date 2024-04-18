# Redux

## Redux Toolkit

-   `npm i @reduxjs/toolkit`

```js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// 这个是将状态存储在本地
import storage from 'redux-persist/es/storage';
import global from './global';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  global,
});

/**
 * 解决数据状态不持久化
 */
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
/** */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```js
// global.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    title: 'redux toolkit pre',
}

// 创建一个 Slice
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // 定义 reducers 并生成关联的操作
    reducers: {
        // 定义一个加的方法
        increment: state => {
            state.value += 1
        },
        // 定义一个减的方法
        decrement: state => {
            state.value -= 1
        },
    },
})
// 导出加减的方法
export const { increment, decrement } = counterSlice.actions

// 默认导出
export default counterSlice.reducer
```

```js
// App.js
import { persistor, store } from 'modules/store'
import { PersistGate } from 'redux-persist/integration/react'

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <App />
                </HashRouter>
            </PersistGate>
        </Provider>,
        document.getElementById('app')
    )
}

renderApp()
```
