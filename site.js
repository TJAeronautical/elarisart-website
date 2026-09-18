(()=>{document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());const b=document.querySelector('.menu'),n=document.querySelector('.header nav');if(b&&n){b.setAttribute('aria-label','Open menu');b.setAttribute('aria-expanded','false');const toggle=e=>{if(e)e.preventDefault();const open=!n.classList.contains('open');n.classList.toggle('open',open);b.classList.toggle('is-open',open);b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.classList.toggle('menu-open',open)};b.addEventListener('click',toggle);n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.classList.remove('is-open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open')}))}document.querySelectorAll('[data-newsletter]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const v=f.querySelector('input').value.trim();if(v)location.href='mailto:elarisoriginals@gmail.com?subject='+encodeURIComponent('Elaris Studio Notes')+'&body='+encodeURIComponent('Please add '+v+' to the Elaris mailing list.')}));const form=document.querySelector('#contact-form');if(form){const p=new URLSearchParams(location.search),art=p.get('artwork'),sub=p.get('subject');if(art){form.subject.value='Artwork enquiry';form.message.value='I would like to enquire about '+art+'.'}if(sub&&[...form.subject.options].some(o=>o.value===sub))form.subject.value=sub;form.addEventListener('submit',async e=>{
  e.preventDefault();
  const status=form.querySelector('.form-status');
  const button=form.querySelector('button[type="submit"]');
  const d=Object.fromEntries(new FormData(form));
  const payload={
    name:d.name||'',
    email:d.email||'',
    artwork:d.artwork||'',
    message:d.message||'',
    _subject:(d.subject||'Website enquiry')+(d.artwork?' · '+d.artwork:''),
    _template:'table',
    _captcha:'false'
  };
  status.textContent='Sending…';
  if(button) button.disabled=true;
  try{
    const r=await fetch('https://formsubmit.co/ajax/elarisoriginals@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(payload)
    });
    if(!r.ok) throw new Error('send failed');
    const j=await r.json();
    if(j.success===false) throw new Error('send failed');
    status.textContent='Thank you. Your enquiry has been sent.';
    form.reset();
  }catch(err){
    status.textContent='Unable to send automatically. Please email elarisoriginals@gmail.com.';
  }finally{
    if(button) button.disabled=false;
  }
}}})();