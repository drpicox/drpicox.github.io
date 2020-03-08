(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Mtkh:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return o})),t.d(a,"default",(function(){return r}));t("E5k/"),t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi"),t("q1tI");var n=t("7ljp"),c=t("WHYo");t("qKvR");function s(){return(s=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o={},p={_frontmatter:o},b=c.a;function r(e){var a=e.components,t=function(e,a){if(null==e)return{};var t,n,c={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||(c[t]=e[t]);return c}(e,["components"]);return Object(n.b)(b,s({},p,t,{components:a,mdxType:"MDXLayout"}),Object(n.b)("p",null,"It captures shell environment variables\nvalues in the compile time and uses it\nto generate the bundle."),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("strong",{parentName:"li"},"source"),": ",Object(n.b)("a",s({parentName:"li"},{href:"https://github.com/hughsk/envify",target:"_blank",rel:"nofollow noopener noreferrer"}),"https://github.com/hughsk/envify"))),Object(n.b)("div",{className:"gatsby-highlight","data-language":"text"},Object(n.b)("pre",s({parentName:"div"},{className:"language-text"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-text"}),"$ npm i -D envify\ntransforms.push('envify')\nif (process.env.DEBUG) { ... }"))),Object(n.b)("h2",null,"Overview"),Object(n.b)("p",null,"It transforms:"),Object(n.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-javascript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-javascript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"if")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),"process",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"env",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token constant"}),"DEBUG"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    console",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"log"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'This step'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"into:"),Object(n.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-javascript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-javascript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"if")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),'""'),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    console",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"log"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'This step'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"if the DEBUG shell environment value was empty or not defined,\nor: "),Object(n.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-javascript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-javascript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"if")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),'"YES"'),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    console",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"log"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'This step'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"if it was set to ",Object(n.b)("code",s({parentName:"p"},{className:"language-text"}),"YES"),"."),Object(n.b)("p",null,"Note that a minimizer will remove all code of the first case."),Object(n.b)("h2",null,"Other considerations"),Object(n.b)("p",null,"It is very useful to softcode endpoints and\nother production deployment features.\nIt is also very effective in cordova applications."))}r.isMDXComponent=!0}}]);
//# sourceMappingURL=component---wiki-browserify-envify-mdx-6fb081ee91f3173e6a38.js.map