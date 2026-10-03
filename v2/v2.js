(function(){
  var NS='http://www.w3.org/2000/svg';
  function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}

  /* ---------- Hero : lumière de bougie qui suit le doigt ---------- */
  var hero=document.querySelector('.nv-hero'),veil=document.querySelector('.nv-hero-veil');
  if(hero&&veil){
    var tx=.5,ty=.62,cx=.5,cy=.62,last=0,r=0,rT=Math.min(window.innerWidth,900)*.42;
    function move(e){var b=hero.getBoundingClientRect(),p=e.touches?e.touches[0]:e;tx=(p.clientX-b.left)/b.width;ty=(p.clientY-b.top)/b.height;last=Date.now();}
    hero.addEventListener('pointermove',move);hero.addEventListener('touchmove',move,{passive:true});
    hero.addEventListener('pointerdown',move);
    var t0=performance.now();
    (function loop(now){
      if(Date.now()-last>2500){var s=(now-t0)/1000;tx=.5+Math.sin(s*.45)*.28;ty=.6+Math.sin(s*.7)*.12;}
      cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;r+=(rT-r)*.03;
      veil.style.setProperty('--x',(cx*100).toFixed(2)+'%');veil.style.setProperty('--y',(cy*100).toFixed(2)+'%');
      veil.style.setProperty('--r',(r*(1+Math.sin(now/180)*.015)).toFixed(1)+'px');
      requestAnimationFrame(loop);
    })(t0);
  }

  var top=document.querySelector('.nv-top');
  if(top){var ts=function(){top.classList.toggle('is-solid',window.scrollY>window.innerHeight*.7)};ts();window.addEventListener('scroll',ts,{passive:true});}

  /* ---------- Formulaire factice ---------- */
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var ok=f.parentNode.querySelector('.nv-ok');if(ok)ok.classList.add('is-on');f.reset();});
  });
})();
