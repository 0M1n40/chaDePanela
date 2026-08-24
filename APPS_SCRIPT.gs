/* ============================================================================
   APPS_SCRIPT.gs
   ============================================================================
   Este código NÃO vai no site. Ele deve ser colado no editor do
   Google Apps Script, vinculado à sua planilha do Google Sheets.
   Veja o passo a passo completo no README.md.

   O que ele faz:
   - GET  ?action=listar                  -> devolve a lista de presentes por categoria
   - POST { action:"reservar" }           -> marca um presente como reservado
   - POST { action:"confirmarPresenca" }  -> grava uma confirmação de presença (RSVP)
                                              numa aba separada da planilha

   ⚠️ POR QUE A CONFIRMAÇÃO DE PRESENÇA NÃO USA MAIS O GOOGLE FORMS:
   Navegadores modernos (Edge, Chrome, Safari) com proteção contra
   rastreamento ativada bloqueiam envios de formulário para domínios do
   Google feitos via iframe escondido a partir de outro site — isso gera
   erro "403 Forbidden" mesmo com tudo configurado corretamente. É uma
   limitação de segurança do navegador, não um problema de configuração.
   Por isso, a confirmação de presença agora usa o MESMO mecanismo que já
   funciona para a lista de presentes (Apps Script via fetch simples),
   evitando o Google Forms por completo.
   ============================================================================ */

const SHEET_PRESENTES = "Presentes"; // aba da lista de presentes
const SHEET_RSVP = "RSVP";           // aba das confirmações de presença

function doGet(e) {
  const action = e.parameter.action;

  if (action === "listar") {
    return responderJSON({ categorias: listarPresentes() });
  }

  return responderJSON({ erro: "Ação inválida" });
}

function doPost(e) {
  const corpo = JSON.parse(e.postData.contents);

  if (corpo.action === "reservar") {
    const sucesso = reservarPresente(corpo.item, corpo.nome, corpo.email);
    return responderJSON({ sucesso: sucesso });
  }

  if (corpo.action === "confirmarPresenca") {
    const sucesso = confirmarPresenca(corpo.nome, corpo.email, corpo.confirmacao);
    return responderJSON({ sucesso: sucesso });
  }

  return responderJSON({ sucesso: false, erro: "Ação inválida" });
}

/* ---------------------------------------------------------------------- */

function getSheet(nomeAba) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nomeAba);
}

/* Colunas esperadas na planilha (linha 1 = cabeçalho):
   A: Categoria | B: Item | C: Status | D: ReservadoPor | E: EmailReservado | F: DataReserva | G: FotoURL
   Status deve ser "disponivel" ou "reservado"
*/
function listarPresentes() {
  const sheet = getSheet(SHEET_PRESENTES);
  const dados = sheet.getDataRange().getValues();

  const categoriasMap = {};
  const ordemCategorias = [];

  for (let i = 1; i < dados.length; i++) {
    const categoria = dados[i][0];
    const item = dados[i][1];
    const status = dados[i][2];
    const fotoUrl = dados[i][6];
    if (!item) continue;

    const catNome = categoria || "Outros";
    if (!categoriasMap[catNome]) {
      categoriasMap[catNome] = [];
      ordemCategorias.push(catNome);
    }
    categoriasMap[catNome].push({
      item: item,
      status: status || "disponivel",
      foto: fotoUrl || "",
    });
  }

  return ordemCategorias.map((cat) => ({
    categoria: cat,
    itens: categoriasMap[cat],
  }));
}

function reservarPresente(itemNome, nome, email) {
  const sheet = getSheet(SHEET_PRESENTES);
  const dados = sheet.getDataRange().getValues();

  for (let i = 1; i < dados.length; i++) {
    const item = dados[i][1];
    const status = dados[i][2];

    if (item === itemNome) {
      if (status === "reservado") {
        return false;
      }
      sheet.getRange(i + 1, 3).setValue("reservado");
      sheet.getRange(i + 1, 4).setValue(nome);
      sheet.getRange(i + 1, 5).setValue(email);
      sheet.getRange(i + 1, 6).setValue(new Date());
      return true;
    }
  }
  return false;
}

/* Grava uma confirmação de presença na aba "RSVP".
   Colunas esperadas na aba (linha 1 = cabeçalho):
   A: Nome | B: Email | C: Confirmacao | D: DataResposta
   "Confirmacao" será o texto "Vou comparecer" ou "Não vou comparecer".

   ⚠️ Se a aba "RSVP" ainda não existir na planilha, crie-a manualmente
   com esses 4 cabeçalhos na linha 1 antes de usar o site.
*/
function confirmarPresenca(nome, email, confirmacao) {
  const sheet = getSheet(SHEET_RSVP);
  if (!sheet) {
    // Aba "RSVP" ainda não foi criada na planilha — veja o README.md.
    return false;
  }
  sheet.appendRow([nome, email, confirmacao, new Date()]);
  return true;
}

function responderJSON(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
