# China Ready 赴华旅行风险检查工具站
## 系统设计说明书 V1.1

**文档状态：** 基线需求分析后修订版  
**修订依据：** 《China Ready 全量需求分析报告》  
**产品形态：** 移动优先独立网站  
**首发平台：** Web  
**首发语言：** 英文  
**目标用户：** 第一次来中国、缺乏中国旅行经验，或已完成基础预订但担心行程出错的国际游客  
**核心原则：** 少工具、强痛点、优先阻断风险、低数据成本、低人工维护、工具驱动获客  

---

# 1. 文档修订说明

V1.1根据全量需求分析结果，对原V1.0进行重新排序和收敛。

主要变化如下：

1. 将“支付与身份认证风险”确定为第一优先级；
2. 将“高铁、车站与换乘风险”提升为核心方向，但考虑数据成本，放在第二阶段；
3. 将“节假日与订票风险”确定为首发高价值工具；
4. 保留“酒店到达风险”，并强化深夜入住、中文地址和预订姓名检查；
5. 将China Readiness Checker明确为总入口，而非普通评分问卷；
6. 将网络、eSIM、地图、景区预约、高铁预订状态等需求降为专项工具中的检查规则或解释内容；
7. 明确不建设大量低痛感小工具；
8. 增加需求证据、规则治理、内容更新和工具准入机制；
9. 第一阶段仍坚持无数据库、无AI、无实时API的轻量MVP路线。

---

# 2. 项目背景

外国游客来中国旅行时，真正可能导致行程失败的，不是少看一个景点，而是以下阻断问题：

- 支付宝或微信支付已配置，但实际无法付款；
- 只有一张银行卡或一个支付App，没有任何备用路径；
- eSIM可以上网，但无法接收发卡银行验证码；
- 高铁订单中的护照号码、姓名与实际证件不一致；
- 混淆同一城市中的不同火车站；
- 高铁换乘时间不足；
- 行程撞上春节、国庆、五一或广交会等高风险时段；
- 深夜抵达酒店，但酒店未确认晚到或没有24小时前台；
- 未保存酒店中文名称和中文地址；
- 将Trip.com预约、候补和正式出票混为一谈；
- 依赖Google Maps或英文地点名，却无法找到正确入口；
- 热门景区需要实名预约，但用户未提前确认外国护照支持方式。

目前英文中国旅行网站主要以文章和SEO内容为主，普遍回答：

- 如何使用支付宝；
- 如何买高铁票；
- 中国需要安装哪些App；
- 哪些城市值得去。

但用户真正需要的是：

> **根据自己的支付、日期、车站、酒店和行程状态，判断哪些问题可能让这次旅行直接失败。**

因此，本项目不建设普通中国旅行攻略站，而是建设：

> **China Ready——赴华旅行风险检查工具站。**

---

# 3. 全量需求分析结论

## 3.1 需求优先级

| 排名 | 需求方向 | 优先分 | 产品处理方式 |
|---:|---|---:|---|
| 1 | 支付与身份认证风险 | 95 | 首发独立工具 |
| 2 | 高铁、车站与换乘风险 | 93 | 第二阶段核心工具 |
| 3 | 节假日与订票风险 | 91 | 首发独立工具 |
| 4 | 酒店到达与入住风险 | 89 | 首发独立工具 |
| 5 | 整体准备遗漏 | 88 | 首发总入口 |
| 6 | 网络与地图风险 | 82 | 纳入总检查和支付检查 |
| 7 | 高铁预订状态理解 | 79 | 纳入高铁风险工具 |
| 8 | 景区预约与护照支持 | 74 | 纳入后续行程红线检查 |
| 9 | 普通App选择 | 较低 | 只做解释文章 |
| 10 | 行李、短语、餐厅选择 | 较低 | 不作为独立工具 |

## 3.2 核心产品判断

首发产品不应宣传为“多个免费中国旅行工具”，而应定位为：

> **A pre-trip risk check for the problems most likely to break your China trip.**

核心检查对象只有四类：

1. 支付体系是否存在单点故障；
2. 日期是否会造成订票、酒店和景区风险；
3. 酒店到达和入住是否存在明显风险；
4. 整体准备是否遗漏关键阻断项。

高铁、车站和换乘是第二阶段重点。

---

# 4. 产品定位

## 4.1 英文定位

> Find the problems that could break your China trip before they happen.

## 4.2 中文定位

> 在出发前发现可能导致中国行程失败的问题。

## 4.3 产品本质

China Ready不是：

- 中国景点攻略站；
- 中国旅游百科；
- AI行程生成器；
- 机票、酒店或门票预订平台；
- 中国旅游新闻站；
- 中国本地服务数据库；
- 普通旅行问卷网站。

China Ready是：

> **面向外国游客的赴华旅行阻断风险检查与行动建议工具。**

工具不负责替用户做所有旅行决策，而是检查：

- 有没有可能付不了款；
- 有没有可能因为日期导致票订不到；
- 有没有可能深夜到酒店却无法入住；
- 有没有可能因证件、车站或时间错误错过高铁；
- 有没有遗漏必须提前准备的关键事项。

---

# 5. 产品设计原则

## 5.1 阻断风险优先

需求优先级按最坏后果确定：

| 后果 | 优先级 |
|---|---|
| 无法支付、无法入住、错过高铁 | 最高 |
| 车票难订、酒店大幅涨价、景区售罄 | 高 |
| 多花时间、使用不方便 | 中 |
| 体验不够优化 | 低 |

## 5.2 不追求工具数量

每个独立工具必须同时满足：

1. 不使用工具可能造成明确时间或金钱损失；
2. 普通文章不能直接给出用户自己的判断；
3. 能通过有限问题和静态规则完成判断；
4. 一个人可以维护；
5. 结果可直接转化成行动清单；
6. 不依赖大量实时数据；
7. 不需要建设全国数据库。

## 5.3 风险结果优先于总分

每个工具可以有分数，但最终结果必须优先展示：

1. Critical Blockers；
2. High Risks；
3. Actions Before Departure；
4. Backup Plan；
5. Related Guide；
6. Next Check。

禁止只输出一个笼统分数。

## 5.4 保守判断

工具不得承诺：

- 某张银行卡一定成功；
- 某家酒店一定接待外国人；
- 某趟高铁一定不会误车；
- 某景区一定能现场购买；
- 某日期一定拥堵或一定不拥堵。

应使用：

- risk；
- likely；
- may；
- recommended；
- verify with the official provider；

等保守表达。

## 5.5 内容服务于工具

内容的作用是：

```text
搜索进入解释文章
→ 进入风险工具
→ 输出个人风险
→ 用户执行行动建议
→ 推荐相关服务或数字产品
```

---

# 6. 目标用户

## 6.1 第一次来中国的自由行游客

典型问题：

- 不知道支付宝是否真的准备完成；
- 不知道是否需要保留原手机号；
- 不清楚高铁护照和检票流程；
- 不知道自己的日期是否碰上中国重大节假日；
- 不知道酒店需要提前确认哪些事项。

## 6.2 已完成预订的游客

已经购买：

- 国际机票；
- 酒店；
- 部分高铁票；
- 景区门票。

但担心：

- 订单是否真正出票；
- 车站是否正确；
- 时间是否合理；
- 酒店是否保留房间；
- 景区是否支持护照。

这是最有价值的目标用户，因为其出行意图和付费意愿都更强。

## 6.3 商务访客

重点场景：

- 深夜抵达；
- 广交会期间住宿；
- 广州、深圳、香港跨城交通；
- 机场接送；
- 酒店中文地址；
- 支付和通信备用方案。

---

# 7. 产品总体结构

## 7.1 首发结构

```text
China Ready
├── China Readiness Checker
├── Payment Failure Prevention Check
├── Holiday & Booking Risk Checker
└── Hotel Arrival Risk Checker
```

## 7.2 第二阶段

```text
├── Train Station & Transfer Risk Checker
```

## 7.3 流量验证后

```text
└── Itinerary Red Flag Checker
```

## 7.4 附属规则，不独立成工具

以下需求作为上述工具中的检查项：

- 备用网络；
- 银行验证码接收；
- eSIM是否只有数据；
- 是否完全依赖Google Maps；
- 是否保存中文酒店和车站名称；
- 高铁是否正式出票；
- 是否仍处于候补状态；
- 景区是否需要提前预约；
- 是否有外国护照预约路径。

---

# 8. 核心业务流程

```text
用户进入首页
→ 选择“完整检查”或专项工具
→ 回答少量问题
→ 本地规则引擎计算
→ 输出Critical / High Risk / Optional
→ 展示行动优先级
→ 引导进入下一专项检查
→ 查看解释文章
→ 邮件保存结果
→ 点击相关联盟或购买数字产品
```

China Readiness Checker是总入口，其结果可以触发：

```text
支付风险
→ Payment Failure Prevention Check

日期风险
→ Holiday & Booking Risk Checker

深夜入住
→ Hotel Arrival Risk Checker

涉及高铁
→ 第二阶段 Train Station & Transfer Risk Checker
```

---

# 9. 核心工具详细设计

# 9.1 China Readiness Checker

## 9.1.1 功能定位

China Readiness Checker不是普通旅行知识测试，而是：

> **旅行阻断项总检查器。**

其任务是快速发现用户是否需要进入专项检查。

## 9.1.2 检查维度

### A. 支付

- 是否至少配置一个移动支付App；
- 是否完成护照实名认证；
- 是否绑定银行卡；
- 是否完成真实付款测试；
- 是否有第二张卡；
- 是否有实体卡；
- 是否有少量人民币备用。

### B. 网络和短信

- 抵达后是否有网络；
- 是否有第二联网方式；
- 原手机号是否能接收银行验证码；
- 是否仅有数据eSIM；
- 是否已测试关键App。

### C. 酒店

- 是否保存中文酒店名；
- 是否保存中文地址；
- 是否保存酒店电话；
- 是否深夜到达；
- 是否确认晚到；
- 预订姓名是否与护照一致。

### D. 高铁

- 是否涉及高铁；
- 护照号码是否核对；
- 是否正式出票；
- 是否理解出发车站；
- 是否预留进站时间。

### E. 日期

- 是否碰上法定节假日；
- 是否处于春运、暑期或黄金周；
- 是否涉及广交会等大型事件；
- 是否已提前预订交通和景区。

### F. 导航与地址

- 是否准备非Google地图方案；
- 是否保存重要地点中文名称；
- 是否保存离线地址截图。

## 9.1.3 风险分级

### Critical Blocker

示例：

- 没有任何可用或已测试的支付方式；
- 抵达后没有网络；
- 深夜到达但酒店未确认；
- 高铁护照信息不一致；
- 酒店中文名称和地址均未保存。

### High Risk

示例：

- 只依赖一张银行卡；
- 只有数据eSIM且无法接收银行短信；
- 行程撞上黄金周；
- 高铁仍处于候补或预约状态；
- 没有保存酒店电话。

### Optional Improvement

示例：

- 没有离线翻译；
- 没有第二地图工具；
- 没有安装餐厅类App。

## 9.1.4 输出示例

```text
China Readiness: 64/100

3 critical blockers:
• Your payment setup has not been tested.
• You have no backup internet option.
• Your hotel name and address are not saved in Chinese.

2 high risks:
• You rely on one bank card.
• Your trip overlaps with a national holiday period.

What to do next:
1. Run the Payment Failure Prevention Check.
2. Check your travel dates.
3. Confirm late hotel arrival.
```

## 9.1.5 数据维护

- 25—35条规则；
- 每季度复核；
- 规则存储在JSON或TypeScript配置中；
- 不需要数据库。

---

# 9.2 Payment Failure Prevention Check

## 9.2.1 功能定位

检查用户的支付体系是否存在**单点故障**。

不回答：

- 哪张具体银行卡一定成功；
- 某发卡行实时成功率；
- 支付宝实时服务状态。

重点回答：

> 如果当前唯一的支付路径失败，用户是否还有备用方案。

## 9.2.2 用户输入

- 是否安装支付宝；
- 是否安装微信；
- 是否完成护照实名认证；
- 是否绑定外国银行卡；
- 卡组织；
- 是否开启境外交易；
- 是否可以接收银行短信或App验证码；
- 是否做过真实小额支付测试；
- 是否有另一发卡行的卡；
- 是否携带实体卡；
- 是否准备人民币；
- 网络方案是否支持短信；
- 是否完全依赖单一App。

## 9.2.3 主要规则

### Critical

- 没有已测试支付方式；
- 只有一种支付方式且没有现金；
- 无法接收银行验证码；
- 仅有一张银行卡且无其他备用。

### High Risk

- 只配置支付宝；
- 只配置微信支付；
- 没有携带实体卡；
- 未开启境外交易；
- 未保留原手机号；
- 用户把绑定卡误认为余额充值。

### Optional

- 未设置小额付款测试提醒；
- 未记录发卡银行客服电话。

## 9.2.4 结果示例

```text
Payment resilience: Weak

Single points of failure:
• One bank card only
• No real payment test
• No SMS backup
• No RMB cash

Minimum safe setup:
1. One tested mobile payment method
2. A second card from another issuer
3. Access to bank verification
4. A physical card
5. Emergency cash
```

## 9.2.5 转化入口

工具结果可匹配：

- eSIM或漫游方案；
- 酒店预订；
- 接送机；
- China Arrival Pack；
- 支付准备指南。

不得以制造焦虑方式强推产品。

## 9.2.6 数据维护

- 15—20条规则；
- 支付官方流程变化时复核；
- 不维护银行卡品牌成功率；
- 不接入支付API。

---

# 9.3 Holiday & Booking Risk Checker

## 9.3.1 功能定位

根据旅行日期、城市和交通方式，识别：

- 高铁票风险；
- 酒店价格风险；
- 景区预约风险；
- 城市拥堵风险；
- 大型展会影响。

## 9.3.2 用户输入

- 到达日期；
- 离开日期；
- 城市；
- 是否跨城市；
- 是否乘坐高铁；
- 是否前往热门景区；
- 是否可以调整日期。

## 9.3.3 首发事件库

### 全国事件

- 春节；
- 春运；
- 清明节；
- 五一劳动节；
- 端午节；
- 暑期；
- 中秋节；
- 国庆黄金周；
- 元旦。

### 城市事件

首发只维护：

- 广交会；
- 少量超大规模展会或活动。

## 9.3.4 风险窗口

每个事件包含：

- officialStart；
- officialEnd；
- preTravelRiskDays；
- postTravelRiskDays；
- hotelPriceWindow；
- railBookingRisk；
- attractionBookingRisk；
- affectedCities。

## 9.3.5 输出示例

```text
Travel risk: Extreme

Your dates overlap with National Day.

Highest risks:
• Intercity rail tickets
• Major attraction reservations
• Hotel prices

Most affected dates:
October 1–5

Recommended actions:
1. Change dates if possible.
2. If not, prioritize rail tickets.
3. Book timed attractions as soon as booking opens.
```

## 9.3.6 数据维护

- 每年更新国务院节假日安排；
- 每年更新春运和广交会日期；
- 不维护实时票价；
- 不维护实时客流；
- 不承诺精确拥堵人数。

---

# 9.4 Hotel Arrival Risk Checker

## 9.4.1 功能定位

检查用户抵达酒店时是否可能发生：

- 深夜无法入住；
- 房间被取消；
- 司机找不到酒店；
- 酒店无法识别英文名称；
- 预订姓名与护照不一致；
- 酒店未确认外国护照登记；
- 无法联系前台。

## 9.4.2 用户输入

- 城市；
- 到达机场或车站；
- 预计抵达酒店时间；
- 是否24小时前台；
- 是否收到晚到书面确认；
- 是否保存酒店中文名；
- 是否保存中文地址；
- 是否保存酒店电话；
- 预订姓名是否与护照一致；
- 是否通过主流平台预订；
- 是否可免费取消；
- 是否准备备用酒店。

## 9.4.3 主要规则

### Critical

- 午夜后到达且未确认；
- 非24小时前台且晚到；
- 无中文名称、地址和电话；
- 预订姓名明显与护照不一致。

### High Risk

- 只通过聊天获得模糊回复；
- 无免费取消；
- 没有备用酒店；
- 到达后无可用打车方式。

## 9.4.4 输出示例

```text
Hotel arrival risk: High

Critical issues:
• Arrival after midnight
• Late check-in not confirmed
• Chinese hotel name not saved
• Booking name does not match passport

Actions:
1. Ask for written late-arrival confirmation.
2. Save the hotel name and address in Chinese.
3. Save the phone number.
4. Keep a backup 24-hour hotel.
```

## 9.4.5 数据维护

- 10—15条稳定规则；
- 不维护全国酒店名单；
- 不判断具体酒店一定接待或拒绝外国人。

---

# 10. 第二阶段核心工具

# 10.1 Train Station & Transfer Risk Checker

## 10.1.1 产品优先级

需求优先分为93，属于高痛点核心方向。由于需要少量城市、车站和换乘时间数据，放在第二阶段，而不是降低重要性。

## 10.1.2 解决问题

- 同一城市不同火车站；
- 出发站选择错误；
- 高铁订单仍未出票；
- 护照信息错误；
- 同站换乘时间不足；
- 跨站换乘时间不足；
- 到站过晚；
- 大型车站首次乘坐预留不足。

## 10.1.3 首发城市

- 北京；
- 上海；
- 广州；
- 深圳。

后续扩展：

- 杭州；
- 成都；
- 重庆；
- 西安。

## 10.1.4 轻量数据模型

每个车站维护：

- stationId；
- city；
- nameEn；
- nameZh；
- aliases；
- stationSize；
- recommendedArrivalMinutes；
- passportManualGateRisk；
- commonConfusedStations；
- transferPairs；
- holidayExtraMinutes。

不维护：

- 实时列车；
- 实时地铁时间；
- 实时拥堵；
- 精确酒店到车站路线。

## 10.1.5 检查逻辑

- 同站或跨站；
- 时间间隔；
- 是否首次；
- 是否外国护照；
- 是否大件行李；
- 是否节假日；
- 是否需要重新安检；
- 是否正式出票；
- 证件号码是否核对。

## 10.1.6 输出示例

```text
Transfer risk: High

Arrival station:
Guangzhou East

Departure station:
Guangzhou South

These are different stations.

Recommended minimum transfer:
90 minutes

Your available time:
45 minutes

Action:
Change to a later train.
```

---

# 11. 后续工具

# 11.1 Itinerary Red Flag Checker

## 11.1.1 建设条件

只有满足以下条件后才开发：

- 四个首发工具已有稳定使用；
- 高铁工具数据验证有效；
- 用户主动提交完整行程；
- 用户愿意为深度检查付费；
- 已积累城市和景点最小规则集。

## 11.1.2 首批检查项

- 行程撞上重大节假日；
- 单日跨越过多城市；
- 高铁未正式出票；
- 车站混淆；
- 换乘时间不足；
- 深夜酒店未确认；
- 热门景区未预约；
- 博物馆闭馆日；
- 到达晚于最后入场；
- 酒店到车站时间明显不足。

## 11.1.3 输入方式

首版使用结构化表单，不自动解析：

- PDF；
- 邮件；
- Trip.com订单；
- Google Docs；
- ChatGPT全文行程。

## 11.1.4 商业模式

- 免费基础红线检查；
- 付费详细报告；
- 人工复核；
- 商务访客检查；
- 旅行社批量版本。

---

# 12. 明确不独立开发的需求

## 12.1 网络与eSIM

真实问题：

- 无法接收银行短信；
- 国际SIM速度不稳定；
- 需要中国手机号的功能不能使用。

处理方式：

- 纳入Readiness Checker；
- 纳入Payment Check；
- 配套解释文章；
- 不独立建设eSIM推荐器。

## 12.2 地图

真实问题：

- Google Maps数据或位置不可靠；
- 英文地点名称搜不到；
- 未保存中文地址。

处理方式：

- 纳入Readiness Checker；
- 输出“保存中文酒店、车站和景区名称”；
- 不做“地图App选择器”。

## 12.3 高铁购票平台选择

真实问题是：

- 预约和正式出票混淆；
- 候补状态不理解；
- 护照信息错误。

处理方式：

- 纳入Train Risk Checker；
- 不单独做12306与Trip.com选择器。

## 12.4 景区预约

处理方式：

- 首版只做解释内容；
- 后续纳入Itinerary Red Flag Checker；
- 不建设全国景区预约数据库。

## 12.5 永不作为核心工具

- 普通行李清单；
- 通用短语卡；
- 美食推荐；
- App数量推荐；
- 普通天气建议；
- 景点排行榜；
- 普通现金计算器。

---

# 13. 风险评分模型

## 13.1 严重度

| 等级 | 说明 |
|---|---|
| Critical | 可能导致无法支付、无法入住、错过交通或无法继续行程 |
| High | 可能造成明显时间、金钱损失或临时改计划 |
| Medium | 会产生不便，但存在容易找到的替代路径 |
| Optional | 体验优化，不影响基本行程 |

## 13.2 风险分值

每条规则可以配置：

- severityWeight；
- probabilityWeight；
- recoverabilityWeight；
- urgencyWeight。

总分只用于概览，具体风险项优先展示。

## 13.3 风险合并

同一底层问题触发多个答案时，应合并。

例如：

```text
onlyOneCard = true
noCash = true
noSecondPaymentApp = true
```

合并为：

> Your payment system has a single point of failure.

而不是重复显示三条相似提示。

---

# 14. 通用规则引擎设计

## 14.1 问题模型

```json
{
  "id": "payment_tested",
  "tool": "payment",
  "question": "Have you completed a real payment test?",
  "type": "single_choice",
  "required": true,
  "options": [
    {
      "label": "Yes",
      "value": true
    },
    {
      "label": "No",
      "value": false
    }
  ]
}
```

## 14.2 风险规则模型

```json
{
  "code": "PAYMENT_SINGLE_POINT_FAILURE",
  "tool": "payment",
  "severity": "critical",
  "all": [
    {"field": "testedPayment", "operator": "eq", "value": false},
    {"field": "backupCard", "operator": "eq", "value": false},
    {"field": "cashBackup", "operator": "eq", "value": false}
  ],
  "title": "Your payment setup has a single point of failure.",
  "actions": [
    "Test a small payment before departure.",
    "Add a second card.",
    "Carry emergency RMB cash."
  ],
  "relatedGuide": "payment-backup-china"
}
```

## 14.3 日期事件模型

```json
{
  "code": "CN_NATIONAL_DAY_2026",
  "name": "National Day",
  "startDate": "2026-10-01",
  "endDate": "2026-10-07",
  "preRiskDays": 2,
  "postRiskDays": 2,
  "railRisk": "extreme",
  "hotelRisk": "high",
  "attractionRisk": "extreme",
  "affectedCities": ["ALL"]
}
```

## 14.4 结果模型

```json
{
  "tool": "payment",
  "score": 42,
  "critical": [],
  "highRisk": [],
  "mediumRisk": [],
  "optional": [],
  "actions": [],
  "relatedTools": [],
  "relatedGuides": []
}
```

---

# 15. 页面与交互设计

# 15.1 首页

首页首屏：

```text
Find the problems that could break your China trip.

Check payments, dates, hotel arrival and train risks
before you leave.
```

四个首发入口：

- Check My China Readiness
- Check My Payment Setup
- Check My Travel Dates
- Check My Hotel Arrival

首页不以文章列表为主体。

## 15.2 工具流程

```text
工具说明
→ 预计耗时
→ 分步问卷
→ 结果计算
→ Critical / High Risk
→ 行动清单
→ 下一工具
→ 相关指南
→ 邮件保存
```

要求：

- 首发工具控制在8—15个问题；
- 一次只显示一个或一组相关问题；
- 支持返回修改；
- 不强制注册；
- 结果可通过URL参数或本地Storage暂存；
- 不在URL中保存敏感个人信息。

## 15.3 结果页

结果页必须包含：

1. 一句话判断；
2. Critical数量；
3. High Risk数量；
4. 风险说明；
5. 行动顺序；
6. 备用方案；
7. 下一专项检查；
8. 更新时间；
9. 免责声明；
10. 邮件保存。

## 15.4 示例风险报告

```text
China Trip Risk Report

Overall status: Not ready

Critical:
• Payment setup has not been tested.
• Hotel late arrival is not confirmed.

High risk:
• Trip overlaps with National Day.
• Only one bank card is available.

Next:
1. Fix payment setup.
2. Confirm hotel arrival.
3. Review booking dates.
```

---

# 16. 内容体系

## 16.1 内容目的

内容只承担：

- SEO获客；
- 解释工具结果；
- 提供官方核验入口；
- 补充无法由规则表达的背景；
- 支撑联盟转化。

## 16.2 首批文章

### 支付

- How to test Alipay before visiting China
- What to do if your foreign card fails
- Why your travel eSIM may not receive bank verification SMS
- Why one payment method is not enough in China

### 日期

- Should you travel during China National Day?
- How Chinese public holidays affect train tickets
- Canton Fair dates and hotel risk in Guangzhou

### 酒店

- How to confirm late hotel check-in in China
- Why you should save your hotel name in Chinese
- What to do if a hotel cannot process your passport

### 高铁

- How early should foreigners arrive at a Chinese train station?
- Shanghai Station vs Shanghai Hongqiao
- Guangzhou East vs Guangzhou South
- How to confirm a China train ticket is actually issued

### 总体准备

- What first-time visitors forget before China
- China travel backup plan: payment, internet and hotel

## 16.3 内容更新

每篇文章配置：

- lastReviewedAt；
- officialSources；
- applicableTools；
- relatedRiskCodes；
- updateFrequency；
- status。

---

# 17. 技术架构

## 17.1 MVP架构

```text
Next.js Static / Hybrid Website
├── Tool Configuration
├── Questionnaire Renderer
├── Rule Engine
├── Risk Result Renderer
├── Holiday Event Data
├── Guide Pages
├── Analytics
└── Email Capture
```

## 17.2 技术选型

- Next.js；
- React；
- TypeScript；
- Tailwind CSS；
- JSON或TypeScript规则配置；
- Static Site Generation；
- 少量Serverless API用于邮件；
- Plausible或Google Analytics；
- Search Console；
- Vercel或Cloudflare部署。

## 17.3 第一阶段不需要

- Spring Boot；
- PostgreSQL；
- Redis；
- Elasticsearch；
- 用户系统；
- 后台管理系统；
- AI；
- 实时交通API；
- 实时酒店API；
- 原生App；
- PWA；
- 支付系统。

## 17.4 何时引入后端

满足以下条件之一再引入：

- 需要保存跨设备报告；
- 用户账户有明确需求；
- 需要付费报告；
- 需要后台更新规则；
- 需要用户反馈审核；
- 高铁车站数据规模扩大。

---

# 18. 数据与规则治理

## 18.1 数据来源

规则来源分为：

- 官方规则；
- 平台官方说明；
- 多用户重复案例；
- 编辑验证；
- 竞品内容线索。

论坛和评论用于发现问题，关键规则需回到官方或保守逻辑。

## 18.2 规则状态

- Draft；
- Verified；
- Active；
- Needs Review；
- Deprecated。

## 18.3 规则更新记录

每次变更记录：

- ruleCode；
- oldVersion；
- newVersion；
- changeReason；
- source；
- changedAt；
- reviewer。

第一阶段可通过Git版本管理实现。

## 18.4 更新周期

| 数据 | 周期 |
|---|---|
| 支付准备规则 | 每季度或官方变化时 |
| 节假日 | 每年官方公布后 |
| 广交会 | 每届确认 |
| 酒店到达规则 | 每半年 |
| 高铁通用规则 | 每季度 |
| 车站数据 | 每半年或线路变化时 |

---

# 19. 需求情报与持续发现机制

系统建设应与已创建的每周需求监测结合。

每周监测：

- Reddit；
- Tripadvisor；
- YouTube评论；
- App低星评论；
- Google搜索问题；
- Google Trends；
- 竞品新增页面。

监测结果用于：

- 新增风险规则；
- 调整问题文案；
- 调整风险等级；
- 增加解释文章；
- 判断是否新增工具。

不得因为单一帖子立即增加规则。

建议满足以下条件之一：

1. 多平台重复；
2. 同平台短期高频；
3. 后果严重且逻辑明确；
4. 官方规则发生变化。

---

# 20. SEO策略

## 20.1 核心工具词

- China travel readiness checker
- China payment readiness check
- China holiday travel checker
- China hotel late arrival checker
- China train station transfer checker
- China trip risk checker

## 20.2 高意图长尾词

- Alipay foreign card not working
- China train ticket pending vs issued
- how early to arrive Guangzhou South station
- late hotel check in China foreign passport
- visit China during National Day
- eSIM bank verification SMS China
- Shanghai station vs Shanghai Hongqiao

## 20.3 页面体系

- 工具页；
- 风险结果示例页；
- 解释文章；
- 节假日年度页；
- 城市车站对比页；
- FAQ页。

---

# 21. 商业模式

## 21.1 第一阶段

联盟营销：

- eSIM；
- 酒店；
- Trip.com；
- 接送机；
- 旅行保险。

原则：

- 必须与用户风险场景相关；
- 明确标识联盟关系；
- 不以夸大风险促进点击。

## 21.2 第二阶段

数字产品：

- China Arrival Pack；
- Payment Backup Pack；
- Holiday Survival Pack；
- Guangzhou Business Traveler Pack。

## 21.3 第三阶段

付费服务：

- Personalized Trip Risk Report；
- Itinerary Red Flag Report；
- 人工行程复核；
- 商务访客检查；
- 旅行社批量检查。

---

# 22. MVP范围

## 22.1 首发功能

1. China Readiness Checker；
2. Payment Failure Prevention Check；
3. Holiday & Booking Risk Checker；
4. Hotel Arrival Risk Checker；
5. 统一问卷引擎；
6. 统一风险规则引擎；
7. 统一结果页；
8. 12—16篇解释内容；
9. 邮件保存结果；
10. 基础访问统计。

## 22.2 首发规则规模

| 工具 | 规则数量 |
|---|---:|
| Readiness | 25—35 |
| Payment | 15—20 |
| Holiday | 10—15类日期规则 |
| Hotel | 10—15 |

## 22.3 不包含

- 用户注册；
- 全国车站数据库；
- 全国酒店数据库；
- 景区预约数据库；
- 实时票价；
- 实时客流；
- AI行程规划；
- 原生App；
- 浏览器插件；
- 多语言；
- 社区。

---

# 23. 分阶段实施计划

## 第一阶段：四个轻量工具

目标：

- 验证用户是否愿意完成检查；
- 验证结果是否被保存和分享；
- 验证工具词SEO；
- 验证联盟点击。

## 第二阶段：高铁风险

建设：

- 四个城市；
- 主要车站；
- 同城混淆；
- 跨站换乘；
- 护照和出票检查。

## 第三阶段：统一报告

建设：

- 多工具结果合并；
- 邮件报告；
- PDF报告；
- Arrival Pack；
- 可选账号系统。

## 第四阶段：行程红线

建设：

- 结构化行程录入；
- 节假日、酒店、高铁和预约综合规则；
- 付费深度报告；
- 人工复核。

---

# 24. 验收指标

## 24.1 产品指标

- 首页进入工具比例；
- 工具开始率；
- 工具完成率；
- Critical结果占比；
- 进入下一专项工具比例；
- 邮件保存率；
- 分享率。

## 24.2 SEO指标

- 工具页索引率；
- 工具关键词曝光；
- 长尾词点击；
- 自然搜索占比；
- 外链和Reddit引用。

## 24.3 商业指标

- 联盟链接点击；
- 邮箱订阅；
- 数字产品购买；
- 人工检查咨询。

## 24.4 工具有效性

- 用户是否表示问题被提前发现；
- 结果是否足够具体；
- 是否存在大量误报；
- 用户是否理解下一步行动；
- 是否有规则反复被反馈为过时。

---

# 25. 新工具准入标准

任何新工具必须回答：

> 用户不使用这个工具，最坏可能发生什么？

进入独立工具的必要条件：

- 可能无法支付；
- 可能错过交通；
- 可能订错车站；
- 可能无法入住；
- 可能因日期导致重大预订失败；
- 可能无法进入关键景区；
- 可能导致整个行程不可执行。

以下需求不独立成工具：

- 普通App推荐；
- 普通行李清单；
- 普通翻译；
- 普通天气；
- 普通景点推荐；
- 仅提升方便程度的功能。

---

# 26. 主要风险与应对

| 风险 | 应对 |
|---|---|
| 结果过于泛化 | 重点输出具体阻断项和行动顺序 |
| 工具产生虚假确定性 | 保守措辞，提供官方核验建议 |
| 规则过期 | 规则版本和定期复核 |
| 支付规则变化快 | 不判断具体银行卡成功率 |
| 高铁数据成本上升 | 仅支持少量城市和静态车站规则 |
| 变成普通内容站 | 首页、导航和SEO以工具为中心 |
| 工具数量膨胀 | 强制执行准入标准 |
| 用户认为AI可替代 | 强调遗漏检测、结构化检查和统一报告 |
| 联盟影响中立性 | 明确披露，风险判断与商业推荐分离 |

---

# 27. 最终建设建议

依据全量需求分析，China Ready的产品优先级应明确为：

```text
第一阶段
├── China Readiness Checker
├── Payment Failure Prevention Check
├── Holiday & Booking Risk Checker
└── Hotel Arrival Risk Checker

第二阶段
└── Train Station & Transfer Risk Checker

第三阶段
└── Itinerary Red Flag Checker
```

其中：

- **支付**是需求频率最高、最容易低成本工具化的方向；
- **高铁**是失败后果最严重、长期产品价值最高的方向；
- **节假日**是最适合SEO和静态规则维护的方向；
- **酒店到达**是低数据成本、高痛感的方向；
- **准备度检查**负责把用户分流到专项工具。

网络、地图、eSIM、景区预约和App选择等需求，不应被忽视，但第一阶段应作为检查规则和解释内容存在，而不是继续扩张成大量独立小工具。

产品真正的价值不是向用户提供更多知识，而是：

> **在用户出发前，找出那些可能让支付、交通、入住或整个行程失败的关键问题，并告诉用户下一步该做什么。**
