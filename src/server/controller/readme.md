### 接口规范

正常的返回
```javascript
{
  "code": "0000",
  "message": "",
  "data": {
    "key": "value"
  }
}
```

错误的返回
```javascript
{
  "code": "1000",
  "message": "登录状态已失效，请重新登录",
  "data": null
}
```

code 约定：
```html
- 0000：处理成功
- 1xxx：账号相关错误，如登录状态失效、权限不足
- 4xxx：请求相关错误，如缺少查询参数、参数类型不符、接口不存在
- 5xxx：系统内部错误，如数据库连接超时
```