!function(a){"use strict";a.module("drHome",["ngAnimate","ngMaterial","ngRoute","ngSanitize","ngtagsRuntime","drpxOtherwiseHome","drpxToggle"])}(angular),function(a){"use strict";function b(){var a={bindToController:!0,controller:c,controllerAs:"vm",restrict:"E",scope:{posts:"="},template:'\n<div ng-repeat="post in vm.posts">\n	<h2><a ng-href="#/posts/{{post.basename}}" ng-bind="post.title"></a> <small>{{post.date | date}}</small></h2>\n	<div ng-bind="post.preview" class="preview"></div>\n	<tag-list tagnames="post.tags"></tag-list>\n</div>\n	'};return a}function c(){}function d(){var a={bindToController:!0,controller:e,controllerAs:"vm",restrict:"E",scope:{post:"="},template:'\n<div class="post">\n	<br hide-sm="">\n	<br>\n	<h1 ng-bind="vm.post.title"></h1>\n	<tag-list tagnames="vm.post.tags" layout-align="center"></tag-list>\n	<br hide-sm="">\n	<br>\n	<div ng-bind-html="vm.post.body"></div>\n</div>\n	'};return a}function e(){}function f(){function b(b,c){a.isUndefined(c.attr("layout"))&&c.attr("layout","column")}var c={bindToController:!0,controller:g,controllerAs:"vm",link:b,restrict:"E",scope:{},template:'\n<md-toolbar layout="row" layout-align="start center" md-swipe-left="vm.close()">\n	<h1>&#xA0;Menu</h1>\n</md-toolbar>\n<br>\n<nav>\n	<md-list>\n		<md-item ng-repeat="link in vm.links">\n			<md-item-content>\n				<md-button flex="" ng-href="{{link.url}}" ng-bind="link.label" ng-click="vm.close()" aria-label="{{link.label}}"></md-button>\n			</md-item-content>\n		</md-item>\n	</md-list>\n</nav>\n	'};return c}function g(a){this.links=[{url:"#/",label:"Home"},{url:"#/posts",label:"Posts"},{url:"#/tags",label:"Tags"}],this.close=function(){a("sidenav").close()}}function h(){var a={restrict:"E",scope:{},template:'\n    	<md-content class="md-padding" ng-transclude=""></md-content>\n    ',transclude:!0};return a}function i(){function b(b,c){a.isUndefined(c.attr("layout"))&&c.attr("layout","row"),a.isUndefined(c.attr("layout-align"))&&c.attr("layout-align","center center")}var c={link:b,restrict:"E",scope:{},template:"\n<br>\n<small>David Rodenas &#xA9; 2015</small>\n	"};return c}function j(){var a={bindToController:!0,controller:k,controllerAs:"vm",restrict:"E",scope:{},template:'\n<md-toolbar layout="row" layout-align="start center">\n	<button ng-click="vm.toggleSidenav()" hide-gt-lg="" class="menuBtn">\n		<span class="visuallyhidden">Menu</span>\n	</button>\n	<md-button hide-sm="" hide-md="" hide-lg="" aria-label="open menu" drpx-toggle="sidenavLg as sidenavLg" ng-click="sidenavLg.toggle()" class="sidenavLg">\n		&#xA0;<i class="fa fa-bars"></i>&#xA0;\n	</md-button>\n	<a href="#/" class="homeBtn"></a>\n	<h1 ng-bind="vm.title" class="ellipsis"></h1>\n</md-toolbar>\n	'};return a}function k(a,b,c){function d(){a("sidenav").toggle()}function e(){f.title=b.current&&b.current.title||"David Rodenas"}var f=this;f.title="",f.toggleSidenav=d,c.$watch(function(){return b.current&&b.current.title},e),e()}function l(){function b(b,c){a.isUndefined(c.attr("layout"))&&c.attr("layout","row"),a.isUndefined(c.attr("layout-wrap"))&&c.attr("layout-wrap","")}var c={bindToController:!0,controller:m,controllerAs:"vm",link:b,restrict:"E",scope:{tags:"="},template:'\n<a ng-repeat="tag in vm.tags" ng-href="#/tags/{{tag.tagname}}" ng-bind="tag.tagname" ng-style="{fontSize: tag.weight*100 +&apos;%&apos;, fontWeight: vm.fontWeight(tag)}"></a>\n	'};return c}function m(){this.fontWeight=function(a){return a.weight<.5?100:a.weight>2?900:400}}function n(){function b(b,c){a.isUndefined(c.attr("layout"))&&c.attr("layout","row"),a.isUndefined(c.attr("layout-wrap"))&&c.attr("layout-wrap","")}var c={bindToController:!0,controller:o,controllerAs:"vm",link:b,restrict:"E",scope:{tagnames:"="},template:'\n<md-button ng-repeat="tagname in vm.tagnames" ng-href="#/tags/{{tagname}}" ng-bind="tagname" aria-label="tag {{tagname}}"></md-button>\n	'};return c}function o(){}function p(a){a.when("/posts",{controller:q,controllerAs:"vm",resolve:{posts:r},template:'\n<site-content>\n	<post-list posts="vm.posts"></post-list>\n</site-content>\n	'})}function q(a,b){this.posts=b,a.current.title="Posts"}function r(a){return a.list()}function s(a){a.when("/posts/:basename",{controller:t,controllerAs:"vm",resolve:{post:u},template:'\n<site-content>\n	<post-view post="vm.post"></post-view>\n</site-content>\n	'})}function t(a,b){this.post=b,a.current.title=b.title}function u(a,b){var c=b.current.params.basename;return a.get(c)}function v(a){a.when("/",{template:'\n<site-content>\n	<h1 class="home">Hi!</h1>\n	<p>\n		I&apos;m David Rodenas, a computer enthusiastic (also doctor and engineer).\n		I love to innovate and extract all potential to this <em>yount<em> \n		technology.\n	</em></em></p>\n	<p>\n		In this web page you will found (today and next months) full of material\n		about many topics, but specially related to Javascript \n		and web/app development.\n	</p>\n	<p>\n		See:\n	</p>\n	<ul>\n		<li><a href="#/posts">Posts</a></li>\n		<li><a href="#/tags">Tags</a></li>\n	</ul>\n\n	<h3>Interesting links</h3>\n	<ul>\n		<li>My delicious bookmarks: <a href="https://delicious.com/drpicox" target="_blank">drpicox</a>, \n			with lots of practical links tagged (and growing)\n		</li>\n		<li>My github account: <a href="https://github.com/drpicox" target="_blank">drpicox</a>,\n			with the source code of this page, and many other projects\n		</li>\n		<li>My twitter account: <a href="https://twitter.com/drpicox" target="_blank">drpicox</a>,\n			with lastest news about the JS world, and other useful/funny stuff\n		</li>\n	</ul>\n\n	<h3>Programming links</h3>\n	<ul>\n		<li><a href="https://github.com/drpicox/drpicox.github.io" target="_blank">This web page</a>\n		</li>\n		<li>Some of my open source <a href="https://github.com/drpicox/drpx-components" target="_blank">angular components</a>\n		</li>\n		<li>My first experience with polymer, a <a href="https://github.com/drpicox/polymer-carousel" target="_blank">polymer carousel</a>\n		</li>\n		<li>Very simple and small a <a href="https://github.com/drpicox/lunar-landing" target="_blank">lunar landing</a> game\n		</li>\n	</ul>\n\n	<h3>Teaching links</h3>\n	<ul>\n		<li><a href="https://github.com/drpicox/tutorial-promises-v1" target="_blank">Promises v1</a>\n		</li>\n		<li> <a href="https://github.com/drpicox/tutorial-gruntjs-v1" target="_blank">Grunt v1</a>\n		</li>\n		<li><a href="https://github.com/drpicox/tutorial-jspatterns-v1" target="_blank">Js Patterns v1</a>\n		</li>\n		<li><a href="https://github.com/drpicox/tutorial-angulardesigners-v1" target="_blank">Angular for Designers v1</a>\n		</li>\n	</ul>\n\n	<br><br>\n	<small>Note: this page is still in working progress.</small>\n\n</site-content>\n	'})}function w(a){a.when("/tags",{controller:x,controllerAs:"vm",resolve:{tags:y},template:'\n<site-content>\n	<br>\n	<tag-cloud tags="vm.tags" layout-align="center"></tag-cloud>\n	<br>\n</site-content>\n	'})}function x(a,b){this.tags=b,a.current.title="Tag cloud"}function y(a){return a.list()}function z(a){a.when("/tags/:tagname",{controller:A,controllerAs:"vm",resolve:{posts:B},template:'\n<site-content>\n	<post-list posts="vm.posts"></post-list>\n</site-content>\n	'})}function A(a,b){this.posts=b,a.current.title="Posts with "+a.current.params.tagname}function B(a,b){var c=b.current.params.tagname;return a.get(c).then(function(a){return a.posts})}a.module("drHome").directive("postList",b),a.module("drHome").directive("postView",d),a.module("drHome").directive("sidenav",f),g.$inject=["$mdSidenav"],a.module("drHome").directive("siteContent",h),a.module("drHome").directive("siteFooter",i),a.module("drHome").directive("siteHeader",j),k.$inject=["$mdSidenav","$route","$scope"],a.module("drHome").directive("tagCloud",l),a.module("drHome").directive("tagList",n),a.module("drHome").config(p),p.$inject=["$routeProvider"],q.$inject=["$route","posts"],r.$inject=["postsService"],a.module("drHome").config(s),s.$inject=["$routeProvider"],t.$inject=["$route","post"],u.$inject=["postsService","$route"],a.module("drHome").config(v),v.$inject=["$routeProvider"],a.module("drHome").config(w),w.$inject=["$routeProvider"],x.$inject=["$route","tags"],y.$inject=["tagsService"],a.module("drHome").config(z),z.$inject=["$routeProvider"],A.$inject=["$route","posts"],B.$inject=["tagsService","$route"]}(angular),function(a){"use strict";function b(){function b(b){b=e(b),b=marked(b);var c=a.element("<div>");return c.html(b),a.forEach(c[0].querySelectorAll("a[href^=http]"),function(a){a.setAttribute("target","_blank")}),a.forEach(c[0].querySelectorAll("img"),function(a){a.setAttribute("class","img-responsive"),a.parentElement.setAttribute("class","img-container")}),c}function c(a){var b=f.element(a);return a=b.html()}function d(a){var b=f.element(a);return a=b.text()}function e(a){var b=a.split("\n"),c=0;if("---"===b[0]){for(c=1;"---"!==b[c]&&b[c]!==b[-1];)c++;a=b.slice(c+1).join("\n")}return a}var f={element:b,html:c,text:d};return f}a.module("drHome").factory("markdownTool",b),marked.setOptions({highlight:function(a,b){return b?hljs.highlight(b,a).value:hljs.highlightAuto(a).value},sanitize:!1})}(angular),function(a){"use strict";function b(a,b){function c(){f=b.get("posts.json").then(function(a){return a.data}),h=f.then(function(a){return Object.keys(a).map(function(b){return a[b]}).sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:0})}),h.then(function(b){b.forEach(function(b){b.preview=a.text(b.preview)})}),g={}}function d(c){var d;return c=c.basename||c,d=g[c],d||(d=f.then(function(a){return a[c]}).then(function(d){return b.get("posts/"+c+".ymd").then(function(b){return d.body=a.html(b.data),d})}),g[c]=d),d}function e(){return h}var f,g,h,i={get:d,list:e};return c(),i}a.module("drHome").factory("postsService",b),b.$inject=["markdownTool","$http"]}(angular),function(a){"use strict";function b(b){function c(){f=b.list().then(function(a){var b={};return a.forEach(function(a){a.tags.forEach(function(c){var d=b[c];d||(d=b[c]={tagname:c,posts:[],weight:1}),d.posts.push(a)})}),b}),g=f.then(function(b){var c,d=[];return a.forEach(b,function(a){d.push(a)}),d.sort(function(a,b){return a.tagname<b.tagname?-1:a.tagname>b.tagname?1:0}),c=d.reduce(function(a,b){return a+b.posts.length},0),d.forEach(function(a){a.weight=a.posts.length/(c/d.length)}),d})}function d(a){return f.then(function(b){return b[a]})}function e(){return g}var f,g,h={get:d,list:e};return c(),h}a.module("drHome").factory("tagsService",b),b.$inject=["postsService"]}(angular);