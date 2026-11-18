/* =====================================================================
   Meu Convite — Aba BUFÊ
   Planejamento completo da comida e bebida do evento: painel com
   gráficos, calculadora por pessoa, cardápio, orçamento/fornecedores,
   cronograma e envio por WhatsApp.
   Depende das funções globais do index.html ($, $$, esc, ic, rpc, toast,
   sheet, confirmar, A, tituloEvento) — usadas só no momento da chamada.
   ===================================================================== */

/* ---------------------- estilos da aba ---------------------- */
(function(){ const s=document.createElement('style'); s.textContent = `
.bf-hero{position:relative;overflow:hidden;border-radius:22px;padding:22px 20px;color:#fff;background:radial-gradient(600px 260px at 100% 0%,rgba(201,164,100,.35),transparent 60%),linear-gradient(160deg,#243049,#141B29);box-shadow:0 18px 40px rgba(20,27,41,.28)}
.bf-hero:after{content:"";position:absolute;inset:8px;border-radius:16px;border:1px solid rgba(241,223,176,.22);pointer-events:none}
.bf-hero .ey{font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--gold1);font-weight:700}
.bf-hero h2{color:#fff;font-size:26px;margin:6px 0 2px}
.bf-hero .big{font:700 44px/1 'Cormorant Garamond',serif;color:var(--gold1);margin-top:14px}
.bf-hero .row3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px}
.bf-hero .row3 div{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:10px 12px}
.bf-hero .row3 b{display:block;font:700 22px/1.1 'Cormorant Garamond',serif;color:#fff}
.bf-hero .row3 span{font-size:11.5px;color:#C9CFDA}
.bf-save{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);font-weight:600}
.bf-save i{width:8px;height:8px;border-radius:50%;background:var(--ok)}
.bf-save.on i{background:var(--gold2);animation:rot 1s linear infinite;border-radius:2px}
.bf-nav{position:sticky;top:64px;z-index:15;background:linear-gradient(var(--ivory) 70%,transparent);padding-top:8px;margin:14px -4px 0}
.bf-grid{display:grid;gap:14px;margin-top:14px}
@media(min-width:760px){.bf-grid.c2{grid-template-columns:1fr 1fr}.bf-grid.c3{grid-template-columns:repeat(3,1fr)}}
.bf-card{background:var(--paper);border:1px solid var(--line);border-radius:var(--r);padding:18px;box-shadow:var(--shadow);min-width:0}
.bf-card h3{font:600 20px 'Cormorant Garamond',serif;color:var(--navy);display:flex;align-items:center;gap:8px;margin-bottom:2px}
.bf-card h3 .icon{stroke:var(--gold3);width:20px;height:20px}
.bf-card .sub{font-size:13px;color:var(--muted);margin-bottom:12px}
.bf-kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:14px}
@media(min-width:700px){.bf-kpis{grid-template-columns:repeat(4,1fr)}}
.bf-kpi{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:14px;box-shadow:var(--shadow)}
.bf-kpi b{display:block;font:700 26px/1.1 'Cormorant Garamond',serif;color:var(--navy)}
.bf-kpi span{font-size:12.5px;color:var(--muted);font-weight:500}
.bf-kpi small{display:block;font-size:11.5px;color:var(--gold3);font-weight:600;margin-top:2px}
.bf-leg{display:flex;flex-direction:column;gap:8px;font-size:13.5px;flex:1;min-width:150px}
.bf-leg div{display:flex;align-items:center;gap:8px}
.bf-leg i{width:12px;height:12px;border-radius:4px;flex:none}
.bf-leg b{margin-left:auto;font-weight:700;color:var(--navy);white-space:nowrap}
.bf-donut{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.bf-bars{display:flex;flex-direction:column;gap:10px}
.bf-bar .t{display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:4px;gap:8px}
.bf-bar .t b{color:var(--navy);white-space:nowrap}
.bf-bar .tr{height:12px;border-radius:8px;background:var(--soft);overflow:hidden}
.bf-bar .tr i{display:block;height:100%;border-radius:8px;transition:width .6s cubic-bezier(.2,.8,.2,1)}
.bf-ins{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px}
.bf-ins:last-child{border-bottom:0;padding-bottom:0}
.bf-ins .d{width:34px;height:34px;border-radius:10px;flex:none;display:flex;align-items:center;justify-content:center}
.bf-ins .d .icon{width:18px;height:18px}
.bf-ins.ok .d{background:var(--okbg);color:var(--ok)} .bf-ins.at .d{background:#FFF3DC;color:var(--warn)} .bf-ins.tip .d{background:#EEF1F7;color:var(--navy2)}
.bf-ins b{display:block;color:var(--navy)}
.bf-step{display:flex;align-items:center;border:1.5px solid var(--line);border-radius:14px;background:#FFFEFC;overflow:hidden;height:50px}
.bf-step button{width:48px;height:100%;border:0;background:var(--soft);font-size:22px;font-weight:600;color:var(--navy);cursor:pointer}
.bf-step button:active{background:var(--line)}
.bf-step input{flex:1;min-width:0;border:0;background:none;text-align:center;font-weight:700;font-size:18px;height:100%;color:var(--navy)}
.bf-step input:focus{outline:none}
.bf-f{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px}
@media(min-width:700px){.bf-f.c4{grid-template-columns:repeat(4,1fr)}}
.bf-f label{display:block;font-size:13px;font-weight:600;color:var(--navy2);margin-bottom:6px}
.bf-range{display:flex;align-items:center;gap:12px}
.bf-range input{flex:1;accent-color:var(--gold3);height:30px}
.bf-range b{min-width:62px;text-align:right;font:700 20px 'Cormorant Garamond',serif;color:var(--navy)}
.bf-styles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.bf-sty{position:relative;text-align:left;border:1.5px solid var(--line);border-radius:16px;background:#fff;padding:14px 12px 12px;cursor:pointer;min-height:132px;display:flex;flex-direction:column;gap:4px;transition:transform .12s,box-shadow .12s}
.bf-sty:active{transform:scale(.98)}
.bf-sty .mk{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;font:700 19px 'Cormorant Garamond',serif;color:var(--gold1);background:linear-gradient(160deg,#2E3B54,#1C2536);margin-bottom:4px}
.bf-sty b{font-size:14.5px;color:var(--navy);line-height:1.25}
.bf-sty span{font-size:12px;color:var(--muted);line-height:1.35}
.bf-sty em{font-style:normal;font-size:12px;font-weight:700;color:var(--gold3);margin-top:auto}
.bf-sty[aria-pressed=true]{border-color:var(--gold2);box-shadow:0 0 0 3px rgba(201,164,100,.3),var(--shadow);background:#FFFCF5}
.bf-sty[aria-pressed=true]:after{content:"✓";position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:var(--navy);color:var(--gold1);font-size:13px;display:flex;align-items:center;justify-content:center;font-weight:700}
.bf-tbl{width:100%;border-collapse:collapse;font-size:14px}
.bf-tbl th{text-align:left;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:700;padding:8px 6px;border-bottom:1.5px solid var(--line)}
.bf-tbl td{padding:10px 6px;border-bottom:1px solid var(--line);vertical-align:middle}
.bf-tbl tr.g td{background:var(--soft);font:600 15px 'Cormorant Garamond',serif;color:var(--gold4);letter-spacing:.04em;padding:8px 6px}
.bf-tbl .n{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.bf-tbl tfoot td{font-weight:700;color:var(--navy);border-bottom:0;padding-top:12px}
.bf-tbl input{width:84px;min-height:36px;padding:4px 8px;border:1.5px solid var(--line);border-radius:10px;text-align:right;font-size:14px;background:#FFFEFC}
.bf-scroll{overflow-x:auto;margin:0 -6px;padding:0 6px}
.bf-cat{margin-top:16px}
.bf-cat>header{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 4px 8px}
.bf-cat>header b{font:600 20px 'Cormorant Garamond',serif;color:var(--navy)}
.bf-cat>header span{font-size:12px;font-weight:700;color:var(--gold3);background:var(--soft);border-radius:99px;padding:3px 10px}
.bf-items{background:var(--paper);border:1px solid var(--line);border-radius:16px;overflow:hidden;box-shadow:var(--shadow)}
.bf-it{display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;border:0;border-bottom:1px solid var(--line);background:none;text-align:left;cursor:pointer;min-height:56px}
.bf-it:last-child{border-bottom:0}
.bf-it .ck{width:26px;height:26px;border-radius:8px;border:2px solid #D8CDBB;flex:none;display:flex;align-items:center;justify-content:center;color:transparent;transition:.15s}
.bf-it[aria-pressed=true]{background:#FFFBF2}
.bf-it[aria-pressed=true] .ck{background:var(--navy);border-color:var(--navy);color:var(--gold1)}
.bf-it .ck .icon{width:16px;height:16px;stroke-width:3}
.bf-it .nm{flex:1;min-width:0;font-size:15px;color:var(--ink)}
.bf-tags{display:inline-flex;gap:4px;flex-wrap:wrap;margin-left:4px;vertical-align:middle}
.bf-tag{font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:99px;letter-spacing:.02em;white-space:nowrap}
.bf-tag.v{background:#E6F2E8;color:#2E6B3E}.bf-tag.vg{background:#DDF0E0;color:#1F5C30}.bf-tag.sg{background:#FFF0D6;color:#8A5A00}.bf-tag.sl{background:#E5EEF9;color:#2D5689}.bf-tag.k{background:#FDE7EF;color:#A0335F}.bf-tag.p{background:#F4EAD3;color:#7A5A20}.bf-tag.r{background:#F7E4DA;color:#8C3F1E}
.bf-menu{background:linear-gradient(180deg,#FFFEFB,#FBF6EC);border-radius:20px;padding:30px 22px;text-align:center;position:relative;box-shadow:0 2px 4px rgba(40,30,15,.06),0 20px 40px rgba(40,30,15,.12)}
.bf-menu:before{content:"";position:absolute;inset:10px;border-radius:14px;border:1.5px solid var(--gold2);opacity:.55;pointer-events:none}
.bf-menu h4{font:600 13px Inter,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:var(--gold3);margin:20px 0 8px}
.bf-menu p{font:500 18px/1.45 'Cormorant Garamond',serif;color:var(--navy)}
.bf-menu .tt{font:400 44px/1 'Great Vibes',cursive;color:var(--gold3)}
.bf-sup{display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--line)}
.bf-sup:last-child{border-bottom:0}
.bf-sup .info{flex:1;min-width:0}
.bf-sup .info b{color:var(--navy);display:block}
.bf-sup .info .m{font-size:13px;color:var(--muted)}
.bf-st{font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:99px;white-space:nowrap}
.bf-st.cotacao{background:#EEF1F7;color:#3A4B6B}.bf-st.degustacao{background:#F3E8F6;color:#6E3C7E}.bf-st.negociando{background:#FFF3DC;color:#8A5A00}.bf-st.contratado{background:var(--okbg);color:var(--ok)}.bf-st.descartado{background:#F1EEEA;color:#8B847B;text-decoration:line-through}
.bf-stars{color:var(--gold2);letter-spacing:1px;font-size:13px}
.bf-tl{position:relative;margin:8px 0 4px;padding-left:22px}
.bf-tl:before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--gold2),var(--line))}
.bf-tl div{position:relative;padding:6px 0 12px}
.bf-tl div:before{content:"";position:absolute;left:-21px;top:11px;width:12px;height:12px;border-radius:50%;background:#fff;border:3px solid var(--gold2)}
.bf-tl b{font:700 17px 'Cormorant Garamond',serif;color:var(--navy);margin-right:8px}
.bf-tl span{font-size:14px;color:var(--ink)}
.bf-tl small{display:block;color:var(--muted);font-size:12.5px}
.bf-chk{display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line);cursor:pointer}
.bf-chk:last-child{border-bottom:0}
.bf-chk input{width:24px;height:24px;accent-color:var(--navy);flex:none}
.bf-chk.done span{color:var(--muted);text-decoration:line-through}
.bf-phase{font:600 13px Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--gold3);margin:18px 2px 4px;display:flex;justify-content:space-between}
.bf-gauge{position:relative;width:100%;max-width:260px;margin:0 auto}
.bf-gauge .v{position:absolute;left:0;right:0;bottom:6px;text-align:center}
.bf-gauge .v b{display:block;font:700 30px/1 'Cormorant Garamond',serif;color:var(--navy)}
.bf-gauge .v span{font-size:12px;color:var(--muted)}
.bf-plate{display:flex;height:36px;border-radius:12px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(0,0,0,.04)}
.bf-plate i{display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;font-style:normal;min-width:0;overflow:hidden;white-space:nowrap}
.bf-act{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.bf-search{position:relative}
.bf-search .icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);stroke:var(--muted)}
.bf-search input.in{padding-left:46px}
.bf-wa-pick{display:flex;flex-direction:column;gap:8px;margin-top:6px}
.bf-wa-pick label{display:flex;gap:10px;align-items:center;padding:12px 14px;border:1.5px solid var(--line);border-radius:14px;background:#fff;cursor:pointer;font-size:15px}
.bf-wa-pick input{width:20px;height:20px;accent-color:var(--navy)}
.bf-empty{text-align:center;padding:26px 10px;color:var(--muted);font-size:14px}
.bf-card .stat b{font-size:24px;white-space:nowrap}
@media(max-width:520px){.bf-tbl{font-size:12.5px}.bf-tbl td,.bf-tbl th{padding:8px 3px}.bf-tbl input{width:58px;padding:4px 5px;font-size:13px}.bf-tbl .small{font-size:11px}}
`; document.head.appendChild(s); })();

/* ---------------------- dados de referência ---------------------- */
const BF_CORES = { navy:'#1C2536', gold:'#C9A464', sage:'#6F8F7A', terra:'#B4654A', blue:'#5B7BA6', plum:'#8A5A83', sand:'#D9C7A3', teal:'#3F7C85' };

const BF_ESTILOS = {
  jantar:   { n:'Buffet completo', m:'B', d:'Recepção com salgados e jantar servido em ilhas', faixa:[130,260], garcom:18,
              pp:{salgados:12, mini:0, entradas:.10, proteinas:.25, acomp:.20, sobremesa:1, doces:5, bolo:.10, madrugada:.8} },
  empratado:{ n:'Jantar empratado', m:'E', d:'Serviço à francesa, pratos montados e servidos à mesa', faixa:[190,390], garcom:10,
              pp:{salgados:8, mini:2, entradas:.12, proteinas:.20, acomp:.15, sobremesa:1, doces:4, bolo:.08, madrugada:.6} },
  coquetel: { n:'Coquetel volante', m:'C', d:'Finger foods e mini-pratos circulando com os garçons', faixa:[90,180], garcom:12,
              pp:{salgados:22, mini:4, entradas:0, proteinas:0, acomp:0, sobremesa:0, doces:6, bolo:.10, madrugada:.8} },
  estacoes: { n:'Estações gastronômicas', m:'G', d:'Ilhas temáticas preparadas na hora: massas, japonês, carving', faixa:[160,320], garcom:15,
              pp:{salgados:10, mini:3, entradas:.08, proteinas:.20, acomp:.20, sobremesa:1, doces:5, bolo:.10, madrugada:1} },
  churrasco:{ n:'Churrasco premium', m:'H', d:'Cortes nobres na brasa, saladas e acompanhamentos', faixa:[80,170], garcom:20, cru:true,
              pp:{salgados:6, mini:0, entradas:.10, proteinas:.45, acomp:.25, sobremesa:1, doces:3, bolo:.08, madrugada:0} },
  italiano: { n:'Massas & risotos', m:'M', d:'Cantina italiana: massas frescas, risotos e antepastos', faixa:[100,200], garcom:18,
              pp:{salgados:10, mini:0, entradas:.08, proteinas:.12, acomp:.35, sobremesa:1, doces:4, bolo:.08, madrugada:.5} },
  nordeste: { n:'Sabores do Nordeste', m:'N', d:'Carne de sol, sururu, macaxeira, cuscuz e doces regionais', faixa:[90,190], garcom:18,
              pp:{salgados:10, mini:0, entradas:.08, proteinas:.28, acomp:.25, sobremesa:1, doces:5, bolo:.10, madrugada:.8} },
  brunch:   { n:'Brunch / almoço leve', m:'L', d:'Pães, frios, quiches, saladas e um prato quente', faixa:[70,150], garcom:20,
              pp:{salgados:10, mini:2, entradas:.15, proteinas:.12, acomp:.12, sobremesa:.5, doces:4, bolo:.08, madrugada:0} },
};

const BF_PRECOS = { salgados:1.9, mini:6.5, entradas:55, proteinas:85, acomp:32, sobremesa:9, doces:3.8, bolo:140, madrugada:12,
  agua:3, refri:6, suco:11, cerveja:10, vinho:65, espumante:75, destilado:9, cafe:18, gelo:2.5,
  garcom:200, copeiro:170, cozinheiro:260, churrasqueiro:350, bartender:300, maitre:450 };

const BF_GRUPOS = { comida:{n:'Comida', c:BF_CORES.navy}, doces:{n:'Doces & bolo', c:BF_CORES.gold}, bebidas:{n:'Bebidas', c:BF_CORES.blue}, equipe:{n:'Equipe de serviço', c:BF_CORES.sage} };

const BF_TAGS = { v:'Vegetariano', vg:'Vegano', sg:'Sem glúten', sl:'Sem lactose', k:'Infantil', p:'Premium', r:'Regional' };

const BF_CARDAPIO = [
 ['recepcao','Recepção · salgados e canapés',[
  ['Coxinha de frango com catupiry',''],['Mini quiche de alho-poró','v'],['Bolinho de bacalhau','sl'],['Empadinha de palmito','v'],
  ['Canapé de salmão com cream cheese','p'],['Bruschetta de tomate e manjericão','v vg sl'],['Dadinho de tapioca com geleia de pimenta','v sg'],
  ['Camarão empanado com molho tártaro','p'],['Mini kibe com coalhada',''],['Pão de queijo recheado','v sg'],['Cestinha de cogumelos','v'],
  ['Tartar de atum servido na colher','p sg sl'],['Croquete de costela',''],['Espetinho caprese','v sg']]],
 ['entradas','Entradas e saladas',[
  ['Salada de folhas com frutas vermelhas e nozes','v vg sg sl'],['Salada caprese com pesto','v sg'],['Carpaccio com alcaparras e parmesão','sg p'],
  ['Salada de grãos com legumes assados','v vg sl'],['Ceviche de peixe branco','sg sl p'],['Burrata com tomates confit','v sg p'],
  ['Salada Caesar com frango grelhado',''],['Tábua de antepastos e queijos','v sg'],['Creme de abóbora com gengibre','v vg sg sl'],
  ['Mix de folhas com manga e castanha de caju','v vg sg sl r']]],
 ['principais','Pratos principais',[
  ['Filé-mignon ao molho madeira','sg p'],['Medalhão ao molho de vinho tinto','sg p'],['Picanha fatiada ao chimichurri','sg sl'],
  ['Frango ao molho de laranja','sg sl'],['Salmão grelhado com crosta de ervas','sg p'],['Peixe ao molho de maracujá','sg'],
  ['Lombo suíno com mostarda e mel','sg'],['Costela assada lentamente','sg sl'],['Camarão ao molho de coco','sg sl p'],
  ['Moqueca de legumes e banana-da-terra','v vg sg sl'],['Strogonoff de frango',''],['Escondidinho de cogumelos','v sg']]],
 ['acomp','Acompanhamentos',[
  ['Arroz branco soltinho','v vg sg sl'],['Arroz à grega','v vg sg sl'],['Arroz com amêndoas','v sg'],['Purê de batata trufado','v sg p'],
  ['Batatas rústicas com alecrim','v vg sg sl'],['Legumes salteados na manteiga','v sg'],['Farofa crocante de bacon','sl'],['Farofa de banana','v'],
  ['Batata gratinada','v sg'],['Macaxeira na manteiga de garrafa','v sg r'],['Vinagrete','v vg sg sl'],['Feijão tropeiro','sg']]],
 ['massas','Massas e risotos',[
  ['Risoto de cogumelos frescos','v sg'],['Risoto de limão-siciliano com camarão','sg p'],['Risoto de brie com damasco','v sg'],
  ['Penne ao molho de tomate fresco','v vg sl'],['Talharim ao molho branco com frango',''],['Ravioli de queijo ao sugo','v'],
  ['Nhoque de mandioquinha ao pesto','v'],['Lasanha à bolonhesa',''],['Fettuccine ao funghi','v'],['Massa sem glúten ao pomodoro','v vg sg sl']]],
 ['regional','Sabores do Nordeste',[
  ['Carne de sol na nata','r'],['Escondidinho de charque','sg r'],['Baião de dois','sg r'],['Macaxeira frita','v vg sg sl r'],
  ['Feijão-verde cremoso','v sg r'],['Cuscuz nordestino','v vg sg sl r'],['Bode guisado','sg sl r'],['Agulhinha frita','sg sl r'],
  ['Sururu ao leite de coco','sg sl r'],['Queijo coalho com melaço','v sg r'],['Arrumadinho de charque','sl r'],['Bolinho de feijão-verde','v r']]],
 ['estacoes','Ilhas e estações',[
  ['Estação de massas feitas na hora',''],['Ilha de risotos',''],['Estação de crepes doces e salgados','v'],['Ilha japonesa (sushi e sashimi)','sl p'],
  ['Mesa de queijos e frios','v sg p'],['Estação de tapiocas','v sg r'],['Food truck de hambúrguer artesanal',''],['Ilha de frutos do mar','sg sl p'],
  ['Carving station (cortes assados na hora)','sg sl p'],['Estação de pastel na hora',''],['Mesa de antepastos mediterrâneos','v vg']]],
 ['kids','Cardápio infantil',[
  ['Mini hambúrguer','k'],['Batata smile','k v vg sl'],['Nuggets de frango','k'],['Macarrão na manteiga','k v'],['Mini pizza','k v'],
  ['Cachorro-quente gourmet','k'],['Arroz, feijão e iscas de frango','k sg sl'],['Picolé de fruta','k v vg sg sl'],['Brigadeiro de colher','k v sg'],
  ['Suco natural em garrafinha','k v vg sg sl']]],
 ['sobremesas','Sobremesas',[
  ['Petit gâteau com sorvete','v'],['Pudim de leite','v sg'],['Mousse de maracujá','v sg'],['Cheesecake de frutas vermelhas','v'],['Pavlova','v sg'],
  ['Taça de frutas tropicais','v vg sg sl'],['Cartola nordestina','v sg r'],['Torta de limão','v'],['Sorvete artesanal','v sg'],['Tiramisù','v']]],
 ['doces','Doces finos',[
  ['Brigadeiro gourmet','v sg'],['Bem-casado','v'],['Camafeu de nozes','v sg'],['Trufa de chocolate belga','v sg p'],['Olho de sogra','v sg'],
  ['Cocada cremosa','v sg r'],['Copinho de chocolate com morango','v sg'],['Doce de caju','v vg sg sl r'],['Macaron','v sg p'],
  ['Bombom de uva','v sg'],['Beijinho de coco','v sg'],['Pão de mel','v']]],
 ['bolo','Bolo',[
  ['Massa branca, doce de leite e nozes','v'],['Red velvet com cream cheese','v'],['Chocolate belga com frutas vermelhas','v'],
  ['Bolo de rolo pernambucano','v r'],['Coco com abacaxi','v'],['Bolo cenográfico + bolo de corte','v'],['Naked cake com frutas','v'],
  ['Bolo de amêndoas sem glúten','v sg']]],
 ['madrugada','Madrugada',[
  ['Caldinho de feijão','sg'],['Caldinho de sururu','sg sl r'],['Mini hambúrguer da madrugada',''],['Cachorro-quente',''],['Pastel na hora',''],
  ['Sopa de mandioquinha com carne','sg'],['Coxinha e pão de queijo quentinhos',''],['Tapioca na chapa','v sg r'],['Crepe de chocolate','v']]],
 ['bebidas','Bebidas sem álcool',[
  ['Água mineral com e sem gás','v vg sg sl'],['Refrigerantes (normal e zero)','v vg sg sl'],['Sucos naturais (laranja, maracujá, abacaxi com hortelã)','v vg sg sl'],
  ['Água de coco','v vg sg sl r'],['Limonada suíça','v sg'],['Chá gelado de hibisco','v vg sg sl'],['Soda italiana','v vg sg sl'],['Mocktails sem álcool','v vg sg sl']]],
 ['bar','Bar e drinks',[
  ['Cerveja pilsen bem gelada',''],['Cerveja artesanal','p'],['Espumante para o brinde','sg'],['Vinho tinto','sg'],['Vinho branco','sg'],
  ['Caipirinha e caipiroska','sg'],['Gin-tônica','p sg'],['Whisky 12 anos','p'],['Drinks autorais do casal','p'],['Batida de coco e maracujá','r']]],
 ['cafe','Café e digestivos',[
  ['Café espresso','v vg sg sl'],['Cappuccino','v sg'],['Chás variados','v vg sg sl'],['Licores finos','p'],['Chocolate quente','v sg']]],
];
const BF_ITENS = {}; BF_CARDAPIO.forEach(([cat,,L])=>L.forEach(([n,t],i)=>{ BF_ITENS[cat+'_'+i]={id:cat+'_'+i,cat,nome:n,tags:t?t.split(' '):[]}; }));
const BF_CATN = Object.fromEntries(BF_CARDAPIO.map(([k,n])=>[k,n]));

const BF_PRESETS = {
  jantar:['recepcao_0','recepcao_1','recepcao_2','recepcao_6','recepcao_5','entradas_0','entradas_1','principais_0','principais_4','principais_9','acomp_2','acomp_3','acomp_5','massas_0','kids_0','kids_2','kids_1','sobremesas_0','sobremesas_2','doces_0','doces_1','doces_2','doces_5','bolo_0','madrugada_0','madrugada_2','bebidas_0','bebidas_1','bebidas_2','bar_0','bar_2','bar_3','bar_5','cafe_0'],
  empratado:['recepcao_4','recepcao_6','recepcao_11','entradas_5','entradas_2','principais_1','principais_4','principais_9','acomp_3','acomp_5','sobremesas_4','sobremesas_0','doces_3','doces_8','doces_1','bolo_2','madrugada_6','bebidas_0','bebidas_1','bebidas_4','bar_2','bar_3','bar_4','bar_6','bar_8','cafe_0','cafe_3'],
  coquetel:['recepcao_0','recepcao_1','recepcao_2','recepcao_3','recepcao_4','recepcao_5','recepcao_6','recepcao_7','recepcao_10','recepcao_13','estacoes_1','estacoes_4','kids_0','sobremesas_6','doces_0','doces_1','doces_6','doces_10','bolo_6','madrugada_4','bebidas_0','bebidas_1','bebidas_2','bar_0','bar_2','bar_5','bar_6','cafe_0'],
  estacoes:['recepcao_0','recepcao_6','recepcao_4','estacoes_0','estacoes_3','estacoes_8','estacoes_4','estacoes_2','entradas_0','kids_0','kids_1','sobremesas_0','doces_0','doces_1','doces_8','bolo_1','madrugada_1','madrugada_4','bebidas_0','bebidas_1','bebidas_2','bar_0','bar_2','bar_3','bar_6','bar_8','cafe_0','cafe_1'],
  churrasco:['recepcao_0','recepcao_12','regional_9','entradas_0','entradas_6','principais_2','principais_7','principais_3','acomp_0','acomp_6','acomp_10','acomp_11','kids_0','kids_1','sobremesas_1','doces_0','bolo_4','bebidas_0','bebidas_1','bebidas_2','bar_0','bar_5','bar_9','cafe_0'],
  italiano:['recepcao_5','recepcao_1','recepcao_13','entradas_7','entradas_1','massas_0','massas_3','massas_5','massas_6','massas_7','principais_0','kids_3','kids_4','sobremesas_9','sobremesas_0','doces_0','doces_1','bolo_2','madrugada_5','bebidas_0','bebidas_1','bebidas_4','bar_3','bar_4','bar_2','cafe_0','cafe_3'],
  nordeste:['recepcao_6','regional_11','regional_9','recepcao_0','entradas_9','regional_0','regional_8','regional_2','regional_3','regional_4','regional_5','acomp_9','kids_0','kids_6','sobremesas_6','doces_5','doces_7','doces_0','doces_1','bolo_3','madrugada_0','madrugada_1','madrugada_7','bebidas_0','bebidas_1','bebidas_2','bebidas_3','bar_0','bar_2','bar_5','bar_9','cafe_0'],
  brunch:['recepcao_1','recepcao_9','recepcao_5','entradas_7','entradas_3','entradas_0','principais_5','massas_6','kids_4','kids_7','sobremesas_5','sobremesas_7','doces_0','doces_11','bolo_6','bebidas_0','bebidas_2','bebidas_4','bebidas_5','bar_2','cafe_0','cafe_1','cafe_2'],
};

const BF_CHECK = [
  ['6 meses antes', [['c1','Definir o estilo de bufê e o teto do orçamento'],['c2','Pesquisar e pedir orçamento a pelo menos 3 bufês'],['c3','Agendar as degustações']]],
  ['4 meses antes', [['c4','Fazer a degustação e dar nota a cada bufê'],['c5','Fechar contrato e pagar o sinal'],['c6','Definir o cardápio principal']]],
  ['2 meses antes', [['c7','Escolher bolo e doces finos'],['c8','Definir bar, bebidas e quantidade de gelo'],['c9','Levantar restrições alimentares e alergias']]],
  ['1 mês antes',   [['c10','Confirmar o número de convidados (RSVP)'],['c11','Ajustar o cardápio e o cardápio infantil'],['c12','Fechar o roteiro e os horários do serviço']]],
  ['1 semana antes',[['c13','Enviar o número final de pessoas ao bufê'],['c14','Confirmar equipe, horários e montagem'],['c15','Quitar os pagamentos combinados']]],
  ['No dia',        [['c16','Receber a equipe e conferir a montagem das mesas'],['c17','Conferir bebidas, gelo e louças'],['c18','Separar embalagens para as sobras']]],
];

const BF_STATUS = { cotacao:'Em cotação', degustacao:'Degustação', negociando:'Negociando', contratado:'Contratado', descartado:'Descartado' };
const BF_TIPOS_F = { bufe:'Bufê', bolo:'Bolo', doces:'Doces finos', bebidas:'Bebidas', bar:'Bar & drinks', equipe:'Equipe', outro:'Outro' };

/* ---------------------- utilitários ---------------------- */
const bfN = (v, d=0) => (Number(v)||0).toLocaleString('pt-BR',{minimumFractionDigits:d, maximumFractionDigits:d});
const bfR = v => 'R$ ' + (Number(v)||0).toLocaleString('pt-BR',{minimumFractionDigits:0, maximumFractionDigits:0});
const bfR2 = v => (Number(v)||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const bfU = l => (l.un==='pessoas' && Math.ceil(l.q)===1) ? 'pessoa' : l.un;
const bfQ = l => (l.un==='kg'||l.un==='L') ? bfN(l.q, l.q<10?1:0) : bfN(Math.ceil(l.q));
const bfTel = t => { let d=String(t||'').replace(/\D/g,''); if(!d) return ''; if(d.length<=11) d='55'+d; return d; };
const bfId = () => Math.random().toString(36).slice(2,9);
function bfGet(o, p){ return p.split('.').reduce((a,k)=>a==null?a:a[k], o); }
function bfSet(o, p, v){ const ks=p.split('.'); let a=o; ks.slice(0,-1).forEach(k=>{ if(a[k]==null||typeof a[k]!=='object') a[k]={}; a=a[k]; }); a[ks[ks.length-1]]=v; }

const BF = { d:null, em:null, aba:'painel', t:null, salvando:false, ev:null, busca:'', filtro:'todos' };

function bfPadrao(){
  return { v:1, calc:{ usarLista:true, total:100, criancas:0, estilo:'jantar', duracao:5, periodo:'noite', apetite:'normal', clima:'quente', margem:10, bebidas:'moderado', pctAlcool:70, inicio:'19:30' },
    restricoes:{ vegetariano:0, vegano:0, semGluten:0, semLactose:0, alergias:'' },
    cardapio:[...BF_PRESETS.jantar], extras:[], precos:{}, teto:0, precoPacote:0, fornecedores:[], checklist:{}, obs:'' };
}
function bfNormaliza(d){
  const p=bfPadrao(); if(!d||typeof d!=='object') return p;
  return { ...p, ...d, calc:{...p.calc, ...(d.calc||{})}, restricoes:{...p.restricoes, ...(d.restricoes||{})},
    cardapio:Array.isArray(d.cardapio)?d.cardapio:p.cardapio, extras:Array.isArray(d.extras)?d.extras:[], precos:d.precos||{},
    fornecedores:Array.isArray(d.fornecedores)?d.fornecedores:[], checklist:d.checklist||{} };
}
function bfTotalLista(){ return (A.data?.convidados||[]).reduce((s,g)=>s+(+g.pessoas||0),0); }
function bfPessoas(d=BF.d){ const c=d.calc; const tot = c.usarLista ? bfTotalLista() : (+c.total||0); const cri=Math.min(+c.criancas||0, tot); return { tot, cri, adu:Math.max(0,tot-cri) }; }

/* ---------------------- motor de cálculo ---------------------- */
function bfCalc(d=BF.d){
  const c=d.calc, E=BF_ESTILOS[c.estilo]||BF_ESTILOS.jantar, { tot, cri, adu } = bfPessoas(d);
  const ap={leve:.85,normal:1,alto:1.15}[c.apetite]||1, per=c.periodo==='almoco'?.92:1;
  const dur=Math.max(2,+c.duracao||5), fd=Math.min(1.6,Math.max(.6,1+(dur-5)*.12)), fdB=Math.min(1.7,Math.max(.6,1+(dur-5)*.15));
  const mg=1+(+c.margem||0)/100, quente=c.clima==='quente', fq=quente?1.2:1;
  const eq=adu+cri*.5, base=ap*per*mg, pp=E.pp, L=[];
  const add=(k,nome,grupo,un,q)=>{ if(q>0) L.push({k,nome,grupo,un,q}); };
  add('salgados','Salgados e canapés','comida','un', Math.ceil(pp.salgados*fd*base*eq));
  add('mini','Mini-pratos e finger food','comida','un', Math.ceil(pp.mini*fd*base*eq));
  add('entradas','Entradas e saladas','comida','kg', pp.entradas*base*eq);
  add('proteinas', E.cru?'Carnes (peso cru)':'Proteínas do prato principal','comida','kg', pp.proteinas*base*eq);
  add('acomp','Acompanhamentos e massas','comida','kg', pp.acomp*base*eq);
  if(dur>=5) add('madrugada','Cardápio da madrugada','comida','porções', Math.ceil(pp.madrugada*mg*adu));
  add('sobremesa','Sobremesa','doces','porções', Math.ceil(pp.sobremesa*mg*tot));
  add('doces','Doces finos','doces','un', Math.ceil(pp.doces*mg*tot));
  add('bolo','Bolo','doces','kg', pp.bolo*mg*(adu+cri*.7));
  const beb = c.bebidas==='sem' ? 0 : Math.round(adu*(+c.pctAlcool||0)/100);
  add('agua','Água mineral','bebidas','L', (adu*.6+cri*.4)*fq*fdB*mg);
  add('refri','Refrigerantes','bebidas','L', (adu*.5+cri*.6)*fdB*mg);
  add('suco','Sucos naturais','bebidas','L', (adu*.35+cri*.5)*fq*fdB*mg);
  add('cerveja','Cerveja','bebidas','L', beb*({moderado:1.2,completo:1.6,premium:1.2}[c.bebidas]||0)*fq*fdB*mg);
  add('vinho','Vinho (garrafa 750 ml)','bebidas','garrafas', Math.ceil(beb*({completo:.25,premium:.35}[c.bebidas]||0)*mg));
  add('espumante','Espumante (garrafa 750 ml)','bebidas','garrafas', Math.ceil(adu*({moderado:1/7,completo:1/5,premium:1/3}[c.bebidas]||0)*mg));
  add('destilado','Drinks e destilados','bebidas','doses', Math.ceil(beb*({completo:2,premium:4}[c.bebidas]||0)*fdB*mg));
  add('cafe','Café','bebidas','L', adu*.08*mg);
  add('gelo','Gelo','bebidas','kg', Math.ceil(tot*(quente?1.4:1)*fdB*mg));
  if(tot){
    add('garcom','Garçons','equipe','pessoas', Math.ceil(tot/E.garcom));
    add('copeiro','Copeiros','equipe','pessoas', Math.ceil(tot/50));
    add('cozinheiro','Cozinheiros','equipe','pessoas', Math.ceil(tot/60));
    if(E.cru) add('churrasqueiro','Churrasqueiros','equipe','pessoas', Math.ceil(tot/60));
    if(beb && (c.bebidas==='completo'||c.bebidas==='premium')) add('bartender','Bartenders','equipe','pessoas', Math.ceil(beb/70));
    if(tot>80) add('maitre','Maître','equipe','pessoas', 1);
  }
  L.forEach(l=>{ const pr=d.precos?.[l.k]; l.preco = (pr!=null && pr!=='') ? +pr : (BF_PRECOS[l.k]||0); const qq=(l.un==='kg'||l.un==='L')?l.q:Math.ceil(l.q); l.custo=qq*l.preco; });
  const porGrupo = {}; Object.keys(BF_GRUPOS).forEach(g=>porGrupo[g]=L.filter(l=>l.grupo===g).reduce((s,l)=>s+l.custo,0));
  const custo = L.reduce((s,l)=>s+l.custo,0);
  const kg = k => (L.find(l=>l.k===k)?.q)||0;
  const comidaKg = kg('entradas')+kg('proteinas')+kg('acomp') + kg('salgados')*.025 + kg('mini')*.045;
  const bebL = ['agua','refri','suco','cerveja','cafe'].reduce((s,k)=>s+kg(k),0) + kg('vinho')*.75 + kg('espumante')*.75 + kg('destilado')*.05;
  const equipe = L.filter(l=>l.grupo==='equipe').reduce((s,l)=>s+l.q,0);
  // prato médio de um adulto (g)
  const prato = { 'Salgados':pp.salgados*fd*25*ap*per, 'Mini-pratos':pp.mini*fd*45*ap*per, 'Entradas':pp.entradas*1000*ap*per, 'Proteína':pp.proteinas*1000*ap*per*(E.cru?.7:1), 'Acompanhamentos':pp.acomp*1000*ap*per, 'Doces e bolo':pp.doces*15+pp.bolo*1000+pp.sobremesa*90 };
  return { L, tot, adu, cri, beb, E, dur, custo, porGrupo, pp: tot?custo/tot:0, comidaKg, bebL, equipe, prato };
}
function bfFornTotal(f, tot){ return (+f.valorPP||0)*tot + (+f.valorFixo||0); }
function bfContratado(d, tot){ return d.fornecedores.filter(f=>f.status==='contratado').reduce((s,f)=>s+bfFornTotal(f,tot),0); }

/* ---------------------- gráficos (SVG) ---------------------- */
function bfDonut(seg, centro, sub, size=170){
  const tot=seg.reduce((s,x)=>s+x.v,0), r=size/2-14, C=2*Math.PI*r; let off=0;
  const arcs = tot ? seg.filter(x=>x.v>0).map(x=>{ const len=x.v/tot*C; const a=`<circle r="${r}" cx="${size/2}" cy="${size/2}" fill="none" stroke="${x.c}" stroke-width="22" stroke-dasharray="${Math.max(0,len-2)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 ${size/2} ${size/2})"><title>${esc(x.n)}: ${Math.round(x.v/tot*100)}%</title></circle>`; off+=len; return a; }).join('')
    : `<circle r="${r}" cx="${size/2}" cy="${size/2}" fill="none" stroke="var(--soft)" stroke-width="22"/>`;
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(sub)}" style="flex:none"><circle r="${r}" cx="${size/2}" cy="${size/2}" fill="none" stroke="var(--soft)" stroke-width="22"/>${arcs}
    <text x="50%" y="48%" text-anchor="middle" style="font:700 24px 'Cormorant Garamond',serif;fill:var(--navy)">${esc(centro)}</text>
    <text x="50%" y="62%" text-anchor="middle" style="font:600 10.5px Inter,sans-serif;fill:var(--muted);letter-spacing:.06em">${esc(sub)}</text></svg>`;
}
function bfLegenda(seg, fmt){ const tot=seg.reduce((s,x)=>s+x.v,0)||1; return `<div class="bf-leg">${seg.map(x=>`<div><i style="background:${x.c}"></i>${esc(x.n)}<b>${fmt?fmt(x.v):bfN(x.v)} <small class="muted">${Math.round(x.v/tot*100)}%</small></b></div>`).join('')}</div>`; }
function bfBarras(rows){ const mx=Math.max(1,...rows.map(r=>r.v)); return `<div class="bf-bars">${rows.map(r=>`<div class="bf-bar"><div class="t"><span>${esc(r.n)}</span><b>${r.lab}</b></div><div class="tr"><i style="width:${Math.max(2,r.v/mx*100)}%;background:${r.c||BF_CORES.navy}"></i></div></div>`).join('')}</div>`; }
function bfGauge(v, max, lab, sub){
  const p = max ? Math.min(1.25, v/max) : 0, ang = Math.min(1,p)*180, cor = p>1 ? 'var(--bad)' : p>.9 ? 'var(--warn)' : BF_CORES.sage;
  const R=100, cx=120, cy=118, pt=a=>{ const t=Math.PI*(1-a/180); return [cx+R*Math.cos(t), cy-R*Math.sin(t)]; };
  const [x,y]=pt(ang), large = ang>180?1:0;
  return `<div class="bf-gauge"><svg viewBox="0 0 240 132" width="100%"><path d="M20 118 A100 100 0 0 1 220 118" fill="none" stroke="var(--soft)" stroke-width="18" stroke-linecap="round"/>
    ${ang>0?`<path d="M20 118 A100 100 0 ${large} 1 ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${cor}" stroke-width="18" stroke-linecap="round"/>`:''}</svg>
    <div class="v"><b>${lab}</b><span>${sub}</span></div></div>`;
}

/* ---------------------- persistência ---------------------- */
async function bfCarregar(force){
  if (BF.d && BF.ev===EVC && !force) return true;
  try { const r = await rpc('cas_bufe_obter',{p_pin:A.pin}); BF.d = bfNormaliza(r?.dados); BF.em=r?.em||null; BF.ev=EVC; return true; }
  catch(e){ toast(e.message); return false; }
}
function bfSalvar(){
  clearTimeout(BF.t); const el=$('#bfSave'); if(el){ el.classList.add('on'); el.lastChild.textContent=' Salvando…'; }
  BF.t = setTimeout(async()=>{
    try { BF.em = await rpc('cas_bufe_salvar',{p_pin:A.pin,p_dados:BF.d}); const e=$('#bfSave'); if(e){ e.classList.remove('on'); e.lastChild.textContent=' Salvo na nuvem'; } }
    catch(err){ const e=$('#bfSave'); if(e){ e.lastChild.textContent=' Não salvou'; } toast(err.message); }
  }, 700);
}

/* ---------------------- tela principal ---------------------- */
async function telaBufe(){
  $('#body').innerHTML = `<div class="loading" style="min-height:40vh"><div class="spin dark"></div>Carregando o bufê…</div>`;
  if(!(await bfCarregar())) return;
  const abas = [['painel','Painel'],['calc','Calculadora'],['cardapio','Cardápio'],['orcamento','Orçamento'],['roteiro','Roteiro & checklist']];
  $('#body').innerHTML = `
    <div class="row" style="justify-content:space-between;margin-top:6px"><span class="eyebrow">Planejamento do bufê</span><span class="bf-save" id="bfSave"><i></i> ${BF.em?'Salvo na nuvem':'Pronto para planejar'}</span></div>
    <div class="bf-nav"><div class="chips" role="tablist">${abas.map(([k,n])=>`<button class="chip" role="tab" data-bfa="${k}" aria-pressed="${BF.aba===k}">${n}</button>`).join('')}</div></div>
    <div id="bfBody"></div>`;
  $$('[data-bfa]').forEach(b=>b.onclick=()=>{ BF.aba=b.dataset.bfa; $$('[data-bfa]').forEach(x=>x.setAttribute('aria-pressed',x===b)); bfAba(); window.scrollTo({top:0,behavior:'smooth'}); });
  bfAba();
}
function bfAba(){ ({painel:bfPainel, calc:bfCalculadora, cardapio:bfCardapio, orcamento:bfOrcamento, roteiro:bfRoteiro})[BF.aba](); }
function bfIr(aba){ BF.aba=aba; $$('[data-bfa]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.bfa===aba)); bfAba(); window.scrollTo({top:0,behavior:'smooth'}); }

/* ---------------------- PAINEL ---------------------- */
function bfInsights(d, R){
  const out=[], sel=bfSelecionados(d), tem=t=>sel.filter(i=>i.tags.includes(t));
  const rs=d.restricoes, prin=sel.filter(i=>['principais','massas','regional','estacoes'].includes(i.cat));
  if(!R.tot) out.push(['at','Nenhum convidado na conta','Adicione convidados na lista ou digite o total na Calculadora.']);
  if((+rs.vegetariano||0)+(+rs.vegano||0)>0){ const v=prin.filter(i=>i.tags.includes('v')); out.push(v.length ? ['ok','Opção vegetariana garantida',`${v.length} prato(s) quente(s) vegetariano(s) para ${(+rs.vegetariano||0)+(+rs.vegano||0)} convidado(s).`] : ['at','Falta prato vegetariano',`Você tem ${(+rs.vegetariano||0)+(+rs.vegano||0)} vegetariano(s)/vegano(s) e nenhum prato principal sem carne.`]); }
  if(+rs.vegano>0 && !prin.some(i=>i.tags.includes('vg'))) out.push(['at','Inclua um prato vegano',`${rs.vegano} convidado(s) vegano(s). Sugestão: Moqueca de legumes e banana-da-terra.`]);
  if(+rs.semGluten>0){ const n=tem('sg').length; out.push(n>=4?['ok','Cardápio amigo de quem não come glúten',`${n} itens sem glúten selecionados.`]:['at','Poucas opções sem glúten',`Só ${n} item(ns) sem glúten para ${rs.semGluten} convidado(s). Peça ao bufê pratos sinalizados.`]); }
  if(+rs.semLactose>0 && tem('sl').length<4) out.push(['at','Atenção à lactose',`Apenas ${tem('sl').length} itens sem lactose para ${rs.semLactose} convidado(s).`]);
  if(rs.alergias && rs.alergias.trim()) out.push(['at','Alergias informadas',`${rs.alergias.trim()} — envie ao bufê e peça sinalização nos pratos.`]);
  if(R.cri>0 && !sel.some(i=>i.cat==='kids')) out.push(['at','Crianças sem cardápio infantil',`São ${R.cri} criança(s). Mini hambúrguer e batata smile fazem sucesso.`]);
  if(R.dur>=6 && !sel.some(i=>i.cat==='madrugada')) out.push(['tip','Festa longa pede madrugada',`Com ${R.dur} h de festa, um caldinho ou mini hambúrguer no fim segura a pista cheia.`]);
  if(d.calc.clima==='quente') out.push(['tip','Clima quente considerado','Água, sucos, cerveja e gelo já estão com 20% a mais na conta.']);
  if(d.teto>0){ const usado = bfContratado(d,R.tot) || R.custo; out.push(usado<=d.teto?['ok','Dentro do orçamento',`${bfR(usado)} de ${bfR(d.teto)} (${Math.round(usado/d.teto*100)}%).`]:['at','Acima do teto',`Faltam ${bfR(usado-d.teto)} para fechar a conta. Veja o Orçamento.`]); }
  const ck=bfCheckPct(d); if(ck<100) out.push(['tip','Próximo passo do cronograma', bfProximoCheck(d)||'']);
  return out.slice(0,7);
}
function bfPainel(){
  const d=BF.d, R=bfCalc(d), c=A.data.config, E=R.E, contr=bfContratado(d,R.tot), sel=bfSelecionados(d);
  const seg = Object.entries(BF_GRUPOS).map(([k,g])=>({n:g.n, v:R.porGrupo[k], c:g.c}));
  const rs=d.restricoes, restr=(+rs.vegetariano||0)+(+rs.vegano||0)+(+rs.semGluten||0)+(+rs.semLactose||0);
  const pessoas=[{n:'Adultos',v:Math.max(0,R.adu),c:BF_CORES.navy},{n:'Crianças',v:R.cri,c:BF_CORES.gold}];
  const kgRows = R.L.filter(l=>l.un==='kg'&&l.grupo!=='bebidas').map(l=>({n:l.nome,v:l.q,lab:bfN(l.q,1)+' kg',c:l.grupo==='doces'?BF_CORES.gold:BF_CORES.navy}));
  const bRows = R.L.filter(l=>l.grupo==='bebidas'&&l.un==='L').map(l=>({n:l.nome,v:l.q,lab:bfN(l.q)+' L',c:BF_CORES.blue}));
  const pr=Object.entries(R.prato).filter(([,v])=>v>0), prTot=pr.reduce((s,[,v])=>s+v,0)||1, prCor=[BF_CORES.sand,BF_CORES.teal,BF_CORES.sage,BF_CORES.navy,BF_CORES.blue,BF_CORES.gold];
  const ins=bfInsights(d,R);
  $('#bfBody').innerHTML = `
    <section class="bf-hero section">
      <div class="ey">${esc(E.n)} · ${R.dur} h de festa</div>
      <h2>${esc(tituloEvento(c))}</h2>
      <div class="small" style="color:#C9CFDA">${esc(c.data||'')}${c.local?' · '+esc(c.local):''}</div>
      <div class="big">${bfR(contr||R.custo)}</div>
      <div class="small" style="color:#C9CFDA">${contr?'Total contratado com fornecedores':'Custo estimado de comida, bebida e equipe'}</div>
      <div class="row3">
        <div><b>${bfN(R.tot)}</b><span>pessoas</span></div>
        <div><b>${bfR(R.tot?(contr||R.custo)/R.tot:0)}</b><span>por pessoa</span></div>
        <div><b>${sel.length}</b><span>itens no cardápio</span></div>
      </div>
    </section>
    <div class="bf-kpis">
      <div class="bf-kpi"><b>${bfN(R.comidaKg,0)} kg</b><span>de comida</span><small>${R.tot?bfN(R.comidaKg*1000/R.tot,0):0} g por pessoa</small></div>
      <div class="bf-kpi"><b>${bfN(R.bebL,0)} L</b><span>de bebidas</span><small>${R.tot?bfN(R.bebL/R.tot,1):0} L por pessoa</small></div>
      <div class="bf-kpi"><b>${bfN(R.equipe)}</b><span>profissionais</span><small>1 garçom a cada ${E.garcom} pessoas</small></div>
      <div class="bf-kpi"><b>${bfCheckPct(d)}%</b><span>do checklist</span><small>${bfN(Object.values(d.checklist).filter(Boolean).length)} de 18 tarefas</small></div>
    </div>
    <div class="bf-grid c2">
      <div class="bf-card"><h3>${ic('sliders')} Para onde vai o dinheiro</h3><div class="sub">Estimativa por categoria, com os preços de referência</div>
        <div class="bf-donut">${bfDonut(seg, bfR(R.custo).replace('R$ ',''), 'REAIS')}${bfLegenda(seg,bfR)}</div></div>
      <div class="bf-card"><h3>${ic('users')} Quem vai comer</h3><div class="sub">${R.tot?`${restr} pessoa(s) com restrição alimentar`:'Sem convidados ainda'}</div>
        <div class="bf-donut">${bfDonut(pessoas, bfN(R.tot), 'PESSOAS')}<div class="bf-leg">${pessoas.map(x=>`<div><i style="background:${x.c}"></i>${x.n}<b>${bfN(x.v)}</b></div>`).join('')}
          <div><i style="background:${BF_CORES.sage}"></i>Vegetarianos<b>${bfN(rs.vegetariano)}</b></div><div><i style="background:#2E7D4F"></i>Veganos<b>${bfN(rs.vegano)}</b></div>
          <div><i style="background:${BF_CORES.terra}"></i>Sem glúten<b>${bfN(rs.semGluten)}</b></div><div><i style="background:${BF_CORES.blue}"></i>Sem lactose<b>${bfN(rs.semLactose)}</b></div></div></div></div>
    </div>
    <div class="bf-card section"><h3>${ic('heart')} O prato de cada convidado</h3><div class="sub">Média consumida por um adulto ao longo da festa: <b>${bfN(prTot,0)} g</b></div>
      <div class="bf-plate">${pr.map(([n,v],i)=>`<i style="width:${v/prTot*100}%;background:${prCor[i%prCor.length]}" title="${esc(n)}">${v/prTot>.11?Math.round(v)+' g':''}</i>`).join('')}</div>
      <div class="bf-leg" style="flex-direction:row;flex-wrap:wrap;gap:8px 16px;margin-top:12px">${pr.map(([n,v],i)=>`<div><i style="background:${prCor[i%prCor.length]}"></i>${esc(n)} · ${Math.round(v)} g</div>`).join('')}</div></div>
    <div class="bf-grid c2">
      <div class="bf-card"><h3>${ic('list')} Comida (kg)</h3><div class="sub">Quantidade total já com a margem de segurança</div>${kgRows.length?bfBarras(kgRows):'<div class="bf-empty">Sem itens em kg neste estilo</div>'}</div>
      <div class="bf-card"><h3>${ic('swap')} Bebidas (litros)</h3><div class="sub">${R.beb} adulto(s) consomem álcool · clima ${d.calc.clima==='quente'?'quente':'ameno'}</div>${bfBarras(bRows)}</div>
    </div>
    <div class="bf-card section"><h3>${ic('check')} Análise inteligente</h3><div class="sub">O que o Meu Convite encontrou no seu planejamento</div>
      ${ins.map(([t,a,b])=>`<div class="bf-ins ${t}"><span class="d">${ic(t==='ok'?'check':t==='at'?'lock':'heart')}</span><div><b>${esc(a)}</b><span class="muted">${esc(b)}</span></div></div>`).join('')}</div>
    <div class="bf-act"><button class="btn wa" data-bfwa>${ic('wa')} Enviar por WhatsApp</button><button class="btn line" data-bfpr>${ic('download')} Imprimir / PDF</button></div>
    <div class="bf-act"><button class="btn primary" data-go="calc">${ic('sliders')} Ajustar a calculadora</button><button class="btn gold" data-go="cardapio">${ic('list')} Montar cardápio</button></div>`;
  bfLigaComuns();
}
function bfLigaComuns(root=document){
  $$('[data-go]',root).forEach(b=>b.onclick=()=>bfIr(b.dataset.go));
  $$('[data-bfwa]',root).forEach(b=>b.onclick=()=>bfWhats());
  $$('[data-bfpr]',root).forEach(b=>b.onclick=()=>bfImprimir());
}

/* ---------------------- CALCULADORA ---------------------- */
function bfStep(k, v, min=0, max=5000){ return `<div class="bf-step"><button type="button" data-dec="${k}" aria-label="Diminuir">−</button><input type="number" inputmode="numeric" min="${min}" max="${max}" data-k="${k}" value="${v}"><button type="button" data-inc="${k}" aria-label="Aumentar">+</button></div>`; }
function bfSeg(k, atual, ops){ return `<div class="seg" style="margin:0">${ops.map(([v,n])=>`<button type="button" data-seg="${k}" data-v="${v}" aria-selected="${String(atual)===String(v)}">${n}</button>`).join('')}</div>`; }
function bfCalculadora(){
  const d=BF.d, c=d.calc, rs=d.restricoes, lista=bfTotalLista();
  $('#bfBody').innerHTML = `
    <div class="bf-card section"><h3>${ic('users')} Convidados</h3><div class="sub">A conta usa adultos e crianças (crianças comem cerca de metade)</div>
      <label class="toggle" for="bfLista"><div class="tx"><b>Usar a lista de convidados</b><span>${bfN(lista)} pessoa(s) cadastrada(s) no evento</span></div><span class="sw"><input type="checkbox" id="bfLista" ${c.usarLista?'checked':''}><i></i></span></label>
      <div class="bf-f" style="margin-top:12px">
        <div id="bfTotWrap" class="${c.usarLista?'hidden':''}"><label>Total de pessoas</label>${bfStep('calc.total',c.total)}</div>
        <div><label>Crianças (3 a 10 anos)</label>${bfStep('calc.criancas',c.criancas)}</div>
        <div class="${c.usarLista?'':'hidden'}" id="bfAduWrap"><label>Adultos</label><div class="bf-step" style="justify-content:center;font:700 20px 'Cormorant Garamond',serif;color:var(--navy)" id="bfAdu">${bfPessoas().adu}</div></div>
      </div>
      <div class="section-title" style="font-size:18px;margin-top:20px">Restrições alimentares</div>
      <div class="bf-f c4">
        <div><label>Vegetarianos</label>${bfStep('restricoes.vegetariano',rs.vegetariano)}</div>
        <div><label>Veganos</label>${bfStep('restricoes.vegano',rs.vegano)}</div>
        <div><label>Sem glúten</label>${bfStep('restricoes.semGluten',rs.semGluten)}</div>
        <div><label>Sem lactose</label>${bfStep('restricoes.semLactose',rs.semLactose)}</div>
      </div>
      <label class="f" for="bfAl">Alergias e observações</label><input class="in" id="bfAl" data-k="restricoes.alergias" data-txt value="${esc(rs.alergias)}" placeholder="Ex.: 2 convidados alérgicos a camarão">
    </div>
    <div class="bf-card section"><h3>${ic('list')} Estilo do serviço</h3><div class="sub">Cada estilo tem quantidades e faixa de preço por pessoa diferentes</div>
      <div class="bf-styles">${Object.entries(BF_ESTILOS).map(([k,e])=>`<button type="button" class="bf-sty" data-sty="${k}" aria-pressed="${c.estilo===k}"><span class="mk">${e.m}</span><b>${e.n}</b><span>${e.d}</span><em>${bfR(e.faixa[0])} a ${bfR(e.faixa[1])} /pessoa</em></button>`).join('')}</div>
    </div>
    <div class="bf-card section"><h3>${ic('sliders')} Detalhes da festa</h3><div class="sub">Ajuste fino: a calculadora recalcula na hora</div>
      <label class="f">Duração da festa</label><div class="bf-range"><input type="range" min="2" max="10" step="1" data-k="calc.duracao" value="${c.duracao}"><b data-lab="calc.duracao">${c.duracao} h</b></div>
      <label class="f">Margem de segurança</label><div class="bf-range"><input type="range" min="0" max="25" step="1" data-k="calc.margem" value="${c.margem}"><b data-lab="calc.margem">${c.margem}%</b></div>
      <label class="f">Período</label>${bfSeg('calc.periodo',c.periodo,[['almoco','Almoço / tarde'],['noite','Noite']])}
      <label class="f">Apetite dos convidados</label>${bfSeg('calc.apetite',c.apetite,[['leve','Leve'],['normal','Normal'],['alto','Bom de garfo']])}
      <label class="f">Clima</label>${bfSeg('calc.clima',c.clima,[['ameno','Ameno'],['quente','Quente']])}
      <label class="f">Bar e bebidas</label>${bfSeg('calc.bebidas',c.bebidas,[['sem','Sem álcool'],['moderado','Cerveja + brinde'],['completo','Completo'],['premium','Premium']])}
      <div id="bfAlcWrap" class="${c.bebidas==='sem'?'hidden':''}"><label class="f">Adultos que consomem álcool</label><div class="bf-range"><input type="range" min="0" max="100" step="5" data-k="calc.pctAlcool" value="${c.pctAlcool}"><b data-lab="calc.pctAlcool">${c.pctAlcool}%</b></div></div>
    </div>
    <div id="bfRes"></div>`;
  const recalc=()=>{ bfResultado(); const a=$('#bfAdu'); if(a) a.textContent=bfPessoas().adu; };
  const setV=(k,v,re=true)=>{ bfSet(d,k,v); bfSalvar(); const lab=$(`[data-lab="${k}"]`); if(lab) lab.textContent = v + (k==='calc.duracao'?' h':'%'); if(re) recalc(); };
  $$('[data-k]').forEach(i=>{ i.oninput=()=>setV(i.dataset.k, i.dataset.txt!==undefined ? i.value : Math.max(0, Math.round(+i.value||0)), i.dataset.txt===undefined); });
  $$('[data-inc],[data-dec]').forEach(b=>b.onclick=()=>{ const k=b.dataset.inc||b.dataset.dec, inp=$(`input[data-k="${k}"]`); const v=Math.max(0,(+inp.value||0)+(b.dataset.inc?1:-1)); inp.value=v; setV(k,v); });
  $$('[data-seg]').forEach(b=>b.onclick=()=>{ const k=b.dataset.seg; $$(`[data-seg="${k}"]`).forEach(x=>x.setAttribute('aria-selected',x===b)); setV(k,b.dataset.v); if(k==='calc.bebidas') $('#bfAlcWrap').classList.toggle('hidden',b.dataset.v==='sem'); });
  $$('[data-sty]').forEach(b=>b.onclick=()=>{ $$('[data-sty]').forEach(x=>x.setAttribute('aria-pressed',x===b)); setV('calc.estilo',b.dataset.sty); toast(BF_ESTILOS[b.dataset.sty].n+' selecionado'); });
  $('#bfLista').onchange=e=>{ setV('calc.usarLista',e.target.checked); $('#bfTotWrap').classList.toggle('hidden',e.target.checked); $('#bfAduWrap').classList.toggle('hidden',!e.target.checked); };
  bfResultado();
}
function bfResultado(){
  const R=bfCalc(), el=$('#bfRes'); if(!el) return;
  const linha=l=>`<tr><td>${esc(l.nome)}</td><td class="n">${l.grupo==='equipe'?'1 a cada '+bfN(R.tot/Math.max(1,Math.ceil(l.q))):R.tot?(l.un==='kg'?bfN(l.q*1000/R.tot,0)+' g':l.un==='L'?bfN(l.q*1000/R.tot,0)+' ml':bfN(l.q/R.tot,l.q/R.tot<1?2:1)):'–'}</td><td class="n"><b>${bfQ(l)}</b> <span class="muted small">${bfU(l)}</span></td></tr>`;
  el.innerHTML = `<div class="bf-card section" style="border-color:#E3D3AE"><h3>${ic('check')} Resultado da calculadora</h3>
    <div class="sub">${bfN(R.tot)} pessoas · ${bfN(R.adu)} adultos · ${bfN(R.cri)} crianças · ${esc(R.E.n)} · ${R.dur} h · margem ${BF.d.calc.margem}%</div>
    <div class="bf-scroll"><table class="bf-tbl"><thead><tr><th>Item</th><th class="n">Por pessoa</th><th class="n">Total</th></tr></thead><tbody>
    ${Object.entries(BF_GRUPOS).map(([g,G])=>{ const ls=R.L.filter(l=>l.grupo===g); return ls.length?`<tr class="g"><td colspan="3">${G.n}</td></tr>${ls.map(linha).join('')}`:''; }).join('')}
    </tbody><tfoot><tr><td>Custo estimado</td><td class="n">${bfR2(R.pp)}</td><td class="n">${bfR(R.custo)}</td></tr></tfoot></table></div>
    <p class="hint">Referências usadas por bufês brasileiros. Valores e preços são estimativas: ajuste os preços em Orçamento e confirme com seu fornecedor.</p>
    <div class="bf-act"><button class="btn wa" data-bfwa>${ic('wa')} Enviar por WhatsApp</button><button class="btn line" data-go="orcamento">${ic('sliders')} Ajustar preços</button></div></div>`;
  bfLigaComuns(el);
}

/* ---------------------- CARDÁPIO ---------------------- */
function bfSelecionados(d=BF.d){ const ex=Object.fromEntries((d.extras||[]).map(x=>[x.id,{...x,tags:x.tags||[]}])); return d.cardapio.map(id=>BF_ITENS[id]||ex[id]).filter(Boolean); }
function bfCardapio(){
  const d=BF.d, sel=new Set(d.cardapio);
  const filtros=[['todos','Todos'],['sel','Selecionados'],['v','Vegetariano'],['vg','Vegano'],['sg','Sem glúten'],['sl','Sem lactose'],['k','Infantil'],['r','Regional'],['p','Premium']];
  $('#bfBody').innerHTML = `
    <div class="bf-card section" style="background:linear-gradient(160deg,#FFFDF8,#F7EFE0)">
      <div class="row" style="justify-content:space-between;align-items:flex-start;gap:12px"><div><h3>${ic('heart')} Seu cardápio</h3><div class="sub" id="bfCnt"></div></div>
      <button class="btn line sm" data-ver>${ic('eye')} Ver menu</button></div>
      <div class="bf-act" style="margin-top:4px"><button class="btn gold sm" data-chef>${ic('heart')} Sugestão do chef</button><button class="btn line sm" data-novo>${ic('plus')} Item próprio</button></div>
      <p class="hint" style="margin-top:10px">A sugestão do chef monta um cardápio completo para o estilo <b>${esc(BF_ESTILOS[d.calc.estilo].n)}</b>.</p>
    </div>
    <div class="bf-search section">${ic('search')}<input class="in" id="bfBusca" placeholder="Buscar prato, bebida ou doce" value="${esc(BF.busca)}"></div>
    <div class="chips" style="margin-top:10px">${filtros.map(([k,n])=>`<button class="chip" data-fl="${k}" aria-pressed="${BF.filtro===k}">${n}</button>`).join('')}</div>
    <div id="bfCats"></div>`;
  const render=()=>{
    const q=BF.busca.trim().toLowerCase(), f=BF.filtro;
    const ok=it=> (!q || it.nome.toLowerCase().includes(q)) && (f==='todos' || (f==='sel'?sel.has(it.id):it.tags.includes(f)));
    const cats = BF_CARDAPIO.map(([cat,n,L])=>{ const its=[...L.map((_,i)=>BF_ITENS[cat+'_'+i]), ...d.extras.filter(x=>x.cat===cat).map(x=>({...x,tags:x.tags||[]}))].filter(ok); return [cat,n,its]; }).filter(x=>x[2].length);
    $('#bfCats').innerHTML = cats.length ? cats.map(([cat,n,its])=>`<section class="bf-cat"><header><b>${esc(n)}</b><span>${its.filter(i=>sel.has(i.id)).length} de ${its.length}</span></header><div class="bf-items">
      ${its.map(it=>`<button class="bf-it" data-it="${it.id}" aria-pressed="${sel.has(it.id)}"><span class="ck">${ic('check')}</span><span class="nm">${esc(it.nome)}<span class="bf-tags">${it.tags.filter(t=>BF_TAGS[t]).map(t=>`<span class="bf-tag ${t}">${BF_TAGS[t]}</span>`).join('')}${it.extra?'<span class="bf-tag p">Seu item</span>':''}</span></span></button>`).join('')}</div></section>`).join('')
      : `<div class="bf-empty">Nada encontrado. Que tal adicionar como item próprio?</div>`;
    $('#bfCnt').textContent = `${sel.size} itens escolhidos em ${new Set(bfSelecionados().map(i=>i.cat)).size} categorias`;
    $$('[data-it]').forEach(b=>b.onclick=()=>{ const id=b.dataset.it; if(sel.has(id)) sel.delete(id); else sel.add(id); d.cardapio=[...sel]; b.setAttribute('aria-pressed',sel.has(id)); bfSalvar(); const h=b.closest('.bf-cat').querySelector('header span'); const all=$$('.bf-it',b.closest('.bf-cat')); h.textContent=`${all.filter(x=>sel.has(x.dataset.it)).length} de ${all.length}`; $('#bfCnt').textContent=`${sel.size} itens escolhidos em ${new Set(bfSelecionados().map(i=>i.cat)).size} categorias`; });
  };
  $('#bfBusca').oninput=e=>{ BF.busca=e.target.value; render(); };
  $$('[data-fl]').forEach(b=>b.onclick=()=>{ BF.filtro=b.dataset.fl; $$('[data-fl]').forEach(x=>x.setAttribute('aria-pressed',x===b)); render(); });
  $('[data-chef]').onclick=async()=>{ if(sel.size && !(await confirmar({titulo:'Aplicar sugestão do chef?',texto:'O cardápio atual será trocado pela sugestão para '+BF_ESTILOS[d.calc.estilo].n+'. Seus itens próprios continuam salvos.',ok:'Aplicar',icone:'heart'}))) return;
    d.cardapio=[...BF_PRESETS[d.calc.estilo]]; sel.clear(); d.cardapio.forEach(x=>sel.add(x)); bfSalvar(); render(); toast('Cardápio do chef aplicado'); };
  $('[data-novo]').onclick=()=>bfNovoItem(()=>{ sel.clear(); d.cardapio.forEach(x=>sel.add(x)); render(); });
  $('[data-ver]').onclick=()=>bfVerMenu();
  render();
}
function bfNovoItem(cb){
  const s=sheet('Novo item do cardápio', `<label class="f" for="ni_n">Nome do prato ou bebida</label><input class="in" id="ni_n" placeholder="Ex.: Arroz de polvo da vovó">
    <label class="f" for="ni_c">Categoria</label><select class="in" id="ni_c" style="appearance:auto">${BF_CARDAPIO.map(([k,n])=>`<option value="${k}">${esc(n)}</option>`).join('')}</select>
    <label class="f">Marcações</label><div class="bf-wa-pick">${Object.entries(BF_TAGS).map(([k,n])=>`<label><input type="checkbox" value="${k}"> ${n}</label>`).join('')}</div>
    <button class="btn primary full" id="ni_ok" style="margin-top:16px">${ic('plus')} Adicionar ao cardápio</button>`);
  $('#ni_ok',s).onclick=()=>{ const nome=$('#ni_n',s).value.trim(); if(!nome) return toast('Digite o nome do item');
    const it={id:'x_'+bfId(), cat:$('#ni_c',s).value, nome, tags:$$('.bf-wa-pick input:checked',s).map(x=>x.value), extra:true};
    BF.d.extras.push(it); BF.d.cardapio.push(it.id); bfSalvar(); s.fechar(); toast('Item adicionado'); cb&&cb(); };
}
function bfMenuHTML(){
  const sel=bfSelecionados(), c=A.data.config;
  const grupos=BF_CARDAPIO.map(([k,n])=>[n, sel.filter(i=>i.cat===k)]).filter(x=>x[1].length);
  return `<div class="bf-menu"><div class="eyebrow">Cardápio</div><div class="tt" style="margin-top:8px">${esc([c.noivo1,c.noivo2].filter(Boolean).join(' & ')||tituloEvento(c))}</div>
    <div class="orn">✦</div>${grupos.map(([n,its])=>`<h4>${esc(n)}</h4>${its.map(i=>`<p>${esc(i.nome)}</p>`).join('')}`).join('')||'<p class="muted">Escolha os itens para montar o menu</p>'}
    <div class="orn" style="margin-top:22px">✦</div><div class="small muted">${esc(c.data||'')}</div></div>`;
}
function bfVerMenu(){ const s=sheet('Menu do evento', bfMenuHTML()+`<div class="bf-act"><button class="btn wa" data-bfwa>${ic('wa')} WhatsApp</button><button class="btn line" data-bfpr>${ic('download')} Imprimir</button></div>`); bfLigaComuns(s); }

/* ---------------------- ORÇAMENTO ---------------------- */
function bfOrcamento(){
  const d=BF.d, R=bfCalc(d), contr=bfContratado(d,R.tot), pago=d.fornecedores.filter(f=>f.status==='contratado').reduce((s,f)=>s+(+f.pago||0),0);
  const ativos=d.fornecedores.filter(f=>f.status!=='descartado');
  const comp=d.fornecedores.filter(f=>f.tipo==='bufe' && (+f.valorPP||+f.valorFixo)).map(f=>({n:f.nome, v:bfFornTotal(f,R.tot), lab:bfR(bfFornTotal(f,R.tot))+(f.valorPP?` · ${bfR(f.valorPP)}/p`:''), c:f.status==='contratado'?BF_CORES.sage:f.status==='descartado'?'#C9C2B8':BF_CORES.navy}));
  const base = contr||R.custo;
  $('#bfBody').innerHTML = `
    <div class="bf-grid c2">
      <div class="bf-card"><h3>${ic('lock')} Teto do orçamento</h3><div class="sub">Quanto você quer gastar com o bufê no total</div>
        ${bfGauge(base, d.teto, d.teto?Math.round(base/d.teto*100)+'%':'—', d.teto?`${bfR(base)} de ${bfR(d.teto)}`:'Defina o teto abaixo')}
        <label class="f" for="bfTeto">Teto (R$)</label><input class="in" id="bfTeto" type="number" inputmode="decimal" min="0" value="${d.teto||''}" placeholder="Ex.: 40000"></div>
      <div class="bf-card"><h3>${ic('check')} Pagamentos</h3><div class="sub">Fornecedores contratados</div>
        <div class="stats" style="grid-template-columns:1fr 1fr;margin-top:0"><div class="stat"><b>${bfR(contr)}</b><span>Contratado</span></div><div class="stat"><b style="color:var(--ok)">${bfR(pago)}</b><span>Já pago</span></div></div>
        <div class="prog light" style="height:12px;margin-top:14px"><i style="width:${contr?Math.min(100,pago/contr*100):0}%"></i></div>
        <p class="hint">${contr?`Faltam ${bfR(Math.max(0,contr-pago))} · ${Math.round(contr?pago/contr*100:0)}% quitado`:'Marque um fornecedor como Contratado para acompanhar.'}</p></div>
    </div>
    <div class="bf-card section"><div class="row" style="justify-content:space-between"><div><h3>${ic('users')} Fornecedores</h3><div class="sub">Compare propostas, notas da degustação e status</div></div><button class="btn gold sm" data-addf>${ic('plus')} Adicionar</button></div>
      ${d.fornecedores.length? d.fornecedores.map(f=>`<div class="bf-sup"><span class="av">${esc(iniciais(f.nome))}</span><div class="info"><b>${esc(f.nome)}</b>
        <div class="m">${esc(BF_TIPOS_F[f.tipo]||'')} · ${f.valorPP?bfR(f.valorPP)+'/pessoa':''}${f.valorPP&&f.valorFixo?' + ':''}${f.valorFixo?bfR(f.valorFixo):''} = <b style="display:inline;color:var(--navy)">${bfR(bfFornTotal(f,R.tot))}</b></div>
        <div class="row wrap" style="gap:6px;margin-top:6px"><span class="bf-st ${f.status}">${BF_STATUS[f.status]||''}</span>${f.nota?`<span class="bf-stars">${'★'.repeat(f.nota)}${'☆'.repeat(5-f.nota)}</span>`:''}${f.status==='contratado'&&f.pago?`<span class="pill ok">pago ${bfR(f.pago)}</span>`:''}</div>
        ${f.obs?`<div class="m" style="margin-top:4px">${esc(f.obs)}</div>`:''}</div>
        <div class="acts" style="display:flex;flex-direction:column;gap:6px">${bfTel(f.contato)?`<button class="iconbtn wa" data-fwa="${f.id}" aria-label="WhatsApp">${ic('wa')}</button>`:''}<button class="iconbtn" data-fed="${f.id}" aria-label="Editar">${ic('edit')}</button></div></div>`).join('')
        : `<div class="bf-empty">Nenhum fornecedor ainda. Adicione os bufês que você está cotando.</div>`}
    </div>
    ${comp.length>1?`<div class="bf-card section"><h3>${ic('swap')} Comparativo de bufês</h3><div class="sub">Custo total para ${bfN(R.tot)} pessoas</div>${bfBarras(comp)}</div>`:''}
    <div class="bf-card section"><h3>${ic('sliders')} Estimativa detalhada</h3><div class="sub">Edite o preço unitário para a realidade da sua cidade · ${ativos.length} fornecedor(es) ativo(s)</div>
      <div class="bf-scroll"><table class="bf-tbl"><thead><tr><th>Item</th><th class="n">Qtd.</th><th class="n">Preço un.</th><th class="n">Total</th></tr></thead><tbody>
      ${Object.entries(BF_GRUPOS).map(([g,G])=>{ const ls=R.L.filter(l=>l.grupo===g); return ls.length?`<tr class="g"><td colspan="3">${G.n}</td><td class="n">${bfR(R.porGrupo[g])}</td></tr>${ls.map(l=>`<tr><td>${esc(l.nome)}</td><td class="n">${bfQ(l)} <span class="muted small">${bfU(l)}</span></td><td class="n"><input type="number" step="0.1" min="0" inputmode="decimal" data-pr="${l.k}" value="${l.preco}"></td><td class="n" data-tt="${l.k}">${bfR(l.custo)}</td></tr>`).join('')}`:''; }).join('')}
      </tbody><tfoot><tr><td colspan="3">Total estimado · ${bfR2(R.pp)} por pessoa</td><td class="n" id="bfTT">${bfR(R.custo)}</td></tr></tfoot></table></div>
      <button class="btn line sm" data-reset style="margin-top:12px">${ic('undo')} Voltar aos preços de referência</button></div>
    <div class="bf-act"><button class="btn wa" data-bfwa>${ic('wa')} Enviar por WhatsApp</button><button class="btn line" data-bfpr>${ic('download')} Imprimir / PDF</button></div>`;
  $('#bfTeto').onchange=e=>{ d.teto=Math.max(0,+e.target.value||0); bfSalvar(); bfOrcamento(); };
  $$('[data-pr]').forEach(i=>i.onchange=()=>{ d.precos[i.dataset.pr]= i.value===''?null:Math.max(0,+i.value); bfSalvar(); const y=window.scrollY; bfOrcamento(); window.scrollTo(0,y); });
  $('[data-reset]').onclick=()=>{ d.precos={}; bfSalvar(); bfOrcamento(); toast('Preços de referência restaurados'); };
  $('[data-addf]').onclick=()=>bfFornecedor();
  $$('[data-fed]').forEach(b=>b.onclick=()=>bfFornecedor(d.fornecedores.find(f=>f.id===b.dataset.fed)));
  $$('[data-fwa]').forEach(b=>b.onclick=()=>bfWhats(d.fornecedores.find(f=>f.id===b.dataset.fwa)));
  bfLigaComuns($('#bfBody'));
}
function bfFornecedor(f){
  const novo=!f; f=f||{id:bfId(), nome:'', tipo:'bufe', contato:'', valorPP:'', valorFixo:'', status:'cotacao', nota:0, pago:'', obs:''};
  const s=sheet(novo?'Novo fornecedor':'Editar fornecedor', `
    <label class="f" for="f_n">Nome</label><input class="in" id="f_n" value="${esc(f.nome)}" placeholder="Ex.: Bufê Sabor Real">
    <div class="grid2"><div><label class="f" for="f_t">Tipo</label><select class="in" id="f_t" style="appearance:auto">${Object.entries(BF_TIPOS_F).map(([k,n])=>`<option value="${k}" ${f.tipo===k?'selected':''}>${n}</option>`).join('')}</select></div>
    <div><label class="f" for="f_s">Status</label><select class="in" id="f_s" style="appearance:auto">${Object.entries(BF_STATUS).map(([k,n])=>`<option value="${k}" ${f.status===k?'selected':''}>${n}</option>`).join('')}</select></div></div>
    <label class="f" for="f_c">WhatsApp</label><input class="in" id="f_c" type="tel" inputmode="tel" value="${esc(f.contato)}" placeholder="(82) 99999-0000">
    <div class="grid2"><div><label class="f" for="f_pp">Valor por pessoa (R$)</label><input class="in" id="f_pp" type="number" inputmode="decimal" value="${f.valorPP}"></div>
    <div><label class="f" for="f_fx">Valor fixo (R$)</label><input class="in" id="f_fx" type="number" inputmode="decimal" value="${f.valorFixo}"></div></div>
    <div class="grid2"><div><label class="f" for="f_pg">Já pago (R$)</label><input class="in" id="f_pg" type="number" inputmode="decimal" value="${f.pago}"></div>
    <div><label class="f">Nota da degustação</label><div class="row" id="f_nt" style="gap:4px;min-height:50px">${[1,2,3,4,5].map(i=>`<button type="button" class="iconbtn" data-n="${i}" style="width:38px;height:38px;color:var(--gold2);font-size:18px">${i<=f.nota?'★':'☆'}</button>`).join('')}</div></div></div>
    <label class="f" for="f_o">Observações</label><textarea class="in" id="f_o" style="min-height:80px" placeholder="O que está incluso, condições de pagamento…">${esc(f.obs)}</textarea>
    <button class="btn primary full" id="f_ok" style="margin-top:16px">${ic('check')} Salvar</button>
    ${novo?'':`<button class="btn danger full" id="f_del" style="margin-top:10px">${ic('trash')} Excluir fornecedor</button>`}`);
  let nota=f.nota||0;
  $$('[data-n]',s).forEach(b=>b.onclick=()=>{ nota=+b.dataset.n===nota?0:+b.dataset.n; $$('[data-n]',s).forEach(x=>x.textContent=+x.dataset.n<=nota?'★':'☆'); });
  $('#f_ok',s).onclick=()=>{ const nome=$('#f_n',s).value.trim(); if(!nome) return toast('Digite o nome do fornecedor');
    Object.assign(f,{nome, tipo:$('#f_t',s).value, status:$('#f_s',s).value, contato:$('#f_c',s).value.trim(), valorPP:+$('#f_pp',s).value||0, valorFixo:+$('#f_fx',s).value||0, pago:+$('#f_pg',s).value||0, nota, obs:$('#f_o',s).value.trim()});
    if(novo) BF.d.fornecedores.push(f); bfSalvar(); s.fechar(); bfOrcamento(); toast('Fornecedor salvo'); };
  if(!novo) $('#f_del',s).onclick=async()=>{ if(!(await confirmar({titulo:'Excluir fornecedor?',texto:f.nome,ok:'Excluir',perigo:true}))) return; BF.d.fornecedores=BF.d.fornecedores.filter(x=>x.id!==f.id); bfSalvar(); s.fechar(); bfOrcamento(); };
}

/* ---------------------- ROTEIRO & CHECKLIST ---------------------- */
function bfCheckPct(d=BF.d){ return Math.round(Object.values(d.checklist||{}).filter(Boolean).length/18*100); }
function bfProximoCheck(d=BF.d){ for(const [,L] of BF_CHECK) for(const [k,t] of L) if(!d.checklist[k]) return t; return ''; }
function bfRoteiroEtapas(d=BF.d){
  const c=d.calc, E=BF_ESTILOS[c.estilo]||BF_ESTILOS.jantar, dur=Math.max(2,+c.duracao||5);
  const [h,m]=(c.inicio||'19:30').split(':').map(Number), t0=(h||0)*60+(m||0);
  const hhmm=min=>{ min=((Math.round(min/5)*5)%1440+1440)%1440; return String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0'); };
  const D=dur*60, et=[];
  et.push([0,'Recepção','Boas-vindas com bebidas e '+(E.pp.salgados?'salgados volantes':'canapés')]);
  if(c.estilo==='coquetel'){ et.push([D*.25,'Mini-pratos','Finger foods quentes passam a circular']); }
  else { if(E.pp.entradas) et.push([D*.22,'Entradas',c.estilo==='empratado'?'Entrada servida à mesa':'Abertura das saladas e entradas']);
         et.push([D*.32, c.estilo==='churrasco'?'Churrasco':'Jantar', c.estilo==='empratado'?'Prato principal servido à mesa':'Abertura do bufê principal']); }
  et.push([D*.55,'Bolo e brinde','Corte do bolo e brinde com espumante']);
  et.push([D*.6,'Doces e café','Liberação da mesa de doces, sobremesas e café']);
  if(dur>=5 && E.pp.madrugada) et.push([D-75,'Madrugada','Cardápio da madrugada para a pista']);
  et.push([D,'Encerramento','Fim do serviço de bufê e bar']);
  return et.sort((a,b)=>a[0]-b[0]).map(([t,n,x])=>({h:hhmm(t0+t), n, x}));
}
function bfRoteiro(){
  const d=BF.d, pct=bfCheckPct(d), et=bfRoteiroEtapas(d);
  $('#bfBody').innerHTML = `
    <div class="bf-grid c2">
      <div class="bf-card"><h3>${ic('cal')} Roteiro do serviço</h3><div class="sub">Horários calculados pela duração e pelo estilo</div>
        <div class="grid2"><div><label class="f" for="bfIni" style="margin-top:0">Início da festa</label><input class="in" type="time" id="bfIni" value="${esc(d.calc.inicio||'19:30')}"></div>
        <div><label class="f" style="margin-top:0">Duração</label><div class="bf-step" style="justify-content:center;font:700 20px 'Cormorant Garamond',serif;color:var(--navy)">${d.calc.duracao} h</div></div></div>
        <div class="bf-tl" style="margin-top:16px">${et.map(e=>`<div><b>${e.h}</b><span>${esc(e.n)}</span><small>${esc(e.x)}</small></div>`).join('')}</div></div>
      <div class="bf-card"><h3>${ic('check')} Progresso</h3><div class="sub">${pct===100?'Tudo pronto. Agora é aproveitar a festa!':'Próximo: '+esc(bfProximoCheck(d))}</div>
        ${bfGauge(pct,100,pct+'%','do checklist concluído')}
        <label class="f" for="bfObs">Anotações do bufê</label><textarea class="in" id="bfObs" style="min-height:96px" placeholder="Horário de chegada da equipe, montagem, contatos…">${esc(d.obs||'')}</textarea></div>
    </div>
    <div class="bf-card section"><h3>${ic('list')} Checklist do bufê</h3><div class="sub">Cronograma recomendado por organizadores de eventos</div>
      ${BF_CHECK.map(([fase,L])=>`<div class="bf-phase"><span>${fase}</span><span>${L.filter(([k])=>d.checklist[k]).length}/${L.length}</span></div>${L.map(([k,t])=>`<label class="bf-chk ${d.checklist[k]?'done':''}"><input type="checkbox" data-ck="${k}" ${d.checklist[k]?'checked':''}><span>${esc(t)}</span></label>`).join('')}`).join('')}</div>`;
  $('#bfIni').onchange=e=>{ d.calc.inicio=e.target.value||'19:30'; bfSalvar(); bfRoteiro(); };
  $('#bfObs').oninput=e=>{ d.obs=e.target.value; bfSalvar(); };
  $$('[data-ck]').forEach(i=>i.onchange=()=>{ d.checklist[i.dataset.ck]=i.checked; bfSalvar(); const y=window.scrollY; bfRoteiro(); window.scrollTo(0,y); });
}

/* ---------------------- WHATSAPP & IMPRESSÃO ---------------------- */
function bfTexto(op){
  const d=BF.d, R=bfCalc(d), c=A.data.config, sel=bfSelecionados(d), rs=d.restricoes, out=[];
  out.push(`*Bufê — ${tituloEvento(c)}*`);
  if(c.data||c.local) out.push([c.data?'📅 '+c.data:'', c.local?'📍 '+c.local:''].filter(Boolean).join('\n'));
  out.push(`👥 ${bfN(R.tot)} pessoas (${bfN(R.adu)} adultos · ${bfN(R.cri)} crianças)\n🍽️ ${R.E.n} · ${R.dur} h de festa · início ${d.calc.inicio||''}`);
  if(op.qtd){ out.push('*Quantidades estimadas*\n'+Object.entries(BF_GRUPOS).map(([g,G])=>{ const ls=R.L.filter(l=>l.grupo===g); return ls.length?`_${G.n}_\n`+ls.map(l=>`• ${l.nome}: ${bfQ(l)} ${bfU(l)}`).join('\n'):''; }).filter(Boolean).join('\n\n')); }
  if(op.menu && sel.length){ out.push('*Cardápio*\n'+BF_CARDAPIO.map(([k,n])=>{ const its=sel.filter(i=>i.cat===k); return its.length?`_${n}_\n`+its.map(i=>'• '+i.nome).join('\n'):''; }).filter(Boolean).join('\n\n')); }
  if(op.rest){ const r=[rs.vegetariano&&`${rs.vegetariano} vegetariano(s)`, rs.vegano&&`${rs.vegano} vegano(s)`, rs.semGluten&&`${rs.semGluten} sem glúten`, rs.semLactose&&`${rs.semLactose} sem lactose`].filter(Boolean); if(r.length||rs.alergias) out.push('*Restrições alimentares*\n'+[r.join(' · '), rs.alergias?'⚠️ '+rs.alergias:''].filter(Boolean).join('\n')); }
  if(op.rot) out.push('*Roteiro do serviço*\n'+bfRoteiroEtapas(d).map(e=>`${e.h} — ${e.n}`).join('\n'));
  if(op.orc) out.push(`*Orçamento estimado*\n${bfR(R.custo)} (${bfR2(R.pp)} por pessoa)`+(bfContratado(d,R.tot)?`\nContratado: ${bfR(bfContratado(d,R.tot))}`:''));
  out.push('_Planejado no app Meu Convite_');
  return out.join('\n\n');
}
function bfWhats(forn){
  const d=BF.d, comTel=d.fornecedores.filter(f=>bfTel(f.contato));
  const ops=[['qtd','Quantidades da calculadora',true],['menu','Cardápio escolhido',true],['rest','Restrições e alergias',true],['rot','Roteiro com horários',true],['orc','Orçamento estimado',false]];
  const s=sheet('Enviar por WhatsApp', `
    <label class="f">O que enviar</label><div class="bf-wa-pick">${ops.map(([k,n,on])=>`<label><input type="checkbox" data-op="${k}" ${on&&!(forn&&k==='orc')?'checked':''}> ${n}</label>`).join('')}</div>
    <label class="f" for="wa_to">Para quem</label><select class="in" id="wa_to" style="appearance:auto"><option value="">Escolher contato no WhatsApp</option>${comTel.map(f=>`<option value="${f.id}" ${forn&&forn.id===f.id?'selected':''}>${esc(f.nome)} (${esc(BF_TIPOS_F[f.tipo]||'')})</option>`).join('')}</select>
    <label class="f" for="wa_tx">Mensagem</label><textarea class="in" id="wa_tx" style="min-height:220px;font-size:14px"></textarea>
    <button class="btn wa full" id="wa_go" style="margin-top:14px">${ic('wa')} Abrir WhatsApp</button>
    <button class="btn line full" id="wa_cp" style="margin-top:10px">${ic('link')} Copiar texto</button>`);
  const gera=()=>{ const op=Object.fromEntries($$('[data-op]',s).map(i=>[i.dataset.op,i.checked])); $('#wa_tx',s).value=bfTexto(op); };
  $$('[data-op]',s).forEach(i=>i.onchange=gera); gera();
  $('#wa_go',s).onclick=()=>{ const f=d.fornecedores.find(x=>x.id===$('#wa_to',s).value), num=f?bfTel(f.contato):''; window.open(`https://wa.me/${num}?text=${encodeURIComponent($('#wa_tx',s).value)}`,'_blank'); };
  $('#wa_cp',s).onclick=()=>copiarTexto($('#wa_tx',s).value);
}
async function copiarTexto(t){ try{ await navigator.clipboard.writeText(t); toast('Texto copiado'); }catch(e){ toast('Não foi possível copiar'); } }
function bfImprimir(){
  const d=BF.d, R=bfCalc(d), c=A.data.config;
  const tab=Object.entries(BF_GRUPOS).map(([g,G])=>{ const ls=R.L.filter(l=>l.grupo===g); return ls.length?`<tr class="g"><td colspan="3">${G.n}</td></tr>`+ls.map(l=>`<tr><td>${esc(l.nome)}</td><td class="n">${bfQ(l)} ${bfU(l)}</td><td class="n">${bfR(l.custo)}</td></tr>`).join(''):''; }).join('');
  const w=window.open('','_blank'); if(!w) return toast('Permita pop-ups para imprimir');
  w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Bufê — ${esc(tituloEvento(c))}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Great+Vibes&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body{font:13px/1.5 Inter,sans-serif;color:#1F1B17;max-width:760px;margin:30px auto;padding:0 20px}h1{font:600 30px 'Cormorant Garamond',serif;color:#1C2536;margin:0}.ey{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#8F6B34;font-weight:700}
    .k{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:18px 0}.k div{border:1px solid #E6DDCF;border-radius:10px;padding:10px}.k b{display:block;font:700 22px 'Cormorant Garamond',serif;color:#1C2536}
    table{width:100%;border-collapse:collapse}td{padding:6px;border-bottom:1px solid #EEE6D8}.n{text-align:right}.g td{background:#F4EEE4;font:600 15px 'Cormorant Garamond',serif;color:#6E5024}
    .menu{page-break-before:always;text-align:center;border:1.5px solid #C9A464;border-radius:14px;padding:30px;margin-top:30px}.menu .tt{font:44px 'Great Vibes',cursive;color:#8F6B34}.menu h4{letter-spacing:.3em;text-transform:uppercase;color:#8F6B34;font-size:11px;margin:18px 0 6px}.menu p{font:500 17px 'Cormorant Garamond',serif;margin:2px 0}
    @media print{body{margin:0}}</style></head><body>
    <div class="ey">Planejamento do bufê · Meu Convite</div><h1>${esc(tituloEvento(c))}</h1><div>${esc(c.data||'')}${c.local?' · '+esc(c.local):''}</div>
    <div class="k"><div><b>${bfN(R.tot)}</b>pessoas</div><div><b>${esc(R.E.n)}</b>estilo</div><div><b>${bfR(R.custo)}</b>estimado</div><div><b>${bfR2(R.pp)}</b>por pessoa</div></div>
    <table>${tab}<tr><td><b>Total estimado</b></td><td></td><td class="n"><b>${bfR(R.custo)}</b></td></tr></table>
    <h3 style="font:600 20px 'Cormorant Garamond',serif;color:#1C2536;margin-top:24px">Roteiro</h3><table>${bfRoteiroEtapas(d).map(e=>`<tr><td style="width:70px"><b>${e.h}</b></td><td>${esc(e.n)} — ${esc(e.x)}</td></tr>`).join('')}</table>
    <div class="menu">${bfMenuHTML().replace(/class="bf-menu"/,'').replace(/class="orn"/g,'style="color:#C9A464;margin:14px 0"')}</div>
    <script>setTimeout(()=>print(),600)<\/script></body></html>`);
  w.document.close();
}
