(function(){
  var F=window.Flora,el=F.el,shade=F.shade;
  var FLOWERS=[
    {id:'poudre',name:'Roses poudrées',c:['#F7C6CF','#F2A7B8','#FBE3E6','#E98FA6','#FFFFFF'],hyd:'#E7D2F3',acc:'#F2A7B8'},
    {id:'rouge',name:'Roses rouges',c:['#C8102E','#E23A55','#A50E2A','#F2A7B8','#8C0C24'],hyd:'#F7C6CF',acc:'#A50E2A'},
    {id:'jardin',name:'Jardin coloré',c:['#F26B8A','#F9A03F','#F7D046','#FF8FA3','#B985E0'],hyd:'#B985E0',acc:'#F9A03F'},
    {id:'fuchsia',name:'Fuchsia & orchidée',c:['#E2007A','#F25AA8','#B0157A','#F7B2D6','#FFFFFF'],hyd:'#C77DD9',acc:'#E2007A'},
    {id:'mauve',name:'Hortensias mauves',c:['#F2A7B8','#E98FA6','#FFFFFF','#D7B9EC'],hyd:'#B58BD6',acc:'#B58BD6',more:1},
    {id:'corail',name:'Corail & pêche',c:['#FF8A65','#FFB199','#F76E6E','#FFD3B6','#FFFFFF'],hyd:'#FFD3B6',acc:'#FF8A65'},
    {id:'citron',name:'Citron & bleu',c:['#F4C430','#F6D96B','#FFFFFF','#F4C430'],hyd:'#7FA7D9',acc:'#2E4FA3',more:1},
    {id:'blanc',name:'Blanc pur',c:['#FFFFFF','#F7F3EE','#EFE8DE','#FFFFFF'],hyd:'#F3F0E6',acc:'#D9CBB2'}
  ];
  var CLOTH=[['ivoire','Blanc ivoire','#F6F1EA'],['rose','Rose poudré','#F3D7DA'],['lavande','Lavande','#D9DEEF'],['ciel','Bleu ciel','#D4E6F3'],['sauge','Vert sauge','#D3DFCF'],['vieuxrose','Vieux rose','#C9A0A0'],['champagne','Champagne','#EADCC2'],['nuit','Bleu nuit','#22393E']];
  var RUNNER=[['aucun','Sans chemin'],['assorti','Assorti aux fleurs'],['lin','Lin naturel'],['dore','Satin doré']];
  var CHAIR=[['dore','Dorées','#C9A44E'],['cristal','Cristal','#E6EEF3'],['blanc','Blanches','#FFFFFF'],['bois','Bois naturel','#B98B5E'],['noir','Noires','#2F2F2F']];
  var CHARGER=[['or','Or','#C9A266'],['argent','Argent','#B9BEC4'],['verre','Verre','#D8E6EE'],['bleu','Bleu','#7FA7D9'],['rose','Rose','#E9A7B4']];
  var CENTER=[['bouquet','Bouquet bas'],['genereux','Bouquet généreux'],['couronne','Couronne de roses'],['chemin','Chemin de fleurs']];
  var PRESETS=[
    {name:'Blanc & or',s:{flowers:'poudre',cloth:'ivoire',runner:'aucun',chair:'dore',charger:'or',center:'bouquet'},img:'../img/mariage-table.webp'},
    {name:'Fiançailles au jardin',s:{flowers:'fuchsia',cloth:'lavande',runner:'assorti',chair:'cristal',charger:'argent',center:'bouquet'},img:'../img/fiancailles-jardin.webp'},
    {name:'Méditerranée',s:{flowers:'citron',cloth:'ivoire',runner:'assorti',chair:'blanc',charger:'bleu',center:'genereux'},img:'../img/anniversaire-maneva.webp'},
    {name:'Bal Régence',s:{flowers:'mauve',cloth:'vieuxrose',runner:'aucun',chair:'dore',charger:'or',center:'couronne'},img:'../img/table-regence.webp'},
    {name:'Jardin de roses',s:{flowers:'jardin',cloth:'sauge',runner:'lin',chair:'bois',charger:'or',center:'chemin'},sprig:'jardin'},
    {name:'Passion rouge',s:{flowers:'rouge',cloth:'ivoire',runner:'dore',chair:'dore',charger:'or',center:'genereux'},sprig:'rouge'}
  ];
  var st={flowers:'poudre',cloth:'ivoire',runner:'aucun',chair:'dore',charger:'or',center:'bouquet',n:10,lit:false};
  var DEF=JSON.parse(JSON.stringify(st));
  function find(arr,id){for(var i=0;i<arr.length;i++)if((arr[i].id||arr[i][0])===id)return arr[i];}
  var svg=document.getElementById('czTable'),wrap=document.getElementById('czWrap');
  var seed=1;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280;}

  function draw(bloom){
    seed=3;svg.innerHTML='';
    var fl=find(FLOWERS,st.flowers),cloth=find(CLOTH,st.cloth)[2],chair=find(CHAIR,st.chair)[2],charger=find(CHARGER,st.charger)[2];
    var defs=el('defs',{},svg);
    var rg=el('radialGradient',{id:'czGlow'},defs);el('stop',{offset:'0','stop-color':'#FFD48A','stop-opacity':'1'},rg);el('stop',{offset:'1','stop-color':'#FFD48A','stop-opacity':'0'},rg);
    var sh=el('radialGradient',{id:'czShade'},defs);el('stop',{offset:'.85','stop-color':'#000','stop-opacity':'0'},sh);el('stop',{offset:'1','stop-color':'#000','stop-opacity':'.2'},sh);
    var cp=el('clipPath',{id:'czClip'},defs);el('circle',{r:140},cp);
    var n=st.n,i,a,deg;
    // chaises
    for(i=0;i<n;i++){deg=i/n*360;var g=el('g',{transform:'rotate('+deg+') translate(0,-178)'},svg);
      var op=st.chair==='cristal'?.75:1;
      el('rect',{x:-23,y:-14,width:46,height:28,rx:10,fill:chair,opacity:op,stroke:'rgba(0,0,0,.2)','stroke-width':1},g);
      el('rect',{x:-21,y:-21,width:42,height:8,rx:4,fill:chair,opacity:op,stroke:'rgba(0,0,0,.22)','stroke-width':1},g);
      if(st.chair==='dore'||st.chair==='bois')for(var k=-12;k<=12;k+=8)el('rect',{x:k-1,y:-20,width:2,height:6,fill:shade(chair,-.25)},g);}
    // nappe
    el('circle',{r:147,fill:shade(cloth,-.1)},svg);el('circle',{r:140,fill:cloth},svg);el('circle',{r:147,fill:'url(#czShade)'},svg);
    // chemin de table
    var rc={assorti:fl.acc,lin:'#D8CBB4',dore:'#D4B373'}[st.runner];
    if(rc){var rg2=el('g',{'clip-path':'url(#czClip)'},svg);el('rect',{x:-150,y:-22,width:300,height:44,fill:rc,opacity:st.runner==='assorti'?.8:.95,transform:'rotate(-30)'},rg2);
      if(st.runner==='dore')el('rect',{x:-150,y:-22,width:300,height:44,fill:'none',stroke:'#B8964F','stroke-width':2,transform:'rotate(-30)'},rg2);}
    // pétales éparpillés
    if(st.center==='genereux'||st.center==='chemin'){for(i=0;i<34;i++){var pa=rnd()*Math.PI*2,pd=55+rnd()*70;
      el('ellipse',{cx:(Math.cos(pa)*pd).toFixed(1),cy:(Math.sin(pa)*pd).toFixed(1),rx:3.4,ry:2.2,fill:fl.c[i%fl.c.length],stroke:'rgba(0,0,0,.08)','stroke-width':.5,transform:'rotate('+(rnd()*180)+' '+(Math.cos(pa)*pd).toFixed(1)+' '+(Math.sin(pa)*pd).toFixed(1)+')'},svg);}}
    // couverts
    for(i=0;i<n;i++){deg=i/n*360;var p=el('g',{transform:'rotate('+deg+') translate(0,-112)'},svg);
      el('circle',{r:21,fill:st.charger==='verre'?'rgba(255,255,255,.35)':'none',stroke:charger,'stroke-width':3.4},p);
      el('circle',{r:15.5,fill:'#FFFFFF',stroke:'rgba(0,0,0,.08)','stroke-width':1},p);
      el('path',{d:'M-8 -2 L8 -2 L5 8 L-5 8 Z',fill:shade(fl.acc,.55)},p);
      F.bud(p,0,-3,4.6,fl.c[i%fl.c.length],180);
      el('rect',{x:-28,y:-12,width:2.4,height:24,rx:1.2,fill:'#C9B48A'},p);el('rect',{x:25.6,y:-12,width:2.4,height:24,rx:1.2,fill:'#C9B48A'},p);
      el('circle',{cx:17,cy:-22,r:5.2,fill:'rgba(255,255,255,.55)',stroke:'rgba(120,130,140,.45)','stroke-width':1},p);}
    // centre de table
    var cg=el('g',{class:bloom?'cz-bloom':''},svg),candles=[];
    function cluster(R,nr,nh,nb){
      for(i=0;i<12+nr/2;i++){var la=rnd()*Math.PI*2,ld=R*.55+rnd()*R*.5;F.leaf(cg,Math.cos(la)*ld*.4,Math.sin(la)*ld*.4,R*.55+rnd()*10,la*57.3,i%2?'#7E9A6F':'#93AB7F');}
      for(i=0;i<nh;i++){var ha=rnd()*Math.PI*2,hd=R*.35+rnd()*R*.35;F.hydrangea(cg,Math.cos(ha)*hd,Math.sin(ha)*hd,R*.28+rnd()*5,fl.hyd);}
      for(i=0;i<3;i++){var ga=rnd()*Math.PI*2;F.gyps(cg,Math.cos(ga)*R*.7,Math.sin(ga)*R*.7,R*.3);}
      for(i=0;i<nb;i++){var ba=rnd()*Math.PI*2;F.bud(cg,Math.cos(ba)*R*.95,Math.sin(ba)*R*.95,6,fl.c[i%fl.c.length],ba*57.3+90);}
      for(i=0;i<nr;i++){var ra=rnd()*Math.PI*2,rd=Math.sqrt(rnd())*R*.72;F.rose(cg,Math.cos(ra)*rd,Math.sin(ra)*rd,11+rnd()*8,fl.c[i%fl.c.length],rnd()*90);}
    }
    if(st.center==='bouquet'){cluster(48,14,fl.more?3:2,6);candles=[[-70,0],[70,0],[0,-70],[0,70]];}
    else if(st.center==='genereux'){cluster(62,18,fl.more?5:2,8);candles=[[-80,-24],[80,24],[-24,80],[24,-80],[-58,62],[58,-62]];}
    else if(st.center==='couronne'){
      for(i=0;i<18;i++){a=i/18*Math.PI*2;F.leaf(cg,Math.cos(a)*56,Math.sin(a)*56,22,a*57.3+(i%2?60:-60),i%2?'#7E9A6F':'#93AB7F');}
      if(fl.more)for(i=0;i<4;i++){a=i/4*Math.PI*2+.4;F.hydrangea(cg,Math.cos(a)*56,Math.sin(a)*56,14,fl.hyd);}
      for(i=0;i<14;i++){a=i/14*Math.PI*2;F.rose(cg,Math.cos(a)*(54+(i%2?6:-4)),Math.sin(a)*(54+(i%2?6:-4)),10+(i%3)*2.5,fl.c[i%fl.c.length],i*40);}
      for(i=0;i<7;i++){a=i/7*Math.PI*2+.2;F.bud(cg,Math.cos(a)*74,Math.sin(a)*74,5.5,fl.c[(i+1)%fl.c.length],a*57.3+90);}
      candles=[[0,0],[-16,10],[16,10]];
    } else {
      var ang=-30*Math.PI/180,ux=Math.cos(ang),uy=Math.sin(ang);
      for(var t=-118;t<=118;t+=14){F.leaf(cg,ux*t,uy*t,20,(t/14%2?60:-120)-30,'#7E9A6F');}
      for(t=-110;t<=110;t+=40){if(fl.more)F.hydrangea(cg,ux*t,uy*t,13,fl.hyd);else F.gyps(cg,ux*t,uy*t,14);}
      for(t=-112,i=0;t<=112;t+=13,i++){var off=(i%2?7:-7);F.rose(cg,ux*t-uy*off,uy*t+ux*off,9+(i%3)*2.4,fl.c[i%fl.c.length],i*37);}
      candles=[[-uy*30+ux*-70,ux*30+uy*-70],[uy*30+ux*70,-ux*30+uy*70],[-uy*30+ux*30,ux*30+uy*30],[uy*30-ux*30,-ux*30-uy*30]];
    }
    var cd=el('g',{},svg);
    candles.forEach(function(c,ix){
      el('circle',{class:'cz-glow',cx:c[0],cy:c[1],r:38,fill:'url(#czGlow)'},cd);
      el('circle',{cx:c[0],cy:c[1],r:7,fill:'#FBF6EE',stroke:'rgba(0,0,0,.15)','stroke-width':1},cd);
      el('circle',{class:'cz-flame',cx:c[0],cy:c[1],r:3.2,fill:'#FFC861',style:'animation-delay:'+(ix*.27)+'s'},cd);
    });
    wrap.classList.toggle('is-lit',st.lit);
    summary();
  }

  function petals(){
    var box=document.getElementById('czPetals');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var c=find(FLOWERS,st.flowers).c;
    for(var i=0;i<34;i++){var p=document.createElement('i');p.className='nv-petal';p.style.left=(Math.random()*100)+'%';p.style.background=c[i%c.length];
      p.style.setProperty('--dx',((Math.random()-.5)*120).toFixed(0)+'px');p.style.setProperty('--rot',(Math.random()*540-270).toFixed(0)+'deg');
      p.style.animationDuration=(2.2+Math.random()*1.8).toFixed(2)+'s';p.style.animationDelay=(Math.random()*.6).toFixed(2)+'s';
      p.style.boxShadow='0 0 0 1px rgba(0,0,0,.06)';box.appendChild(p);(function(x){setTimeout(function(){x.remove()},5000)})(p);}
  }

  function summary(){
    var pr=PRESETS.filter(function(p){for(var k in p.s)if(p.s[k]!==st[k])return false;return true;})[0];
    var rows=[['Ambiance',pr?pr.name:'Personnalisée'],['Fleurs',find(FLOWERS,st.flowers).name],['Centre de table',find(CENTER,st.center)[1]],['Nappe',find(CLOTH,st.cloth)[1]],['Chemin de table',find(RUNNER,st.runner)[1]],['Chaises',find(CHAIR,st.chair)[1]],['Assiettes',find(CHARGER,st.charger)[1]],['Convives par table',st.n],['Bougies',st.lit?'Allumées':'Éteintes']];
    document.getElementById('czSummary').innerHTML=rows.map(function(r){return'<li><span>'+r[0]+'</span><b>'+r[1]+'</b></li>'}).join('');
    document.querySelectorAll('#czPresets button').forEach(function(b,ix){b.setAttribute('aria-pressed',PRESETS[ix]===pr?'true':'false')});
    ['flowers','cloth','runner','chair','charger','center'].forEach(function(k){document.querySelectorAll('[data-k="'+k+'"]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===st[k]?'true':'false')})});
  }

  function btn(parent,k,v,label,inner,cls){
    var b=document.createElement('button');b.type='button';b.className=cls;b.dataset.k=k;b.dataset.v=v;b.innerHTML=inner+'<span>'+label+'</span>';
    b.addEventListener('click',function(){st[k]=v;draw(k==='flowers'||k==='center');if(k==='flowers')petals();});
    parent.appendChild(b);return b;
  }
  // Fleurs : une rose dessinée par palette
  var fbox=document.getElementById('czFlowers');
  FLOWERS.forEach(function(f){var b=btn(fbox,'flowers',f.id,f.name,'<svg viewBox="-24 -24 48 48" aria-hidden="true"></svg>','cz-sw cz-sw--flower');
    var s=b.querySelector('svg');F.leaf(s,-4,6,20,150,'#7E9A6F');F.leaf(s,4,6,20,30,'#93AB7F');F.rose(s,6,-2,11,f.c[1]||f.c[0],20);F.rose(s,-6,2,13,f.c[0],0);});
  CLOTH.forEach(function(c){btn(document.getElementById('czCloth'),'cloth',c[0],c[1],'<i style="background:'+c[2]+'"></i>','cz-sw')});
  CHAIR.forEach(function(c){btn(document.getElementById('czChair'),'chair',c[0],c[1],'<i style="background:'+c[2]+'"></i>','cz-sw')});
  CHARGER.forEach(function(c){btn(document.getElementById('czCharger'),'charger',c[0],c[1],'<i class="cz-ring" style="border-color:'+c[2]+'"></i>','cz-sw')});
  RUNNER.forEach(function(c){btn(document.getElementById('czRunner'),'runner',c[0],c[1],'','cz-chip')});
  CENTER.forEach(function(c){btn(document.getElementById('czCenter'),'center',c[0],c[1],'','cz-chip')});
  // Ambiances
  var pbox=document.getElementById('czPresets');
  PRESETS.forEach(function(p){var b=document.createElement('button');b.type='button';b.className='cz-preset';
    b.innerHTML=(p.img?'<img src="'+p.img+'" alt="">':'<svg aria-hidden="true"></svg>')+'<span>'+p.name+'</span>';
    if(!p.img){var f=find(FLOWERS,p.sprig);F.sprig(b.querySelector('svg'),f.c.concat([f.hyd]));}
    b.addEventListener('click',function(){for(var k in p.s)st[k]=p.s[k];draw(true);petals();});
    pbox.appendChild(b);});
  // Convives, bougies, reset
  var cnt=document.getElementById('czCount');
  function setN(v){st.n=Math.max(6,Math.min(12,v));cnt.textContent=st.n;draw(false);}
  document.getElementById('czMinus').addEventListener('click',function(){setN(st.n-1)});
  document.getElementById('czPlus').addEventListener('click',function(){setN(st.n+1)});
  var cb=document.getElementById('czCandles');
  cb.addEventListener('click',function(){st.lit=!st.lit;cb.setAttribute('aria-pressed',st.lit);cb.textContent=st.lit?'Éteindre les bougies':'Allumer les bougies';wrap.classList.toggle('is-lit',st.lit);summary();});
  document.getElementById('czReset').addEventListener('click',function(){var lit=st.lit;st=JSON.parse(JSON.stringify(DEF));cnt.textContent=st.n;cb.setAttribute('aria-pressed','false');cb.textContent='Allumer les bougies';draw(true);window.scrollTo({top:0,behavior:'smooth'});});
  // Formulaire factice
  document.querySelectorAll('form[data-fake]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();f.parentNode.querySelector('.nv-ok').classList.add('is-on');f.reset();});});
  draw(true);
})();
