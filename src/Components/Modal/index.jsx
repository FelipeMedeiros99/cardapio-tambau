import styled from "styled-components"
import { IoCloseOutline } from "react-icons/io5";
import { useRef } from "react";


export default function Modal({dadosProduto, setModalAtivo}){
    // vars
    const {imagem, nome, preco, descricao} = dadosProduto

    // hooks
    const elementosModal = useRef(null)

    // functions
    function formatarPreco(preco) {
        return String(preco.toFixed(2)).replace(".", ",")
    }

    function verificarClickInterno(event){
        const elementoClicado = event.target
        const modal = elementosModal.current
        const oClickFoiDentroDoModal = modal.contains(elementoClicado)
        if(!oClickFoiDentroDoModal){
            setModalAtivo(false)
        }
        
    }

    // Components
    function Precos({ preco }) { 
        const precosVariados = Object.keys(preco).length > 1
        if (precosVariados) {
            if (precosVariados) {
                const precos = Object.keys(preco)
                return (
                    
                    <div className="precos">
                        {precos.map((tituloDoPreco, index)=>(
                            <>
                                <div key={index} className="container-valores">
                                    <p>{tituloDoPreco}: <span>R${formatarPreco(preco[tituloDoPreco])}</span></p>
                                </div>
                                {index===0?<hr />:''}
                            </>
                        ))}
                    </div>
                )

            }
            // return (
            //     <div className="precos">
            //         <p>1 pessoa: <span>R${formatarPreco(preco["1 pessoa"])}</span></p>
            //         <hr />
            //         <p>2 pessoas: <span>R${formatarPreco(preco["2 pessoas"])}</span></p>
            //     </div>
            // )
        }
        return (

            <div className="precos solo">
                <span>R${formatarPreco(preco)}</span>
            </div>
        )
    }

    return(
        <ModalStyle onClick={verificarClickInterno} >
            <div className="container-modal" ref={elementosModal}>
                <div className="container-icone" onClick={()=>setModalAtivo(false)}>
                    <IoCloseOutline />
                </div>
                <div className="container-imagem">
                    <img src={imagem} alt={descricao} />
                </div>
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
        display: grid;
        grid-template-rows:  120px auto 1fr;
        height: 400px;
        width: 100%;
        max-width: 300px;
        padding: 30px 20px 73px 20px;
        background-color: white;
        text-align: center;
        color: #808080;
        border-radius: 20px;
        box-shadow: 0 0 30px #0000005e; 
        position: relative;
        /* padding: 30px 20px 20px 20px;
        position: relative;
        height: 400px;
        width: 100%;
        max-width: 300px;
        background-color: white;
        text-align: center;
        color: #808080;
        border-radius: 20px;
        box-shadow: 0 0 30px #0000005e; */
    }

    p{
        font-size:20px; 
        font-weight: 400px;
    }

    .precos{
        display: flex;
        position: absolute;
        bottom: 10px;
        left: 0;
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
        height: 100%;
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

    .descricao{
        max-height: 100px;
        overflow-y: auto;
    }
`
