import styled from "styled-components"
import cardapio from "../../data"

export default function Body() {
    // vars
    const produtosCardapio = cardapio
    const nomesBotoes = Object.keys(cardapio)

    // componentes
    function Precos({ preco }) {
        const precosVariados = Object.keys(preco).length > 1
        if (precosVariados) {
            return (
                <div className="precos">
                    <p>1 pessoa: R${preco["1 pessoa"].toFixed(2)}</p>
                    <br />
                    <p>2 pessoas: R${preco["1 pessoa"].toFixed(2)}</p>
                </div>
            )
        }
        return <p>R${preco}</p>
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


    function ProdutosDaCategoria({ categoria }) {
        return (
            <ProdutosDaCategoriaStyle>
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
                            <button> {nomeBotao}</button>
                            <ProdutosDaCategoria categoria={produtosCardapio[nomeBotao]} />
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
`

const BotoesStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button{
        width: 100%;
    }
`

const ProdutosDaCategoriaStyle = styled.div`
    
`

const CaixaProdutoStyle = styled.div`
`