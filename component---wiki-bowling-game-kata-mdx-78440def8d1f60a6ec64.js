(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{WHYo:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("q1tI"),o=a.n(n),i=a("7ljp"),r=a("eC7B"),s=a("qKvR"),l=a("8rN0");var c={name:"n8iuqn",styles:"margin-bottom:-4.5em;"};function h(e){var t=e.index;return Object(s.a)(o.a.Fragment,null,t&&Object(s.a)("div",{css:c},Object(s.a)(l.Link,{className:"index",to:"/"+t},t)))}var b={name:"ix6qzk",styles:'display:grid;grid-template-areas:"prev index next";grid-gap:0.5em;.prev{grid-area:prev;text-align:left;}.next{grid-area:next;text-align:right;}.index{grid-area:index;text-align:center;}'};function d(e){var t=e.prev,a=e.next,n=e.index;return n===t?Object(s.a)("div",{css:b},n&&Object(s.a)(l.Link,{className:"prev",to:"/"+n},"← Index"),a&&Object(s.a)(l.Link,{className:"next",to:"/"+a},a.replace(n,"")," →")):Object(s.a)("div",{css:b},n&&Object(s.a)(l.Link,{className:"index",to:"/"+n},n),t&&Object(s.a)(l.Link,{className:"prev",to:"/"+t},"← ",t.replace(n,"")),a&&Object(s.a)(l.Link,{className:"next",to:"/"+a},a.replace(n,"")," →"))}var p=a("m8Tn");function u(e){var t=e.children,a=e.pageContext.frontmatter,n=a.title,o=a.index,c=a.prev,b=a.next;return Object(s.a)(p.a,{title:n},Object(s.a)(i.a,{components:l},Object(s.a)(r.a,null,Object(s.a)(l.Container,null,Object(s.a)(h,{index:o}),n&&Object(s.a)("h1",null,n),t,Object(s.a)(d,{index:o,prev:c,next:b})))))}},"iTL+":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return s})),a.d(t,"default",(function(){return h}));var n=a("wx14"),o=a("zLVn"),i=(a("q1tI"),a("7ljp")),r=a("WHYo"),s=(a("qKvR"),{}),l={_frontmatter:s},c=r.a;function h(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)(c,Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Robert C. Martin published the Bowling Game Kata in 2005 at\n",Object(i.b)("a",Object(n.a)({parentName:"p"},{href:"http://www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata",target:"_blank",rel:"nofollow noopener noreferrer"}),"http://www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata")),Object(i.b)("p",null,"He describes the kata intention as:"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"A kata is meant to be memorized. Students of a kata study it as a form, not as\na conclusion. It is not the conclusion of the kata that matters, it's the\nsteps that lead to the conclusion. If you want to lean to think the way I\nthink, to design the way I design, then you must learn to react to minutia the\nway I react. Following this form will help you to do that. As you learn the\nform, and repeat it, and repeat it, you will condition your mind and body to\nrespond the way I respond to the minute factors that lead to design\ndecisions.",Object(i.b)("br",{parentName:"p"}),"\n","— Robert C. Martin")),Object(i.b)("p",null,"It contrasts with other katas that you might know. It is not an exercise of the\nresolution of a problem; it is the study of each step to create a solution."),Object(i.b)("p",null,"The intention is to show and learn TDD. This kata is a profound study of the\nTDD. It presents a list of steps that you must follow in a TDD development."),Object(i.b)("p",null,"The way of the kata is simple: repeat step by step, innovate nothing, replicate\nwhat you see. Be careful, do not add extra steps; do not skip any step."),Object(i.b)("p",null,"Although you have the code, do not copy blindly. Try to understand each step;\ntry to see the beauty. Enjoy how the code takes form and how the test transforms\nitself. Learn how tests leverage in the code and how the code leverages on\ntests. Code changing the internal representation step by step, first adding the\nnew representation, then adding the setters, changing the getters, and finally\nremoving the old code. And all in green."),Object(i.b)("p",null,"And repeat, and repeat. Once you have finished the kata, wait a week, and repeat\nit. Then, wait a few weeks and repeat. Then wait a month and repeat. And then,\nrepeat the kata twice a while."),Object(i.b)("h3",{id:"updated"},"Updated Kata"),Object(i.b)("p",null,"Here you have the slides and the instructions to do the kata in"),Object(i.b)("span",{id:"javascript"},"Javascript")," and ",Object(i.b)("span",{id:"java"},"Java"),".",Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Download the slides for ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/BowlingGameKata-JS.pdf"}),"Javascript")," or\n",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/BowlingGameKata-Java.pdf"}),"Java")),Object(i.b)("li",{parentName:"ol"},"Clone the repository at ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://classroom.github.com/a/jLHCISqT",target:"_blank",rel:"nofollow noopener noreferrer"}),"Javascript"),"\nor ",Object(i.b)("a",Object(n.a)({parentName:"li"},{href:"https://classroom.github.com/a/BC1YAdho",target:"_blank",rel:"nofollow noopener noreferrer"}),"Java"),"*",Object(i.b)("br",null),Object(i.b)("small",null,"* If you are student at Tecnocampus, please clone the one at the AulaVirtual.")),Object(i.b)("li",{parentName:"ol"},"Follow the steps of the kata")),Object(i.b)("p",null,"There are three sections in the slides:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"The Kata analysis: it replicates the study of a developer of the problem."),Object(i.b)("li",{parentName:"ul"},"TDD Overview: it explains what is TDD"),Object(i.b)("li",{parentName:"ul"},"The Kata")),Object(i.b)("p",null,"The last section is the exercise itself. Each slide is meaningful by itself and\ndeserves a moment of attention. If you look carefully, some slides have a\nmessage on the top right in orange: «commit X.» It starts at zero and increments\nin one each time that appears. Some slides also have a green or a red bar; it\nrepresents the current state of tests. Red if tests are failing, green if tests\npass after the current slide."),Object(i.b)("p",null,"The code is in a git repository. It starts in the «commit 0,» and it expects\nfrom you to replicate each slide in it. Be careful, and go slide by slide. Each\ntime that you finish copying the changes of a slide verify two things: the\ncommit number and the test bar status. If the test bar status matches the\ncondition of your current tests, and there is a commit number, then commit the\ngit repository with the commit number as a message. Once you have finished it,\nremember to push changes."))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---wiki-bowling-game-kata-mdx-78440def8d1f60a6ec64.js.map