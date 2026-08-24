# 🫖 Convite Interativo — Chá de Panela Ricardo & Norma

Site estático (HTML/CSS/JS puro), responsivo, gratuito e sem necessidade de
servidor próprio. Só precisa de uma conta Google (para o Forms e o Apps
Script) e de uma plataforma de hospedagem estática gratuita.

---

## 📁 Estrutura dos arquivos

```
cha-de-panela/
├── index.html         → página principal (convite, detalhes, RSVP, mapa)
├── presentes.html      → página separada só com a lista de presentes
├── style.css           → visual do site (compartilhado pelas duas páginas)
├── script.js           → lógica/interatividade + biblioteca de ícones
├── config.js           → ⭐ ÚNICO ARQUIVO QUE VOCÊ EDITA no dia a dia
├── APPS_SCRIPT.gs       → código para colar no Google Apps Script
├── assets/
│   ├── convite.jpg
│   └── dresscode.jpg
└── README.md
```

---

## 🛠️ Correção definitiva: Confirmação de Presença não usa mais Google Forms

A confirmação de presença **não envia mais dados para o Google Forms**.
Agora ela usa o mesmo mecanismo que já funciona perfeitamente para a lista
de presentes: o **Apps Script**, que grava as respostas direto numa aba da
sua planilha do Google Sheets.

### Por que essa mudança foi necessária
As duas tentativas anteriores (fetch com `no-cors`, depois formulário HTML
com iframe escondido) esbarraram no mesmo obstáculo: **navegadores
modernos (Edge, Chrome, Safari) com proteção contra rastreamento ativada
bloqueiam envios para domínios do Google feitos a partir de outro site**,
gerando erro `403 Forbidden` mesmo com tudo configurado corretamente. Isso
foi confirmado no Console do navegador com o erro:
```
POST https://docs.google.com/forms/d/e/.../formResponse
net::ERR_ABORTED 403 (Forbidden)
```
acompanhado do aviso `Tracking Prevention blocked access to storage`. Ou
seja: **não era um problema de configuração** — é uma barreira de
segurança do próprio navegador contra esse tipo de técnica.

A solução definitiva foi eliminar o Google Forms da equação e usar
**apenas** o Apps Script (que é o seu próprio backend, sem essas
restrições de terceiros) tanto para presentes quanto para o RSVP.

### ⚠️ O que você precisa fazer agora: criar a aba "RSVP"

Na **mesma planilha do Google Sheets** que você já usa para a lista de
presentes, crie uma **segunda aba** chamada exatamente `RSVP`, com estes
cabeçalhos na linha 1:

| Nome | Email | Confirmacao | DataResposta |
|---|---|---|---|

Não precisa preencher nada além do cabeçalho — o Apps Script preenche as
linhas automaticamente conforme os convidados forem confirmando.

Depois, você também precisa **atualizar o código do Apps Script** com a
versão mais recente do arquivo `APPS_SCRIPT.gs` (ela agora tem uma função
nova, `confirmarPresenca`). Se você já tinha implantado o Apps Script
antes:
1. Abra o projeto do Apps Script (**Extensões → Apps Script** na planilha).
2. Apague todo o código antigo e cole o conteúdo atualizado de `APPS_SCRIPT.gs`.
3. Clique em **Implantar → Gerenciar implantações** → ícone de lápis (editar) → **Nova versão** → **Implantar**.
   > Isso é importante: só salvar o código não é suficiente, é preciso
   > criar uma **nova versão** da implantação para as mudanças valerem
   > no link que já está em uso no site.

### Como confirmar que está funcionando
1. Abra o site e preencha o formulário de RSVP.
2. Clique em "Vou comparecer" ou "Não vou comparecer".
3. Abra a aba **"RSVP"** da sua planilha do Google Sheets.
4. Confirme se uma nova linha apareceu com nome, e-mail, a opção escolhida e a data.

### Se ainda não funcionar
1. Confira se `appsScriptUrl` no `config.js` está preenchido corretamente
   (o mesmo link usado para os presentes).
2. Confira se a aba se chama exatamente `RSVP` (sem espaços, maiúsculas
   exatas).
3. Confira se você criou uma **nova implantação** depois de atualizar o
   código do Apps Script (passo acima) — esse é o erro mais comum.
4. Abra o Console do navegador (F12 → "Console") ao clicar em "Vou
   comparecer" — se aparecer algum erro ali, me envie a mensagem exata.

---

## 🖼️ Como colocar a FOTO do produto no lugar do ícone 🎁

Você **não precisa baixar nem hospedar nenhuma imagem**. Basta colar o
**link direto** da foto.

1. Pesquise o produto no **Google Imagens**.
2. Clique com o **botão direito** na foto → **"Copiar endereço da imagem"**.
3. Cole no `config.js`, bloco `fotosPresentes`:
   ```js
   fotosPresentes: {
     "Tapete para sala 2p": "https://exemplo.com/imagens/tapete.jpg",
   },
   ```

> ⚠️ O link certo termina em `.jpg`, `.png` ou `.webp`. Links do tipo
> `google.com/imgres?...` não funcionam — abra a imagem sozinha numa aba
> nova e copie o endereço de lá.

Se você já usa o Apps Script/planilha, adicione uma coluna **G** chamada
`FotoURL` na aba "Presentes" e cole o link ali.

Se um link quebrar depois, o site detecta automaticamente e volta a
mostrar o ícone 🎁, sem quebrar o layout.

---

## 🎨 Como trocar os ícones de Data / Hora / Local

No `config.js`, bloco `icones`:
```js
icones: {
  data: "svg:calendario",
  hora: "svg:relogio",
  local: "svg:local",
},
```
- Emoji: `icones: { data: "🗓️", hora: "⏰", local: "🏡" }`
- Ícone de linha: `svg:calendario`, `svg:relogio`, `svg:local`, `svg:folha`, `svg:coracao`, `svg:casa`.

---

## ✅ Passo a passo de configuração

### 1. Confirmação de presença + Lista de presentes → Google Sheets + Apps Script

Ambas as funcionalidades (RSVP e lista de presentes) usam **a mesma
planilha e o mesmo Apps Script**, só que em abas diferentes:

1. Crie uma planilha no [Google Sheets](https://sheets.google.com).
2. Crie a aba **`Presentes`** com os cabeçalhos:
   `Categoria | Item | Status | ReservadoPor | EmailReservado | DataReserva | FotoURL`
   — preencha **Categoria** e **Item** de cada linha (Status e FotoURL são opcionais).
3. Crie a aba **`RSVP`** com os cabeçalhos:
   `Nome | Email | Confirmacao | DataResposta`
   — não precisa preencher nada além do cabeçalho.
4. Na planilha, vá em **Extensões → Apps Script** → apague o código de
   exemplo → cole o conteúdo completo de `APPS_SCRIPT.gs`.
5. **Implantar → Nova implantação** → Tipo: **App da Web** → Executar
   como: **Eu** → Acesso: **Qualquer pessoa**.
6. Copie a URL gerada (termina em `/exec`) e cole em `appsScriptUrl` no `config.js`.

> ✅ Pronto — com isso, tanto a confirmação de presença quanto a lista de
> presentes funcionam através do mesmo link. Não é mais necessário criar
> nem configurar nenhum Google Forms.

### 3. Data, hora, local e mapa
No `config.js`, blocos `evento` e `mapaBusca`.

### 4. Textos editáveis
No `config.js`, bloco `textos`.

---

## 🚀 Como colocar o site no ar (deploy)

### GitHub Pages (recomendado)
1. Crie um repositório novo, suba todos os arquivos desta pasta.
2. **Settings → Pages** → Source: branch `main`, pasta `/ (root)`.
3. Site no ar em `https://seu-usuario.github.io/cha-de-panela/`

### Alternativas sem git
- **Netlify Drop** ([app.netlify.com/drop](https://app.netlify.com/drop))
- **Vercel** ([vercel.com](https://vercel.com))

> 💡 Publicar o site (mesmo que em um link de teste) é a forma mais
> confiável de validar que tudo funciona exatamente como vai funcionar
> no dia do evento.



ml
---

## 🔧 Manutenção no dia a dia

| O que mudar | Onde mexer |
|---|---|
| Ícones de Data / Hora / Local | `config.js` → bloco `icones` |
| Foto dos presentes | `config.js` → `fotosPresentes` (ou coluna `FotoURL` na planilha) |
| Adicionar/remover presente | Planilha do Google Sheets (aba "Presentes") |
| Ver quem confirmou presença | Planilha do Google Sheets (aba "RSVP") |
| Ver quem reservou qual presente | Colunas `ReservadoPor`/`EmailReservado` na aba "Presentes" |
| Mudar data/hora/local/mapa | `config.js` |
| Trocar imagens | Substitua os arquivos em `assets/` mantendo os nomes |
| Atualizar o código do Apps Script | Cole o novo código E crie uma **nova versão** da implantação (Implantar → Gerenciar implantações → editar → Nova versão) |
