import styled from "styled-components"
import { useEffect, useState } from "react"
import { GiKnifeFork } from "react-icons/gi";
import { GiHamburger } from "react-icons/gi";
import { CiFries } from "react-icons/ci";
import { BiSolidDrink } from "react-icons/bi";

import cardapio from "../../data"
import Modal from "../Modal"

export default function Body({modalAtivo, setModalAtivo}) {

    // vars
    const produtosCardapio = cardapio
    const nomesBotoes = Object.keys(cardapio)
    const iconesBotoes = [<GiKnifeFork />, <GiHamburger />, <CiFries />, <BiSolidDrink />]

    // states
    const [produtosVisiveis, setProdutosVisiveis] = useState({})
    const [dadosModal, setDadosModal] = useState({})
    // effect
    useEffect(() => {
        let estadoInicialDosProdutos = {}
        nomesBotoes.forEach((chave) => {
            estadoInicialDosProdutos[chave] = false
        })
        setProdutosVisiveis(estadoInicialDosProdutos)
    }, [])


    // functions 
    function alterarVisibilidadeProdutos(chaveProduto) {
        let copiaVisibilidades = { ...produtosVisiveis }
        copiaVisibilidades[chaveProduto] = !copiaVisibilidades[chaveProduto]
        setProdutosVisiveis(copiaVisibilidades)
    }

    function formatarPreco(preco) {
        return String(preco.toFixed(2)).replace(".", ",")
    }

    function ativarModal(dadosProduto){
        setModalAtivo(true)
        setDadosModal(dadosProduto)

    }

    // componentes

    function Precos({ preco }) {
        const precosVariados = Object.keys(preco).length > 1
        if (precosVariados) {
            const precos = Object.keys(preco)
            return (
                
                <div className="precos">
                    {precos.map((tituloDoPreco, index)=>(
                        <>
                            <div key={index} className="container-valores">
                                <p>{tituloDoPreco}</p>
                                <p className="preco">R${formatarPreco(preco[tituloDoPreco])}</p>
                            </div>
                            {index===0?<hr />:''}
                        </>
                    ))}
                </div>
            )
        }
        return (
            <div className="precos">
                <div className="container-valores">
                    <p className="preco">R${formatarPreco(preco)}</p>
                </div>
            </div>
        )

    }

    function CaixaProduto({ dadosProduto }) {
        const { preco, imagem, descricao, nome } = dadosProduto
        return (
            <CaixaProdutoStyle onClick={()=>ativarModal(dadosProduto)}>
                <div className="container-imagem">
                    <img src={imagem} alt={descricao} />
                </div>
                <p className="nome">{nome}</p>
                <Precos preco={preco} />

            </CaixaProdutoStyle>
        )
    }

    function ProdutosDaCategoria({ categoria, nomeBotao }) {
        const produtosEstaoVisiveis = produtosVisiveis[nomeBotao]
        return (
            <ProdutosDaCategoriaStyle className={!produtosEstaoVisiveis ? "oculto" : "visivel"} >
                {categoria.map((dadosProduto, index) => <CaixaProduto key={index} dadosProduto={dadosProduto} />)}
            </ProdutosDaCategoriaStyle>
        )
    }

    function Botoes() {
        return (
            <BotoesStyle>
                {nomesBotoes.map((nomeBotao, index) => {
                    return (
                        <div key={index} className="container-categoria">
                            
                            <button onClick={()=>alterarVisibilidadeProdutos(nomeBotao)}>
                                {nomeBotao} 
                                {iconesBotoes[index]}
                            </button>
                            
                            <ProdutosDaCategoria
                                categoria={produtosCardapio[nomeBotao]} nomeBotao={nomeBotao} />
                        </div>
                    )
                })}
            </BotoesStyle>
        )
    }

    return (
        <BodyStyle>
            <Botoes />
            {modalAtivo && <Modal dadosProduto={dadosModal} setModalAtivo={setModalAtivo}/>}
        </BodyStyle>
    )
}

const BodyStyle = styled.main`
    width: 100%;
    min-height: 100%;
    background-color:#afcdcde0;
`

const BotoesStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 20px 0 20px;
  

    .container-categoria{
        width: 100%;
    }

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: none;
        box-shadow: 0 0 3px #323d6382;
        height: 40px;
        border-radius: 25px;
        margin-bottom: 15px;
        color: #0fadc3;
        font-weight: 700;
        font-size: 18px;
    }

    button:hover{
        background-color: #e2e2e2;
    }

    button:active{
        background-color: #cacaca;
    }
    
    .oculto{
        display: none;
    }

    svg{
        width: 18px;
        height: 18px;
        margin-left: 3px;
    }

`

const ProdutosDaCategoriaStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
`

const CaixaProdutoStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 10px;
    background-color: white;
    width: 150px;
    height: 200px;
    padding: 5px;
    border-radius: 20px;
    position: relative;
    color: #808080;

    p{
        
    }

    .nome{
        /* display: flex;
        text-align: center;
        justify-content: center; */
        display: grid;
        place-items: center;
        overflow-y: auto;
        height: 100%;
        margin-bottom: 45px;
        font-size:15px; 
        font-weight: 700;
    }

    .precos{
        display: flex;
        position: absolute;
        bottom: 10px;

    }

    .precos p{
        font-size: 12px;
        font-weight: 400;

    }

    img{
        max-height: 100px;
        max-width: 136px;
        border-radius: 10px;
    }

    hr{
        font-size: 0px;
    }


    .container-valores{
        display: flex;
        flex-direction: column;
        padding: 3px;
        min-width: 75px;
    }

    .container-valores .preco{
        font-size: 15px;
        font-weight: 700;
        margin-top: 2px;
    }
`