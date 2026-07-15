# China Trip Check 代码质量与 SEO 评审报告

**评审日期：** 2026-07-15  
**评审维度：** AI创作痕迹 / 用户习惯匹配度 / SEO优化 / 流量获取策略  
  
---

## 一、AI 创作痕迹

### 结论：代码层面几乎没有 AI 痕迹，内容层面模板化痕迹明显但内容质量不差。

#### 1.1 代码质量（好）

| 维度 | 评价 |
|---|---|
| TypeScript 类型设计 | 16个操作符的字面量联合类型、`all`/`any` AND/OR 规则引擎，设计规范 |
| 架构分层 | configs → operators → evaluate → merge-findings → score → render，干净 |
| CSS | 65行 globals.css，13个语义化 CSS 变量，无冗余 |
| 组件设计 | 每个组件职责单一，无过度抽象 |
| 错误处理 | localStorage 带版本号 + 类型守卫，异常时自动清理 |

**没有发现典型 AI 代码痕迹：**
- 无无意义的抽象层（如 `usePaymentValidator → validatePayment → PaymentValidationService` 三件套）
- 无过度注释（没有 `// This function validates the payment` 这种废话）
- 无冗余状态管理（没有为简单表单引入 Redux/Zustand）

#### 1.2 内容模板化（中）

12篇指南全部使用相同的 `ArticleSections` 结构模板：`answer → sections → faqs`。代码写法也高度一致，如 `foreign-card-failure.tsx` 甚至单行写完整个组件（第4-9行连写）：

```tsx
// 这种连写风格在多个 guide 文件中重复出现
export function ForeignCardFailureGuide() {
  return <ArticleSections answer="..." sections={[...]} />;
}
```

**这是否算 AI 痕迹？** 不算典型 AI——AI 通常会加更多废话。这更像是"高效批量产出"的手法。但 12 篇完全一致的模板会让搜索引擎认为内容浅薄（thin content）。

**建议：** 挑 2-3 篇高价值指南（如支付测试、酒店晚到、节假日订票）打破模板，加入具体数据、具体城市、具体场景，做成 pillar content。

#### 1.3 来源引用严重不足（高）

| 来源类型 | 篇数 |
|---|---|
| `operationalNote`（通用免责） | 11/12 |
| `holidaySource`（政府公告链接） | 1/12 |
| 官方支付文档引用 | 0 |
| 统计数据/调查报告 | 0 |
| 真实用户案例 | 0 |

11 篇指南的来源都是同一句 "Conservative preparation guidance. Confirm current terms with the relevant provider."——这对 EEAT（专业/权威/信任）评分不利。

#### 1.4 好消息：没有发现这些AI痕迹

全文搜索确认**不存在**：
- ❌ "In today's digital age..."
- ❌ "It is important to note that..."
- ❌ "Whether you're a seasoned traveler or..."
- ❌ "In conclusion..." / "To summarize..."
- ❌ "Unlock the secrets of..."
- ❌ 虚构百分比数据
- ❌ 空洞的形容词堆砌

文案是直接、行动导向的，符合用户设定的"直接高效"风格。

---

## 二、不符合用户习惯/功能需求的实现

### 2.1 与用户偏好一致的（好）

| 用户偏好 | 代码体现 |
|---|---|
| 直接高效型 | 文案无寒暄，"Check payments" → "See my report"，一步到位 |
| 结构化输出 | 报告结构清晰：Score → Metrics → Findings → Actions → Backup |
| 条理清晰/可逆性 | localStorage 带 draft 保存、清除按钮、版本号校验 |
| 不做分步教程 | 检查是问答式而非教程式 |

### 2.2 不符合用户习惯的（需关注）

| # | 问题 | 严重度 | 说明 |
|---|---|---|---|
| U1 | **priceCurrency 用 USD** | 低 | `site-json-ld.tsx:21` — 工具免费，但作为中国旅行工具站，CNY/RMB 更自然 |
| U2 | **cities 字段收集但不使用** | 低 | dates.ts 问"去哪些城市"但无规则消费这个答案（广交会城市过滤未用到它） |
| U3 | **Header 桌面/移动 CTA 不一致** | 低 | 桌面 "Check my trip" → 移动 "Check"，信息量不统一 |
| U4 | **所有来源标注同质化** | 中 | 11/12 篇文章相同的 `operationalNote`，对熟悉 J2EE/数据真实性的人会觉得敷衍 |

### 2.3 功能需求层面的缺失

| # | 缺失功能 | 设计文档要求 | 当前状态 |
|---|---|---|---|
| F1 | 邮件保存报告 | MVP 明确要求 | ❌ 未实现 |
| F2 | 评分模型含权重维度 | §13.2 要求 severityWeight/probabilityWeight 等 | ❌ 仅固定扣分 |
| F3 | Plausible/GA 统计 | 基础访问统计 | 有 Umami，可接受 |
| F4 | 联盟链接（eSIM/酒店） | 第一阶段商业化 | ❌ 未实现 |

> 注：用户已在之前评审中确认 P1（F1-F4）条件未达标，暂不修改。此处仅记录供后续参考。

---

## 三、SEO 优化建议

### 3.1 当前 SEO 健康度

| 维度 | 状态 | 评分 |
|---|---|---|
| metadata（title/description） | 所有页面有 | ★★★★☆ |
| canonical URL | 所有页面有 | ★★★★★ |
| OpenGraph | layout + 各 page 有，部分页面缺失 | ★★★☆☆ |
| Twitter Card | layout 级有 | ★★★★☆ |
| JSON-LD 结构化数据 | 有 Organization/WebSite/WebApplication/Article/Breadcrumb | ★★★☆☆ |
| Sitemap | 完整，含动态内容 | ★★★★☆ |
| Robots.txt | 允许全部爬虫 | ★★★★☆ |
| 页面性能（SSG） | Next.js SSG + generateStaticParams | ★★★★★ |
| **keywords** | **全部页面缺失** | ☆☆☆☆☆ |
| FAQPage 结构化数据 | **有FAQ内容但无 JSON-LD** | ☆☆☆☆☆ |
| 图片 alt | hero 图片有 alt | ★★★★☆ |

### 3.2 高优先级修复（影响搜索排名）

#### H1：所有页面新增 keywords

虽然 Google 权重下降，但 Bing/Yandex/DuckDuckGo 仍然使用。对于 China travel 这种长尾关键词场景，keywords 有助于非 Google 搜索流量。

```
// 建议在 layout.tsx 全局 metadata 增加：
keywords: [
  "China travel preparation", "China trip checklist", "Alipay setup",
  "WeChat Pay foreigner", "China hotel check-in", "China travel risk",
  "China holiday calendar", "China eSIM", "Canton Fair travel"
],
```

#### H2：指南页增加 FAQPage JSON-LD

6/12 篇指南有 FAQ 区块，但未生成 `FAQPage` 结构化数据。这直接损失了 Google 富文本搜索结果（FAQ rich results）的展示机会——FAQ 富文本结果点击率通常高出 5-15%。

```
// 在 seo-json-ld.tsx 中新增 FAQPageJsonLd 组件
// 在 guides/[slug]/page.tsx 中渲染
```

**影响页面：** arrival-internet, china-holidays-tickets-hotels, esim-verification, first-city, late-check-in, payment-test

#### H3：补全 Organization JSON-LD

```json
// site-json-ld.tsx 当前缺少：
"logo": "https://chinatripcheck.com/images/logo.png",
"sameAs": [],  // 如果有 Twitter/X、GitHub 等
"contactPoint": {  // 可选，增加信任
  "@type": "ContactPoint",
  "contactType": "customer support",
  "email": "hello@chinatripcheck.com"
}
```

#### H4：补全 Article JSON-LD 字段

当前 `ArticleJsonLd` 缺少 `datePublished`、`image`。这些字段有助于文章在 Google Discover 中的展示。

#### H5：修复 how-it-works 和 terms 页面缺少 OG 标签

这两个页面的 metadata 导出没有 `openGraph` 字段，社交分享时无预览卡片。

### 3.3 中优先级优化

| # | 建议 | 影响 |
|---|---|---|
| M1 | WebSite JSON-LD 加 `potentialAction.SearchAction` | 可能触发 Google Sitelinks Search Box |
| M2 | sitemap 首页加 `<image:image>` 声明 hero 图 | Google Image Search 收录 |
| M3 | `not-found.tsx` 增加 metadata | 404 页不索引，但加 `robots: { index: false }` 更规范 |
| M4 | 首页 meta description 扩写 | 当前 "Check your payments, travel dates and hotel arrival before you leave." 可加更多长尾关键词 |
| M5 | `box-sizing: border-box` 加上 `*::before, *::after` | 66行即可修，顺手的事 |

### 3.4 技术 SEO 亮点（值得保持）

- SSG 全预渲染 → Google 爬虫秒级获取完整 HTML
- `<html lang="en">` → 正确声明语言
- `text-rendering: optimizeLegibility` → 字体渲染优化
- `prefers-reduced-motion` → 无障碍加分项
- Umami（隐私友好分析）→ 不需要 cookie banner，欧洲用户友好
- 所有外链带 `rel="noreferrer" target="_blank"` → 安全实践
- `generateStaticParams` → 动态路由预生成，不是 CSR

---

## 四、流量获取策略

### 4.1 当前状态

- 域名：chinatripcheck.com（2025年注册？）
- 技术栈：Next.js SSG + Cloudflare Pages（推测，基于 wrangler.jsonc）
- 分析：Umami（已集成）
- 内容：4个检查工具 + 12篇指南
- 反链：0（推测）

### 4.2 短中期流量策略（6个月内）

#### 第一步：内容关键词覆盖（本月可做）

当前内容覆盖的关键词空间偏窄。12篇指南集中在"实用操作"类查询，缺少"信息型"长尾内容。

**建议新增 3-5 篇长尾指南：**

| 主题 | 目标关键词 | 搜索意图 |
|---|---|---|
| "Do I need a VPN in China 2026" | china vpn requirements 2026, foreigner internet china | 信息型，搜索量大 |
| "How to use DiDi without Chinese phone number" | didi foreigner setup, china rideshare without chinese number | 操作型，长尾精准 |
| "China entry requirements 2026 checklist" | china visa requirements, china entry documents foreigner | 信息型，高搜索量 |
| "Can foreigners use WeChat mini programs" | wechat mini programs foreigner, china app guide | 信息型+操作型 |
| "How much cash to bring to China" | cash china travel, rmb foreigner amount | 信息型，搜索量大 |

#### 第二步：结构化数据驱动流量（本月可做）

修复 FAQPage JSON-LD → 6篇指南的 FAQ 区块转化为 Google 富文本搜索结果 → 预计 CTR 提升 5-15%。

#### 第三步：Reddit / 旅游论坛引流（持续）

目标 subreddit：r/ChinaTravel, r/travelchina, r/chinavisa, r/digitalnomad

策略：
- 不直接发链接（会被 spam filter）
- 回答问题时引用具体指南内容，自然提及 chinatripcheck.com
- 样例话术："I built a free tool that checks this — it asks about your Alipay setup, internet, hotel Chinese address etc. and gives you a risk report."

#### 第四步：Product Hunt 发布（1-2月后）

Product Hunt 对"实用工具 + 旅行"品类友好。发布前准备：
- 首页完善（当前已经很不错）
- 准备 3-5 张产品截图
- 准备第一句话（hook）
- 时区选择：PST 凌晨发布

#### 第五步：合作/反链获取（3-6月）

| 目标 | 方式 |
|---|---|
| 旅行博客 | 主动联系 China travel blogger，提供免费工具嵌入或客座文章 |
| 数字游民社区 | Nomad List, Hacker News, Indie Hackers 提及 |
| 高校留学办公室 | 联系欧美大学国际学生办公室，推荐给赴华交换生 |
| 中国使领馆网站 | 长期目标——被官方推荐为旅行准备资源 |

### 4.3 长期策略（6-12个月）

| 策略 | 预期效果 |
|---|---|
| 多语言版本（中文/日文/韩文） | 覆盖日韩赴华旅客（日韩是中国入境旅游前两大客源国） |
| 嵌入 widget | 让旅行博客可以在文章中嵌入单项检查工具 |
| Newsletter | 当中国政府发布新的节假日安排时推送更新 |
| 用户反馈闭环 | 报告底部加"Was this helpful?" → 收集真实痛点 → 迭代指南 |

### 4.4 不需要做的事

- ❌ 付费广告（现阶段 ROI 低，内容资产不够）
- ❌ SEO 黑帽（PBN、链接农场）——你的域名很干净，别冒险
- ❌ 社交媒体矩阵（先做 Reddit 一个渠道做透）
- ❌ AI 批量生成指南（会破坏当前内容的真实性优势）

---

## 五、总结

| 维度 | 评分 | 一句话 |
|---|---|---|
| AI 痕迹 | ★★★★☆ | 代码干净，内容有灵魂，模板化是唯一短板 |
| 用户习惯匹配 | ★★★★☆ | 直接高效型风格贯彻到位，小细节可调 |
| SEO 基础 | ★★★☆☆ | metadata/sitemap/robots/SSG 都好，keywords 和 FAQPage JSON-LD 缺失是硬伤 |
| 流量获取 | ★★☆☆☆ | 产品工具属性强、内容质量好，但零推广零反链 |
| **综合** | ★★★☆☆ | **好产品缺流量，SEO 补齐后可以起飞** |

**优先做这三件事：**
1. 补 `keywords` + FAQPage JSON-LD + Article datePublished（半天工作量，直接提升搜索表现）
2. 写 3 篇高搜索量长尾指南（VPN、DiDi、入境文件清单）
3. 开始 Reddit r/ChinaTravel 社群运营（每周投入 2-3 小时）
