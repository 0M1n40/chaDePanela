/* ==========================================================================
   CONFIG.JS — ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR NO DIA A DIA
   ==========================================================================
   Aqui ficam todas as informações "variáveis" do convite: data, local,
   e o link do Google Apps Script. Não mexa nos outros arquivos
   (index.html, style.css, script.js) a não ser que queira mudar o design.
   ========================================================================== */

const CONFIG = {
  // ---------------------------------------------------------------------
  // DETALHES DO EVENTO 🆗
  // ---------------------------------------------------------------------
  evento: {
    anfitrioes: "Ricardo & Norma",
    dataTexto: "10 de Outubro de 2026",     // texto exibido
    dataISO: "2026-10-10T15:30:00-03:00",   // usado na contagem regressiva
    horaTexto: "15:30",
    localNome: "R. Mississipe, 52 - Parque Paulista, Duque de Caxias - RJ, 25261-330",
  },

  // ---------------------------------------------------------------------
  // ÍCONES DOS CARDS "DETALHES DO EVENTO"
  icones: {
    data: "svg:calendario",
    hora: "svg:relogio",
    local: "svg:local",
  },

  // ---------------------------------------------------------------------
  // MAPA (Google Maps) 🆗
  mapaBusca: "R. Mississipe, 52 - Parque Paulista, Duque de Caxias - RJ, 25261-330",
  mapaLocalDefinido: true,

  // ---------------------------------------------------------------------
  // CONFIRMAÇÃO DE PRESENÇA
  // ---------------------------------------------------------------------
  // ✅ A confirmação de presença NÃO usa mais o Google Forms.
  //
  // Motivo: navegadores modernos (Edge, Chrome, Safari) com proteção
  // contra rastreamento bloqueiam envios para domínios do Google feitos
  // via formulário/iframe a partir de outro site — isso gera erro
  // "403 Forbidden" mesmo com tudo configurado corretamente. É uma
  // barreira de segurança do navegador, não um problema de configuração.
  //
  // Por isso a confirmação de presença agora usa o MESMO Apps Script já
  // configurado logo abaixo (appsScriptUrl) — o mesmo que já funciona
  // para a lista de presentes — gravando as respostas numa aba separada
  // chamada "RSVP" na sua planilha do Google Sheets.
  //
  // ⚠️ AÇÃO NECESSÁRIA (uma única vez):
  //   1. Na mesma planilha da lista de presentes, crie uma aba nova
  //      chamada exatamente "RSVP" com os cabeçalhos:
  //      Nome | Email | Confirmacao | DataResposta
  //   2. Atualize o código do Apps Script (Extensões → Apps Script) com
  //      o conteúdo mais recente de APPS_SCRIPT.gs.
  //   3. IMPORTANTE: depois de colar o novo código, vá em
  //      Implantar → Gerenciar implantações → ícone de lápis (editar) →
  //      "Nova versão" → Implantar. Só salvar o código não é suficiente;
  //      é preciso criar uma nova versão para a mudança valer no link
  //      que o site já está usando.
  // Veja o README.md para o passo a passo completo com mais detalhes.

  // ---------------------------------------------------------------------
  // FOTOS DOS PRESENTES (opcional)
  // ---------------------------------------------------------------------
  fotosPresentes: {
    "Cortinas 2p": "https://http2.mlstatic.com/D_NQ_NP_914929-MLB70552797564_072023-O.webp",
    "Tapete para sala 2p": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls8qek2tt5iz9b",
    "Ventilador": "https://m.media-amazon.com/images/I/41tyT5bVn7L._AC_SX679_.jpg",
    "Jogo de cama 3p": "https://th.bing.com/th/id/OIP.Yj0Uib3w3EPfE4EjdplzvwHaHa?w=170&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "Lençol com elástico 2p": "",
    "Fronhas 2p": "",
    "Edredom 2p": "",
    "Cobertor 2p": "",
    "Colcha 2p": "",
    "Manta 2p": "",
    "Travesseiros": "",
    "Cabides": "",
    "Cortina para quarto": "",
    "Tapete para quarto": "",
  },

  // ---------------------------------------------------------------------
  // LISTA DE PRESENTES (Google Sheets + Apps Script) 🆗
  // ---------------------------------------------------------------------
  // Este mesmo link agora também é usado pela Confirmação de Presença
  // (aba "RSVP" na mesma planilha).
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbx3Lyf2CLL2Q7TkX65uVCCrkZPxHFJqPC6VmhQRTIqososLM7G2qbVJzX_pgqCcriG4DQ/exec",

  presentesDemo: [
    {
      categoria: "🛋️ Sala",
      itens: ["Tapete para sala 2p", "Cortinas 2p", "Ventilador"],
    },
    {
      categoria: "🛏️ Quarto",
      itens: [
        "Jogo de cama 3p",
        "Lençol com elástico 2p",
        "Fronhas 2p",
        "Edredom 2p",
        "Cobertor 2p",
        "Colcha 2p",
        "Manta 2p",
        "Travesseiros",
        "Cabides",
        "Cortina para quarto",
        "Tapete para quarto",
      ],
    },
    {
      categoria: "🧺 Lavanderia",
      itens: [
        "Varal de chão",
        "Pregadores",
        "Baldes",
        "Bacias",
        "Aspirador vertical",
        "Tábua de passar roupa",
        "Ferro de passar",
        "Aromatizador",
      ],
    },
    {
      categoria: "🍲 Cozinha — Panelas e Formas",
      itens: [
        "Jogo de panelas 2p",
        "Panela de arroz elétrica",
        "Frigideira grande",
        "Leiteira",
        "Caldeirão",
        "Forma para bolo",
        "Forma para pudim",
        "Forma retangular",
        "Forma redonda",
        "Assadeira",
        "Travessa de vidro grande",
        "Travessa de vidro pequena",
      ],
    },
    {
      categoria: "🔪 Cozinha — Utensílios",
      itens: [
        "Jogo de facas",
        "Tábua de corte",
        "Colher de pau",
        "Kit de utensílios",
        "Fouet",
        "Amassador de batata",
        "Abridor de latas",
        "Saca-rolha",
        "Ralador",
        "Kit de peneiras",
        "Espremedor de limão",
        "Medidores de xícara",
        "Funil",
        "Tesoura de cozinha",
        "Pegador de massa",
        "Escorredor de macarrão",
        "Escorredor de arroz",
        "Pipoqueira",
        "Abridor de vinho",
        "Porta-pães",
        "Porta-bolos",
      ],
    },
    {
      categoria: "🫙 Cozinha — Organização",
      itens: [
        "Potes herméticos",
        "Potes para mantimentos",
        "Potes de vidro",
        "Organizador de gaveta",
        "Escorredor de louça",
        "Suporte para papel-toalha",
        "Organizador de geladeira",
        "Porta óleo e azeite",
      ],
    },
    {
      categoria: "🍽️ Cozinha — Mesa e Louça",
      itens: [
        "Jogo de pratos rasos",
        "Jogo de pratos fundos",
        "Jogo de pratos de sobremesa",
        "Jogo de bowls",
        "Jogo de copos",
        "Taças",
        "Xícaras de chá",
        "Pires",
        "Canecas",
        "Jogo de talheres",
        "Kit de colheres de sobremesa",
        "Jarra de água",
        "Jarra de suco",
        "Manteigueira",
        "Boleira",
        "Saladeira",
        "Petisqueira",
        "Molheira",
        "Lugar americano",
        "Aparelho de fondue",
      ],
    },
    {
      categoria: "⚡ Cozinha — Eletrodomésticos",
      itens: [
        "Liquidificador",
        "Air Fryer",
        "Batedeira",
        "Mixer",
        "Sanduicheira",
        "Cafeteira",
        "Chaleira elétrica",
        "Espremedor de frutas",
        "Panela elétrica multifuncional",
      ],
    },
  ],

  // ---------------------------------------------------------------------
  // MENSAGENS DE TEXTO EDITÁVEIS
  // ---------------------------------------------------------------------
  textos: {
    subAbertura: "Sua presença é o presente mais importante para nós.",
    avisoFinal: "Para deixar nossas fotos ainda mais bonitas, contamos com você para seguir o dress code acima e para quem for consumir bebidas alcoólicas, pedimos que traga oque for beber!🍻"
  },
};
