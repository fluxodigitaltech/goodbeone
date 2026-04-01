// =============================================
//  ROULETTE
// =============================================
const rouletteImg = document.getElementById('heroRouletteImage');
const spinTriggers = document.querySelectorAll('.btn-spin-trigger');

const prizes = [
    { label: "1 Mês Grátis" },
    { label: "Vale Massagem" },
    { label: "25% OFF" },
    { label: "2 Meses Free" },
    { label: "Tente Novamente" },
    { label: "Be Prime" }
];

let currentRotation = 0;
let isSpinning = false;

/* 
// Virtual roulette logic deactivated as requested by client (physical only)
function spin() {
    if (isSpinning) return;
    isSpinning = true;

    const extraSpins = Math.floor(Math.random() * 4) + 3;
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const randomOffset = Math.floor(Math.random() * (segmentAngle - 10)) + 5;
    const targetDegree = (extraSpins * 360) + (randomPrizeIndex * segmentAngle) + randomOffset;

    currentRotation += targetDegree;

    if (rouletteImg) {
        rouletteImg.style.transition = 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)';
        rouletteImg.style.transform = `rotate(${currentRotation}deg)`;
    }

    setTimeout(() => {
        alert("Parabéns! Você tirou: " + prizes[randomPrizeIndex].label);
        isSpinning = false;
    }, 4200);
}
*/

// =============================================
//  MODAL DE CADASTRO
// =============================================
const modal = document.getElementById('leadModal');
const modalClose = document.getElementById('modalClose');
const leadForm = document.getElementById('leadForm');
const formError = document.getElementById('formError');



function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
}

// Open modal when any CTA spin trigger is clicked
spinTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Close when clicking the X button
modalClose.addEventListener('click', closeModal);

// Close when clicking outside the card
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
});

// Phone mask helper
const celularInput = document.getElementById('leadCelular');
if (celularInput) {
    celularInput.addEventListener('input', () => {
        let v = celularInput.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
            v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
        } else if (v.length > 2) {
            v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
        } else if (v.length > 0) {
            v = `(${v}`;
        }
        celularInput.value = v;
    });
}

// =============================================
//  API INTEGRATION
// =============================================
const EVO_API_URL = 'https://api.w12app.com.br/api/v1/prospects';
const EVO_API_KEY = 'F8844D26-AFFC-4A88-B4C6-FAECF6236508';

const NOCODB_API_URL = 'https://app.nocodb.com/api/v2/tables/m7sa5o1ju4ji7bq/records';
const NOCODB_TOKEN = 'nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H';

async function sendToEvo(data) {
    try {
        const response = await fetch(EVO_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`goodbe:${EVO_API_KEY}`)}`
            },
            body: JSON.stringify({
                name: data.nome,
                email: data.email,
                idBranch: parseInt(data.branchId),
                cellphone: data.celular.replace(/\D/g, ''), // remove format for API
                marketingType: 'Landing Page'
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending to EVO:', error);
        return false;
    }
}

async function sendToNocoDB(data) {
    try {
        const response = await fetch(NOCODB_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xc-token': NOCODB_TOKEN
            },
            body: JSON.stringify({
                'Nome': data.nome,
                'Email': data.email,
                'Celular': data.celular,
                'Unidade': data.unidade
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending to NocoDB:', error);
        return false;
    }
}

// Form submit
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.style.display = 'none';

    const nome = document.getElementById('leadNome').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const celular = document.getElementById('leadCelular').value.trim();
    const unidadeEl = leadForm.querySelector('input[name="unidade"]:checked');
    const unidade = unidadeEl ? unidadeEl.value : '';
    const branchId = unidadeEl ? unidadeEl.dataset.branchId : '';

    // Validation
    let valid = true;
    [{ el: document.getElementById('leadNome'), val: nome },
    { el: document.getElementById('leadEmail'), val: email },
    { el: document.getElementById('leadCelular'), val: celular }
    ].forEach(({ el, val }) => {
        if (!val) { el.classList.add('field-error'); valid = false; }
        else el.classList.remove('field-error');
    });

    if (!unidade) valid = false;

    if (!valid) {
        formError.style.display = 'block';
        return;
    }

    // UI Feedback: Loading
    const submitBtn = document.getElementById('formSubmitBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-submit-text">Enviando...</span>';
    submitBtn.disabled = true;

    // Data package
    const leadData = { nome, email, celular, unidade, branchId };

    // ── Execute API Calls ──
    const [evoSuccess, nocoSuccess] = await Promise.all([
        sendToEvo(leadData),
        sendToNocoDB(leadData)
    ]);

    // ── Save to "database" (localStorage) as fallback ──
    try {
        const existing = JSON.parse(localStorage.getItem('goodbe_leads') || '[]');
        existing.push({ ...leadData, timestamp: new Date().toISOString(), evoSuccess, nocoSuccess });
        localStorage.setItem('goodbe_leads', JSON.stringify(existing));
    } catch (_) { }

    // ── Final Feedback ──
    if (evoSuccess || nocoSuccess) {
        submitBtn.innerHTML = '<span class="btn-submit-text">Cadastro enviado! ✅</span>';
        setTimeout(() => {
            closeModal();
            leadForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        submitBtn.innerHTML = '<span class="btn-submit-text">Erro ao enviar ❌</span>';
        formError.textContent = "Houve um problema ao enviar seu cadastro. Por favor, tente novamente.";
        formError.style.display = 'block';
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 3000);
    }
});

// =============================================
//  FIXED MOBILE CTA VISIBILITY
// =============================================
const fixedCta = document.querySelector('.fixed-cta-mobile');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400 && window.innerWidth < 768) {
        fixedCta.style.display = 'block';
    } else {
        fixedCta.style.display = 'none';
    }
});

// =============================================
//  TESTIMONIAL VIDEO CAROUSEL (mobile)
// =============================================
(function () {
    const track = document.getElementById('videoTrack');
    const prevBtn = document.getElementById('videoPrev');
    const nextBtn = document.getElementById('videoNext');
    const dots = document.querySelectorAll('.video-dot');
    if (!track || !prevBtn || !nextBtn) return;

    let current = 0;
    const total = track.querySelectorAll('.testimonial-video-slide').length;

    function goTo(index) {
        current = (index + total) % total;
        if (window.innerWidth < 768) {
            track.style.transform = `translateX(-${current * 100}%)`;
        }
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.index)));

    // Reset on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            track.style.transform = '';
        } else {
            goTo(current);
        }
    });
})();


if (window.location.protocol === 'file:') {
    const notice = document.getElementById('localFileNotice');
    if (notice) notice.style.display = 'block';
}
