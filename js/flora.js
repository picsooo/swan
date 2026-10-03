/* Flora : roses, boutons, hortensias, feuilles et gypsophile en SVG */
(function(){
  var NS='http://www.w3.org/2000/svg';
  function el(tag,a,p){var e=document.createElementNS(NS,tag);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
  function hex2rgb(h){h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255];}
  function shade(h,t){var c=hex2rgb(h),m=t<0?0:255,a=Math.abs(t);return'rgb('+c.map(function(v){return Math.round(v+(m-v)*a)}).join(',')+')';}
  function petal(len,wid){return'M0 0 C '+wid+' '+(-len*.25)+', '+wid*.9+' '+(-len)+', 0 '+(-len)+' C '+(-wid*.9)+' '+(-len)+', '+(-wid)+' '+(-len*.25)+', 0 0Z';}

  function rose(p,x,y,r,col,rot){
    var g=el('g',{transform:'translate('+x+' '+y+') rotate('+(rot||0)+')'},p);
    el('circle',{r:r*.98,fill:shade(col,-.28),opacity:.35,cx:r*.08,cy:r*.1},g);
    var i;
    for(i=0;i<6;i++)el('path',{d:petal(r,r*.62),fill:shade(col,.12),stroke:shade(col,-.1),'stroke-width':r*.03,transform:'rotate('+(i*60)+')'},g);
    for(i=0;i<5;i++)el('path',{d:petal(r*.72,r*.5),fill:col,stroke:shade(col,-.22),'stroke-width':r*.035,transform:'rotate('+(i*72+30)+')'},g);
    el('circle',{r:r*.42,fill:shade(col,-.12)},g);
    [[.14,20],[.24,150],[.33,270],[.4,40]].forEach(function(c){var q=r*c[0];el('path',{d:'M'+(-q)+' 0 A '+q+' '+q+' 0 0 1 '+q+' 0',fill:'none',stroke:shade(col,-.34),'stroke-width':r*.05,'stroke-linecap':'round',transform:'rotate('+c[1]+')'},g);});
    return g;
  }
  function bud(p,x,y,r,col,rot){
    var g=el('g',{transform:'translate('+x+' '+y+') rotate('+(rot||0)+')'},p);
    el('path',{d:'M0 '+r+' C '+(-r*.9)+' '+r*.3+', '+(-r*.6)+' '+(-r)+', 0 '+(-r)+' C '+r*.6+' '+(-r)+', '+r*.9+' '+r*.3+', 0 '+r+'Z',fill:col,stroke:shade(col,-.25),'stroke-width':r*.06},g);
    el('path',{d:'M0 '+r*.9+' C '+(-r*.3)+' '+r*.2+', '+(-r*.1)+' '+(-r*.5)+', '+r*.2+' '+(-r*.75),fill:'none',stroke:shade(col,-.3),'stroke-width':r*.07},g);
    el('path',{d:'M0 '+r+' L '+(-r*.55)+' '+r*.45+' M0 '+r+' L '+r*.55+' '+r*.45,stroke:'#6E8B5A','stroke-width':r*.16,'stroke-linecap':'round'},g);
    return g;
  }
  function leaf(p,x,y,len,ang,col){
    var g=el('g',{transform:'translate('+x+' '+y+') rotate('+ang+')'},p);
    el('path',{d:'M0 0 C '+len*.3+' '+(-len*.28)+', '+len*.75+' '+(-len*.24)+', '+len+' 0 C '+len*.75+' '+len*.24+', '+len*.3+' '+len*.28+', 0 0Z',fill:col||'#7E9A6F'},g);
    el('path',{d:'M'+len*.05+' 0 L'+len*.92+' 0',stroke:shade(col||'#7E9A6F',-.25),'stroke-width':Math.max(.6,len*.03)},g);
    return g;
  }
  function hydrangea(p,x,y,r,col){
    var g=el('g',{transform:'translate('+x+' '+y+')'},p);
    el('circle',{r:r,fill:shade(col,-.15)},g);
    var n=Math.round(r*r/14)+8,i,s=11;
    for(i=0;i<n;i++){s=(s*9301+49297)%233280;var a=s/233280*Math.PI*2;s=(s*9301+49297)%233280;var d=Math.sqrt(s/233280)*r*.85,fx=Math.cos(a)*d,fy=Math.sin(a)*d,fr=r*.2;
      var f=el('g',{transform:'translate('+fx.toFixed(1)+' '+fy.toFixed(1)+') rotate('+(a*57)+')'},g);
      for(var k=0;k<4;k++)el('ellipse',{cx:0,cy:-fr*.55,rx:fr*.45,ry:fr*.6,fill:shade(col,(i%3)*.12),transform:'rotate('+k*90+')'},f);
      el('circle',{r:fr*.18,fill:shade(col,-.3)},f);}
    return g;
  }
  function gyps(p,x,y,r){
    var g=el('g',{transform:'translate('+x+' '+y+')'},p),s=5;
    for(var i=0;i<14;i++){s=(s*9301+49297)%233280;var a=s/233280*Math.PI*2;s=(s*9301+49297)%233280;var d=s/233280*r;
      el('circle',{cx:(Math.cos(a)*d).toFixed(1),cy:(Math.sin(a)*d).toFixed(1),r:(r*.09).toFixed(1),fill:'#FFFFFF',stroke:'rgba(0,0,0,.08)','stroke-width':.4},g);}
    return g;
  }

  /* Bouquet décoratif pour les cartes (viewBox 0 0 220 160) */
  function sprig(svg,pal){
    svg.setAttribute('viewBox','0 0 220 160');svg.innerHTML='';
    var L='#7E9A6F',L2='#93AB7F';
    leaf(svg,96,92,60,-160,L);leaf(svg,120,96,64,-20,L2);leaf(svg,104,104,50,140,L);leaf(svg,130,82,46,-60,L);leaf(svg,88,80,44,-120,L2);leaf(svg,140,104,44,30,L);
    gyps(svg,60,76,22);gyps(svg,170,70,20);
    bud(svg,44,96,11,pal[2],-60);bud(svg,182,96,10,pal[3]||pal[0],55);
    hydrangea(svg,150,64,20,pal[4]||pal[1]);
    rose(svg,82,70,26,pal[1],10);rose(svg,148,98,24,pal[2],-20);rose(svg,112,78,34,pal[0],0);
  }
  window.Flora={el:el,shade:shade,rose:rose,bud:bud,leaf:leaf,hydrangea:hydrangea,gyps:gyps,sprig:sprig};

  document.querySelectorAll('svg[data-sprig]').forEach(function(s){sprig(s,s.getAttribute('data-sprig').split(','));});
})();
