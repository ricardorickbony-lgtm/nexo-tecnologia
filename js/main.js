/**
 * NEXO TECNOLOGIA — SCRIPTS OFICIAIS & INTERATIVIDADE
 * WhatsApp Oficial da Gestão da NEXO: (11) 97055-8412
 * Desenvolvido por NEXO Tecnologia (2026)
 */

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppRealtimeStatus();
  initMobileNavigation();
  initEcosystemTabs();
  initProductivityCalculator();
  initFaqAccordion();
  initVipDemoModal();
  initHeaderScrollEffect();
});

/* ==========================================================================
   1. ATENDIMENTO WHATSAPP EM TEMPO REAL — GESTÃO DA NEXO TECNOLOGIA
   ========================================================================== */
function initWhatsAppRealtimeStatus() {
  const config = {
    numero: "5511970558412", // WhatsApp Oficial da Gestão da NEXO: (11) 97055-8412
    diasSemana: [1, 2, 3, 4, 5], // Seg a Sex
    horaInicio: 8,
    horaFim: 19,
    sabadoAbre: true,
    sabadoHoraFim: 13
  };

  const agora = new Date();
  const diaSemana = agora.getDay();
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const horaDecimal = hora + (minutos / 60);

  let isOnline = false;

  if (config.diasSemana.includes(diaSemana) && horaDecimal >= config.horaInicio && horaDecimal < config.horaFim) {
    isOnline = true;
  } else if (config.sabadoAbre && diaSemana === 6 && horaDecimal >= config.horaInicio && horaDecimal < config.sabadoHoraFim) {
    isOnline = true;
  }

  const linkEl = document.getElementById("wa-link");
  const dotEl = document.getElementById("wa-status-dot");
  const textEl = document.getElementById("wa-status-text");
  const headerStatusEl = document.getElementById("header-wa-status");

  if (linkEl && dotEl && textEl) {
    if (isOnline) {
      dotEl.className = "wa-status-dot online";
      textEl.textContent = "Online Agora";
      const msg = encodeURIComponent("Olá! Gostaria de falar com a gestão da NEXO Tecnologia sobre as soluções da plataforma.");
      linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
      if (headerStatusEl) {
        headerStatusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Atendimento VIP Online`;
      }
    } else {
      linkEl.classList.add("offline-mode");
      dotEl.className = "wa-status-dot offline";
      textEl.textContent = "Fora do Expediente";
      const msg = encodeURIComponent("Olá! Gostaria de deixar uma mensagem para a gestão da NEXO Tecnologia para retorno no primeiro horário.");
      linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
      if (headerStatusEl) {
        headerStatusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> Retorno Prioritário às 08h`;
      }
    }
  }
}

/* ==========================================================================
   2. MENU MOBILE DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  function openMenu() {
    if (drawer && backdrop) {
      drawer.classList.remove("translate-x-full");
      backdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMenu() {
    if (drawer && backdrop) {
      drawer.classList.add("translate-x-full");
      backdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* ==========================================================================
   3. ABAS DO ECOSSISTEMA NEXO
   ========================================================================== */
function initEcosystemTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");

      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove("hidden");
          panel.classList.add("block");
        } else {
          panel.classList.add("hidden");
          panel.classList.remove("block");
        }
      });
    });
  });
}

/* ==========================================================================
   4. CALCULADORA DE GANHO DE PRODUTIVIDADE & VELOCIDADE
   ========================================================================== */
function initProductivityCalculator() {
  const usersInput = document.getElementById("calc-users");
  const leadsInput = document.getElementById("calc-leads");

  const usersDisplay = document.getElementById("calc-users-val");
  const leadsDisplay = document.getElementById("calc-leads-val");

  const hoursSavedDisplay = document.getElementById("calc-hours-saved");
  const conversionBoostDisplay = document.getElementById("calc-conversion-boost");
  const timeToLeadDisplay = document.getElementById("calc-time-to-lead");

  function updateProductivity() {
    if (!usersInput || !leadsInput) return;

    const users = parseInt(usersInput.value, 10);
    const leads = parseInt(leadsInput.value, 10);

    usersDisplay.textContent = users === 1 ? "1 corretor/usuário" : `${users} corretores`;
    leadsDisplay.textContent = `${leads} leads/mês`;

    const hoursPerMonth = users * 18;
    const hoursPerYear = hoursPerMonth * 12;

    let boostPercent = 35;
    if (leads > 50) boostPercent = 48;
    if (leads > 120) boostPercent = 65;

    const timeSavedMin = "< 40 seg";

    if (hoursSavedDisplay) {
      hoursSavedDisplay.textContent = `+${hoursPerYear.toLocaleString('pt-BR')} h/ano`;
    }
    if (conversionBoostDisplay) {
      conversionBoostDisplay.textContent = `+${boostPercent}% mais conversões`;
    }
    if (timeToLeadDisplay) {
      timeToLeadDisplay.textContent = timeSavedMin;
    }
  }

  if (usersInput && leadsInput) {
    usersInput.addEventListener("input", updateProductivity);
    leadsInput.addEventListener("input", updateProductivity);
    updateProductivity();
  }
}

/* ==========================================================================
   5. FAQ ACCORDION ELEGANTE
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    if (trigger && content) {
      trigger.addEventListener("click", () => {
        const isOpen = !content.classList.contains("hidden");

        faqItems.forEach(other => {
          const otherContent = other.querySelector(".faq-content");
          const otherIcon = other.querySelector(".faq-icon");
          if (otherContent) otherContent.classList.add("hidden");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        });

        if (!isOpen) {
          content.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        } else {
          content.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    }
  });
}

/* ==========================================================================
   6. MODAL DE AGENDAMENTO VIP & DEMONSTRAÇÃO
   ========================================================================== */
function initVipDemoModal() {
  const modal = document.getElementById("vip-demo-modal");
  const modalBackdrop = document.getElementById("vip-demo-backdrop");
  const openButtons = document.querySelectorAll(".open-demo-modal");
  const closeBtn = document.getElementById("vip-demo-close");
  const form = document.getElementById("vip-demo-form");

  function openModal() {
    if (modal && modalBackdrop) {
      modal.classList.remove("hidden");
      modalBackdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal && modalBackdrop) {
      modal.classList.add("hidden");
      modalBackdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  openButtons.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("modal-nome")?.value || "";
      const empresa = document.getElementById("modal-empresa")?.value || "";
      const segmento = document.getElementById("modal-segmento")?.value || "Imobiliária / Corretor";
      const faturamento = document.getElementById("modal-tamanho")?.value || "Até 5 colaboradores";

      const texto = `Olá! Gostaria de agendar uma Demonstração VIP com a gestão da NEXO Tecnologia:\n\n👤 *Nome:* ${nome}\n🏢 *Empresa:* ${empresa}\n🎯 *Segmento:* ${segmento}\n👥 *Equipe:* ${faturamento}\n\nPoderia me passar os próximos horários disponíveis?`;

      const encoded = encodeURIComponent(texto);
      window.open(`https://wa.me/5511970558412?text=${encoded}`, "_blank");
      closeModal();
    });
  }
}

/* ==========================================================================
   7. SCROLL EFFECT NO HEADER
   ========================================================================== */
function initHeaderScrollEffect() {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("shadow-2xl", "border-b", "border-white/10", "bg-[#090C14]/95");
      header.classList.remove("bg-[#090C14]/90");
    } else {
      header.classList.remove("shadow-2xl");
      header.classList.add("bg-[#090C14]/90");
    }
  });
}
