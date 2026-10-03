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

  /* ---------- Configurateur de table ---------- */
  var THEMES={
    blanc:{name:'Blanc & or',cloth:'#F4EFE9',edge:'#E2D6CB',runner:'none',napkin:'#EAD9CF',charger:'#C9A266',chair:'#C9A266',
      flowers:['#FFFFFF','#F6DCD6','#EBCFC6','#FBF5EF','#E9C3BC'],leaf:'#9DAA8E',
      img:'../img/mariage-table.webp',ref:'Un mariage de rêve, janvier 2025'},
    poudre:{name:'Rose poudré',cloth:'#D9DFEF',edge:'#C2CADF',runner:'#F2AEBB',napkin:'#F7C9D2',charger:'#E7ECF3',chair:'#EEF2F6',
      flowers:['#F07C98','#F9C9D2','#FFFFFF','#F4A6B8','#E85D80'],leaf:'#7E9A6F',
      img:'../img/fiancailles-jardin.webp',ref:'Des fiançailles au jardin'},
    med:{name:'Méditerranée',cloth:'#FFFFFF',edge:'#E5E9F2',runner:'#2E4FA3',napkin:'#F2C230',charger:'#7FA7D9',chair:'#F6F6F2',
      flowers:['#F4C430','#2E4FA3','#7FA7D9','#F6D96B','#1E3A7B'],leaf:'#6F8F55',
      img:'../img/anniversaire-maneva.webp',ref:'Les 5 ans de Maneva'},
    regence:{name:'Régence',cloth:'#C9A0A0',edge:'#B48888',runner:'none',napkin:'#F4DDE0',charger:'#C9A44E',chair:'#C9A44E',
      flowers:['#E58FB0','#F5C6D6','#C86A9A','#FFFFFF','#F0A3BF'],leaf:'#8C9C78',
      img:'../img/table-regence.webp',ref:"Un bal d'inspiration Régence, septembre 2025"}
  };
  var svg=document.getElementById('nvTable');
  if(!svg)return;
  var state={theme:'blanc',n:10,lit:false};
  var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}

  function draw(bloom){
    var T=THEMES[state.theme];seed=7;
    svg.innerHTML='';
    var defs=el('defs',{},svg);
    var rg=el('radialGradient',{id:'glow'},defs);el('stop',{offset:'0','stop-color':'#FFD48A','stop-opacity':'1'},rg);el('stop',{offset:'1','stop-color':'#FFD48A','stop-opacity':'0'},rg);
    var sh=el('radialGradient',{id:'shade',cx:'.5',cy:'.5',r:'.5'},defs);el('stop',{offset:'.86','stop-color':'#000','stop-opacity':'0'},sh);el('stop',{offset:'1','stop-color':'#000','stop-opacity':'.18'},sh);
    // chaises
    var n=state.n,i,a;
    for(i=0;i<n;i++){a=i/n*Math.PI*2-Math.PI/2;
      var g=el('g',{transform:'rotate('+(a*180/Math.PI+90)+') translate(0,-162)'},svg);
      el('rect',{x:-21,y:-13,width:42,height:26,rx:9,fill:T.chair,stroke:'rgba(0,0,0,.18)','stroke-width':1},g);
      el('rect',{x:-19,y:-19,width:38,height:7,rx:3.5,fill:T.chair,stroke:'rgba(0,0,0,.2)','stroke-width':1},g);
    }
    // nappe
    el('circle',{cx:0,cy:0,r:136,fill:T.edge},svg);
    el('circle',{cx:0,cy:0,r:130,fill:T.cloth},svg);
    el('circle',{cx:0,cy:0,r:136,fill:'url(#shade)'},svg);
    if(T.runner!=='none'){var cp=el('clipPath',{id:'tc'},defs);el('circle',{cx:0,cy:0,r:130},cp);el('rect',{x:-140,y:-17,width:280,height:34,fill:T.runner,opacity:.88,'clip-path':'url(#tc)',transform:'rotate(-30)'},svg);}
    // couverts
    for(i=0;i<n;i++){a=i/n*Math.PI*2-Math.PI/2;
      var p=el('g',{transform:'rotate('+(a*180/Math.PI+90)+') translate(0,-102)'},svg);
      el('circle',{cx:0,cy:0,r:20,fill:'none',stroke:T.charger,'stroke-width':3},p);
      el('circle',{cx:0,cy:0,r:15,fill:'#FFFFFF',stroke:'rgba(0,0,0,.08)','stroke-width':1},p);
      el('path',{d:'M-7 -4 L7 -4 L4 7 L-4 7 Z',fill:T.napkin,opacity:.95},p);
      el('rect',{x:-27,y:-12,width:2.4,height:24,rx:1.2,fill:'#C9B48A'},p);
      el('rect',{x:24.6,y:-12,width:2.4,height:24,rx:1.2,fill:'#C9B48A'},p);
      el('circle',{cx:16,cy:-21,r:5,fill:'rgba(255,255,255,.55)',stroke:'rgba(120,130,140,.45)','stroke-width':1},p);
    }
    // bougies
    var candles=el('g',{},svg);
    [[-44,-8],[44,8],[0,46],[0,-50]].forEach(function(c){
      el('circle',{class:'nv-glow',cx:c[0],cy:c[1],r:34,fill:'url(#glow)',opacity:0},candles);
      el('circle',{cx:c[0],cy:c[1],r:6.5,fill:'#FBF6EE',stroke:'rgba(0,0,0,.15)','stroke-width':1},candles);
      el('circle',{class:'nv-flame',cx:c[0],cy:c[1],r:3,fill:'#FFC861',style:'animation-delay:'+(rnd()*1.5).toFixed(2)+'s'},candles);
    });
    // fleurs
    var fl=el('g',{},svg),k;
    for(k=0;k<9;k++){var la=rnd()*Math.PI*2,ld=24+rnd()*20;
      el('ellipse',{class:bloom?'nv-flower':'',cx:(Math.cos(la)*ld).toFixed(1),cy:(Math.sin(la)*ld).toFixed(1),rx:12,ry:5,fill:T.leaf,transform:'rotate('+(la*180/Math.PI)+' '+(Math.cos(la)*ld).toFixed(1)+' '+(Math.sin(la)*ld).toFixed(1)+')',style:bloom?'animation-delay:'+(k*.03)+'s':''},fl);}
    for(k=0;k<20;k++){var fa=rnd()*Math.PI*2,fd=rnd()*30,fr=7+rnd()*8,fx=Math.cos(fa)*fd,fy=Math.sin(fa)*fd,col=T.flowers[k%T.flowers.length];
      var f=el('g',{class:bloom?'nv-flower':'',style:bloom?'animation-delay:'+(.12+k*.035).toFixed(2)+'s':''},fl);
      el('circle',{cx:fx.toFixed(1),cy:fy.toFixed(1),r:fr.toFixed(1),fill:col},f);
      el('circle',{cx:fx.toFixed(1),cy:fy.toFixed(1),r:(fr*.55).toFixed(1),fill:'rgba(0,0,0,.08)'},f);
      el('circle',{cx:fx.toFixed(1),cy:fy.toFixed(1),r:(fr*.22).toFixed(1),fill:'rgba(255,255,255,.5)'},f);
    }
    svg.parentNode.classList.toggle('is-lit',state.lit);
  }

  function petals(){
    var box=document.getElementById('nvPetals');if(!box||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var T=THEMES[state.theme];
    for(var i=0;i<26;i++){var p=document.createElement('i');p.className='nv-petal';
      p.style.left=(Math.random()*100)+'%';p.style.background=T.flowers[i%T.flowers.length];
      p.style.setProperty('--dx',((Math.random()-.5)*120).toFixed(0)+'px');p.style.setProperty('--rot',(Math.random()*540-270).toFixed(0)+'deg');
      p.style.animationDuration=(2.2+Math.random()*1.8).toFixed(2)+'s';p.style.animationDelay=(Math.random()*.6).toFixed(2)+'s';
      if(T.flowers[i%T.flowers.length]==='#FFFFFF')p.style.boxShadow='0 0 0 1px rgba(0,0,0,.08)';
      box.appendChild(p);(function(x){setTimeout(function(){x.remove()},5000)})(p);}
  }
  function syncForm(){
    var t=document.getElementById('nvAmbTxt'),h=document.getElementById('nvAmb'),v=THEMES[state.theme].name+', '+state.n+' convives';
    if(t)t.textContent=v;if(h)h.value=v;
  }

  document.querySelectorAll('.nv-themes button').forEach(function(b){
    b.addEventListener('click',function(){
      if(state.theme===b.dataset.t)return;
      document.querySelectorAll('.nv-themes button').forEach(function(x){x.setAttribute('aria-selected','false')});
      b.setAttribute('aria-selected','true');state.theme=b.dataset.t;
      draw(true);petals();
      var T=THEMES[state.theme],img=document.getElementById('nvRefImg');
      img.style.opacity=0;setTimeout(function(){img.src=T.img;img.style.opacity=1},250);
      document.getElementById('nvRefTxt').textContent=T.ref;syncForm();
    });
  });
  var cnt=document.getElementById('nvCount');
  function setN(v){state.n=Math.max(6,Math.min(12,v));cnt.textContent=state.n;draw(false);syncForm();}
  document.getElementById('nvMinus').addEventListener('click',function(){setN(state.n-1)});
  document.getElementById('nvPlus').addEventListener('click',function(){setN(state.n+1)});
  var cb=document.getElementById('nvCandles');
  cb.addEventListener('click',function(){state.lit=!state.lit;cb.setAttribute('aria-pressed',state.lit);cb.textContent=state.lit?'Éteindre les bougies':'Allumer les bougies';svg.parentNode.classList.toggle('is-lit',state.lit);});
  draw(true);

  /* ---------- Formulaire factice ---------- */
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var ok=f.parentNode.querySelector('.nv-ok');if(ok)ok.classList.add('is-on');f.reset();syncForm();});
  });
})();
