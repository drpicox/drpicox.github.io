(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{WHYo:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var n=t("q1tI"),c=t.n(n),s=t("7ljp"),b=t("eC7B"),o=t("qKvR"),p=t("8rN0");var r={name:"n8iuqn",styles:"margin-bottom:-4.5em;"};function m(e){var a=e.index;return Object(o.a)(c.a.Fragment,null,a&&Object(o.a)("div",{css:r},Object(o.a)(p.Link,{className:"index",to:"/"+a},a)))}var j={name:"ix6qzk",styles:'display:grid;grid-template-areas:"prev index next";grid-gap:0.5em;.prev{grid-area:prev;text-align:left;}.next{grid-area:next;text-align:right;}.index{grid-area:index;text-align:center;}'};function l(e){var a=e.prev,t=e.next,n=e.index;return n===a?Object(o.a)("div",{css:j},n&&Object(o.a)(p.Link,{className:"prev",to:"/"+n},"← Index"),t&&Object(o.a)(p.Link,{className:"next",to:"/"+t},t.replace(n,"")," →")):Object(o.a)("div",{css:j},n&&Object(o.a)(p.Link,{className:"index",to:"/"+n},n),a&&Object(o.a)(p.Link,{className:"prev",to:"/"+a},"← ",a.replace(n,"")),t&&Object(o.a)(p.Link,{className:"next",to:"/"+t},t.replace(n,"")," →"))}var O=t("m8Tn");function i(e){var a=e.children,t=e.pageContext.frontmatter,n=t.title,c=t.index,r=t.prev,j=t.next;return Object(o.a)(O.a,{title:n},Object(o.a)(s.a,{components:p},Object(o.a)(b.a,null,Object(o.a)(p.Container,null,Object(o.a)(m,{index:c}),n&&Object(o.a)("h1",null,n),a,Object(o.a)(l,{index:c,prev:r,next:j})))))}},s1am:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return p})),t.d(a,"default",(function(){return j}));var n=t("wx14"),c=t("zLVn"),s=(t("q1tI"),t("7ljp")),b=t("4xnX"),o=t("WHYo"),p=(t("qKvR"),{}),r={_frontmatter:p},m=o.a;function j(e){var a=e.components,t=Object(c.a)(e,["components"]);return Object(s.b)(m,Object(n.a)({},r,t,{components:a,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("img",Object(n.a)({parentName:"p"},{src:"/images/redux/redux-arrays.png",alt:"Redux Arrays"}))),Object(s.b)("p",null,"Use arrays to keep data inside a duck state. The array is the table, and each\nobject inside it is the row."),Object(s.b)("blockquote",null,Object(s.b)("blockquote",{parentName:"blockquote"},Object(s.b)("p",{parentName:"blockquote"},Object(s.b)("strong",{parentName:"p"},"Note"),": this is a request only for this assignment, in the real life use\nthe most suitable structure or follow the\n",Object(s.b)("a",Object(n.a)({parentName:"p"},{href:"https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape#relationships-and-tables",target:"_blank",rel:"nofollow noopener noreferrer"}),"recommendation of redux")))),Object(s.b)(b.a,{mdxType:"Deck"},Object(s.b)(b.c,{mdxType:"Slide"},Object(s.b)("h3",null,"Traverse all elements"),Object(s.b)("p",null,"Use the for, the index and the length of the array to traverse all elements of\nthe array:"),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"for")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"let")," index ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token number"}),"0"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," index ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<")," array",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),"length",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," index ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"+=")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token number"}),"1"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," currentElement ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," array",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),"index",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n  ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"/* … */"),"\n",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"))))),Object(s.b)(b.c,{mdxType:"Slide"},Object(s.b)("h3",null,"Copy"),Object(s.b)("p",null,"Duplicate an array with the triple dot notation:"),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," copy ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"..."),"original",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"))))),Object(s.b)(b.c,{mdxType:"Slide"},Object(s.b)("h3",null,"Delete an element"),Object(s.b)("p",null,"Use splice to remove one element from the array:"),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"copy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"splice"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"index",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token number"}),"1"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")))),Object(s.b)("p",null,"You can use pop or shift to remove the last or the first element."),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"copy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"pop"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// removes the last element"),"\ncopy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"shift"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// removes the first element")))),Object(s.b)("blockquote",null,Object(s.b)("blockquote",{parentName:"blockquote"},Object(s.b)("p",{parentName:"blockquote"},Object(s.b)("strong",{parentName:"p"},"Important"),": Do not use ",Object(s.b)("code",Object(n.a)({parentName:"p"},{className:"language-text"}),"delete"),". This keyword sets the element to\nundefined but it does not remove it from the array.")))),Object(s.b)(b.c,{mdxType:"Slide"},Object(s.b)("h3",null,"Insert one element"),Object(s.b)("p",null,"Use splice to insert one element to an array into an specific index:"),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"copy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"splice"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"index",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token number"}),"0"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," element",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")))),Object(s.b)("p",null,"You can use push or unshift to add an element to the end or to the beggining."),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"copy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"push"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"element",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// adds element to the end of the array"),"\ncopy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"shift"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"element",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// adds element to the beggining of the array"))))),Object(s.b)(b.c,{mdxType:"Slide"},Object(s.b)("h3",null,"Replacing an element"),Object(s.b)("p",null,"Use the assignation to replace an element"),Object(s.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(s.b)("pre",Object(n.a)({parentName:"div"},{className:"language-javascript"}),Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"copy",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),"index",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," element",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";")))))))}j.isMDXComponent=!0}}]);
//# sourceMappingURL=component---wiki-tc-es-3-redux-arrays-mdx-06d559dfad432a0a398a.js.map