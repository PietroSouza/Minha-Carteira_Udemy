import styled from 'styled-components'

interface ISubtitleProps{
    color:string;
}

export const Container = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    margin: 10px 0;
    padding: 30px 20px;

    border-radius: 7px;

`;

export const ChartContainer = styled.div`
    flex: 1;
    height:360px;
`;

export const Header = styled.header`
    display:flex;
    justify-content: space-between;
    width:100%;

    > h2{
        margin-bottom: 20px;
        padding-left:18px;
    }
`;

export const SubtitleContainer = styled.ul`
    list-style: none;
    max-height: 170px;
    padding-right: 18px;
    display: flex;
`;

export const Subtitle = styled.li<ISubtitleProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    margin-left: 7px;
    
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
`;
