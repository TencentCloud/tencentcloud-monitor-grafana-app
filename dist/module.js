define("TencentCloudMonitorGrafanaApp",["@grafana/runtime"],(function(t){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=178)}({178:function(t,e,n){"use strict";n.r(e);var r=n(63);n.d(e,"ConfigCtrl",(function(){return r.MonitorAppConfigCtrl}))},21:function(e,n){e.exports=t},63:function(t,e,n){"use strict";n.r(e),n.d(e,"MonitorAppConfigCtrl",(function(){return s}));var r=n(21),o=function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function u(t){try{l(r.next(t))}catch(t){i(t)}}function a(t){try{l(r.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,a)}l((r=r.apply(t,e||[])).next())}))},i=function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},u=Object(r.getBackendSrv)(),a={uid:"tencent-cloud-monitor",title:"腾讯云监控",folderId:null};function l(){var t;return o(this,void 0,void 0,(function(){var e,n,r;return i(this,(function(o){switch(o.label){case 0:return a.folderId?[2,a.folderId]:[4,u.get("/api/folders")];case 1:return e=o.sent(),(n=null===(t=e.find((function(t){return t.uid===a.uid})))||void 0===t?void 0:t.id)?[3,3]:[4,u.post("/api/folders",a)];case 2:r=o.sent(),n=(null==r?void 0:r.id)||0,o.label=3;case 3:return a.folderId=n,[2,n]}}))}))}!function(){var t=this,e=u.post.bind(Object(r.getBackendSrv)()),n=window.location.pathname.split("/").filter((function(t){return t}))[1];u.post=function(r,u){return o(t,void 0,void 0,(function(){var t;return i(this,(function(o){switch(o.label){case 0:return"/api/dashboards/import"!==r||u.pluginId!==n?[3,2]:(t=u,[4,l()]);case 1:t.folderId=o.sent(),o.label=2;case 2:return[2,e(r,u)]}}))}))}}();var s=function(){function t(t,e,n){var o;this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this)),this.$q=n,this.appModel||(this.appModel={});var i=this.appModel;(i.jsonData||(i.jsonData={}),this.configured=!1,null===(o=this.appModel)||void 0===o?void 0:o.enabled)&&(Object.values(r.config.datasources).filter((function(t){return"tencentcloud-monitor-datasource"===t.type})).length>0&&(this.configured=!0))}return t.$inject=["$scope","$injector","$q"],t.prototype.moveToFolder=function(t,e){return o(this,void 0,void 0,(function(){var n;return i(this,(function(r){switch(r.label){case 0:return[4,u.get("/api/dashboards/uid/"+t)];case 1:return n=r.sent().dashboard,[4,u.post("/api/dashboards/db/",{dashboard:n,folderId:e,message:"",overwrite:!0})];case 2:return r.sent(),[2]}}))}))},t.prototype.reviseDashboard=function(){var t;return o(this,void 0,void 0,(function(){var e,n,r,o=this;return i(this,(function(i){switch(i.label){case 0:return[4,l()];case 1:return e=i.sent(),[4,u.get("/api/plugins/"+(null===(t=this.appModel)||void 0===t?void 0:t.id)+"/dashboards")];case 2:return n=i.sent(),r=n.map((function(t){var n=t.importedUrl.split("/")[2];return o.moveToFolder(n,e)})),[2,Promise.all(r)]}}))}))},t.prototype.postUpdate=function(){var t;return o(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return(null===(t=this.appModel)||void 0===t?void 0:t.enabled)?[4,this.reviseDashboard()]:[2];case 1:return e.sent(),[2,this.$q.resolve(!0)]}}))}))},t.templateUrl="components/config.html",t}()}})}));
//# sourceMappingURL=module.js.map