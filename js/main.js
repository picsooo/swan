(function(){
  var head=document.querySelector('.sw-head');
  if(head){var onS=function(){head.classList.toggle('is-scrolled',window.scrollY>8)};onS();window.addEventListener('scroll',onS,{passive:true});}

  var burger=document.querySelector('.sw-burger'),drawer=document.querySelector('.sw-drawer');
  if(burger&&drawer){burger.addEventListener('click',function(){
    var open=drawer.classList.toggle('is-open');burger.setAttribute('aria-expanded',open);
    document.body.style.overflow=open?'hidden':'';
  });}

  // Formulaires factices
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var ok=f.parentNode.querySelector('.sw-ok');
      if(ok){ok.classList.add('is-on');ok.scrollIntoView({behavior:'smooth',block:'center'});}
      f.reset();
    });
  });

  // Simulateur de réception
  var sim=document.querySelector('[data-sim]');
  if(sim){
    var state={guests:150,per:10};
    var out=sim.querySelector('output'),rng=sim.querySelector('input[type=range]');
    function chipGroup(name,cb){
      var g=sim.querySelectorAll('[data-g="'+name+'"] .sw-chip');
      g.forEach(function(b){b.addEventListener('click',function(){
        g.forEach(function(x){x.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');cb(b.dataset.v);calc();
      });});
    }
    chipGroup('type',function(){});
    chipGroup('table',function(v){state.per=+v;});
    rng.addEventListener('input',function(){state.guests=+rng.value;calc();});
    function set(k,v){var el=sim.querySelector('[data-r="'+k+'"]');if(el)el.textContent=v;}
    function calc(){
      var g=state.guests,t=Math.ceil(g/state.per);
      out.textContent=g;
      set('tables',t);set('chairs',g);
      set('flowers',state.per===10?t:Math.ceil(t*1.5));
      set('candles',t*3);
    }
    calc();
  }
})();
