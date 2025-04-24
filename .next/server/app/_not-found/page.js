(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2087:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>l.a,__next_app__:()=>g,originalPathname:()=>c,pages:()=>d,routeModule:()=>m,tree:()=>u}),n(7352),n(5866),n(2029);var r=n(3191),a=n(8716),o=n(7922),l=n.n(o),s=n(5231),i={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>s[e]);n.d(t,i);let u=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,2029)),"/Users/macbookpro/Downloads/One/Mira booking copy 9/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],d=[],c="/_not-found/page",g={require:n,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},1425:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,2994,23)),Promise.resolve().then(n.t.bind(n,6114,23)),Promise.resolve().then(n.t.bind(n,9727,23)),Promise.resolve().then(n.t.bind(n,9671,23)),Promise.resolve().then(n.t.bind(n,1868,23)),Promise.resolve().then(n.t.bind(n,4759,23))},8114:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,4064,23))},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{isNotFoundError:function(){return a},notFound:function(){return r}});let n="NEXT_NOT_FOUND";function r(){let e=Error(n);throw e.digest=n,e}function a(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===n}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7352:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return a},default:function(){return o}});let r=n(6399),a="next/dist/client/components/parallel-route-default.js";function o(){(0,r.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2029:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i,metadata:()=>s});var r=n(9510),a=n(5317),o=n.n(a);n(5023);var l=n(9720);let s={title:"Mira Booking",description:"Visa processing service for global travelers"};function i({children:e}){return(0,r.jsxs)("html",{lang:"en",children:[(0,r.jsxs)("head",{children:[r.jsx("link",{href:"https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap",rel:"stylesheet"}),r.jsx(l.default,{id:"language-handler",strategy:"beforeInteractive",children:`
            (function() {
              try {
                // Check URL parameters first
                const urlParams = new URLSearchParams(window.location.search);
                const langParam = urlParams.get('lang');
                
                if (langParam && ['en', 'fr', 'ar'].includes(langParam)) {
                  // Set language from URL param
                  localStorage.setItem('language', langParam);
                  
                  // Handle RTL for Arabic - ONLY for Arabic
                  if (langParam === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.classList.add('rtl');
                  } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.classList.remove('rtl');
                  }
                } else {
                  // Check localStorage
                  const savedLanguage = localStorage.getItem('language');
                  // Only set RTL for Arabic
                  if (savedLanguage === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.classList.add('rtl');
                  } else {
                    // Ensure LTR for non-Arabic languages
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.classList.remove('rtl');
                  }
                }
              } catch (e) {
                console.error('Error in language initialization:', e);
              }
            })();
          `}),r.jsx(l.default,{id:"language-switcher",strategy:"beforeInteractive",dangerouslySetInnerHTML:{__html:`
          // Language switcher that will definitely work
          window.switchLanguage = function(lang) {
            console.log('Switching language to:', lang);
            localStorage.setItem('language', lang);
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
          }

          // Check for lang parameter on page load
          document.addEventListener('DOMContentLoaded', function() {
            const url = new URL(window.location.href);
            const langParam = url.searchParams.get('lang');
            if (langParam && ['en', 'fr', 'ar'].includes(langParam)) {
              localStorage.setItem('language', langParam);
            }
          });
        `}})]}),r.jsx("body",{className:o().className,children:e})]})}},5023:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[276,904],()=>n(2087));module.exports=r})();