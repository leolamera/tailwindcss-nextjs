import Head from 'next/head'
import { useState, useEffect } from 'react'
import { mask } from 'remask'
import axios from 'axios'
import Image from 'next/image'

function PodbankLogo() {

  return (
    <div className="flex items-center">
      <svg width="55" height="25" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path fillRule="evenodd" clipRule="evenodd" d="M154.744 129C163.312 133.896 172.9 136.344 183.508 136.344C194.388 136.344 204.112 133.896 212.68 129C221.248 123.968 227.98 117.168 232.876 108.6C237.908 100.032 240.424 90.308 240.424 79.428C240.424 68.684 237.976 59.028 233.08 50.46C228.32 41.892 221.792 35.16 213.496 30.264C205.2 25.232 195.816 22.716 185.344 22.716C176.232 22.716 167.936 24.688 160.456 28.632C153.112 32.44 147.196 37.54 142.708 43.932V0H260V160H34.708V115.128C39.196 121.52 45.112 126.688 52.456 130.632C59.936 134.44 68.232 136.344 77.344 136.344C87.816 136.344 97.2 133.896 105.496 129C113.792 123.968 120.32 117.168 125.08 108.6C127.01 105.223 128.559 101.677 129.728 97.9618C130.935 101.815 132.542 105.497 134.548 109.008C139.58 117.44 146.312 124.104 154.744 129ZM19 160H34.708V175.104C34.708 177.552 33.96 179.456 32.464 180.816C31.104 182.312 29.268 183.06 26.956 183.06C24.508 183.06 22.536 182.312 21.04 180.816C19.68 179.456 19 177.552 19 175.104V160ZM19 160H0V0H127V54.4551C126.35 53.0966 125.642 51.7649 124.876 50.46C119.98 41.892 113.248 35.16 104.68 30.264C96.112 25.232 86.388 22.716 75.508 22.716C64.9 22.716 55.312 25.164 46.744 30.06C38.312 34.956 31.58 41.688 26.548 50.256C21.652 58.688 19.136 68.208 19 78.816V160ZM127 0V-16.044C127 -18.492 127.68 -20.396 129.04 -21.756C130.536 -23.252 132.508 -24 134.956 -24C137.268 -24 139.104 -23.252 140.464 -21.756C141.96 -20.396 142.708 -18.492 142.708 -16.044V0H127ZM204.724 116.556C198.468 120.228 191.396 122.064 183.508 122.064C175.756 122.064 168.752 120.228 162.496 116.556C156.24 112.748 151.344 107.648 147.808 101.256C144.272 94.864 142.504 87.588 142.504 79.428C142.504 71.404 144.272 64.196 147.808 57.804C151.344 51.276 156.24 46.176 162.496 42.504C168.752 38.832 175.756 36.996 183.508 36.996C191.396 36.996 198.468 38.832 204.724 42.504C210.98 46.176 215.876 51.276 219.412 57.804C223.084 64.196 224.92 71.404 224.92 79.428C224.92 87.588 223.084 94.864 219.412 101.256C215.876 107.648 210.98 112.748 204.724 116.556ZM96.724 116.556C90.468 120.228 83.396 122.064 75.508 122.064C67.756 122.064 60.752 120.228 54.496 116.556C48.24 112.884 43.344 107.852 39.808 101.46C36.272 94.932 34.504 87.656 34.504 79.632C34.504 71.472 36.272 64.196 39.808 57.804C43.344 51.412 48.24 46.38 54.496 42.708C60.752 38.9 67.756 36.996 75.508 36.996C83.396 36.996 90.468 38.9 96.724 42.708C102.98 46.38 107.876 51.412 111.412 57.804C115.084 64.196 116.92 71.472 116.92 79.632C116.92 87.656 115.084 94.932 111.412 101.46C107.876 107.852 102.98 112.884 96.724 116.556Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="260" height="160" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}


export default function Home() {

  const [cpfValue, setCpf] = useState('')
  const [stepStatus, setStepStatus] = useState('cpf')

  return (
    <div>
      <Head>
        <title>Podbank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gradient-to-tl from-purple-900 via-black to-black bg-opacity-90 min-h-screen">
        <NavBar />
        {stepStatus === 'feedback' && <GetFeedback />}
        {stepStatus === 'forms' && <GetLead />}
        {stepStatus === 'value' && <GetValue />}
        {stepStatus === 'type' && <GetOption />}
        {stepStatus === 'cpf' && <GetCpf setFunction={setCpf} value={cpfValue} />}
        <ArrowsStep status={stepStatus} setStatus={setStepStatus} />
      </div>
    </div>
  )
}


// PATERNS 

function GetFeedback() {

  return (
    <div className="bg-white bg-opacity-40 mx-5 my-52 md:my-96 py-5 rounded-3xl text-center text-white md:mx-56">
      <h1 className="text-white text-center text-3xl">Estamos encaminhando um E-mail sobre o status da liberação de crédito para você. <br /> Acesse o link do corpo do E-mail para continuar</h1>
    </div>
  )
}

function GetLead() {

  const [nameValue, setName] = useState('')
  const [emailValue, setEmail] = useState('')
  const [phoneValue, setPhone] = useState('')

  return (
    <div className="md:flex md:py-32">
      <HeadingText subtitle="Preencha os dados corretamente para ver detalhes do seu pedido.">Faça seu pedido com a Podbank. É rápido e fácil.</HeadingText>
      <div className="space-y-8 md:pr-10 md:w-1/3">
        <InputLabel setFunction={setName} value={nameValue} placeholder="Ex: Bruce Wayne">Nome completo</InputLabel>
        <InputLabel setFunction={setEmail} value={emailValue} placeholder="exemplo@email.com">E-mail</InputLabel>
        <InputLabel type="phone" setFunction={setPhone} value={phoneValue} placeholder="(00) 0000-0000">Telefone</InputLabel>
      </div>
    </div>
  )
}

function GetValue() {

  const [valueMoney, setValueMoney] = useState('0')
  const [valuePortion, setPortion] = useState(1)
  const [valueCalculator, setCalculator] = useState({
    livre: '0',
    credpago: '0',
    alphabank: '0',
    economia: '0'
  })

  useEffect(() => {
    console.log("rodouuu")
    axios.get(`/api/calculator?valor=${parseFloat(valueMoney)}&parcelas=${valuePortion}`).then((data, err) => {
      console.log(data.data)
      setCalculator(data.data)
    })
  }, [valueMoney, valuePortion])


  return (
    <div className="md:flex md:py-24">
      <div className="md: flex-col">
        <HeadingText subtitle="Compare com as principais taxas do mercado:">Empréstimo que cabem no seu bolso,  simule grátis!</HeadingText>
        <div className="space-y-9 md:space-y-0 md:flex">
          <InputNumber type="money" setFunction={setValueMoney} valueInput={valueMoney} />
          <InputNumber type="portion" setFunction={setPortion} valueInput={valuePortion} />
        </div>
      </div>
      <div className="md:mx-10">
        <PriceTable values={valueCalculator} />
        <div className="bg-white bg-opacity-40 mx-5 mt-16 py-5 rounded-3xl text-center text-white text-2xl md:text-3xl space-y-2 md:space-y-4 md:px-5">
          <h1>Com a Podbank são</h1>
          <h1>R${valueCalculator.economia}</h1>
          <h1>a mais no seu bolso</h1>
        </div>
      </div>
    </div>
  )
}

function GetOption() {

  return (
    <div className="md:flex md:py-32">
      <HeadingText decoration="Saiba mais sobre nossos serviços > > " subtitle="Escolha o tipo de serviço que melhor se enquadra ao seu bolso.">Simplifique sua vida. Use o cartão de crédito a seu favor.</HeadingText>
      <div className="md:pr-36">
        <CardSelector />
      </div>
    </div>
  )
}

function GetCpf({ setFunction, value }) {

  return (
    <div className="md:py-32">
      <HeadingText subtitle="100% online, sem complicações e com as menores taxas do mercado. Comece a simular agora:">Simule e compare as principais taxas no mercado.</HeadingText>
      <div className="md:w-1/5 md:mx-10">
        <InputLabel type="cpf" setFunction={setFunction} value={value} placeholder="000.000.000-00">Digite seu CPF</InputLabel>
      </div>
    </div>
  )
}

// MOLECULE

function PriceTable({ values }) {

  return (
    <div className="bg-white bg-opacity-40 mx-5 mt-16 py-5 rounded-3xl px-10 space-y-4">
      <div>
        <tr>
          <td className="text-white font-medium text-lg md:text-2xl">Com a Livre digital:</td>
          <td className="text-white text-lg md:text-xl"> R${values.livre.replace(".", ",")}</td>
        </tr>
      </div>
      <div>
        <tr>
          <td className="text-white font-medium text-lg md:text-2xl">Com a Credpago:</td>
          <td className="text-white text-lg md:text-xl"> R${values.credpago.replace(".", ",")}</td>
        </tr>
      </div>
      <div>
        <tr>
          <td className="text-white font-medium text-xl md:text-4xl">Com a Podbank:</td>
          <td className="text-white text-xl md:text-2xl"> R${values.alphabank.replace(".", ",")}</td>
        </tr>
      </div>
    </div>
  )
}


function CardSelector() {

  function changeOption(event) {

    const clickedValue = event.currentTarget.id
    const data = {}
    for (let style in valueNow) {
      if (style === clickedValue) {
        data[style] = "opacity-100"
      }

      if (style !== clickedValue) {
        data[style] = "opacity-50"
      }
    }
    console.log(valueNow)
    console.log(data)


    setValue(data)

  }

  const [valueNow, setValue] = useState(
    {
      "Alphacash": "flex",
      "Alphapag": "flex",
      "Alphabank": "flex",
      "Alphacred": "flex"
    }
  )

  return (
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-40 md:gap-y-20 items-center justify-center space-y-10 md:space-y-0 py-10">
        <div className={valueNow["Alphacash"]}>
          <Card functionClick={changeOption} id="Alphacash" emoji="moneyBag" title="Podcash" description="Crédito consignado privado com até 60 dias para pagar a primeira parcela." />
        </div>
        <div className={valueNow["Alphapag"]} >
          <Card functionClick={changeOption} id="Alphapag" emoji="dollarWings" title="Podpag" description="Receba o limite do seu cartão de crédito na mão em até 24hrs." />
        </div>
        <div className={valueNow["Alphabank"]}>
          <Card functionClick={changeOption} id="Alphabank" emoji="creditCard" title="Podbank" description="Maquininhas com a menor taxa e recebimento a vista em um dia útil." />
        </div>
        <div className={valueNow["Alphacred"]}>
          <Card functionClick={changeOption} id="Alphacred" emoji="gardenHouse" title="Podcred" description="Seguro fiança para quem quer parcelar o valor caução do aluguel em até 12x." />
        </div>
      </div>
    </div>
  )
}





function ArrowsStep({ status, setStatus }) {

  const objectStatusNext = {
    'cpf': 'type',
    'type': 'value',
    'value': 'forms',
    'forms': 'feedback',
  }

  const objectStatusPast = {
    'type': 'cpf',
    'value': 'type',
    'forms': 'value',
    'feedback': 'forms',
  }

  function nextStep() {
    const newValue = objectStatusNext[status]
    console.log(newValue)
    setStatus(newValue)
  }

  function pastStep() {
    const newValue = objectStatusPast[status]
    console.log(newValue)
    setStatus(newValue)
  }

  return (
    <div>
      {status === 'cpf' && (<div className="flex justify-end px-5">
        <div className="absolute bottom-0 right-0 mx-5 mb-10 mt-5">
          <button onClick={nextStep}><ArrowIcon direction="rigth" /></button>
        </div>
      </div>)}
      {status === 'value' && (<div className="flex justify-between px-5">
        <div className="md:absolute relative bottom-0 left-0 mx-5 mb-10 mt-5">
          <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left" /></button>
        </div>
        <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
          <button onClick={nextStep}><ArrowIcon direction="rigth" /></button>
        </div>
      </div>)}
      {status === 'type' && (<div className="flex justify-between px-5">
        <div className="md:absolute bottom-0 left-0 mx-5 mb-10 mt-5">
          <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left" /></button>
        </div>
        <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
          <button onClick={nextStep}><ArrowIcon direction="rigth" /></button>
        </div>
      </div>)}
      {status === 'forms' && (<div className="flex justify-between px-5">
        <div className="md:absolute relative bottom-0 left-0 mx-5 mb-10 mt-5">
          <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left" /></button>
        </div>
        <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
          <button onClick={nextStep}><ArrowIcon direction="rigth" /></button>
        </div>
      </div>)}
    </div>

  )
}


// ATOMS

function InputNumber({ setFunction, valueInput, type }) {

  const objectType = {
    money: "bg-white bg-opacity-40 text-center text-2xl py-5 rounded-3xl text-white ",
    portion: "bg-white bg-opacity-0 text-center text-2xl py-5 rounded-3xl text-white w-20"
  }


  function onChangeHandler(event) {
    const { value } = event.target
    if (type === "money") {
      const newValue = value.replace(",", ".")
      setFunction(value)
    }

    if (type === "portion") {
      if (value >= 12) {
        console.log('oi')
        setFunction(12)
      }
      if (value <= 12) {
        setFunction(value)
      }

      if (value < 0) {
        setFunction(1)
      }
    }
  }

  function addPortion() {
    setFunction(valueInput++)
  }

  function removePortion() {
    setFunction(valueInput--)
  }

  return (
    <div className="mx-8">
      <label className="text-white text-base md:text-2xl md:text-center md:px-16">De quanto você precisa?</label>
      <div className="flex flex-col items-center">
        {type === "money" && <input value={valueInput} onChange={onChangeHandler} className={objectType[type]} placeholder={type === "money" ? "R$00.000,00" : "12"} />}
        {type === "portion" && (
          <div className="bg-white bg-opacity-40 text-center text-2xl rounded-3xl text-white w-full">
            <button className="p-5" onClick={addPortion}>+</button>
            <input value={valueInput} onChange={onChangeHandler} className={objectType[type]} placeholder={type === "money" ? "R$00.000,00" : "12"} />
            <button className="p-5" onClick={removePortion}>-</button>
          </div>
        )}
      </div>
    </div>
  )
}

function Card({ title, description, emoji, functionClick, id }) {

  const objectEmojisSrcs = {
    moneyBag: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/money-bag_1f4b0.png",
    dollarWings: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/money-with-wings_1f4b8.png",
    creditCard: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/credit-card_1f4b3.png",
    gardenHouse: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/house-with-garden_1f3e1.png"

  }

  return (
    <div>
      <button onClick={functionClick} id={id}>
        <div className="bg-white w-72 h-64 rounded-3xl bg-opacity-40 space-y-3 pt-4">
          <div className="flex flex-col items-center justify-center">
            <img src={objectEmojisSrcs[emoji]} className="h-14" />
          </div>
          <h1 className="text-white font-medium text-center text-2xl">{title}</h1>
          <h3 className="text-white text-center text-xl mx-10">{description}</h3>
        </div>
      </button>
    </div>
  )
}

function ArrowIcon({ direction }) {

  return (
    <div>
      {direction === 'left' ? (<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>)}
    </div>
  )
}

function InputLabel({ children, placeholder, setFunction, value, type }) {

  const maskObject = {
    cpf: "999.999.999-99",
    phone: "(99) 99999-9999"
  }

  function onChangeHandler(event) {
    const { value } = event.target
    if (type) {
      const maskTemplate = maskObject[type]
      setFunction(mask(value, maskTemplate))
    }

    if (!type) {
      setFunction(value)
    }

  }

  return (
    <div className="flex-row px-5 md:px-8 md:pr-0 md:space-y-4">
      <div>
        <label className="text-white text-base md:text-2xl">{children}</label>
      </div>
      <div>
        <input onChange={onChangeHandler} className="w-full p-6 rounded-lg text-lg bg-white bg-opacity-40 text-white" value={value} placeholder={placeholder} />
      </div>
    </div>
  )
}

function HeadingText({ children, subtitle, decoration }) {

  return (
    <div className="px-5 md:px-16 space-y-4 md:space-y-8 pt-11 pb-6">
      <h1 className="text-white font-medium text-4xl md:text-6xl md:w-1/3">{children}</h1>
      <h2 className="text-white text-xl md:text-3xl md:w-1/3">{subtitle}</h2>
      <h3 className="text-white text-lg underline">{decoration}</h3>
    </div>
  )
}

function NavBar() {

  const [navOpen, setNavOpen] = useState(false)

  function OpenCloseNav() {
    setNavOpen(() => !navOpen)
  }

  return (
    <nav className="flex-row md:flex md:justify-between w-ful relative">
      <div className="flex px-5 md:px-10 py-6 justify-between">
        <PodbankLogo />
        <h1 className="text-white text-2xl font-medium">Podbank</h1>
        <button onClick={OpenCloseNav} className="text-white md:hidden">X</button>
      </div>
      <div className={!navOpen ? "hidden md:flex md:space-x-4 md:mx-10" : "flex-row pb-7"}>
        <h1 className="text-white px-5 py-3 md:py-7 text-xl">
          <a href="#">Produtos</a>
        </h1>
        <h1 className="text-white px-5 py-3 md:py-7  text-xl">
          <a href="#">Simulador</a>
        </h1>
        <h1 className="text-white px-5 py-3 md:py-7  text-xl">
          <a href="#">Taxas</a>
        </h1>
        <h1 className="text-white px-5 py-5 md:py-2 md:my-4 md:border-2 md:rounded-2xl text-xl">
          <a href="#">Começar agora</a>
        </h1>
      </div>
    </nav>
  )
}
