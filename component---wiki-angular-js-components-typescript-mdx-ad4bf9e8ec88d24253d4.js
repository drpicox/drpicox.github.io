(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{226:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return o})),t.d(a,"default",(function(){return b}));t(22),t(7),t(6),t(3),t(14),t(1),t(0);var n=t(51),c=t(225);function s(){return(s=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o={},p={_frontmatter:o},m=c.a;function b(e){var a=e.components,t=function(e,a){if(null==e)return{};var t,n,c={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||(c[t]=e[t]);return c}(e,["components"]);return Object(n.b)(m,s({},p,t,{components:a,mdxType:"MDXLayout"}),Object(n.b)("p",null,"Shows how to write Angular1 components\nusing the new .component syntax of Angular 1.5,\nand typescript using classes and DDO."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"javascript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-javascript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-javascript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," HelloWorldComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  template",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token template-string"}),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`"),Object(n.b)("span",s({parentName:"span"},{className:"token string"}),"Hello {{ $ctrl.name }}"),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`")),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"HelloWorldController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"constructor"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'World'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("h2",null,"Overview"),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// counter.component.ts"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," CounterComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  bindings",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    initialCount",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'<'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n  template",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token template-string"}),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`"),Object(n.b)("span",s({parentName:"span"},{className:"token string"}),'\n    <p>\n      <button ng-click="$ctrl.increment()">+</button>\n      <button ng-click="$ctrl.decrement()">-</button>\n      Count: {{ "{{$ctrl.count"}}}}\n    </p>\n  '),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`")),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    initialCount",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"number"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"  \n    salute",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"string"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"/* @ngInject */"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"constructor"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"$onInit"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"initialCount",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"increment"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"++"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"decrement"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"--"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// app.module.ts"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"import")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," CounterComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"from")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'./counter.component'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," AppModule ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," angular\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"module"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'AppModule'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"["),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"]"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"component"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'myCounter'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," CounterComponent",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";")))),Object(n.b)("h2",null,"Step by step"),Object(n.b)("h3",null,"Component declaration and registration"),Object(n.b)("p",null,"Create the component as a constant ",Object(n.b)("em",{parentName:"p"},"DDO")," object and register it."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// counter.component.ts"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," CounterComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"Import the component in the module and register it."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// app.module.ts"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"import")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," CounterComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"from")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'./counter.component'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," AppModule ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," angular\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"module"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'AppModule'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"["),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"]"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"component"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'myCounter'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," CounterComponent",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";")))),Object(n.b)("h3",null,"Component definition"),Object(n.b)("p",null,"Define component\n",Object(n.b)("a",s({parentName:"p"},{href:"https://docs.angularjs.org/guide/component#comparison-between-directive-definition-and-component-definition",target:"_blank",rel:"nofollow noopener noreferrer"}),"configuration"),"\nas properties of the ",Object(n.b)("em",{parentName:"p"},"DDO")," object."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterComponent")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  bindings",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"/* ... */")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  template",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token template-string"}),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`"),Object(n.b)("span",s({parentName:"span"},{className:"token string"}),"..."),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`")),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"If you need a controller, define it inside the ",Object(n.b)("em",{parentName:"p"},"DDO"),":"),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterComponent")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("h3",null,"Component controller properties"),Object(n.b)("p",null,"Add as instance properties bindings and other controller state properties. "),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),"  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    initialCount",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"number"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"  \n    salute",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"string"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("h3",null,"Component controller constructor"),Object(n.b)("p",null,"The constructor for the component.\nUsually it defines injections, add ",Object(n.b)("code",s({parentName:"p"},{className:"language-text"}),"/* @ngInject */")," comment\nso ",Object(n.b)("em",{parentName:"p"},"ngannotate")," can do its work. "),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),"  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"/* @ngInject */"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"constructor"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("h3",null,"Component controller methods"),Object(n.b)("p",null,"Define all your component logic as methods."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),"  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"increment"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"++"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"decrement"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"--"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("h3",null,"Component hooks"),Object(n.b)("p",null,"Declare you component hooks as methods of the class."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),"  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"CounterController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ..."),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"$onInit"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"count ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"initialCount",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"More information about lifecycle hooks ",Object(n.b)("a",s({parentName:"p"},{href:"https://docs.angularjs.org/api/ng/service/$compile#life-cycle-hooks",target:"_blank",rel:"nofollow noopener noreferrer"}),"here"),"."),Object(n.b)("h2",null,"How to make injections"),Object(n.b)("p",null,"You can leverage in Typescript to have injections with type checking\nand auto-completion support."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"// ./hello-world.component"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"import")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," SaluteService ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"from")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'./salute.service'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," HelloWorldComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n  bindings",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'<'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  template",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token template-string"}),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`"),Object(n.b)("span",s({parentName:"span"},{className:"token string"}),'\n    <h1>{{ "{{$ctrl.salute"}}}}</h1>\n  '),Object(n.b)("span",s({parentName:"span"},{className:"token template-punctuation string"}),"`")),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),","),"\n  controller",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"class")," ",Object(n.b)("span",s({parentName:"code"},{className:"token class-name"}),"HelloWorldController")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"string"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    salute",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),":")," ",Object(n.b)("span",s({parentName:"code"},{className:"token builtin"}),"string"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token comment"}),"/* @ngInject */"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"constructor"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token parameter"}),Object(n.b)("span",s({parentName:"span"},{className:"token keyword"}),"private")," saluteService",Object(n.b)("span",s({parentName:"span"},{className:"token punctuation"}),":")," SaluteService"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    \n    ",Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"$onChanges"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token parameter"}),"changes"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"if")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),"changes",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"&&")," changes",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"currentValue",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{"),"\n        ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"salute ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"saluteService",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"salute"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"this"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n      ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n    ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")))),Object(n.b)("p",null,"Import the service class at it should be done in Angular2,\nand inject it in the constructor.\nIf you need the injection elsewhere than constructor,\nsafe it in a field of the class."),Object(n.b)("p",null,"Make sure that the argument name the injected\nservice matches exactly with the string defined in the module."),Object(n.b)("div",{className:"gatsby-highlight","data-language":"typescript"},Object(n.b)("pre",s({parentName:"div"},{className:"language-typescript"}),Object(n.b)("code",s({parentName:"pre"},{className:"language-typescript"}),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"import")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," SaluteService ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"from")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'./salute.service'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"import")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"{")," HelloWorldComponent ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"from")," ",Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'./hello-world.component'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"export")," ",Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"const")," AppModule ",Object(n.b)("span",s({parentName:"code"},{className:"token operator"}),"=")," angular\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token keyword"}),"module"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'AppModule'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"["),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"]"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"service"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'saluteService'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," SaluteService",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),Object(n.b)("span",s({parentName:"code"},{className:"token function"}),"component"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"("),Object(n.b)("span",s({parentName:"code"},{className:"token string"}),"'myHelloWorld'"),Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),",")," HelloWorldComponent",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),")"),"\n  ",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),"."),"name",Object(n.b)("span",s({parentName:"code"},{className:"token punctuation"}),";")))),Object(n.b)("h2",null,"More information"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"See here for a live demo: ",Object(n.b)("a",s({parentName:"li"},{href:"http://plnkr.co/edit/1LXJjc?p=preview",target:"_blank",rel:"nofollow noopener noreferrer"}),"http://plnkr.co/edit/1LXJjc?p=preview")),Object(n.b)("li",{parentName:"ul"},"See ",Object(n.b)("a",s({parentName:"li"},{href:"https://github.com/drpicox/david-rodenas.com/tree/v5.5.0",target:"_blank",rel:"nofollow noopener noreferrer"}),"https://github.com/drpicox/david-rodenas.com/tree/v5.5.0")," for a real example")))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---wiki-angular-js-components-typescript-mdx-ad4bf9e8ec88d24253d4.js.map