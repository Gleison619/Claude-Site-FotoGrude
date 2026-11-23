/* =========================================================
   CONFIGURAÇÃO DA LOJA FOTOGRUDE
   Edite só os valores entre aspas. Campos vazios ("") ficam
   escondidos no site e o cliente é levado ao WhatsApp.
   ========================================================= */
var LOJA = {
  // WhatsApp: 55 + DDD + número, só dígitos
  whatsapp: "5531982598701",

  // Pix
  pixChave: "7be4968e-5d7f-49c7-9a2a-01c2f83b7179",  // chave aleatória
  pixNome: "Gleison Felix",  // nome que aparece no app do banco ao pagar

  // Link do Mercado Pago de VALOR LIVRE (o cliente digita o total).
  // Serve para todos os kits e qualquer quantidade. Se preenchido, é usado
  // quando não houver um link específico do kit abaixo.
  mercadoPagoValorLivre: "https://link.mercadopago.com.br/fotogrudebuytoday99",

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
     Ex.: sudeste: 1590 = R$ 15,90. Enquanto algum valor da opção for null,
     ela NÃO aparece para o cliente.
   - "prazo" é um texto opcional, ex.: "5 a 9 dias úteis após a produção". */
var REGIOES = {
  mg: "Minas Gerais", sudeste: "Sudeste (SP, RJ, ES)", sul: "Sul",
  centroOeste: "Centro-Oeste", nordeste: "Nordeste", norte: "Norte"
};
var ENVIO = {
  carta: {
    nome: "Carta registrada (Correios)", tipo: "regiao", ativo: true, prazo: "",
    valores: { mg: null, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
  },
  pac: {
    nome: "PAC (Correios)", tipo: "regiao", ativo: true, prazo: "",
    valores: { mg: null, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
  },
  sedex: {
    nome: "SEDEX (Correios)", tipo: "regiao", ativo: true, prazo: "",
    valores: { mg: null, sudeste: null, sul: null, centroOeste: null, nordeste: null, norte: null }
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
/* Opções de entrega prontas para mostrar (Correios só com todos os valores preenchidos). */
function opcoesEnvio() {
  return Object.keys(ENVIO).filter(function (k) {
    var o = ENVIO[k];
    if (!o.ativo) return false;
    if (o.tipo !== "regiao") return true;
    for (var r in REGIOES) { if (o.valores[r] === null || o.valores[r] === undefined) return false; }
    return true;
  });
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
