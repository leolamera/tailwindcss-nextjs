// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function helloAPI(req, res) {
  const { parcelas, valor } = req.query

  const priceValues = {
    alphabank: {
      1: 11.6,
      2:	18,
      3:	22.8,
      4:	26.0,
      5:	27.8,
      6:	31.9,
      7:	36.0,
      8:	38.8,
      9:	41.8,
      10:	46.3,
      11:	48.0,
      12:	53.0
    },
    credpago: {
      1: null,
      2:	26,
      3:	31,
      4:	36.3,
      5:	43.2,
      6:	50.0,
      7:	56.5,
      8:  62.8,
      9:	68.8,
      10:	74.5,
      11:	79.4,
      12:	84.8
    },
    livre: {
      1:	null,	
      2:	20.1,
      3:	23.8,
      4:	27.1,
      5:	30.2,
      6:	34.1,
      7:	38.2,
      8:	42.1,
      9:	45.8,
      10:	49.3,
      11:	52.9,
      12:	57.2
    }
  }

  const taxaParcelaAlpha = priceValues.alphabank[parseInt(parcelas)]
  const taxaParcelaCredpago = priceValues.credpago[parseInt(parcelas)]
  const taxaParcelaLivre = priceValues.livre[parseInt(parcelas)]


  // const resultado = (parseFloat(valor) * parseFloat(taxaParcela / 100))/100
  res.status(200).json({
    alphabank: parseFloat(valor * ((taxaParcelaAlpha / 100) + 1.0)).toFixed(2),
    credpago: parseFloat(valor * ((taxaParcelaCredpago / 100) + 1.0)).toFixed(2),
    livre: parseFloat(valor * ((taxaParcelaLivre / 100) + 1.0)).toFixed(2),
    economia: parseFloat((parseFloat(valor * ((taxaParcelaCredpago / 100) + 1.0)).toFixed(2)) - (parseFloat(valor * ((taxaParcelaAlpha / 100) + 1.0)).toFixed(2))).toFixed(2)
  })
}
