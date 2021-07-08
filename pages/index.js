import Head from 'next/head'
import { useState, useEffect } from 'react'
import { mask } from 'remask'
import axios from 'axios'
import Image from 'next/image'

export default function Home() {

  const [cpfValue, setCpf] = useState('')
  const [stepStatus, setStepStatus] = useState('cpf')

  return (
    <div>
      <Head>
        <title>AlphaBank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gradient-to-tl from-purple-900 via-black to-black bg-opacity-90 min-h-screen">
        <NavBar/>
        { stepStatus === 'feedback' && <GetFeedback/>}
        { stepStatus === 'forms' && <GetLead/>}
        { stepStatus === 'value' && <GetValue/> }
        { stepStatus === 'type' && <GetOption/> }
        { stepStatus === 'cpf' && <GetCpf setFunction={setCpf} value={cpfValue}/> }
        <ArrowsStep status={stepStatus} setStatus={setStepStatus}/>
      </div>
    </div>
  )
}


// PATERNS 

function GetFeedback() {

  return(
    <div className="bg-white bg-opacity-40 mx-5 my-52 md:my-96 py-5 rounded-3xl text-center text-white md:mx-56">
      <h1 className="text-white text-center text-3xl">Estamos encaminhando um E-mail sobre o status da liberação de crédito para você. <br/> Acesse o link do corpo do E-mail para continuar</h1>
    </div>
  )
}

function GetLead() {

  const [nameValue, setName] = useState('')
  const [emailValue, setEmail] = useState('')
  const [phoneValue, setPhone] = useState('')

  return(
    <div className="md:flex md:py-32">
      <HeadingText subtitle="Preencha os dados corretamente para ver detalhes do seu pedido.">Faça seu pedido com a Alphabank. É rápido e fácil.</HeadingText>
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

  
  return(
    <div className="md:flex md:py-24">
      <div className="md: flex-col">
        <HeadingText subtitle="Compare com as principais taxas do mercado:">Empréstimo que cabem no seu bolso,  simule grátis!</HeadingText>  
        <div className="space-y-9 md:space-y-0 md:flex">
          <InputNumber type="money" setFunction={setValueMoney} valueInput={valueMoney}/>
          <InputNumber type="portion" setFunction={setPortion} valueInput={valuePortion}/>
        </div>
      </div>
      <div className="md:mx-10">
        <PriceTable values={valueCalculator}/>
        <div className="bg-white bg-opacity-40 mx-5 mt-16 py-5 rounded-3xl text-center text-white text-2xl md:text-3xl space-y-2 md:space-y-4 md:px-5">
          <h1>Com a Alphabank são</h1>
          <h1>R${valueCalculator.economia}</h1>
          <h1>a mais no seu bolso</h1>
        </div>
      </div>
    </div>
  )
}

function GetOption() {

  return(
    <div className="md:flex md:py-32">
      <HeadingText decoration="Saiba mais sobre nossos serviços > > " subtitle="Escolha o tipo de serviço que melhor se enquadra ao seu bolso.">Simplifique sua vida. Use o cartão de crédito a seu favor.</HeadingText>
      <div className="md:pr-36">
        <CardSelector/>
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
  
  return(
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
            <td className="text-white font-medium text-xl md:text-4xl">Com a Alphabank:</td>
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

  return(
    <div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-40 md:gap-y-20 items-center justify-center space-y-10 md:space-y-0 py-10">
        <div className={valueNow["Alphacash"]}>
          <Card functionClick={changeOption} id="Alphacash" emoji="moneyBag" title="Alphacash" description="Crédito consignado privado com até 60 dias para pagar a primeira parcela."/>
        </div>
        <div className={valueNow["Alphapag"]} >
          <Card functionClick={changeOption} id="Alphapag" emoji="dollarWings" title="Alphapag" description="Receba o limite do seu cartão de crédito na mão em até 24hrs."/>
        </div>
        <div className={valueNow["Alphabank"]}>
          <Card functionClick={changeOption} id="Alphabank" emoji="creditCard" title="Alphabank" description="Maquininhas com a menor taxa e recebimento a vista em um dia útil."/>
        </div>
        <div className={valueNow["Alphacred"]}>
          <Card functionClick={changeOption} id="Alphacred" emoji="gardenHouse" title="Alphacred" description="Seguro fiança para quem quer parcelar o valor caução do aluguel em até 12x."/>
        </div>
      </div>
    </div>
  )
}





function ArrowsStep({status, setStatus}) {

  const objectStatusNext = {
    'cpf': 'type',
    'type' : 'value',
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
      { status === 'cpf' && (    <div className="flex justify-end px-5">
      <div className="absolute bottom-0 right-0 mx-5 mb-10 mt-5">
        <button onClick={nextStep}><ArrowIcon direction="rigth"/></button>
      </div>
    </div>)}
    { status === 'value' && (    <div className="flex justify-between px-5">
      <div className="md:absolute relative bottom-0 left-0 mx-5 mb-10 mt-5">
        <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left"/></button>
      </div>
      <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
        <button onClick={nextStep}><ArrowIcon direction="rigth"/></button>
      </div>
    </div>)}
    { status === 'type' && (    <div className="flex justify-between px-5">
      <div className="md:absolute bottom-0 left-0 mx-5 mb-10 mt-5">
        <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left"/></button>
      </div>
      <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
        <button onClick={nextStep}><ArrowIcon direction="rigth"/></button>
      </div>
    </div>)}
    { status === 'forms' && (    <div className="flex justify-between px-5">
    <div className="md:absolute relative bottom-0 left-0 mx-5 mb-10 mt-5">
        <button className="cursor-not-allowed" onClick={pastStep}><ArrowIcon direction="left"/></button>
      </div>
      <div className="md:absolute relative bottom-0 right-0 mx-5 mb-10 mt-5">
        <button onClick={nextStep}><ArrowIcon direction="rigth"/></button>
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
    if ( type === "money") {
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
        { type === "money"   &&  <input value={valueInput} onChange={onChangeHandler} className={objectType[type]} placeholder={type === "money" ? "R$00.000,00" : "12"}/> }
        { type === "portion" && (
          <div className="bg-white bg-opacity-40 text-center text-2xl rounded-3xl text-white w-full">
            <button className="p-5" onClick={addPortion}>+</button>
            <input value={valueInput} onChange={onChangeHandler} className={objectType[type]} placeholder={type === "money" ? "R$00.000,00" : "12"}/>
            <button className="p-5" onClick={removePortion}>-</button>
          </div>
        )}
      </div>
    </div>
  )
}

function Card({ title, description, emoji, functionClick, id }) {

  const objectEmojisSrcs = {
    moneyBag:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/money-bag_1f4b0.png",
    dollarWings:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/money-with-wings_1f4b8.png",
    creditCard:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/credit-card_1f4b3.png",
    gardenHouse:"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/house-with-garden_1f3e1.png"

  }

  return(
    <div>
      <button onClick={functionClick} id={id}>
        <div className="bg-white w-72 h-64 rounded-3xl bg-opacity-40 space-y-3 pt-4">
          <div className="flex flex-col items-center justify-center">
            <img src={objectEmojisSrcs[emoji]} className="h-14"/>
          </div>
          <h1 className="text-white font-medium text-center text-2xl">{title}</h1>
          <h3 className="text-white text-center text-xl mx-10">{description}</h3>
        </div>
      </button>
    </div>
  )
}

function ArrowIcon({ direction }) {
  
  return(
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

    if(!type) {
      setFunction(value)
    }
    
  }

  return(
    <div className="flex-row px-5 md:px-8 md:pr-0 md:space-y-4">
      <div>
        <label className="text-white text-base md:text-2xl">{children}</label>
      </div>
      <div>
        <input onChange={onChangeHandler} className="w-full p-6 rounded-lg text-lg bg-white bg-opacity-40 text-white" value={value} placeholder={placeholder}/>
      </div>
    </div>
  )
}

function HeadingText({ children, subtitle, decoration }) {

  return(
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

  return(
    <nav className="flex-row md:flex md:justify-between w-ful relative">
      <div className="flex px-5 md:px-10 py-6 justify-between">
        <h1 className="text-white text-2xl font-medium">Alphabank</h1>
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
