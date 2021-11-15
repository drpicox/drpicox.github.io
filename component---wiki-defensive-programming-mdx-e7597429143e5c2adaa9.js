(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{WHYo:function(e,a,t){"use strict";t.d(a,"a",(function(){return O}));var n=t("q1tI"),c=t.n(n),s=t("7ljp"),o=t("eC7B"),b=t("qKvR"),r=t("8rN0");var p={name:"1dj59mw",styles:"margin-bottom:-4.5em;.prev{margin-right:0.3em;}.next{margin-left:0.3em;}"};function m(e){var a=e.index,t=e.prev,n=e.next;return Object(b.a)(c.a.Fragment,null,a&&Object(b.a)("div",{css:p},t&&Object(b.a)(r.Link,{className:"prev",to:"/"+t},"«"),Object(b.a)(r.Link,{className:"index",to:"/"+a},a),n&&Object(b.a)(r.Link,{className:"next",to:"/"+n},"»")))}var i={name:"ix6qzk",styles:'display:grid;grid-template-areas:"prev index next";grid-gap:0.5em;.prev{grid-area:prev;text-align:left;}.next{grid-area:next;text-align:right;}.index{grid-area:index;text-align:center;}'};function l(e){var a=e.prev,t=e.next,n=e.index;return n===a?Object(b.a)("div",{css:i},n&&Object(b.a)(r.Link,{className:"prev",to:"/"+n},"← Index"),t&&Object(b.a)(r.Link,{className:"next",to:"/"+t},t.replace(n,"")," →")):Object(b.a)("div",{css:i},n&&Object(b.a)(r.Link,{className:"index",to:"/"+n},n),a&&Object(b.a)(r.Link,{className:"prev",to:"/"+a},"← ",a.replace(n,"")),t&&Object(b.a)(r.Link,{className:"next",to:"/"+t},t.replace(n,"")," →"))}var j=t("m8Tn");function O(e){var a=e.children,t=e.pageContext.frontmatter,n=t.title,c=t.index,p=t.prev,i=t.next;return Object(b.a)(j.a,{title:n},Object(b.a)(s.a,{components:r},Object(b.a)(o.a,null,Object(b.a)(r.Container,null,Object(b.a)(m,{index:c,prev:p,next:i}),n&&Object(b.a)("h1",null,n),a,Object(b.a)(l,{index:c,prev:p,next:i})))))}},wxSF:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return r})),t.d(a,"default",(function(){return l}));var n,c=t("wx14"),s=t("zLVn"),o=(t("q1tI"),t("7ljp")),b=t("WHYo"),r=(t("qKvR"),{}),p=(n="Link",function(e){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),Object(o.b)("div",e)}),m={_frontmatter:r},i=b.a;function l(e){var a=e.components,t=Object(s.a)(e,["components"]);return Object(o.b)(i,Object(c.a)({},m,t,{components:a,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Defensive programming is a technique that consists of anticipating possible\npoints of failure of usage of your code and write the code in the way that\neither it is impossible to misuse it or to fail as fast as possible.")),Object(o.b)("h3",null,"Example"),Object(o.b)("p",null,"This is a example of factorial with defensive programming."),Object(o.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(o.b)("pre",Object(c.a)({parentName:"div"},{className:"language-javascript"}),Object(o.b)("code",Object(c.a)({parentName:"pre"},{className:"language-javascript"}),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"function")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token function"}),"factorial"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token parameter"}),"n"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token comment"}),"// defensives ifs"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"typeof")," n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"!==")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'number'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),"\n        ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"throw")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"new")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token class-name"}),"Error"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'Illegal argument: expected a number'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"<")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token number"}),"0"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")")," \n        ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"throw")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"new")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token class-name"}),"Error"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'Illegal argument: expected a positive number'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"Math",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token function"}),"floor"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"n",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"!==")," n",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),"\n        ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"throw")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"new")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token class-name"}),"Error"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'Illegal argument: expected a valid integer, no decimal'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"arguments",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"."),"length ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),">")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token number"}),"1"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),"\n        ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"throw")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"new")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token class-name"}),"Error"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'Illegal arguments: factorial has only one argument'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),">")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token constant"}),"MAX_SAFE_FACTORIAL_INPUT"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),"\n        ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"throw")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"new")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token class-name"}),"Error"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token string"}),"'Illegal argument: the specified number is too big and the result overflows'"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token comment"}),"// factorial implementation"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"if")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"===")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token number"}),"0"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"return")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token number"}),"1"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token keyword"}),"return")," n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"*")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token function"}),"factorial"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"("),"n ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token operator"}),"-")," ",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token number"}),"1"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.b)("span",Object(c.a)({parentName:"code"},{className:"token punctuation"}),"}")))),Object(o.b)("h3",null,"Defensive programming failure"),Object(o.b)("p",null,"The problem of defensive programming is that you end quickly in the path\nof the overengineering. It is straightforward to anticipate tens, hundreds,\nor infinite, illegal cases, but almost impossible to cover all of them."),Object(o.b)("p",null,"The continuous act of anticipation and adding cases it has two significant\nproblems: it complicates the initial creation of code,\nand it makes a rigid system hard to change.\nThe first is easy to understand; you have to add tons of tests and checks.\nThe second is more subtle, and it is the main reason\nwhy I stopped using defensive programming.\nDefensive programming is checking for almost everything that you do;\nas a consecuence, it restricts the ways of usage.\nOne improvement may undo and reconstruct lots of defenses."),Object(o.b)("h3",null,"Alternative"),Object(o.b)("p",null,"It is ",Object(o.b)(p,{to:"/Testing",mdxType:"Link"},"[Testing]"),". It is more reliable and has better results."),Object(o.b)("p",null,"Note that in testing, ",Object(o.b)("code",Object(c.a)({parentName:"p"},{className:"language-text"}),"null")," is a valid ",Object(o.b)("a",Object(c.a)({parentName:"p"},{href:"https://github.com/drpicox/drpicox.github.io/new/master?filename=_entries/TestingDoubles.md"}),"[TestingDoubles]"),".\nThrowing a null error when an argument is not used,\nmakes the construction of the test more difficult and their understanding."),Object(o.b)("h3",null,"¿When to use defensive programming?"),Object(o.b)("p",null,"You may consider defensive programming when interacting with external actors.\nIf you are writing a library or an API, be sure to check all possible usages\nand fail fast when usages are illegal. If you are interacting with the user,\ndo not trust them, and add the required code to avoid unexpected inputs."))}l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---wiki-defensive-programming-mdx-e7597429143e5c2adaa9.js.map