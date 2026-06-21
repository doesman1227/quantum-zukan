// スクロールで要素をふわっと表示
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// 現在ページをナビでハイライト（親グループも）
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((a) => {
  const target = a.getAttribute('href');
  if (target === here || (here === '' && target === 'index.html')) {
    a.classList.add('active');
    const grp = a.closest('.nav-group');
    if (grp) grp.classList.add('has-active');
  }
});

// ドロップダウン：タップ/クリックで開閉（PCはhoverでも開く）
document.querySelectorAll('.nav-trigger').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const grp = btn.closest('.nav-group');
    const isOpen = grp.classList.contains('open');
    document.querySelectorAll('.nav-group.open').forEach((g) => g.classList.remove('open'));
    if (!isOpen) grp.classList.add('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-group.open').forEach((g) => g.classList.remove('open'));
});
