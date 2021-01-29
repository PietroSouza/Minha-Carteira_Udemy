import styled from 'styled-components'

interface ISubtitleProps{
    color:string;
}

export const Container = styled.div`
    width: 48%;
    min-height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    display:flex;

    @media (max-width:1200px){
        display:flex;
        flex-direction: column;

        width: 100%;
        height: auto;
    }
`;

export const SideLeft = styled.div`
    flex: 1;
    padding: 30px 20px;

    > h2 {
        padding-left: 18px;
        margin-bottom: 10px;
    }
`;


export const SubtitleContainer = styled.ul`
    list-style: none;
    max-height: 170px;
    padding-right: 15px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width:10px;
    }
    
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secondary};
        border-radius:10px;
    }

    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};
        border-radius:10px;
    }

    @media (max-width:1200px){
        display:flex;
        height:auto;
    }
`;

export const Subtitle = styled.li<ISubtitleProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    padding-left:18px;
    
    > div{
        background-color: ${props => props.color};

        width: 40px;
        height: 40px;
        border-radius: 5px;

        font-size: 14px;
        line-height: 40px;
        text-align: center;
    }

    > span{
        margin-left: 5px;
    }

    @media (max-width:420px){
        > div{
            width: 35px;
            height: 35px;
            font-size: 12px;
            line-height: 35px;
        }
    }
`;

export const SideRight = styled.div`
    flex:1;
    min-height:150px;

    display: flex;
    justify-content:center;
    padding-top: 35px;

`;