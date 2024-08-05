import styled from "styled-components"

export default function Header(){
    return(
        <HeaderStyle >
            <img src="https://i.ibb.co/g41TRrg/logo-pousada-tambau.png" alt="logo tambaú" />
        </HeaderStyle>
    )
}


const HeaderStyle = styled.header`
    background-color: #0fadc3;  
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    z-index: 2;

    img{
        max-width: 100%;
        height: 100%;
    }
`
