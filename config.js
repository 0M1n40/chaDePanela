/* ==========================================================================
   CONFIG.JS — ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR NO DIA A DIA
   ==========================================================================
   Aqui ficam todas as informações "variáveis" do convite: data, local,
   e o link do Google Apps Script. Não mexa nos outros arquivos
   (index.html, style.css, script.js) a não ser que queira mudar o design.
   ========================================================================== */

const CONFIG = {

  // ---------------------------------------------------------------------
  // PIX PARA PRESENTES EM DINHEIRO (opcional)
  // ---------------------------------------------------------------------
  pix: {
    chave: "(21) 981918358",      // ⚠️ Substitua pelo número de telefone/chave dela
    tipo: "Celular",               // Ex: Celular, CPF, E-mail ou Aleatória
    titular: "Norma Beatriz",              // Nome que aparece na conta
  },

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
    "Cortinas 1": "https://http2.mlstatic.com/D_NQ_NP_914929-MLB70552797564_072023-O.webp",
    "Cortinas 2": "https://http2.mlstatic.com/D_NQ_NP_914929-MLB70552797564_072023-O.webp",
    "Tapete para sala 1": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls8qek2tt5iz9b",
    "Tapete para sala 2": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls8qek2tt5iz9b",
    "Ventilador": "https://m.media-amazon.com/images/I/41tyT5bVn7L._AC_SX679_.jpg",
    "Jogo de cama 1": "https://th.bing.com/th/id/OIP.Yj0Uib3w3EPfE4EjdplzvwHaHa?w=170&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "Jogo de cama 2": "https://th.bing.com/th/id/OIP.Yj0Uib3w3EPfE4EjdplzvwHaHa?w=170&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "Jogo de cama 3": "https://th.bing.com/th/id/OIP.Yj0Uib3w3EPfE4EjdplzvwHaHa?w=170&h=197&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    "Lençol com elástico 1": "https://camasoft.cdn.magazord.com.br/img/2023/11/produto/5568/cinza-gelo-jc.jpg?ims=fit-in/1080x1080/filters:fill(white)",
    "Lençol com elástico 2": "https://camasoft.cdn.magazord.com.br/img/2023/11/produto/5568/cinza-gelo-jc.jpg?ims=fit-in/1080x1080/filters:fill(white)",
    "Fronhas 1": "https://images.tcdn.com.br/img/img_prod/1358730/jogo_fronhas_avulsas_200_fios_karsten_2_pecas_tom_salvia_1355_2_78c1f7ca10fad5a0d002ab68f57ce7b6.jpg",
    "Fronhas 2": "https://images.tcdn.com.br/img/img_prod/1358730/jogo_fronhas_avulsas_200_fios_karsten_2_pecas_tom_salvia_1355_2_78c1f7ca10fad5a0d002ab68f57ce7b6.jpg",
    "Edredom 1": "https://feiraodetoalhas.cdn.magazord.com.br/img/2023/12/produto/3923/edredom-toque-de-seda-rozac-plumage-cinza-inox.jpg?ims=600x600",
    "Edredom 2": "https://feiraodetoalhas.cdn.magazord.com.br/img/2023/12/produto/3923/edredom-toque-de-seda-rozac-plumage-cinza-inox.jpg?ims=600x600",
    "Cobertor 1": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQJMV007SqcJs4eZvIZVZCsOZ-7-YB0rK-RaSt25rj_te7u27JePoohWhsVXIRqHLK8y3JODRPmxcxO7zLmpssyZFeEd8CGN_NkX10ubwS90-bz5QbW7ytW",
    "Cobertor 2": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQJMV007SqcJs4eZvIZVZCsOZ-7-YB0rK-RaSt25rj_te7u27JePoohWhsVXIRqHLK8y3JODRPmxcxO7zLmpssyZFeEd8CGN_NkX10ubwS90-bz5QbW7ytW",
    "Colcha 1": "https://tezhht.vteximg.com.br/arquivos/ids/178651/00405273-1.jpg?v=638715242736930000",
    "Colcha 2": "https://tezhht.vteximg.com.br/arquivos/ids/178651/00405273-1.jpg?v=638715242736930000",
    "Manta 1": "https://images.tcdn.com.br/img/img_prod/763017/cobertor_royal_queen_220x240_cinza_155983_1_dcc415c711bd234d693efc7840c2a948.jpg",
    "Manta 2": "https://images.tcdn.com.br/img/img_prod/763017/cobertor_royal_queen_220x240_cinza_155983_1_dcc415c711bd234d693efc7840c2a948.jpg",
    "Travesseiros": "https://lojaalabama.cdn.magazord.com.br/img/2023/02/produto/2583/imagen-travesseiro-2.png",
    "Cabides": "https://lojaplasticossantana.com.br/public/produtos/410/12563-cabides-preto-conjunto-com-36-unid_g.jpg",
    "Cortina para quarto": "https://emporiodolencol.vtexassets.com/arquivos/ids/172375/cortina-corta-luz-blend-bella-janela-cinza.jpg?v=637940334647000000",
    "Tapete para quarto": "https://m.media-amazon.com/images/I/81zBhItLCKL.jpg",
    "Varal de chão": "https://varaisstore.com.br/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-18-at-10.09.38-1.jpeg",
    "Pregadores": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRsmRk9B1EhJwPLCY-U6Ve30vfPw8V14P_E_Sxup3CaWaNkUM6fY7v7jKHxjMDuQAbmoRZwMOrEaitBjI9FBgXzav6XKj7Mi04gguHtOpNH9LodszsT5xXdkek_",
    "Baldes": "https://plasvale.cdn.magazord.com.br/img/2023/07/produto/1888/balde-10l-plasvale-1463-variacao-3269-1-a9625bd529a47ad261f82caadf9d0920.jpeg",
    "Bacias": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiiSA5SDsbK9g3g61XoULGnx8PmTmyAzcwcjkYVQyp2zbboqquH-Zb3A&s=10 ",
    "Aspirador vertical": "https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1274/large/aspirador-de-po-electrolux-power-speed-stk12-vertical-e-portatil_8610.jpg",
    "Tábua de passar roupa": "https://images.tcdn.com.br/img/img_prod/1185401/tabua_passar_bella_35_1_78958f07624493c4dc269dd04912971f_20230517091927.jpg",
    "Ferro de passar": "https://dleyjack4mlu0.cloudfront.net/Custom/Content/Products/55/26/5526_ferro-de-passar-roupa-a-seco-mondial-fsn-55-b-preto-220v_m1_638519122755757665.webp",
    "Aromatizador": "https://cdn.awsli.com.br/2500x2500/1319/1319203/produto/258924280/jogo-de-panela-glenz-5-pcs-28699610-q838bs72zt.jpg",
    "Jogo de panelas 1": "https://cdn.awsli.com.br/2500x2500/1319/1319203/produto/258924280/jogo-de-panela-glenz-5-pcs-28699610-q838bs72zt.jpg",
    "Jogo de panelas 2": "https://cdn.awsli.com.br/2500x2500/1319/1319203/produto/258924280/jogo-de-panela-glenz-5-pcs-28699610-q838bs72zt.jpg",
    "Panela de arroz elétrica": "https://images.tcdn.com.br/img/img_prod/1270913/panela_de_arroz_eletrica_elgin_10_xicaras_1_8_litros_700w_gran_rizzo_220v_5119_1_f0f355ed398fcd03454316cf4af0ee9c.jpg",
    "Frigideira grande": "https://m.media-amazon.com/images/I/71mhFXp8F7L._AC_UF894,1000_QL80_.jpg",
    "Leiteira": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ8CHZUbIiPimE5vQmkCIUER3P1JMB54LDeOjmd9F5O_Knq79lNhNs7ul2NaNS9AiMwgxwuVVU2KTB48rHK9xmwGM1K4DYlIfzyG4LaXFk7ySBO5L8DL-RRwP8",
    "Caldeirão": "https://images.tcdn.com.br/img/img_prod/606217/caldeirao_hotel_aluminio_vigor_n_20_cap_6_5_lts_profissional_373_1_20201007154141.png",
    "Forma para bolo": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTKhorbgyw_x2Od4Epz0XW3QuWvKFiSx4r09YnNgUGBdEg5DANe-inHDByEfIJQuCHEvuhQG3qPeku6sH_I_ayUVHJ8kTGjdEHIZy6BwjskO40iQTTVeGCd",
    "Forma para pudim": "https://images.tcdn.com.br/img/img_prod/487343/forma_de_pudim_com_tubo_n36_788_abc_2049_1_e62396509ad4c738215939733b35d5cf_20251006122314.jpg",
    "Forma retangular": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQv4LTFd90BG_VwBSPMhJUx72ukFZ29cNyix34PNxQsf3L-c-UUG2IzrfD_r7NNsTlYfrs5cWbh8CrnbQrHyc9TXQadEPk5TYz7x9svF6GfFGJ1x7by0wxP",
    "Forma redonda": "https://images.tcdn.com.br/img/img_prod/665211/forma_de_bolo_redonda_alta_confeiteiro_gourmet_aluminio_22_cm_com_10_cm_de_altura_11047_1_20200724091037.jpeg",
    "Assadeira": "https://m.media-amazon.com/images/I/51RKjJvDP8L.jpg",
    "Travessa de vidro grande": "https://www.bazarrodrigues.com.br/wp-content/uploads/2025/07/PRODUTOS-MARIANE-13.jpg",
    "Travessa de vidro pequena": "https://www.decontomateriais.com.br/wp-content/uploads/2023/09/Marinex.jpg",
    "Jogo de facas": "https://s3.amazonaws.com/assets.tramontina.com.br/upload/tramon/imagens/CUT/23899060PDM001G.jpg",
    "Tábua de corte": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQf9iVFHezAtSbDFFONpTTKcnKMRH7Fxnt_53ZJX8Hy9SRf5j0j_DDDbyukVH2d_GmweL-zgyv2XfeteCIfrnorqIYZOm-OcMgVZMMAzEqIHm19tu4XLXKi",
    "Colher de pau": "https://images.tcdn.com.br/img/img_prod/710223/colher_de_pau_2513_1_dd72ebbec3c5a7468e21c737aede45a4.jpg",
    "Kit de utensílios": "https://carrefourbr.vtexassets.com/arquivos/ids/197931478/image-0.jpg?v=638910809470100000",
    "Fouet": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ4OlUqERvQ5jN8v81bqLmcSP7OnoNCoKGf525YVC8qSNsMRsv6FM9uwBGM0fAMNgJ0DWO4Qt39bHDTZVAvy1a6T2ibkA1t",
    "Amassador de batata": "https://images.tcdn.com.br/img/img_prod/1232853/amassador_de_batatas_inox_robusto_e_prtico_para_pu_1_20250917171419_6f579e4d3e2d.jpg",
    "Abridor de latas": "https://cdn.awsli.com.br/618/618763/produto/1675932868297936d39.jpg",
    "Ralador": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32h2v764nwz1d",
    "Kit de peneiras": "https://m.media-amazon.com/images/I/71A3ImQhfHL._AC_UF894,1000_QL80_.jpg",
    "Espremedor de limão": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQFLcjnet0lArW-Q5TFMCjuzKeEb7d8ziwIS76IVl_tGfpRJHE0Q3aEJfKJpiLlwYLbpP20IcQw7FNRaxc9oNHQkKvftCWaQ6mWLV25UgXoq31ktpvtrsiB1A",
    "Medidores de xícara": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCQOpF4AMWBRiGTSlE-kudKf-4M4dv8BnBzcq-_qCmUzl0DgDLUvF3ms&s=10",
    "Funil": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kitchen_Funnel.jpg/250px-Kitchen_Funnel.jpg",
    "Tesoura de cozinha": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSTQaBMl8Yn6c0Ccl1KzGSN4Z_ZqSxRI-ejujvc18exfIwm9M1h9osiqBtBoqAcQoTDC2t_f99LBE49-GrxYKVhV7Xy4vf0bXYYJkgFE84DeA3dTAiA0Ic",
    "Pegador de massa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVCQOpF4AMWBRiGTSlE-kudKf-4M4dv8BnBzcq-_qCmUzl0DgDLUvF3ms&s=10",
    "Escorredor de macarrão": "https://http2.mlstatic.com/D_NQ_NP_747777-MLB110037487636_042026-O.webp",
    "Escorredor de arroz": "https://imgs.extra.com.br/1565910478/4xg.jpg?imwidth=500",
    "Pipoqueira": "https://m.media-amazon.com/images/I/61CizuSts3L.jpg",
    "Saca-rolha": "https://http2.mlstatic.com/D_NQ_NP_747698-MLA108259789140_032026-O.webp",
    "Porta-pães": "https://http2.mlstatic.com/D_NQ_NP_675690-MLA111575447254_062026-O.webp",
    "Porta-bolos": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwzLzcosI1CaOSgR9c70vFLUf_6I05lTbgNUpbFsQploIH3W69_5PAQCY7oNoJ9C5TwhEFsqmBsRJNafDxsnYYaLyhwHVwTcmUZyvW2amip-uBd-zjOG9M",
    "Potes herméticos": "https://cdn.awsli.com.br/1983/1983803/produto/344708291/59b52f492219c0e90cf0d398c35d8fad-cxhl7pbmcq.jpeg",
    "Potes para mantimentos": "https://i.pinimg.com/736x/1d/f1/47/1df14759c2789fd699cac953c0e0b245.jpg",
    "Potes de vidro": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTJhWXRsKbETyxd5_gOPQRgkkG40oqQJdCfX9lKguM6RDTFu_Vw_QWeYFERIza1odBxN0EGrxtOduUhc2pNvtL0sq_WCxB3",
    "Organizador de gaveta": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IQMCL-muopVCPbkc48UEupcG-c5LWs4SNSxjLcua1vZY15S2kAb6UOM&s=10",
    "Escorredor de louça": "https://images.tcdn.com.br/img/img_prod/1126610/escorredor_de_loucas_2_andares_preto_fosco_2427_1_d47d19bbd3e298c00690beab002275f7.jpg",
    "Suporte para papel-toalha": "https://m.media-amazon.com/images/I/61ZxiQAYr6L._AC_UF894,1000_QL80_.jpg",
    "Organizador de geladeira": "https://m.media-amazon.com/images/I/61ZxiQAYr6L._AC_UF894,1000_QL80_.jpg",
    "Porta óleo e azeite": "https://http2.mlstatic.com/D_Q_NP_2X_916687-MLB111558813638_062026-P.webp",
    "Jogo de pratos rasos": "https://lavillecasa.vteximg.com.br/arquivos/ids/207617-1800-1800/501843.jpg?v=638564218769400000",
    "Jogo de pratos fundos": "https://http2.mlstatic.com/D_670619-MLB111302656144_052026-C.jpg",
    "Jogo de pratos de sobremesa": "https://medecoracasa.cdn.magazord.com.br/img/2024/09/produto/10624/prato-sobremesa-pink-sand-oxford-me-decora-casa.jpeg?ims=fit-in/800x800/filters:fill(white)",
    "Jogo de bowls": "https://http2.mlstatic.com/D_NQ_NP_724624-MLA107120830939_022026-O.webp",
    "Jogo de copos": "https://down-br.img.susercontent.com/file/sg-11134201-7rbm4-lp9rzwwonebq94",
    "Taças": "https://www.eladecora.com.br/cdn/shop/files/jogo-6-tacas-bordeaux-em-cristal-650ml-325618.png?v=1740661971",
    "Xícaras de chá": "https://cdn.leroymerlin.com.br/products/kit_4_xicaras_de_cafe_com_pires_porcelana_clean_100ml__lyor_1570959032_36ba_600x600.jpg",
    "Pires": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRBqtxjtYr7OxRD0KNDak6EYBZxHbXvUeNnNEglFf0C56cr6zdaL9yHaAjegzPPIqMOv8S0Yr8Pp2DTORg1Cmq-0KTgrMVd0cEKZo_J1Muwj7mEXmXsru8",
    "Canecas": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSf_aI6r_5RN3x7yPOhIg8ydsnVr861PoxDH0Yv_cUyKX293L6Nsxjhipx5Uh1m7s_Vu6OEtrPS082_I--RPCZurUg2g46SJ9u9QLC0x-l9lwN2aAkXCl3H6VU",
    "Jogo de talheres": "https://images.tcdn.com.br/img/img_prod/836117/jogo_de_talheres_25ps_e_porta_talher_preto_origina_1_20251224121419_b066c1640564.jpg",
    "Kit de colheres de sobremesa": "https://http2.mlstatic.com/D_NQ_NP_648485-MLA113672135393_062026-O.webp",
    "Jarra de água": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTYgvYmY8f4IQbw1X32UkzHwaQ4I3dBhziJPeiymde0ITELWkoiN6b2XFTXSuWWGXGgza7vyublUj8_Fymxa4kUd3JrOtPkdh7lt4P0mWDsp0mhWaxqyR_TOoQ",
    "Jarra de suco": "https://images.tcdn.com.br/img/img_prod/1158278/jarra_de_suco_arc_jarra_de_vidro_sem_tampa_1_l_a_1_20250925105916_241a8c939a41.jpg",
    "Manteigueira": "https://http2.mlstatic.com/D_NQ_NP_943073-MLB112323129587_052026-O-mantegueira-de-vidro-cristal-com-tampa-coracao.webp",
    "Boleira": "https://images.tcdn.com.br/img/img_prod/1180967/boleira_de_vidro_com_pe_e_tampa_28cm_26511_vencedor_34304_1_c67155e2d1adce707537680b5e5b4665.jpeg",
    "Saladeira": "https://letseatit.com.br/cdn/shop/files/hf_20260401_133822_23fc5844-eb33-4d8a-aaca-ffc77d70fb65.png?v=1775050842&width=960",
    "Petisqueira": "https://imgs.extra.com.br/1566476896/1xg.jpg?imwidth=1000",
    "Molheira": "https://m.media-amazon.com/images/I/61l+EAQpZQL.jpg",
    "Lugar americano": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRVqH9BQGjYmReEuWNF6fdr4quk9UyVY1PeJJRkkiHMpoYAqmAEdQpP-Tor-Ac_Zus8XhHqBu7oHOnVLAwKBqI7rsdEP184v-YQZIs5pqOKTxMV1KW5GRo",
    "Aparelho de fondue": "https://down-br.img.susercontent.com/file/br-11134207-820lu-mnvej5lxf3esed",
    "Liquidificador": "https://moveislinhares.vteximg.com.br/arquivos/ids/234152-1000-1000/106360-1.jpg?v=638681430392730000",
    "Air Fryer": "https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1268/medium/fritadeira-eletrica-air-fryer-com-4-litros-e-1500w-afn40bi-mondial-preta-e-inox_15254.jpg",
    "Batedeira": "https://d296pbmv9m7g8v.cloudfront.net/Custom/Content/Products/10/70/1070055_batedeira-britania-perola-550-4-velocidades-turbo-500w-preto-capacidade-43l-10010221_l29_638665033066289905.webp",
    "Mixer": "https://americanas.vtexassets.com/arquivos/ids/36990245/image-61720e193dc842ff8f7f94d735af4f47.jpg?v=638993448215470000",
    "Sanduicheira": "https://m.magazineluiza.com.br/a-static/420x420/sanduicheira-grill-ultra-s-ut-01-750w-preta/magazineluiza/238533900/c122f88fe4e7602f9d7fa9008e824d9d.jpg",
    "Cafeteira": "https://dleyjack4mlu0.cloudfront.net/Custom/Content/Products/15/15/1515_cafeteira-eletrica-mondial-dolce-arome-18-xicaras-c30_m1_637393278100809403.webp",
    "Chaleira elétrica": "https://homeecia.cdn.magazord.com.br/img/2024/05/produto/6925/chaleira-eletrica-select-inox-cafe-ou-chimarrao-af-18s-ambiente.jpg?ims=865x865",
    "Espremedor de frutas": "https://imgs.casasbahia.com.br/14038/1g.jpg",
    "Panela elétrica multifuncional": "https://dverr7iyvl0k.cloudfront.net/Custom/Content/Products/12/05/12050_panela-pressao-philco-5lts-multifuncional-inox-ppp_l1_638481739281182577.webp",
    "Toalha de Banho 1": "https://m.media-amazon.com/images/I/81uT0PNhj8L._AC_UF894,1000_QL80_.jpg",
    "Toalha de Banho 2": "https://m.media-amazon.com/images/I/81uT0PNhj8L._AC_UF894,1000_QL80_.jpg",
    "Toalha de Rosto": "https://images.tcdn.com.br/img/img_prod/1087842/toalha_de_rosto_50x70_geo_cinza_1082455_laco_home_21613_1_831685f16adee18b53c9952bca1b483b.jpg",
    "Tapete de Banheiro": "https://http2.mlstatic.com/D_NQ_NP_646498-MLB108742928232_032026-O.webp",
    "Tapete Antiaderente": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ2DASdIQyHziqHgYAeXquH_0FNaquxgmytI37XprTbBoXZZpUysh4dOko3Ahz3TnSRXaJ0FjtTFfwX0FoIslLzRs4EYuvpxcFWuBS5-8vb"
  },

  // ---------------------------------------------------------------------
  // LISTA DE PRESENTES (Google Sheets + Apps Script) 🆗
  // ---------------------------------------------------------------------
  // Este mesmo link agora também é usado pela Confirmação de Presença
  // (aba "RSVP" na mesma planilha).
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbyMjYm9lmIYTQ_Vak3ckwksCKZeurfODvIHg-DdjDpxQ7TGOAKyN9vxrc0YPm07g_tDww/exec",

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
        "Jogo de panelas ",
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
    avisoFinal: "Para deixar nossas fotos ainda mais bonitas, contamos com você para seguir o dress code acima!"
  },
};
