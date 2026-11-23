/* =========================================================
   CONFIGURAÇÃO DA LOJA FOTOGRUDE
   Edite só os valores entre aspas. Campos vazios ("") ficam
   escondidos no site e o cliente é levado ao WhatsApp.
   ========================================================= */
var LOJA = {
  // WhatsApp: 55 + DDD + número, só dígitos
  whatsapp: "5531982598701",

  // Pix
  pixChave: "15abf738-ed55-432b-b771-fbf7971fe612",  // chave aleatória
  pixNome: "Gleison Felix",  // nome que aparece no app do banco ao pagar

  // Link do Mercado Pago de VALOR LIVRE (o cliente digita o total).
  // Serve para todos os kits e qualquer quantidade. Se preenchido, é usado
  // quando não houver um link específico do kit abaixo.
  mercadoPagoValorLivre: "https://link.mercadopago.com.br/fotogrude99",

  // Links de pagamento do Mercado Pago com valor fixo, um por opção (opcional)
  linksCartao: {
    avulso: "",        // link de 1 ímã (R$ 7,90). Para mais de 1 avulso, o cliente pede o link no WhatsApp
    mini: "",          // Kit Mini, R$ 39,00
    familia: "",       // Kit Família, R$ 55,80
    memorias: ""       // Kit Memórias, R$ 72,00
  },

  // Links de pagamento do InfinitePay (cartão), um por opção
  linksInfinitePay: {
    avulso: "",        // link de 1 ímã (R$ 7,90)
    mini: "",          // Kit Mini, R$ 39,00
    familia: "",       // Kit Família, R$ 55,80
    memorias: ""       // Kit Memórias, R$ 72,00
  }
};

/* Promoção / aviso com contagem regressiva (faixa no topo do site).
   Para desligar: ativa: false. Depois do "ate", a faixa some sozinha. */
var PROMO = {
  ativa: true,
  texto: "Natal: peça até 10/12 para receber antes do Natal",
  ate: "2026-12-10T23:59:59-03:00",
  link: "#pacotes"
};

/* Formas de entrega que o cliente escolhe na página de pedido.
   - ativo: false esconde a opção.
   - Correios (tipo "regiao"): valor em CENTAVOS por região do CEP de destino.
     Ex.: sudeste: 1590 = R$ 15,90. Região com null aparece como "consultar"
     (frete combinado no WhatsApp). Opção com todos os valores null fica escondida.
   - "prazo" é um texto opcional, ex.: "5 a 9 dias úteis após a produção".
   Valores de MG simulados em 23/11/2026 nos Correios: origem Conselheiro Lafaiete,
   destino Belo Horizonte, pacote 16x11x2 cm até 300 g. */
var REGIOES = {
  mg: "Minas Gerais", sudeste: "Sudeste (SP, RJ, ES)", sul: "Sul",
  centroOeste: "Centro-Oeste", nordeste: "Nordeste", norte: "Norte"
};
var ENVIO = {
  // aparece só para as cidades de ENTREGA_GRATIS (mais abaixo)
  local: {
    nome: "Entrega grátis na sua cidade", tipo: "local", ativo: true,
    prazo: "Entregamos no seu endereço; combinamos o dia pelo WhatsApp"
  },
  carta: {
    nome: "Carta registrada (Correios)", tipo: "regiao", ativo: true, prazo: "",
    valores: { mg: null, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
  },
  pac: {
    nome: "PAC (Correios)", tipo: "regiao", ativo: true, prazo: "Em MG, cerca de 5 dias úteis após a postagem",
    valores: { mg: 2690, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
  },
  sedex: {
    nome: "SEDEX (Correios)", tipo: "regiao", ativo: true, prazo: "Em MG, cerca de 1 dia útil após a postagem",
    valores: { mg: 3160, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
  },
  particular: {
    nome: "Entrega particular", tipo: "combinar", ativo: true,
    prazo: "Valor e dia combinados pelo WhatsApp"
  },
  retirar: {
    nome: "Retirar em mãos", tipo: "gratis", ativo: true,
    prazo: "Sem frete. Combinamos o local e o horário pelo WhatsApp"
  }
};

/* Entrega grátis por cidade: a partir de "minimo" ímãs no pedido.
   "faixas" = faixas de CEP da cidade (reserva quando a consulta de CEP não responde). */
var ENTREGA_GRATIS = [
  { cidades: ["Conselheiro Lafaiete"], minimo: 6, faixas: [[36400000, 36409999]] },
  { cidades: ["Congonhas", "Ouro Branco", "Itaverava", "Queluzito"], minimo: 10,
    faixas: [[36415000, 36419999], [36420000, 36423999], [36440000, 36440999], [36424000, 36424999]] }
];
function semAcento(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
/* Regra de entrega grátis para a cidade (nome) ou, sem nome, pelo CEP. Retorna { cidade, minimo } ou null. */
function regraEntregaGratis(cidade, cep) {
  var n = semAcento(cidade), d = parseInt(String(cep || "").replace(/\D/g, ""), 10);
  for (var i = 0; i < ENTREGA_GRATIS.length; i++) {
    var g = ENTREGA_GRATIS[i];
    for (var j = 0; j < g.cidades.length; j++) {
      if (n && semAcento(g.cidades[j]) === n) return { cidade: g.cidades[j], minimo: g.minimo };
    }
    if (!n && d) for (var k = 0; k < g.faixas.length; k++) {
      if (d >= g.faixas[k][0] && d <= g.faixas[k][1]) return { cidade: g.cidades[Math.min(k, g.cidades.length - 1)], minimo: g.minimo };
    }
  }
  return null;
}

/* Descobre a região pelo CEP (8 dígitos). Retorna a chave de REGIOES ou null. */
function regiaoPorCep(cep) {
  var d = String(cep || "").replace(/\D/g, "");
  if (d.length !== 8) return null;
  var p2 = parseInt(d.slice(0, 2), 10), p3 = parseInt(d.slice(0, 3), 10);
  if (p2 >= 30 && p2 <= 39) return "mg";
  if (p2 <= 29) return "sudeste";                       // SP, RJ, ES
  if (p2 >= 40 && p2 <= 65) return "nordeste";          // BA, SE, PE, AL, PB, RN, CE, PI, MA
  if (p2 >= 66 && p2 <= 69) return "norte";             // PA, AP, AM, RR, AC
  if (p3 >= 768 && p3 <= 769) return "norte";           // RO
  if (p2 === 77) return "norte";                        // TO
  if (p2 >= 70 && p2 <= 79) return "centroOeste";       // DF, GO, MT, MS
  if (p2 >= 80) return "sul";                           // PR, SC, RS
  return null;
}
/* Opções de entrega prontas para mostrar (Correios com pelo menos uma região preenchida). */
function opcoesEnvio() {
  return Object.keys(ENVIO).filter(function (k) {
    var o = ENVIO[k];
    if (!o.ativo) return false;
    if (o.tipo !== "regiao") return true;
    for (var r in REGIOES) { if (typeof o.valores[r] === "number") return true; }
    return false;
  });
}
/* Valor do frete de uma opção para a região, ou null se for "consultar". */
function valorEnvio(k, regiao) {
  var v = ENVIO[k] && ENVIO[k].valores ? ENVIO[k].valores[regiao] : null;
  return typeof v === "number" ? v : null;
}

/* Avaliações de clientes (só aparecem no site quando houver pelo menos uma).
   Use apenas depoimentos reais, com autorização do cliente. Formato:
   { nome: "Ana", cidade: "Belo Horizonte", texto: "Ficaram lindos!", estrelas: 5, foto: "fotos/cliente-ana.jpg" }
   "cidade" e "foto" são opcionais. */
var AVALIACOES = [
];

/* Opções de venda (preços em centavos) */
var KITS = {
  avulso:   { nome: "Ímã Avulso",   qtd: 1,  preco: 790,  porIma: 790, escolheQtd: true },
  mini:     { nome: "Kit Mini",     qtd: 6,  preco: 3900, porIma: 650 },
  familia:  { nome: "Kit Família",  qtd: 9,  preco: 5580, porIma: 620 },
  memorias: { nome: "Kit Memórias", qtd: 12, preco: 7200, porIma: 600 },
  festa:    { nome: "Kit Festa",    qtd: 20, preco: null, sobConsulta: true }
};

function formatarReais(centavos) {
  return "R$ " + (centavos / 100).toFixed(2).replace(".", ",");
}

function linkWhatsApp(texto) {
  return "https://wa.me/" + LOJA.whatsapp + "?text=" + encodeURIComponent(texto);
}
