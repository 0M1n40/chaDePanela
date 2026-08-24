/* ==========================================================================
   SCRIPT.JS — lógica do site. Você normalmente NÃO precisa editar este
   arquivo. Todas as configurações ficam em config.js.
   Este mesmo arquivo é usado tanto em index.html quanto em presentes.html.
   Cada função verifica se os elementos que precisa existem na página
   atual antes de rodar — por isso não há erro quando uma função "de
   outra página" tenta rodar aqui.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* BIBLIOTECA DE ÍCONES DE LINHA (combinam com o estilo do convite)        */
/* ---------------------------------------------------------------------- */
const ICONES_SVG = {
  calendario: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>`,
  relogio: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  local: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
  folha: `<svg viewBox="0 0 24 24"><path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z"/><path d="M4 20 14 10"/></svg>`,
  coracao: `<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.6 2 5 5.6 5 8 5 10 6.5 12 9c2-2.5 4-4 6.4-4C22 5 23.6 8.6 22 11.7 19.5 16.1 12 21 12 21z"/></svg>`,
  casa: `<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z"/><path d="M10.2 14.5c.6-.9 1.9-1.5 1.8-1.5s1.2.6 1.8 1.5"/></svg>`,
};

function renderizarIcone(valor) {
  if (!valor) return "";
  if (valor.startsWith("svg:")) {
    const nome = valor.replace("svg:", "");
    return ICONES_SVG[nome] || "";
  }
  return valor; // emoji ou qualquer texto simples
}

/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Funções da página principal (index.html) — cada uma só faz algo se
  // os elementos correspondentes existirem na página atual.
  preencherTextosEstaticos();
  preencherDetalhesEvento();
  preencherIcones();
  iniciarContagemRegressiva();
  configurarMapa();
  configurarRSVP();

  // Funções da página de presentes (presentes.html)
  carregarListaDePresentes();
  configurarModalPresente();
});

/* ---------------------------------------------------------------------- */
/* TEXTOS ESTÁTICOS (vindos do config.js) — só existem em index.html      */
/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
/* ÍCONES DOS CARDS (data / hora / local) — só existem em index.html      */
/* ---------------------------------------------------------------------- */
function preencherIcones() {
  const iconData = document.getElementById("icon-data");
  const iconHora = document.getElementById("icon-hora");
  const iconLocal = document.getElementById("icon-local");
  if (!iconData || !iconHora || !iconLocal) return;

  const icones = (CONFIG.icones) || { data: "svg:calendario", hora: "svg:relogio", local: "svg:local" };
  iconData.innerHTML = renderizarIcone(icones.data);
  iconHora.innerHTML = renderizarIcone(icones.hora);
  iconLocal.innerHTML = renderizarIcone(icones.local);
}

/* ---------------------------------------------------------------------- */
/* CONTAGEM REGRESSIVA — só existe em index.html                          */
/* ---------------------------------------------------------------------- */
function iniciarContagemRegressiva() {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const alvo = new Date(CONFIG.evento.dataISO).getTime();

  function atualizar() {
    const agora = Date.now();
    const diff = alvo - agora;

    if (diff <= 0) {
      countdownEl.innerHTML =
        '<p style="font-size:1.1rem;font-weight:600;">🎉 É hoje o nosso Chá de Panela! 🎉</p>';
      clearInterval(intervalo);
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const seg = Math.floor((diff / 1000) % 60);

    document.getElementById("cd-dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("cd-horas").textContent = String(horas).padStart(2, "0");
    document.getElementById("cd-min").textContent = String(min).padStart(2, "0");
    document.getElementById("cd-seg").textContent = String(seg).padStart(2, "0");
  }

  atualizar();
  const intervalo = setInterval(atualizar, 1000);
}

/* ---------------------------------------------------------------------- */
/* MAPA — só existe em index.html                                         */
/* ---------------------------------------------------------------------- */
function configurarMapa() {
  const iframe = document.getElementById("map-iframe");
  if (!iframe) return;

  const busca = encodeURIComponent(CONFIG.mapaBusca || "Rio de Janeiro, RJ");
  const url = `https://maps.google.com/maps?q=${busca}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  iframe.src = url;

  const aviso = document.getElementById("mapa-aviso");
  if (aviso) {
    aviso.textContent = CONFIG.mapaLocalDefinido
      ? "Confira abaixo como chegar até o local da celebração."
      : "📌 O local ainda está sendo confirmado. Assim que definirmos, atualizaremos o mapa aqui!";
  }
}

/* ---------------------------------------------------------------------- */
/* LISTA DE PRESENTES — só existe em presentes.html                       */
/* ---------------------------------------------------------------------- */
const USANDO_APPS_SCRIPT =
  CONFIG.appsScriptUrl && !CONFIG.appsScriptUrl.includes("SUBSTITUA");

let presenteSelecionadoAtual = null;

async function carregarListaDePresentes() {
  const loading = document.getElementById("presentes-loading");
  const container = document.getElementById("gifts-categories");
  if (!loading || !container) return; // não estamos em presentes.html

  const banner = document.getElementById("presentes-demo-banner");

  if (!USANDO_APPS_SCRIPT) {
    banner.style.display = "block";
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
    loading.textContent =
      "Não foi possível carregar a lista de presentes agora. Tente novamente mais tarde.";
    console.error(err);
    return;
  }
  loading.style.display = "none";
}

/* Decide o que mostrar no lugar do ícone de presente 🎁:
   1) Se o item já vier com "foto" preenchida pelo Apps Script/planilha,
      usa essa.
   2) Senão, procura o nome exato do item em CONFIG.fotosPresentes
      (modo demonstração / configuração manual no config.js).
   3) Se não achar nenhuma foto, cai no emoji 🎁 de sempre.
   Se a imagem falhar ao carregar (link quebrado/expirado), o próprio
   card volta automaticamente para o emoji — veja o tratamento de erro
   logo abaixo, em renderizarPresentes(). */
function buscarFotoDoPresente(presente) {
  return (
    presente.foto ||
    (CONFIG.fotosPresentes && CONFIG.fotosPresentes[presente.item]) ||
    ""
  );
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

function renderizarFotoOuIcone(presente) {
  const fotoUrl = buscarFotoDoPresente(presente);
  if (!fotoUrl) {
    return `<div class="gift-icon">🎁</div>`;
  }
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
      const card = document.createElement("div");
      card.className = "gift-card" + (reservado ? " reserved" : "");
      card.innerHTML = `
        ${renderizarFotoOuIcone(presente)}
        <div class="gift-name">${presente.item}</div>
        <span class="gift-status ${reservado ? "reserved" : "available"}">
          ${reservado ? "Reservado" : "Disponível"}
        </span>
      `;
      if (!reservado) {
        card.addEventListener("click", () => abrirModalPresente(presente.item));
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

function configurarModalPresente() {
  const modal = document.getElementById("gift-modal");
  if (!modal) return; // não estamos em presentes.html

  const closeBtn = document.getElementById("gift-modal-close");
  const form = document.getElementById("gift-form");

  closeBtn.addEventListener("click", () => fecharModalPresente());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModalPresente();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("gift-name").value.trim();
    const email = document.getElementById("gift-email").value.trim();
    const feedback = document.getElementById("gift-feedback");

    if (!nome || !email) return;

    feedback.textContent = "Enviando...";
    feedback.style.color = "var(--brown-mid)";

    const sucesso = await reservarPresente(presenteSelecionadoAtual, nome, email);

    if (sucesso) {
      feedback.textContent = "🎉 Presente reservado com sucesso! Obrigado!";
      feedback.style.color = "#2E7D32";
      setTimeout(() => {
        fecharModalPresente();
        carregarListaDePresentes();
      }, 1400);
    } else {
      feedback.textContent =
        "Ops! Parece que alguém acabou de reservar este item. Escolha outro 💛";
      feedback.style.color = "#8B3A3A";
    }
  });
}

function abrirModalPresente(itemNome) {
  presenteSelecionadoAtual = itemNome;
  document.getElementById("gift-modal-item").textContent = itemNome;
  document.getElementById("gift-feedback").textContent = "";
  document.getElementById("gift-form").reset();
  document.getElementById("gift-modal").classList.add("open");
}

function fecharModalPresente() {
  document.getElementById("gift-modal").classList.remove("open");
}

async function reservarPresente(item, nome, email) {
  if (!USANDO_APPS_SCRIPT) {
    if (localStorage.getItem("presente_" + item)) return false;
    localStorage.setItem("presente_" + item, JSON.stringify({ nome, email }));
    return true;
  }

  try {
    const resp = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "reservar", item, nome, email }),
    });
    const dados = await resp.json();
    return dados.sucesso === true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/* ---------------------------------------------------------------------- */
/* CONFIRMAÇÃO DE PRESENÇA — só existe em index.html                      */
/* ---------------------------------------------------------------------- */
/* ⚠️ MUDANÇA IMPORTANTE: isso NÃO usa mais o Google Forms.
   Navegadores modernos bloqueiam ("403 Forbidden") o envio de dados para
   domínios do Google feito via formulário/iframe a partir de outro site
   — é uma barreira de segurança do navegador, não um problema de
   configuração. Por isso a confirmação de presença agora usa o mesmo
   Apps Script que já funciona para a lista de presentes (fetch simples,
   sem iframe, sem formulário escondido), gravando as respostas numa aba
   "RSVP" da planilha. Veja o README.md para o passo a passo. */
function configurarRSVP() {
  const btnVou = document.getElementById("btn-vou");
  const btnNaoVou = document.getElementById("btn-nao-vou");
  if (!btnVou || !btnNaoVou) return;

  const selecionado = document.getElementById("rsvp-selected");

  [btnVou, btnNaoVou].forEach((btn) => {
    btn.addEventListener("click", async () => {
      const nome = document.getElementById("rsvp-name").value.trim();
      const email = document.getElementById("rsvp-email").value.trim();
      const feedback = document.getElementById("rsvp-feedback");

      if (!nome || !email) {
        feedback.textContent = "Por favor, preencha seu nome e e-mail antes de confirmar.";
        feedback.style.color = "#8B3A3A";
        return;
      }

      btnVou.classList.remove("selected");
      btnNaoVou.classList.remove("selected");
      btn.classList.add("selected");
      btn.disabled = true;

      const valor = btn.dataset.value === "vou" ? "Vou comparecer" : "Não vou comparecer";
      selecionado.value = valor;

      feedback.textContent = "Enviando confirmação...";
      feedback.style.color = "var(--brown-mid)";

      const sucesso = await enviarConfirmacaoPresenca(nome, email, valor);

      btn.disabled = false;

      if (sucesso) {
        feedback.textContent =
          btn.dataset.value === "vou"
            ? "🎉 Presença confirmada! Mal podemos esperar para te ver!"
            : "Obrigado por nos avisar! Sentiremos sua falta 💛";
        feedback.style.color = "#2E7D32";
        document.getElementById("rsvp-form").reset();
        btnVou.classList.remove("selected");
        btnNaoVou.classList.remove("selected");
      } else {
        feedback.textContent =
          "⚠️ Não conseguimos confirmar agora. Confira se a aba \"RSVP\" existe na planilha e se o Apps Script foi atualizado (veja o README.md) — ou tente novamente em instantes.";
        feedback.style.color = "#8B3A3A";
      }
    });
  });
}

/* Envia a confirmação de presença para o Apps Script via fetch — o mesmo
   mecanismo que já funciona de forma confiável para a lista de presentes.
   Isso evita por completo os problemas de CORS/403 do Google Forms. */
async function enviarConfirmacaoPresenca(nome, email, confirmacao) {
  if (!USANDO_APPS_SCRIPT) {
    console.warn(
      "Apps Script não configurado em config.js (appsScriptUrl) — resposta não foi salva de verdade."
    );
    return true; // modo demonstração: simula sucesso para testar a interface
  }

  try {
    const resp = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "confirmarPresenca", nome, email, confirmacao }),
    });
    const dados = await resp.json();
    return dados.sucesso === true;
  } catch (err) {
    console.error("Erro ao enviar confirmação de presença:", err);
    return false;
  }
}
