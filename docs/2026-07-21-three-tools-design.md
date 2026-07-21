# China Trip Check：三项新工具需求与系统设计

## 决策范围

本次开发周报中的 Top 3：

1. China App Readiness Checker
2. Payment Readiness Test（在现有 Payment Setup Check 上升级）
3. Train Booking Readiness Checker

Train Baggage Checker 保留为第二阶段候选；Visa Checker 不做确定性判断，也不加入本次页面。

## 公开资料核对

- [12306 English FAQ](https://www.12306.cn/en/faq.html)：说明外国旅客可使用符合规定的有效护照购买实名制车票；英文网站接受有效外国护照，并说明部分外国护照旅客需要携带购票时使用的原件进行身份核验。
- [12306 English site](https://www.12306.cn/en/index.html)：作为购票渠道与实名制流程的官方入口。
- [Alipay Visiting China](https://www.alipay.com/global/visiting-china/)：作为外国访客支付准备的官方入口。页面内容和可用功能可能变化，因此工具只检查用户是否完成设置与真实测试，不承诺支付一定成功。
- [IndexNow](https://www.indexnow.org/documentation)：站点内容更新后的搜索引擎通知机制，和本次工具需求无直接数据依赖。

## 共同产品原则

- 结果是“准备风险检查”，不是签证、支付、铁路或法律保证。
- 每个问题对应一个可执行动作；报告按 Critical / High / Information 排序。
- 不收集护照号码、银行卡号或支付凭证；答案只保存在浏览器本地。
- 不把国家、手机号或政策变化硬编码成资格结论；只用它们提示验证路径。
- 工具共享现有 `ToolConfig → Questionnaire → evaluateCheck → RiskReport` 引擎，多语言只替换资源包。

## 1. China App Readiness Checker

### 目标

让用户在出发前知道自己需要安装、注册、验证哪些应用，而不是给出所有游客都必须安装的清单。

### 输入

- 手机号区域（用于提示原号码和验证码恢复风险，不用于判断资格）
- 是否保留原手机号访问
- 是否计划用移动支付、已打开的 Alipay / WeChat Pay
- 支付身份验证状态
- 地图、网约车准备状态
- 是否乘坐火车、购票渠道、护照验证状态

### 输出规则

- Critical：计划使用支付但没有可验证的支付路径；计划乘车却没有购票渠道。
- High：地图、网约车、原号码、支付身份或铁路护照验证未完成。
- Information：保存中文地址和离线恢复路径。

### MVP 不做

- 自动判断某国是否必须安装某个应用
- 读取手机已安装应用
- 代替应用内实名或支付测试

## 2. Payment Readiness Test

### 目标

把“下载支付应用”拆成可验证的支付链路：应用、身份、银行卡、发卡行验证、真实小额测试和备用方案。

### 输入

- Alipay / WeChat Pay 设置状态
- 身份验证、外卡绑定、境外交易开关
- 银行验证码或 App 审批可用性
- 是否完成真实支付测试
- 第二张卡、实体卡、少量现金、原手机号和 eSIM 短信能力

### 输出规则

- Critical：没有可用支付路径。
- High：身份、外卡绑定、真实测试、境外交易、银行验证或唯一支付方式存在风险。
- Information：缺少实体卡或现金备份。

### MVP 不做

- 验证银行卡余额或实际扣款
- 声称某张卡或某个国家一定可用
- 保存卡号、验证码或支付截图

## 3. Train Booking Readiness Checker

### 目标

把外国旅客买高铁票时最容易遗漏的身份、渠道、状态和换乘风险变成出发前清单。

### 输入

- 护照签发国家（只用于上下文记录）
- 购票邮箱/手机号访问情况
- 12306、Trip.com、车站柜台或未决定
- 账户状态、护照实名核验状态、姓名匹配状态
- 出行日期、是否换乘、换乘缓冲
- 是否携带购票时使用的原护照、是否保存到站出口方案

### 输出规则

- Critical：未选择购票渠道、姓名与护照不匹配。
- High：护照核验不清、账户未准备、联系方式不可恢复、换乘少于 30 分钟、未携带原护照。
- Information：到站出口和中文目的地未保存。

### MVP 不做

- 判断签证或入境资格
- 承诺余票、价格或某列车一定可买到
- 把 12306 或 Trip.com 的实时订单状态当作本地事实

## 验收标准

- 三个工具均可从 `/checks` 进入并生成本地报告。
- 结果包含风险等级、解释和动作建议，且不会显示未开发的 Train Baggage / Visa 工具。
- 12306 相关文案链接官方 FAQ；支付文案链接官方访客入口。
- `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build` 通过。
