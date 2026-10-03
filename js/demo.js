(function(){var p=document.querySelector('.wm-switch');if(!p)return;var y=window.scrollY;
window.addEventListener('scroll',function(){var n=window.scrollY;if(Math.abs(n-y)<6)return;p.classList.toggle('is-mini',n>y&&n>120);y=n;},{passive:true});})();
