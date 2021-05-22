(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{"5acm":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return h}));var a,o=n("wx14"),r=n("zLVn"),c=(n("q1tI"),n("7ljp")),l=n("WHYo"),i=(n("qKvR"),{}),s=(a="Link",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),Object(c.b)("div",e)}),u={_frontmatter:i},b=l.a;function h(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)(b,Object(o.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"This article covers how to create branchs in the ",Object(c.b)(s,{to:"/TcLs2",mdxType:"Link"},"[TcLs2]")," project."),Object(c.b)("p",null,"When many people are collaborating on the same project,\nwe need a way to cooperate and avoid conflicts.\nIn repositories like Git, we need a strategy\nto work with everyone together."),Object(c.b)("p",null,"In this assignment, we use a development based on the root branch (called master),\nbut all changes are committed to other feature branches."),Object(c.b)("p",null,"This is the overview of the branches:"),Object(c.b)("div",{className:"gatsby-highlight","data-language":"text"},Object(c.b)("pre",Object(o.a)({parentName:"div"},{className:"language-text"}),Object(c.b)("code",Object(o.a)({parentName:"pre"},{className:"language-text"}),"  master\no------------------------[]----···\n \\                       / PR\n  \\                     /\n   \\ feature/10_title  /\n    ---o---o----o------"))),Object(c.b)("h2",null,"New branch"),Object(c.b)("p",null,"You have to create a branch when you start to develop one issue.\nCreate it always from the master. The branch name must follow this naming:\n",Object(c.b)("code",Object(o.a)({parentName:"p"},{className:"language-text"}),"feature/${issue_number}_${issue_title}"),"."),Object(c.b)("p",null,"Work and frequently commit to that branch.\nBecause each one of you is working on a single issue,\nthere should be no new commits from other authors in that branch. "),Object(c.b)("p",null,"Push the branch regularly to the GitHub repository.\nIt would make a good backup of your work."),Object(c.b)("h2",null,"PR: Pull Request"),Object(c.b)("p",null,"Once you have finished implementing your issue,\nmake sure that you have committed everything,\npush your branch to GitHub. "),Object(c.b)("p",null,"Enter into your project in GitHub,\npush the button to create a new Pull Request.\nThe Pull Request is from your branch towards the master branch. "),Object(c.b)("p",null,"Create the Pull Request and write the description.\nThe description text must contain the following text: ",Object(c.b)("code",Object(o.a)({parentName:"p"},{className:"language-text"}),"Implements #${issue_numer}"),'.\nExample: "Implements #10". You also can add some details.'),Object(c.b)("p",null,"Review your commit, look to your changes.\nIf you find anything that you want to improve or fix,\ndo it, commit it, and push again.\nThe Pull Request will reflect all changes.\nWhen it looks good, mode your Issue card in the Board to Review."),Object(c.b)("p",null,"Before the daily,\nreview all of your Pull Requests and resolve all the comments that you might have."),Object(c.b)("h2",null,"Conflicts!"),Object(c.b)("p",null,"Conflicts appear when someone else merges a code that changes the same parts that you have changed."),Object(c.b)("p",null,"If your Pull Request conflicts with the master branch,\nyou must solve it.\nGitHub will report that and will prevent the Pull Request to finish."),Object(c.b)("p",null,"Go to your code, open the repository,\nfetch all new commits. Be sure that you bring the changes to the master branch."),Object(c.b)("p",null,"Merge the branch master —with the changes— to your branch,\nsolve the conflicts, and push it again to GitHub.\nIf you did it ok, the conflict message of GitHub would disappear from the Pull Request.  "),Object(c.b)("p",null,"Notify it to your team members."))}h.isMDXComponent=!0},WHYo:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n("q1tI"),o=n.n(a),r=n("7ljp"),c=n("eC7B"),l=n("qKvR"),i=n("8rN0");var s={name:"n8iuqn",styles:"margin-bottom:-4.5em;"};function u(e){var t=e.index;return Object(l.a)(o.a.Fragment,null,t&&Object(l.a)("div",{css:s},Object(l.a)(i.Link,{className:"index",to:"/"+t},t)))}var b={name:"ix6qzk",styles:'display:grid;grid-template-areas:"prev index next";grid-gap:0.5em;.prev{grid-area:prev;text-align:left;}.next{grid-area:next;text-align:right;}.index{grid-area:index;text-align:center;}'};function h(e){var t=e.prev,n=e.next,a=e.index;return a===t?Object(l.a)("div",{css:b},a&&Object(l.a)(i.Link,{className:"prev",to:"/"+a},"← Index"),n&&Object(l.a)(i.Link,{className:"next",to:"/"+n},n.replace(a,"")," →")):Object(l.a)("div",{css:b},a&&Object(l.a)(i.Link,{className:"index",to:"/"+a},a),t&&Object(l.a)(i.Link,{className:"prev",to:"/"+t},"← ",t.replace(a,"")),n&&Object(l.a)(i.Link,{className:"next",to:"/"+n},n.replace(a,"")," →"))}var m=n("m8Tn");function p(e){var t=e.children,n=e.pageContext.frontmatter,a=n.title,o=n.index,s=n.prev,b=n.next;return Object(l.a)(m.a,{title:a},Object(l.a)(r.a,{components:i},Object(l.a)(c.a,null,Object(l.a)(i.Container,null,Object(l.a)(u,{index:o}),a&&Object(l.a)("h1",null,a),t,Object(l.a)(h,{index:o,prev:s,next:b})))))}}}]);
//# sourceMappingURL=component---wiki-tc-ls-2-branching-mdx-53d1fdece16e1eda4245.js.map