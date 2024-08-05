import styled from "styled-components"
import cardapio from "../../data"
import { useEffect, useState } from "react"

export default function Body() {

    // vars
    const produtosCardapio = cardapio
    const nomesBotoes = Object.keys(cardapio)


    // states
    const [produtosVisiveis, setProdutosVisiveis] = useState({})

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

    // componentes

    function Precos({ preco }) {
        const precosVariados = Object.keys(preco).length > 1
        if (precosVariados) {
            return (
                <div className="precos">
                    <p>1 pessoa: <span>R${formatarPreco(preco["1 pessoa"])}</span></p>
                    <hr />
                    <p>2 pessoas: <span>R${formatarPreco(preco["2 pessoas"])}</span></p>
                </div>
            )
        }
        return (

            <div className="precos">
                <span>R${formatarPreco(preco)}</span>
            </div>
        )

    }

    function CaixaProduto({ dadosProduto }) {
        const { preco, imagem, descricao, nome } = dadosProduto
        return (
            <CaixaProdutoStyle>
                <img src={imagem} alt={descricao} />
                <p>{nome}</p>

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
                            <button onClick={() => alterarVisibilidadeProdutos(nomeBotao)}>{nomeBotao}</button>
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
        </BodyStyle>
    )
}

const BodyStyle = styled.main`
    width: 100%;
    height: 100%;
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

    .visivel{

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
        font-size:20px; 
        font-weight: 400px;
    }

    .precos{
        display: flex;
        position: absolute;
        bottom: 10px;

    }

    .precos p{
        font-size: 15px;
        font-weight: 100;

    }

    img{
        width: 100%;
        border-radius: 10px;
    }

    hr{
        font-size: 0px;
    }

    span{
        font-weight: 700;
        font-size: 17px;
    }
`