import Mock from 'mockjs'
import querystring from 'querystring'

// 王者荣耀头像
import txlibai from '@/images/tx-libai.png'
import txzhugeliang from '@/images/tx-zhugeliang.png'
import txmingshiying from '@/images/tx-mingshiying.png'
import txyixing from '@/images/tx-yixing.png'
import txjing from '@/images/tx-jing.png'
import tx from '@/images/tx.png'

// 王者荣耀海报
import haibao_libai from '@/images/haibao-libai.jpg'
import haibao_zhugeliang from '@/images/haibao-zhugeliang.jpg'
import haibao_yixing from '@/images/haibao-yixing.jpg'

// 【右侧点击树数据】
Mock.mock('/api/blogtype', 'get', {
  "code": 0, // 错误码
  "msg": "", // 错误消息
  "data|20-30": [
    {
      'id|+1': 1,
      name: "分类 @id",
      'articleCount|1-500': 0, //该分类下文章的数量
      'order|+1': 1
    }
  ]
  // 具体的消息内容，如果code不为0，则必为null
})

// 【中间整体文章数据】
Mock.mock(/^\/api\/blog(\?.+)?$/, "get", function (opa) {
  // console.log('没格式化之前的opa的url', opa);
  const urlObj = querystring.parse(opa.url)
  console.log('格式化之后的opa.url的地址', urlObj);

  const data = {
    'total|200-500': 0,//总数
    [`rows|${urlObj.limit || 10}`]: [
      {
        id: "@guid",
        title: "@ctitle(5,10)",
        description: "@cparagraph(1,5)",
        category: {// 所属分类
          'id|1-15': 1,
          name: "分类@id"
        },
        'scanNumber|1000-10000': 0,//浏览量，就是说这个博客被浏览了多少次
        'commentNumber|100-1000': 0,//品论的数量
        'thumb|1': ["@image(300x250, @color, #fff, @natural)", null],//随机生成图片
        createDate: `@Date('yyyy-MM-dd')`,//创建时间，就是博客的发布时间
      }
    ]
  }
  return Mock.mock({
    code: 0,
    msg: "",
    data,
    // 下面测试无数据时候用
    // data: {
    //   total: 0,
    //   rows: 0
    // }
  })
})

// 【获取单个博客[下面带有测试数据]】
Mock.mock(/^\/api\/blog\/[^/]+$/, 'get', {
  code: 0,
  msg: "",
  data: {
    id: '@guid',
    title: "@ctitle(5,10)",
    category: {
      'id|1-10': 1,
      name: "分类@id"
    },
    'scanNumber|500-9999': 0, //#浏览次数
    'commentNumber|0-500': 0, //#评论数
    description: "@cparagraph(1,10)",
    createDate: Date.now(), //#时间戳，创建日期
    toc: [ //# 博客章节目录
      { name: "标题1", anchor: "article-md-title-1" },
      {
        name: "标题2",
        anchor: "article-md-title-2",
        children: [
          { name: "标题2-1", anchor: "article-md-title-3" },
          { name: "标题2-2", anchor: "article-md-title-4" },
        ],
      },
      {
        name: "标题3",
        anchor: "article-md-title-5",
      },
      {
        name: "标题4",
        anchor: "article-md-title-6",
      },
      {
        name: "标题5",
        anchor: "article-md-title-7",
      },
      {
        name: "我要发表留言",
        anchor: "article-md-title-8",
      },
    ],
    'thumb|1': [Mock.Random.image('300x250', '#626262', '#000', `@id`), null],//随机生成图片
    htmlContent: `<blockquote>
        <p>${Mock.Random.ctitle(5, 10)}</p><ol>
        <li>${Mock.Random.ctitle(10, 20)}</li>
        <li>${Mock.Random.ctitle(10, 20)}</li>
        <li>${Mock.Random.ctitle(10, 20)}</li>
        <li>${Mock.Random.ctitle(10, 20)}</li>
        </ol>
        </blockquote>
        <p>${Mock.Random.ctitle(5, 10)}</p><ol>
        <li><strong>${Mock.Random.ctitle()}</strong>：${Mock.Random.csentence(20, 80)}</li>
        <li><strong>${Mock.Random.ctitle(5, 10)}</strong>：${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 10)}<code>${Mock.Random.word(5, 10)}</code>${Mock.Random.csentence()}${Mock.Random.ctitle()}<code>${Mock.Random.word(5, 10)}</code>${Mock.Random.csentence()}<code>${Mock.Random.word()}</code>${Mock.Random.csentence()}</li>
        </ol>
        <p>所以，${Mock.Random.csentence()}</p><h1 id="article-md-title-1">标题1</h1><p><code>${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 10)}<code>${Mock.Random.word(5, 10)}</code>${Mock.Random.csentence()}<code>${Mock.Random.word()}</code>${Mock.Random.csentence()}<strong>${Mock.Random.word(1)}</strong>${Mock.Random.word(1, 5)}-<strong>${Mock.Random.word(1)}</strong>${Mock.Random.word()} <strong>${Mock.Random.word(1)}</strong>${Mock.Random.word()} <strong>${Mock.Random.word(1)}</strong>${Mock.Random.word()}${Mock.Random.csentence()}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 10)}：<strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 10)}</strong></p><figure class="markdown-image">

              <img style="width:auto" src="${haibao_libai}" title="image-${haibao_libai}" alt="image-${haibao_libai}">
              <figcaption>image-${haibao_libai}</figcaption>

            </figure><p>${Mock.Random.csentence()}</p><p>${Mock.Random.csentence()}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 10, 50)}：</p><ul>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        </ul>
        <p>${Mock.Random.ctitle(10, 50)}</p><p>${Mock.Random.ctitle(10, 50)}</p><h1 id="article-md-title-2">标题2</h1><p>${Mock.Random.ctitle()}（无论是使用${Mock.Random.ctitle()}还是${Mock.Random.ctitle()}），${Mock.Random.ctitle()}<p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p></p>
        <h2 id="article-md-title-3">标题2-1</h2><p>${Mock.Random.ctitle()}<strong>${Mock.Random.ctitle()}</strong>${Mock.Random.ctitle()}，${Mock.Random.ctitle()}：</p><ol>
        <img style="width:auto" src="${haibao_zhugeliang}" title="image-${haibao_zhugeliang}" alt="image-${haibao_zhugeliang}">
        <figcaption style="text-align: center">image-${haibao_zhugeliang}</figcaption>

        <li><p><strong>${Mock.Random.ctitle()}：</strong></p><ul>
        <li>${Mock.Random.word()}</li>
        <li>${Mock.Random.word()}</li>
        <li>${Mock.Random.word()}</li>
        </ul>
        </li>
        <li><p><strong>${Mock.Random.ctitle(10, 30)}：</strong></p><ul>
        <li><code>${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}</code></li>
        </ul>
        </li>
        <li><p><strong>${Mock.Random.ctitle(5, 10)}<code>${Mock.Random.word()}-${Mock.Random.word()}</code>，${Mock.Random.ctitle(5, 10)}：</strong></p><ul>
        <li><code>${Mock.Random.word()}/${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}/${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        <li><code>${Mock.Random.word()}/${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code></li>
        </ul>
        </li>
        </ol>
        <p>${Mock.Random.ctitle(5, 10)}，${Mock.Random.ctitle(5, 10)}。</p><p>${Mock.Random.ctitle()}：</p><pre><code class="language-js"><span class="hljs-comment">// ${Mock.Random.ctitle()}</span>
        fetch(<span class="hljs-string">"${Mock.Random.url('http')}"</span>);
        </code></pre>
        <h2 id="article-md-title-4">标题2-2</h2><p>${Mock.Random.ctitle(5, 10)}<strong>${Mock.Random.word()}${Mock.Random.ctitle()}</strong>${Mock.Random.ctitle()}<strong>${Mock.Random.ctitle()}</strong>${Mock.Random.ctitle()}</p><ol>
        <li><strong>${Mock.Random.ctitle()}<code>${Mock.Random.word()}</code>${Mock.Random.word()}</strong></li>
        </ol>
        <p>比如，${Mock.Random.ctitle()}<code>${Mock.Random.url('http')}</code>${Mock.Random.ctitle()}</p><pre><code class="language-js"><span class="hljs-comment">// ${Mock.Random.ctitle()}</span>
        fetch(<span class="hljs-string">"${Mock.Random.url('http')}"</span>);</code></pre>
        <p>${Mock.Random.ctitle()}会是下面的格式：</p><pre><code>${Mock.Random.email('dengYong')}
        Host: crossdomain.com
        Connection: keep-alive
        ...
        Referer: ${Mock.Random.url('http')}
        Origin: ${Mock.Random.url('http')}</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}，<code>Origin</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><ol start="2">
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code></strong></li>
        </ol>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>字段</p><p>该字段的值可以是：</p><ul>
        <li>*：表示${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li>具体的源：比如<code>${Mock.Random.url('http')}</code>，表示我${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        </ul>
        <blockquote>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.url('http')}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>*</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></p></blockquote>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}：</p><pre><code>${Mock.Random.url('http')}
        ${Mock.Random.now()}
        ...
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.url('http')}
        ...
        ${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><figure class="markdown-image"> 
        <img style="width:auto" src="${haibao_libai}" title="image-${haibao_libai}" alt="image-${haibao_libai}">
        <figcaption>image-${haibao_libai}</figcaption>
        </figure><h1 id="article-md-title-5">标题3</h1><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><ol>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        </ol>
        <p>比如，在<code>${Mock.Random.url('http')}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><pre><code class="language-js"><span class="hljs-comment">// ${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</span></code></pre>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><ol>
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        </ol>
        <pre><code>${Mock.Random.word()} /${Mock.Random.word()}/${Mock.Random.word()} ${Mock.Random.word()}/${Mock.Random.word()}
        ${Mock.Random.word()}: ${Mock.Random.url('http')}
        ...
        ${Mock.Random.word()}: ${Mock.Random.url('http')}
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}, ${Mock.Random.word()}, ${Mock.Random.word()}-${Mock.Random.word()}</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}：</p><ul>
        <li>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}</code></li>
        <li>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<ul>
        <li><code>${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        </ul>
        </li>
        </ul>
        <ol start="2">
        <li><strong>${Mock.Random.word()}</strong></li>
        </ol>
        <p>${Mock.Random.word()}</p><pre><code>${Mock.Random.url('http')}
        ${Mock.Random.now()}
        ...
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.url('http')}
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}, ${Mock.Random.word()}, ${Mock.Random.word()}-${Mock.Random.word()}
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: 86400
        ...</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><ul>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        <li><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</li>
        </ul>
        <ol start="3">
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        </ol>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><pre><code>${Mock.Random.url('http')}
        ${Mock.Random.word()}: ${Mock.Random.url('http')}
        ...
        "name": "邓泳", "age": 18 </code></pre><ol start="4">
        <li><strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</strong></li>
        </ol>
        <pre><code>${Mock.Random.url('http')}
        ${Mock.Random.now()}
        ...
        ${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.url('http')}
        ...
        ${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><figure class="markdown-image">
              <img style="width:auto" src="${haibao_yixing}" title="image-${haibao_yixing}" alt="image-${haibao_yixing}">
              <figcaption>image-${haibao_yixing}</figcaption>
            </figure><h1 id="article-md-title-6">标题4</h1><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><pre><code class="language-js"><span class="hljs-comment">// ${Mock.Random.word()}</span>
        ${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</code></pre>
        <p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<em>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</em></p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}</code>字段</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}<code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}：<strong>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)} <code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()} 的值为*</code></strong>。这就是${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}*的原因</p><h1 id="article-md-title-7">标题5</h1><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}，如：${Mock.Random.word()}-${Mock.Random.word()}、${Mock.Random.word()}-${Mock.Random.word()}、${Mock.Random.word()}-${Mock.Random.word()}、${Mock.Random.word()}、${Mock.Random.word()}-${Mock.Random.word()}、${Mock.Random.word()}${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p><p><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}</code>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}，例如：</p><pre><code>${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}-${Mock.Random.word()}: ${Mock.Random.word()}, ${Mock.Random.word()},${Mock.Random.word()}</code></pre><p>${Mock.Random.cword('这是我随便写出来的随机的文本', 5, 20)}</p>
        <h1 id="article-md-title-8">我要发表留言</h1>`,
  },
})

// 【提交评论】
Mock.mock('/api/comment', 'post', {
  code: 0,
  msg: "",
  data: {
    id: '@guid',
    nickname: "@cname@id",
    content: "随机-@cparagraph(1,10)",
    createDate: Date.now(),
    'avatar|1': [
      txlibai,
      txzhugeliang,
      txmingshiying,
      txyixing,
      txjing,
    ],
  }
})

// 【获取评论】
Mock.mock(/^\/api\/comment\/?.+$/, 'get', function (opa) {
  // console.log('没格式化之前的opa的url', opa);
  const urlObj = querystring.parse(opa.url)
  // console.log('格式化之后的opa.url的地址', urlObj);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      'total|30-90': 0,//总数评论
      [`rows|${urlObj.limit || 10}`]: [
        {
          id: '@guid',
          nickname: "@cname",
          content: "随机-@cparagraph(1,10)",
          // createDate: Date.now(),
          createDate: "@date('T')",
          'avatar|1': [
            txlibai,
            txzhugeliang,
            txmingshiying,
            txyixing,
            txjing,
            tx,
            'https://s.panlai.com/zb_users/upload/2024/10/20241028074611173007277174739.png-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111143933169968477391403.jpg-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111132808169968048827966.jpg-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111140253169968257360256.jpg-pcthumbs',
          ],
        }
      ]
    }
  })
})

// 'avatar|1': [
//   "https://gravatar.loli.net/avatar/988b9091d5a9f5681ec11537b9d6bfaa.jpg?s=256&d=identicon&f=y",
//   "https://gravatar.loli.net/avatar/a2a1f070c9b84fb66fbb8a499d6223e8.jpg?s=256&d=monsterid&f=y",
//   "https://gravatar.loli.net/avatar/a0955f1a6b3d30eaa49378a22b290e29.jpg?s=256&d=wavatar&f=y",
//   "https://gravatar.loli.net/avatar/b29d6bc82207333b0fe9cc0217f5fc5e.jpg?s=256&d=monsterid&f=y",
//   "https://gravatar.loli.net/avatar/43f853897f82a0ea1cd0bd28384cc35b.jpg?s=256&d=retro&f=y",
//   "https://gravatar.loli.net/avatar/d982951342609cea69abc5bd30a534ad.jpg?s=256&d=robohash&f=y",
//   "https://gravatar.loli.net/avatar/2ae19c4425f23b6a5b3c3ce3d59748b7.jpg?s=256&d=mp&f=yv",
// ]