document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var header = document.querySelector('.site-header');

  function setMenu(open) {
    if (!links || !toggle) return;
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && links) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('click', function (e) {
      if (!links.classList.contains('open')) return;
      if (header && header.contains(e.target)) return;
      setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setMenu(false);
    });
  }

  var form = document.getElementById('contactForm');
  if (form) {
    var serviceMap = {
      'drive-repair': 'AC / DC drive repair',
      'drive-overhaul': 'AC / DC drive site overhauling',
      'controller-card': 'Controller / power card',
      'hmi-rf-ir': 'HMI / RF / IR system',
      'access-cctv': 'Access control / fire alarm / CCTV',
      'mig-welder': 'MIG welder (Kemppi)',
      'smps-ups-servo': 'SMPS / UPS / servo card',
      'parts-supply': 'Parts supply (diode / IGBT / thyristor)',
      'other': 'Other'
    };

    var params = new URLSearchParams(window.location.search);
    var serviceKey = params.get('service');
    var equipSelect = document.getElementById('cf-equip');
    var messageField = document.getElementById('cf-message');

    if (serviceKey && equipSelect) {
      var serviceValue = serviceMap[serviceKey] || decodeURIComponent(serviceKey.replace(/\+/g, ' '));
      for (var i = 0; i < equipSelect.options.length; i++) {
        if (equipSelect.options[i].value === serviceValue) {
          equipSelect.selectedIndex = i;
          break;
        }
      }
    }

    var note = params.get('note');
    if (note && messageField && !messageField.value.trim()) {
      messageField.value = decodeURIComponent(note.replace(/\+/g, ' '));
    }

    if (serviceKey && form.scrollIntoView) {
      window.requestAnimationFrame(function () {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var equip = document.getElementById('cf-equip').value;
      var msg = document.getElementById('cf-message').value.trim();

      var body = 'Name: ' + name + '%0D%0APhone: ' + phone +
                 '%0D%0AEquipment: ' + equip + '%0D%0A%0D%0A' + encodeURIComponent(msg);
      var subject = encodeURIComponent('Service enquiry - ' + (name || 'Maya Enterprise website'));
      window.location.href = 'mailto:maya_enterprise2007@yahoo.co.in?subject=' + subject + '&body=' + body;

      var status = document.getElementById('formStatus');
      if (status) {
        status.textContent = 'Opening your email app to send this enquiry to Maya Enterprise…';
        status.classList.add('show');
      }
    });
  }
});
