/* ==========================================================================
   SCRIPT.JS — Lógica com LocalStorage e Acompanhantes
   ========================================================================== */

const ICONES_SVG = {
  calendario: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>`,
  relogio: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  local: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
};

function renderizarIcone(valor) {
  if (!valor) return "";
  if (valor.startsWith("svg:")) {
    const nome = valor.replace("svg:", "");
    return ICONES_SVG[nome] || "";
  }
  return valor;
}
/* ---------------- ADAPTAÇÃO AUTOMÁTICA PC / CELULAR ---------------- */
function configurarImagensPorDispositivo() {
  const container = document.getElementById("hero-convite-container");
  const siteBgBlur = document.querySelector(".site-bg-blur");
  if (!container) return;

  // Detecta se é celular (largura de tela menor ou igual a 768px)
  const ehCelular = window.innerWidth <= 768;

  if (ehCelular) {
  
    container.innerHTML = `
      <img
        src="assets/convite2.png"
        alt="Convite Chá de Panela"
        class="hero-image"
      />
    `;
    if (siteBgBlur) {
      siteBgBlur.style.backgroundImage = 'url("assets/fundo.png")';
    }
  } else {
    // Versão Computador: usa convitePC.png e fundoPC
    container.innerHTML = `
      <img
        src="assets/convitePC.png"
        alt="Convite Chá de Panela"
        class="hero-image"
      />
    `;
    if (siteBgBlur) {
      siteBgBlur.style.backgroundImage = 'url("assets/fundoPC.png")';
    }
  }
}

/* ---------------- GESTÃO DE LOCALSTORAGE ---------------- */
function salvarDadosConvidado(nome, email) {
  if (nome) localStorage.setItem("cha_convidado_nome", nome);
  if (email) localStorage.setItem("cha_convidado_email", email);
}

function obterDadosConvidado() {
  return {
    nome: localStorage.getItem("cha_convidado_nome") || "",
    email: localStorage.getItem("cha_convidado_email") || ""
  };
}

function preencherCamposLocalStorage() {
  const dados = obterDadosConvidado();
  const rsvpNome = document.getElementById("rsvp-name");
  const rsvpEmail = document.getElementById("rsvp-email");
  const giftNome = document.getElementById("gift-name");
  const giftEmail = document.getElementById("gift-email");

  if (rsvpNome && dados.nome) rsvpNome.value = dados.nome;
  if (rsvpEmail && dados.email) rsvpEmail.value = dados.email;
  if (giftNome && dados.nome) giftNome.value = dados.nome;
  if (giftEmail && dados.email) giftEmail.value = dados.email;
}

document.addEventListener("DOMContentLoaded", () => {
  configurarModalCancelamentoRSVP();
  configurarModalCancelamento();
  configurarPix();
  preencherTextosEstaticos();
  preencherDetalhesEvento();
  preencherIcones();
  iniciarContagemRegressiva();
  configurarMapa();
  configurarRSVP();

  carregarListaDePresentes();
  configurarCarrinhoEModal();
  preencherCamposLocalStorage();

  configurarImagensPorDispositivo();
});

/* ---------------- INDEX / RSVP ---------------- */
function preencherTextosEstaticos() {
  const subAbertura = document.getElementById("txt-sub-abertura");
  const avisoFinal = document.getElementById("txt-aviso-final");
  if (subAbertura) subAbertura.textContent = CONFIG.textos.subAbertura;
  if (avisoFinal) avisoFinal.textContent = CONFIG.textos.avisoFinal;
}

function preencherDetalhesEvento() {
  const data = document.getElementById("info-data");
  const hora = document.getElementById("info-hora");
  const local = document.getElementById("info-local");
  if (!data || !hora || !local) return;
  data.textContent = CONFIG.evento.dataTexto;
  hora.textContent = CONFIG.evento.horaTexto;
  local.textContent = CONFIG.evento.localNome;
}

function preencherIcones() {
  const iconData = document.getElementById("icon-data");
  const iconHora = document.getElementById("icon-hora");
  const iconLocal = document.getElementById("icon-local");
  if (!iconData || !iconHora || !iconLocal) return;

  const icones = CONFIG.icones || { data: "svg:calendario", hora: "svg:relogio", local: "svg:local" };
  iconData.innerHTML = renderizarIcone(icones.data);
  iconHora.innerHTML = renderizarIcone(icones.hora);
  iconLocal.innerHTML = renderizarIcone(icones.local);
}

function iniciarContagemRegressiva() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;
  const alvo = new Date(CONFIG.evento.dataISO).getTime();

  function atualizar() {
    const agora = Date.now();
    const diff = alvo - agora;
    if (diff <= 0) {
      countdownEl.innerHTML = '<p style="font-size:1.1rem;font-weight:600;">🎉 É hoje o nosso Chá de Panela! 🎉</p>';
      clearInterval(intervalo);
      return;
    }
    document.getElementById("cd-dias").textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
    document.getElementById("cd-horas").textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    document.getElementById("cd-min").textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    document.getElementById("cd-seg").textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  }
  atualizar();
  const intervalo = setInterval(atualizar, 1000);
}

function configurarMapa() {
  const iframe = document.getElementById("map-iframe");
  if (!iframe) return;
  const busca = encodeURIComponent(CONFIG.mapaBusca || "Rio de Janeiro, RJ");
  iframe.src = `https://maps.google.com/maps?q=${busca}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function configurarRSVP() {
  const btnVou = document.getElementById("btn-vou");
  const btnNaoVou = document.getElementById("btn-nao-vou");
  if (!btnVou || !btnNaoVou) return;

  [btnVou, btnNaoVou].forEach((btn) => {
    btn.addEventListener("click", async () => {
      const nome = document.getElementById("rsvp-name").value.trim();
      const email = document.getElementById("rsvp-email").value.trim();
      const guestsInput = document.getElementById("rsvp-guests");
      const feedback = document.getElementById("rsvp-feedback");

      if (!nome || !email) {
        feedback.textContent = "Por favor, preencha seu nome e e-mail antes de confirmar.";
        feedback.style.color = "#8B3A3A";
        return;
      }

      // Salva dados no navegador
      salvarDadosConvidado(nome, email);

      const valor = btn.dataset.value === "vou" ? "Vou comparecer" : "Não vou comparecer";
      const acompanhantes = valor === "Vou comparecer" ? (parseInt(guestsInput.value) || 0) : 0;

      btnVou.disabled = true;
      btnNaoVou.disabled = true;

      feedback.textContent = "Enviando confirmação e e-mail...";
      feedback.style.color = "var(--brown-mid)";

      const sucesso = await enviarConfirmacaoPresenca(nome, email, valor, acompanhantes);
      btnVou.disabled = false;
      btnNaoVou.disabled = false;

      if (sucesso) {
        feedback.textContent = valor === "Vou comparecer"
          ? "🎉 Presença confirmada! Enviamos um e-mail com todos os detalhes."
          : "Obrigado por nos avisar! Sentiremos sua falta 💛";
        feedback.style.color = "#2E7D32";
      } else {
        feedback.textContent = "⚠️ Houve um problema ao salvar. Tente novamente em instantes.";
        feedback.style.color = "#8B3A3A";
      }
    });
  });
}

async function enviarConfirmacaoPresenca(nome, email, confirmacao, acompanhantes) {
  if (!USANDO_APPS_SCRIPT) return true;
  try {
    const resp = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "confirmarPresenca", nome, email, confirmacao, acompanhantes }),
    });
    const dados = await resp.json();
    return dados.sucesso === true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/* ---------------- LISTA & CARRINHO DE PRESENTES ---------------- */
const USANDO_APPS_SCRIPT = CONFIG.appsScriptUrl && !CONFIG.appsScriptUrl.includes("SUBSTITUA");
let carrinhoPresentes = new Set();

async function carregarListaDePresentes() {
  const loading = document.getElementById("presentes-loading");
  const container = document.getElementById("gifts-categories");
  if (!loading || !container) return;

  if (!USANDO_APPS_SCRIPT) {
    document.getElementById("presentes-demo-banner").style.display = "block";
    const categorias = CONFIG.presentesDemo.map((cat) => ({
      categoria: cat.categoria,
      itens: cat.itens.map((nomeItem) => ({
        item: nomeItem,
        status: localStorage.getItem("presente_" + nomeItem) ? "reservado" : "disponivel",
      })),
    }));
    renderizarPresentes(categorias);
    loading.style.display = "none";
    return;
  }

  try {
    const resp = await fetch(CONFIG.appsScriptUrl + "?action=listar");
    const dados = await resp.json();
    renderizarPresentes(dados.categorias || []);
  } catch (err) {
    loading.textContent = "Não foi possível carregar a lista agora. Tente mais tarde.";
    console.error(err);
  }
  loading.style.display = "none";
}

function buscarFotoDoPresente(presente) {
  return presente.foto || (CONFIG.fotosPresentes && CONFIG.fotosPresentes[presente.item]) || "";
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function renderizarFotoOuIcone(presente) {
  const fotoUrl = buscarFotoDoPresente(presente);
  if (!fotoUrl) return `<div class="gift-icon">🎁</div>`;
  return `
    <div class="gift-photo">
      <img src="${escaparHtml(fotoUrl)}" alt="${escaparHtml(presente.item)}" loading="lazy" />
    </div>
  `;
}

function renderizarPresentes(categorias) {
  const container = document.getElementById("gifts-categories");
  container.innerHTML = "";

  categorias.forEach((cat) => {
    const bloco = document.createElement("div");
    bloco.className = "gift-category";

    const titulo = document.createElement("h3");
    titulo.className = "gift-category-title";
    titulo.textContent = cat.categoria;
    bloco.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "gifts-grid";

    cat.itens.forEach((presente) => {
      const reservado = presente.status === "reservado";
      const isSelected = carrinhoPresentes.has(presente.item);

      const card = document.createElement("div");
      card.className = `gift-card ${reservado ? "reserved" : ""} ${isSelected ? "selected-in-cart" : ""}`;
      card.innerHTML = `
        ${renderizarFotoOuIcone(presente)}
        <div class="gift-name">${presente.item}</div>
        <span class="gift-status ${reservado ? "reserved" : (isSelected ? "in-cart" : "available")}">
          ${reservado ? "Reservado" : (isSelected ? "✓ Na sacola" : "+ Adicionar")}
        </span>
      `;

      if (!reservado) {
        card.addEventListener("click", () => alternarItemCarrinho(presente.item, card));
      }

      const img = card.querySelector(".gift-photo img");
      if (img) {
        img.addEventListener("error", () => {
          const foto = card.querySelector(".gift-photo");
          if (foto) foto.outerHTML = `<div class="gift-icon">🎁</div>`;
        });
      }

      grid.appendChild(card);
    });

    bloco.appendChild(grid);
    container.appendChild(bloco);
  });
}

function alternarItemCarrinho(itemNome, cardEl) {
  if (carrinhoPresentes.has(itemNome)) {
    carrinhoPresentes.delete(itemNome);
    if (cardEl) {
      cardEl.classList.remove("selected-in-cart");
      const badge = cardEl.querySelector(".gift-status");
      badge.className = "gift-status available";
      badge.textContent = "+ Adicionar";
    }
  } else {
    carrinhoPresentes.add(itemNome);
    if (cardEl) {
      cardEl.classList.add("selected-in-cart");
      const badge = cardEl.querySelector(".gift-status");
      badge.className = "gift-status in-cart";
      badge.textContent = "✓ Na sacola";
    }
  }
  atualizarBarraCarrinho();
}

function atualizarBarraCarrinho() {
  const bar = document.getElementById("cart-bar");
  const count = document.getElementById("cart-count");
  if (!bar || !count) return;

  const total = carrinhoPresentes.size;
  count.textContent = total;

  if (total > 0) {
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
  }
}

function configurarCarrinhoEModal() {
  const modal = document.getElementById("gift-modal");
  const btnOpen = document.getElementById("btn-open-cart");
  const btnClose = document.getElementById("gift-modal-close");
  const form = document.getElementById("gift-form");
  if (!modal || !btnOpen) return;

  btnOpen.addEventListener("click", () => {
    if (carrinhoPresentes.size === 0) return;
    renderizarListaModal();
    preencherCamposLocalStorage();
    document.getElementById("gift-feedback").textContent = "";
    modal.classList.add("open");
  });

  btnClose.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("gift-name").value.trim();
    const email = document.getElementById("gift-email").value.trim();
    const feedback = document.getElementById("gift-feedback");
    const btnSubmit = document.getElementById("btn-submit-gift");

    if (!nome || !email || carrinhoPresentes.size === 0) return;

    salvarDadosConvidado(nome, email);

    btnSubmit.disabled = true;
    feedback.textContent = "Reservando presentes e enviando e-mail...";
    feedback.style.color = "var(--brown-mid)";

    const itensArray = Array.from(carrinhoPresentes);
    const sucesso = await reservarPresentesAPI(itensArray, nome, email);

    btnSubmit.disabled = false;

    if (sucesso) {
      feedback.textContent = "🎉 Reserva confirmada! Enviamos a lista para o seu e-mail.";
      feedback.style.color = "#2E7D32";
      carrinhoPresentes.clear();
      atualizarBarraCarrinho();
      setTimeout(() => {
        modal.classList.remove("open");
        form.reset();
        carregarListaDePresentes();
      }, 2000);
    } else {
      feedback.textContent = "Ops! Um dos itens foi reservado recentemente. Atualizando...";
      feedback.style.color = "#8B3A3A";
      setTimeout(() => carregarListaDePresentes(), 1500);
    }
  });
}

function renderizarListaModal() {
  const lista = document.getElementById("cart-items-list");
  lista.innerHTML = "";

  carrinhoPresentes.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item-row";
    row.innerHTML = `
      <span>🎁 ${item}</span>
      <button type="button" class="btn-remove-item" title="Remover">&times;</button>
    `;
    row.querySelector(".btn-remove-item").addEventListener("click", () => {
      carrinhoPresentes.delete(item);
      renderizarListaModal();
      atualizarBarraCarrinho();
      carregarListaDePresentes();
      if (carrinhoPresentes.size === 0) {
        document.getElementById("gift-modal").classList.remove("open");
      }
    });
    lista.appendChild(row);
  });
}

async function reservarPresentesAPI(itens, nome, email) {
  if (!USANDO_APPS_SCRIPT) {
    itens.forEach((item) => localStorage.setItem("presente_" + item, JSON.stringify({ nome, email })));
    return true;
  }

  try {
    const resp = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "reservar", itens: itens, nome: nome, email: email }),
    });
    const dados = await resp.json();
    return dados.sucesso === true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
/* ---------------- COPIAR CHAVE PIX ---------------- */
function configurarPix() {
  const btnCopy = document.getElementById("btn-copy-pix");
  const pixKeyVal = document.getElementById("pix-key-text");
  const pixTypeLabel = document.getElementById("pix-type-label");
  const feedback = document.getElementById("pix-feedback");

  if (!btnCopy || !CONFIG.pix) return;

  if (pixKeyVal && CONFIG.pix.chave) {
    pixKeyVal.textContent = CONFIG.pix.chave;
  }
  if (pixTypeLabel && CONFIG.pix.tipo) {
    pixTypeLabel.textContent = `Chave ${CONFIG.pix.tipo}`;
  }

  btnCopy.addEventListener("click", async () => {
    const chave = CONFIG.pix.chave || pixKeyVal.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(chave);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = chave;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      feedback.textContent = "✅ Chave PIX copiada! Abra o app do seu banco para colar.";
      feedback.style.color = "#2E7D32";
      btnCopy.innerHTML = "<span>✓</span> Copiado!";

      setTimeout(() => {
        btnCopy.innerHTML = "<span>📋</span> Copiar Chave";
        feedback.textContent = "";
      }, 4000);
    } catch (err) {
      feedback.textContent = "Chave: " + chave;
      feedback.style.color = "var(--brown-dark)";
    }
  });
}
/* ==========================================================================
   GERENCIAR / CANCELAR RESERVAS DE PRESENTES
   ========================================================================== */
function configurarModalCancelamento() {
  const modal = document.getElementById("cancel-modal");
  const btnOpen = document.getElementById("btn-open-cancel-modal");
  const btnClose = document.getElementById("cancel-modal-close");
  const form = document.getElementById("cancel-search-form");
  const emailInput = document.getElementById("cancel-email-input");
  const resultsList = document.getElementById("cancel-results-list");
  const feedback = document.getElementById("cancel-feedback");

  if (!modal || !btnOpen) return;

  // Abre o modal e preenche com o e-mail do localStorage (se houver)
  btnOpen.addEventListener("click", () => {
    const dados = obterDadosConvidado();
    if (dados.email && emailInput) emailInput.value = dados.email;
    resultsList.style.display = "none";
    resultsList.innerHTML = "";
    feedback.textContent = "";
    modal.classList.add("open");
  });

  btnClose.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  // Busca os presentes reservados pelo e-mail
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    feedback.textContent = "Buscando reservas...";
    feedback.style.color = "var(--brown-mid)";
    resultsList.style.display = "none";
    resultsList.innerHTML = "";

    try {
      const resp = await fetch(CONFIG.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "buscarMinhasReservas", email: email }),
      });
      const dados = await resp.json();

      if (dados.itens && dados.itens.length > 0) {
        feedback.textContent = `Encontramos ${dados.itens.length} presente(s) reservados:`;
        feedback.style.color = "#2E7D32";
        renderizarItensParaCancelamento(dados.itens, email);
      } else {
        feedback.textContent = "Nenhum presente reservado com este e-mail.";
        feedback.style.color = "var(--brown-mid)";
      }
    } catch (err) {
      feedback.textContent = "Erro ao buscar reservas. Tente novamente.";
      feedback.style.color = "#8B3A3A";
    }
  });
}

function renderizarItensParaCancelamento(itens, email) {
  const container = document.getElementById("cancel-results-list");
  container.innerHTML = "";
  container.style.display = "block";

  itens.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cancel-item-row";
    row.innerHTML = `
      <span>🎁 <strong>${item}</strong></span>
      <button type="button" class="btn-liberar-item">Liberar</button>
    `;

    const btnLiberar = row.querySelector(".btn-liberar-item");
    btnLiberar.addEventListener("click", async () => {
      btnLiberar.disabled = true;
      btnLiberar.textContent = "Liberando...";

      const sucesso = await cancelarReservaNoBackend(item, email);
      if (sucesso) {
        row.remove();
        carregarListaDePresentes(); // Atualiza a vitrine na hora
        const restantes = container.querySelectorAll(".cancel-item-row").length;
        if (restantes === 0) {
          container.style.display = "none";
          document.getElementById("cancel-feedback").textContent = "Todos os itens foram liberados com sucesso!";
        }
      } else {
        btnLiberar.disabled = false;
        btnLiberar.textContent = "Erro";
      }
    });

    container.appendChild(row);
  });
}

async function cancelarReservaNoBackend(item, email) {
  try {
    const resp = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "cancelarReserva", item: item, email: email }),
    });
    const dados = await resp.json();
    return dados.sucesso === true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
/* ---------------- GERENCIAR / CANCELAR RSVP ---------------- */
function configurarModalCancelamentoRSVP() {
  const modal = document.getElementById("cancel-rsvp-modal");
  const btnOpen = document.getElementById("btn-open-cancel-rsvp");
  const btnClose = document.getElementById("cancel-rsvp-modal-close");
  const form = document.getElementById("cancel-rsvp-form");
  const emailInput = document.getElementById("cancel-rsvp-email");
  const resultDiv = document.getElementById("cancel-rsvp-result");
  const feedback = document.getElementById("cancel-rsvp-feedback");

  if (!modal || !btnOpen) return;

  btnOpen.addEventListener("click", () => {
    const dados = obterDadosConvidado();
    if (dados.email && emailInput) emailInput.value = dados.email;
    resultDiv.style.display = "none";
    resultDiv.innerHTML = "";
    feedback.textContent = "";
    modal.classList.add("open");
  });

  btnClose.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;

    feedback.textContent = "Buscando confirmação...";
    feedback.style.color = "var(--brown-mid)";
    resultDiv.style.display = "none";

    try {
      const resp = await fetch(CONFIG.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "buscarMeuRSVP", email: email }),
      });
      const dados = await resp.json();

      if (dados.sucesso && dados.rsvp) {
        feedback.textContent = "Confirmação encontrada:";
        feedback.style.color = "#2E7D32";
        renderizarDetalhesRSVP(dados.rsvp, email);
      } else {
        feedback.textContent = "Nenhuma confirmação encontrada para este e-mail.";
        feedback.style.color = "#8B3A3A";
      }
    } catch (err) {
      feedback.textContent = "Erro ao buscar dados. Tente novamente.";
      feedback.style.color = "#8B3A3A";
    }
  });
}

function renderizarDetalhesRSVP(rsvp, email) {
  const container = document.getElementById("cancel-rsvp-result");
  container.innerHTML = "";
  container.style.display = "block";

  container.innerHTML = `
    <div style="padding: 6px 0; font-size: 0.9rem; margin-bottom: 10px;">
      <p><strong>Nome:</strong> ${rsvp.nome}</p>
      <p><strong>Status:</strong> ${rsvp.confirmacao}</p>
      <p><strong>Acompanhantes:</strong> ${rsvp.acompanhantes}</p>
    </div>
    <button type="button" id="btn-deletar-rsvp" class="btn-liberar-item" style="width:100%; padding: 8px; font-size: 0.85rem;">
      🗑️ Cancelar / Apagar minha confirmação
    </button>
  `;

  document.getElementById("btn-deletar-rsvp").addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja apagar sua confirmação de presença?")) return;

    const btn = document.getElementById("btn-deletar-rsvp");
    btn.disabled = true;
    btn.textContent = "Cancelando...";

    try {
      const resp = await fetch(CONFIG.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "cancelarRSVP", email: email }),
      });
      const dados = await resp.json();

      if (dados.sucesso) {
        container.style.display = "none";
        document.getElementById("cancel-rsvp-feedback").textContent = "Presença cancelada com sucesso da nossa lista!";
        document.getElementById("cancel-rsvp-feedback").style.color = "#2E7D32";
      } else {
        btn.disabled = false;
        btn.textContent = "Erro ao cancelar. Tente novamente.";
      }
    } catch (err) {
      btn.disabled = false;
      console.error(err);
    }
  });
}