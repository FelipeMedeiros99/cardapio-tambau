import styled from "styled-components"
import { IoCloseOutline } from "react-icons/io5";


export default function Modal({dadosProduto, setModalAtivo}){
    // vars
    const {imagem, nome, preco, descricao} = dadosProduto

    // functions
    function formatarPreco(preco) {
        return String(preco.toFixed(2)).replace(".", ",")
    }

    // Components
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

            <div className="precos solo">
                <span>R${formatarPreco(preco)}</span>
            </div>
        )
    }

    return(
        <ModalStyle>

            <div className="container-modal">
                <div className="container-icone" onClick={()=>setModalAtivo(false)}>
                    <IoCloseOutline />
                </div>
                <img src={imagem} alt={descricao} />
                <p className="nome">{nome}</p>
                <p className="descricao">{descricao}</p>
                <Precos preco={preco} />
            </div>
        </ModalStyle>
    )
}

const ModalStyle = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #bbcecea6;
    z-index: 3;

    .container-modal{
        padding: 30px 20px 20px 20px;
        position: relative;
        height: 400px;
        width: 100%;
        max-width: 300px;
        background-color: white;
        text-align: center;
        color: #808080;
        border-radius: 20px;
        box-shadow: 0 0 30px #0000005e;
    }

    p{
        font-size:20px; 
        font-weight: 400px;
    }

    .precos{
        display: flex;
        position: absolute;
        align-items: left;
        bottom: 10px;
    }
    
    .solo{
       transform: translateX(50%);
       bottom: 20px;
    }

    .precos p{
        font-size:25px;
        font-weight: 100;
    }

    img{
        width: 100%;
        max-width: 200px;
        border-radius: 10px;
    }

    .nome{
        font-size: 25px;
        font-weight: 700;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    hr{
        font-size: 0px;
    }

    span{
        font-weight: 700;
        font-size: 30px;
        margin-top: 2px;
    }

    .container-icone{
        position: absolute;
        right: 0px;
        top: 5px;
        font-size: 30px;
        font-weight: 100;
    }
`
