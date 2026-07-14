# China Ready 全量需求分析报告

**报告版本：** Baseline V1.0  
**报告日期：** 2026年7月  
**适用项目：** China Ready 赴华旅行风险检查工具站  
**报告目的：** 识别外国游客赴华旅行中高频、高损失、可提前发现、可低成本工具化的真实需求，并为产品立项和系统设计提供依据。

---

# 1. 报告说明

本报告不是普通旅游需求汇总，也不是单纯的内容选题清单。

本次分析重点关注：

- 哪些问题会造成明确时间、金钱或行程损失；
- 哪些问题会直接导致无法支付、无法入住、错过高铁或无法进入景区；
- 哪些问题可以在出发前通过规则检查发现；
- 哪些问题适合一个人低成本做成工具；
- 哪些问题不需要大量实时数据和人工维护；
- 哪些问题值得独立立项，哪些只适合作为规则或解释内容。

信息来源主要包括：

- Reddit 赴华旅行相关社区；
- Tripadvisor 中国旅行论坛；
- YouTube 中国旅行视频评论；
- 支付、铁路、地图、酒店等App的低星评论；
- Google 搜索建议、People Also Ask 和趋势查询；
- 中国铁路、国家移民管理局等官方来源；
- 赴华旅行竞品网站；
- 近期外国游客实际旅行复盘与失败案例。

---

# 2. 核心结论

外国游客赴华旅行最强的需求，不是“景点推荐”，而是以下四类：

1. **数字系统能否正常工作**
   - 支付宝；
   - 微信支付；
   - 短信验证码；
   - eSIM；
   - 地图；
   - 12306；
   - 景区小程序。

2. **实名与护照是否匹配**
   - 高铁；
   - 酒店；
   - 景区预约；
   - App实名认证；
   - 预订姓名；
   - 证件号码。

3. **行程是否存在致命疏漏**
   - 节假日；
   - 车站混淆；
   - 换乘时间不足；
   - 深夜入住；
   - 景区未预约；
   - 预订未正式出票。

4. **是否准备了备用路径**
   - 第二张银行卡；
   - 第二支付App；
   - 人民币现金；
   - 备用网络；
   - 中文酒店地址；
   - 人工检票通道；
   - 备用酒店。

产品机会不是继续建设更多攻略文章，而是：

> **帮助用户检查自己是否存在单点故障，并提前告诉他最坏会发生什么。**

---

# 3. 需求优先级总表

| 排名 | 需求方向 | 优先分 | 最适合的产品形式 |
|---:|---|---:|---|
| 1 | 支付与身份认证风险 | 95 | Payment Failure Prevention Check |
| 2 | 高铁、车站与换乘风险 | 93 | Train Station & Transfer Risk Checker |
| 3 | 节假日与订票风险 | 91 | Holiday & Booking Risk Checker |
| 4 | 酒店到达与入住风险 | 89 | Hotel Arrival Risk Checker |
| 5 | 整体赴华准备遗漏 | 88 | China Readiness Checker |
| 6 | 网络与地图风险 | 82 | 纳入综合检查规则 |
| 7 | 高铁预订状态理解 | 79 | 纳入高铁风险工具 |
| 8 | 景区预约与护照支持 | 74 | 纳入后续行程红线检查 |
| 9 | 普通App选择 | 较低 | 解释文章 |
| 10 | 行李、短语、普通推荐 | 较低 | 不独立立项 |

---

# 4. 图表说明

## 4.1 赴华旅行痛点证据信号数量

![赴华旅行痛点证据信号数量](china_travel_demand_signal_counts.png)

说明：

- “证据信号数”来自本次定向检索中的问题、案例和重复讨论；
- 不是总体市场占比；
- 主要用于比较不同需求方向的相对强弱；
- 支付、高铁、节假日是最强的三类需求；
- 酒店问题频率略低，但失败后果较重。

## 4.2 需求频率与工具优先级矩阵

![需求频率和工具优先级矩阵](china_travel_demand_priority_matrix.png)

说明：

- 横轴表示定向样本中的需求信号数量；
- 纵轴表示工具优先级评分；
- 支付、高铁、节假日同时具备高频和高价值；
- 酒店频率不如支付，但工具成本最低；
- 景区预约真实存在，但暂不适合独立建设全国数据库。

---

# 5. 第一大痛点：支付系统存在单点故障

## 5.1 典型用户问题

外国游客反复遇到：

- 支付宝护照认证失败；
- 已经上传护照，但状态仍显示未认证；
- 误进入中国大陆银行卡认证流程；
- 外国银行卡已绑定，但实际交易失败；
- 发卡银行需要短信验证码，但eSIM只能上网；
- 支付宝或微信支付突然受限；
- 误以为绑定银行卡等于给支付宝余额充值；
- 只配置一个支付App和一张银行卡；
- 出发前无法完成真实支付测试；
- 完全没有人民币现金备用。

## 5.2 最坏后果

- 无法打车；
- 无法向部分商户付款；
- 无法使用部分小程序服务；
- 临时寻找ATM；
- 求助陌生人代付；
- 影响机场、餐厅、交通和酒店；
- 单人游客产生强烈焦虑。

## 5.3 真正的产品需求

普通攻略回答：

> 如何设置支付宝。

真正需要的工具回答：

> 你的支付系统是否存在单点故障？

## 5.4 推荐工具

### Payment Failure Prevention Check

检查内容：

- 是否完成护照认证；
- 是否绑定银行卡；
- 是否开启境外交易；
- 是否可接收验证码；
- 是否做过真实小额支付；
- 是否有第二张银行卡；
- 是否有第二支付App；
- 是否携带实体卡；
- 是否有人民币现金；
- 是否保留原手机号；
- eSIM是否支持短信。

## 5.5 输出示例

```text
Payment resilience: Weak

Single points of failure:
- You rely on one bank card only.
- Your payment setup has never been tested.
- Your eSIM may not receive bank verification SMS.
- You have no cash backup.

Recommended minimum setup:
1. One tested mobile payment method
2. A second card from another issuer
3. Access to bank verification
4. A physical card
5. Emergency RMB cash
```

## 5.6 评分

| 维度 | 得分 |
|---|---:|
| 后果严重度 | 25/25 |
| 重复频率 | 19/20 |
| 可提前发现 | 15/15 |
| 可规则化 | 15/15 |
| 搜索意图 | 9/10 |
| 维护成本 | 9/10 |
| 商业化 | 3/5 |
| **总分** | **95/100** |

## 5.7 产品判断

这是最适合首发的工具：

- 规则数量少；
- 不需要支付API；
- 不需要银行卡成功率数据库；
- 用户损失明确；
- 可自然连接eSIM、旅行卡、接送机和Arrival Pack。

---

# 6. 第二大痛点：高铁不是“买到票就结束”

## 6.1 典型风险

### 护照信息错误

- 护照号码输错；
- 姓名顺序错误；
- 订单证件与实际证件不一致；
- 到检票口才发现无法扫描。

### 不清楚进站流程

- 不知道护照是不是车票；
- 不知道是否需要纸质车票；
- 不知道外国护照是否走人工通道；
- 不知道应提前多久到站；
- 不知道大型车站安检和检票耗时。

### 预订状态理解错误

- 将预约请求视为正式出票；
- 不理解候补；
- 不理解出票成功率；
- 不知道订单是否已经真正确认。

### 同城不同车站

- 北京站、北京西、北京南；
- 上海站、上海虹桥；
- 广州站、广州东、广州南；
- 深圳站、深圳北、深圳东。

### 换乘时间不足

- 同站换乘时间过短；
- 跨站换乘误认为同站；
- 忽略安检、人工通道和大件行李；
- 节假日仍按普通时间估算。

## 6.2 最坏后果

- 无法检票；
- 错过列车；
- 高价改签；
- 影响下一段酒店、航班和景区；
- 同城跨站时间不足；
- 整个跨城行程中断。

## 6.3 推荐工具

### Train Station & Transfer Risk Checker

检查内容：

- 到达站；
- 下一趟出发站；
- 是否同站；
- 两车时间间隔；
- 是否首次乘坐；
- 是否外国护照；
- 是否大件行李；
- 是否节假日；
- 是否已正式出票；
- 护照号码是否核对。

## 6.4 输出示例

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

## 6.5 评分

| 维度 | 得分 |
|---|---:|
| 后果严重度 | 25/25 |
| 重复频率 | 18/20 |
| 可提前发现 | 15/15 |
| 可规则化 | 14/15 |
| 搜索意图 | 8/10 |
| 维护成本 | 8/10 |
| 商业化 | 5/5 |
| **总分** | **93/100** |

## 6.6 产品判断

高铁方向长期价值最高，但比支付工具稍重。

建议第二阶段只支持：

- 北京；
- 上海；
- 广州；
- 深圳。

不需要一开始覆盖全国。

---

# 7. 第三大痛点：节假日导致订票和行程失控

## 7.1 典型用户问题

- 订完国际机票才发现撞上黄金周；
- 不知道风险是否只在法定假日；
- 不知道假期前后是否同样拥堵；
- 不知道酒店、车票和景区应先抢哪个；
- 不知道广交会是否影响广州住宿；
- 不知道春运和暑期是否需要特殊安排。

## 7.2 最坏后果

- 高铁票和机票难买；
- 热门景区售罄；
- 酒店价格上涨；
- 车站、景区排队时间增加；
- 原本可行的跨城行程失去弹性；
- 临时改动成本高。

## 7.3 普通文章的问题

普通文章只会说：

> Avoid Golden Week.

用户真正需要：

- 我的日期风险有多高；
- 哪几天最危险；
- 哪个城市风险最大；
- 高铁、酒店、景区哪个最先处理；
- 日期无法调整时怎么办。

## 7.4 推荐工具

### Holiday & Booking Risk Checker

输入：

- 到达日期；
- 离开日期；
- 城市；
- 是否跨城；
- 是否坐高铁；
- 是否访问热门景区；
- 是否可以改日期。

输出：

- 核心节假日；
- 节前风险；
- 节后风险；
- 高铁风险；
- 酒店风险；
- 景区预约风险；
- 行动优先级。

## 7.5 输出示例

```text
Travel risk: Extreme

Your dates overlap with National Day.

Highest risks:
- Intercity rail tickets
- Major attraction reservations
- Hotel prices

Recommended actions:
1. Change dates if possible.
2. If not, prioritize rail tickets.
3. Book timed attractions as soon as booking opens.
```

## 7.6 评分

| 维度 | 得分 |
|---|---:|
| 后果严重度 | 23/25 |
| 重复频率 | 18/20 |
| 可提前发现 | 15/15 |
| 可规则化 | 15/15 |
| 搜索意图 | 10/10 |
| 维护成本 | 8/10 |
| 商业化 | 2/5 |
| **总分** | **91/100** |

## 7.7 产品判断

这是最适合SEO和静态规则维护的工具：

- 每年维护节假日；
- 增加春运、暑期；
- 增加广交会等少量城市事件；
- 不需要实时票价和客流。

---

# 8. 第四大痛点：深夜到达与酒店入住风险

## 8.1 典型用户问题

- 晚上11点后落地；
- 凌晨才能到酒店；
- 不知道是否真正24小时前台；
- 未通知酒店晚到；
- 酒店中文名称和地址未保存；
- 预订姓名与护照不一致；
- 司机找不到英文酒店名称；
- 酒店前台不熟悉外国护照登记；
- 无备用酒店。

## 8.2 最坏后果

- 深夜无法入住；
- 临时换酒店；
- 无法联系前台；
- 没有中国手机号；
- 家庭、老人和商务游客损失更大；
- 安全风险上升。

## 8.3 推荐工具

### Hotel Arrival Risk Checker

检查：

- 到达时间；
- 到达酒店时间；
- 是否24小时前台；
- 是否收到晚到确认；
- 是否保存中文名称；
- 是否保存中文地址；
- 是否保存酒店电话；
- 预订姓名是否与护照一致；
- 是否可免费取消；
- 是否有备用酒店。

## 8.4 输出示例

```text
Hotel arrival risk: High

Critical issues:
- Arrival after midnight
- Late check-in not confirmed
- Chinese hotel name not saved
- Booking name does not match passport

Actions:
1. Ask for written late-arrival confirmation.
2. Save the hotel name and address in Chinese.
3. Save the phone number.
4. Keep a backup 24-hour hotel.
```

## 8.5 评分

| 维度 | 得分 |
|---|---:|
| 后果严重度 | 24/25 |
| 重复频率 | 15/20 |
| 可提前发现 | 15/15 |
| 可规则化 | 15/15 |
| 搜索意图 | 7/10 |
| 维护成本 | 10/10 |
| 商业化 | 3/5 |
| **总分** | **89/100** |

## 8.6 产品判断

这是最适合个人开发的工具之一：

- 几乎没有外部数据；
- 规则稳定；
- 场景明确；
- 可以自然关联酒店和接送机联盟。

---

# 9. 第五大需求：不知道自己遗漏了什么

## 9.1 用户问题

第一次来中国的游客经常表达：

- 不知道从哪里开始；
- 不确定支付是否真的准备好；
- 不知道是否需要原手机号；
- 不知道高铁、酒店、地图是否都准备完整；
- 担心中国数字环境复杂；
- 不知道哪些问题属于“必须提前解决”。

## 9.2 推荐工具

### China Readiness Checker

不是普通知识测试，而是：

> 旅行阻断项总检查器。

## 9.3 检查维度

- 支付；
- 网络；
- 验证码；
- 酒店；
- 高铁；
- 节假日；
- 中文地址；
- 备用方案。

## 9.4 输出结构

```text
Critical blockers
High risks
Optional improvements
Next specialist check
```

## 9.5 输出示例

```text
China Readiness: 64/100

3 critical blockers:
- Your payment setup has not been tested.
- You have no backup internet option.
- Your hotel name and address are not saved in Chinese.

Next:
1. Run the Payment Failure Prevention Check.
2. Check your travel dates.
3. Confirm late hotel arrival.
```

## 9.6 评分

| 维度 | 得分 |
|---|---:|
| 后果严重度 | 21/25 |
| 重复频率 | 18/20 |
| 可提前发现 | 15/15 |
| 可规则化 | 15/15 |
| 搜索意图 | 8/10 |
| 维护成本 | 9/10 |
| 商业化 | 2/5 |
| **总分** | **88/100** |

---

# 10. 真实但不应独立开发的需求

## 10.1 网络与eSIM

真实问题：

- eSIM有数据但不能收验证码；
- 国际SIM有信号但速度差；
- 本地功能仍需要中国手机号；
- 网络能访问Google，不代表中国本地App能正常使用。

产品处理：

- 纳入Readiness Checker；
- 纳入Payment Check；
- 配套解释文章；
- 不单独做eSIM选择器。

## 10.2 地图和地点搜索

真实问题：

- Google Maps在中国不够可靠；
- Amap英文支持不完整；
- 英文店名无法匹配中文地点；
- 用户未保存酒店和车站中文名称。

产品处理：

- 纳入Readiness Checker；
- 配套“保存中文地址”文章；
- 不独立做地图App选择器。

## 10.3 高铁预订状态理解

真实问题：

- 预约不等于出票；
- 候补不等于确认；
- 订单状态理解错误；
- 护照号码未核对。

产品处理：

- 纳入Train Station & Transfer Risk Checker；
- 不单独做12306与Trip.com选择器。

## 10.4 景区预约和护照

真实问题：

- 微信小程序不接受外国手机号；
- 没有外国护照选项；
- 官方、平台和现场规则不同；
- 热门景区预约紧张。

产品处理：

- 首版做解释内容；
- 后续纳入Itinerary Red Flag Checker；
- 不建设全国景区预约数据库。

---

# 11. 建议产品结构

## 11.1 首发工具

```text
China Ready
├── China Readiness Checker
├── Payment Failure Prevention Check
├── Holiday & Booking Risk Checker
└── Hotel Arrival Risk Checker
```

## 11.2 第二阶段

```text
├── Train Station & Transfer Risk Checker
```

## 11.3 流量验证后

```text
└── Itinerary Red Flag Checker
```

---

# 12. 为什么不做20个小工具

不建议独立开发：

| 工具 | 不做原因 |
|---|---|
| 普通行李清单 | AI和大量网站可替代 |
| Alipay还是WeChat | 一篇文章足够 |
| 地图App选择器 | 选项少，工具价值弱 |
| 备用现金计算器 | 结果不够精确 |
| 普通短语生成器 | 只能作为附属功能 |
| 餐厅难度检查器 | 没有地点数据时过于泛化 |
| 全国酒店数据库 | 人工维护过重 |
| 全国景区数据库 | 变化频繁 |
| 实时拥堵预测 | 依赖实时数据 |
| AI行程生成器 | 竞争激烈且容易生成不可执行计划 |

工具数量不是价值，真正价值是：

> 工具是否能提前发现一个会破坏行程的问题。

---

# 13. 最小MVP建议

## 13.1 首发功能

- 四个核心工具；
- 一套通用问卷引擎；
- 一套JSON规则引擎；
- 统一风险结果页；
- 10—15篇解释文章；
- 邮件保存结果；
- 基础访问统计；
- 联盟链接。

## 13.2 首发不需要

- 数据库；
- 用户系统；
- AI；
- 实时API；
- 原生App；
- PWA；
- 后台管理系统；
- 全国城市数据；
- 全国酒店和景区数据。

## 13.3 规则数量

| 工具 | 规则数量 |
|---|---:|
| Readiness Checker | 25—35 |
| Payment Check | 15—20 |
| Holiday Risk | 10—15类 |
| Hotel Arrival | 10—15 |

---

# 14. 商业化方向

## 14.1 第一阶段

联盟营销：

- eSIM；
- 酒店；
- Trip.com；
- 接送机；
- 旅行保险；
- 旅行银行卡。

## 14.2 第二阶段

数字产品：

- China Arrival Pack；
- Payment Backup Pack；
- Holiday Survival Pack；
- Guangzhou Business Traveler Pack。

## 14.3 第三阶段

付费服务：

- Personalized Trip Risk Report；
- Itinerary Red Flag Report；
- 人工行程复核；
- 商务访客检查；
- 旅行社批量使用。

---

# 15. 后续周报与需求监测

本报告作为基线。

后续每周报告重点关注：

- 新出现的问题；
- 某类问题是否明显增加；
- App流程变化；
- 官方规则变化；
- 新的高痛感失败案例；
- 哪些现有规则需要修改；
- 是否出现新的独立工具候选；
- 本周Top 3机会。

持续监测来源：

- Reddit；
- Tripadvisor；
- YouTube评论；
- App低星评论；
- Google搜索问题；
- Google Trends；
- 竞品新增页面；
- 官方政策变化。

---

# 16. 最终结论

China Ready真正应该解决的不是“外国游客想知道什么”，而是：

> **外国游客在哪些情况下，会因为不知道或判断错误而损失时间、金钱，甚至导致行程中断。**

最终优先级应为：

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

产品真正的价值不是提供更多中国旅行知识，而是：

> **在用户出发前，找出那些可能让支付、交通、入住或整个行程失败的关键问题，并告诉用户下一步该做什么。**
