/**
 * NEXO TECNOLOGIA — SCRIPTS OFICIAIS & INTERATIVIDADE DE ULTRA LUXO
 * Desenvolvido para: Ricardo & Severino (2026)
 */

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppRealtimeStatus();
  initMobileNavigation();
  initEcosystemTabs();
  initRoiCalculator();
  initFaqAccordion();
  initVipDemoModal();
  initHeaderScrollEffect();
});

/* ==========================================================================
   1. ATENDIMENTO WHATSAPP EM TEMPO REAL (PADRÃO RICARDO & SEVERINO)
   ========================================================================== */
function initWhatsAppRealtimeStatus() {
  const config = {
    numero: "5511914879393", // WhatsApp Oficial do Ricardo / NEXO Tecnologia
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
      const msg = encodeURIComponent("Olá Ricardo! Estava navegando pelo site da NEXO Tecnologia e gostaria de agendar uma apresentação VIP.");
      linkEl.href = `https://wa.me/${config.numero}?text=${msg}`;
      if (headerStatusEl) {
        headerStatusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Atendimento VIP Online`;
      }
    } else {
      linkEl.classList.add("offline-mode");
      dotEl.className = "wa-status-dot offline";
      textEl.textContent = "Fora do Expediente";
      const msg = encodeURIComponent("Olá Ricardo! Visitei o site da NEXO Tecnologia fora do horário e gostaria de deixar uma mensagem para retorno prioritário.");
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
   4. CALCULADORA INTERATIVA DE ROI & ECONOMIA ANUAL
   ========================================================================== */
function initRoiCalculator() {
  const usersInput = document.getElementById("calc-users");
  const costInput = document.getElementById("calc-cost");

  const usersDisplay = document.getElementById("calc-users-val");
  const costDisplay = document.getElementById("calc-cost-val");

  const savingAnnualDisplay = document.getElementById("calc-savings-annual");
  const nexoCostMonthlyDisplay = document.getElementById("calc-nexo-cost");
  const oldCostAnnualDisplay = document.getElementById("calc-old-annual");
  const hoursSavedDisplay = document.getElementById("calc-hours-saved");

  function updateRoi() {
    if (!usersInput || !costInput) return;

    const users = parseInt(usersInput.value, 10);
    const oldCostPerUser = parseInt(costInput.value, 10);

    usersDisplay.textContent = users === 1 ? "1 usuário" : `${users} usuários`;
    costDisplay.textContent = `R$ ${oldCostPerUser}/mês`;

    // Custo antigo anual da imobiliária
    const oldMonthlyTotal = users * oldCostPerUser;
    const oldAnnualTotal = oldMonthlyTotal * 12;

    // Custo NEXO:
    // 1-2 usuários: NEXO Start (R$ 100/mês)
    // 3-6 usuários: NEXO Prime (R$ 150/mês)
    // 7+ usuários: NEXO Pro (R$ 250/mês)
    let nexoMonthly = 100;
    if (users >= 3 && users <= 6) {
      nexoMonthly = 150;
    } else if (users > 6) {
      nexoMonthly = 250;
    }

    const nexoAnnualTotal = nexoMonthly * 12;
    const annualSavings = Math.max(0, oldAnnualTotal - nexoAnnualTotal);
    const hoursSavedPerYear = users * 18 * 12; // Média de 18 horas economizadas por corretor/mês com portabilidade e simulação instantânea

    if (savingAnnualDisplay) {
      savingAnnualDisplay.textContent = `R$ ${annualSavings.toLocaleString('pt-BR')}`;
    }
    if (nexoCostMonthlyDisplay) {
      nexoCostMonthlyDisplay.textContent = `R$ ${nexoMonthly}/mês (Plano NEXO Fixo)`;
    }
    if (oldCostAnnualDisplay) {
      oldCostAnnualDisplay.textContent = `R$ ${oldAnnualTotal.toLocaleString('pt-BR')}/ano`;
    }
    if (hoursSavedDisplay) {
      hoursSavedDisplay.textContent = `+${hoursSavedPerYear.toLocaleString('pt-BR')} horas`;
    }
  }

  if (usersInput && costInput) {
    usersInput.addEventListener("input", updateRoi);
    costInput.addEventListener("input", updateRoi);
    updateRoi();
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

        // Fecha todos os outros
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

      const texto = `Olá Ricardo! Gostaria de agendar uma Demonstração VIP do Ecossistema NEXO Tecnologia:\n\n👤 *Nome:* ${nome}\n🏢 *Empresa:* ${empresa}\n🎯 *Segmento:* ${segmento}\n👥 *Equipe:* ${faturamento}\n\nPoderia me passar os próximos horários disponíveis?`;

      const encoded = encodeURIComponent(texto);
      window.open(`https://wa.me/5511914879393?text=${encoded}`, "_blank");
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
      header.classList.add("shadow-2xl", "border-b", "border-white/10", "bg-[#090A0F]/95");
      header.classList.remove("bg-[#090A0F]/80");
    } else {
      header.classList.remove("shadow-2xl");
      header.classList.add("bg-[#090A0F]/80");
    }
  });
}
