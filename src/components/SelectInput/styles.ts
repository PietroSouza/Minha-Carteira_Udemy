import styled from 'styled-components'

export const Container = styled.div`

    > select {
        padding: 7px 10px;
        border-radius: 5px;
        background-color: ${props => props.theme.colors.gray};

        margin-left: 7px;
    }

`;