/* =========================================================
   CONFIGURAÇÃO DA LOJA FOTOGRUDE
   Edite só os valores entre aspas. Campos vazios ("") ficam
   escondidos no site e o cliente é levado ao WhatsApp.
   ========================================================= */
var LOJA = {
  // WhatsApp: 55 + DDD + número, só dígitos
  whatsapp: "5531982598701",

  // Pix
  pixChave: "",        // ex.: "fotogrude@email.com", CPF, CNPJ, telefone ou chave aleatória
  pixNome: "",         // nome que aparece no app do banco ao pagar

  // Links de pagamento do Mercado Pago (cartão), um por opção
  linksCartao: {
    avulso: "",        // link de 1 ímã (R$ 7,90). Para mais de 1 avulso, o cliente pede o link no WhatsApp
    mini: "",          // Kit Mini, R$ 39,00
    familia: "",       // Kit Família, R$ 55,80
    memorias: ""       // Kit Memórias, R$ 72,00
  }
};

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
