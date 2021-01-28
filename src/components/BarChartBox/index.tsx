import React from 'react';
import { Container, SideLeft, SideRight, Subtitle, SubtitleContainer } from './styles'

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip} from 'recharts'
import formatCurrency from '../../utils/formatCurrency';

interface IBarChartProps{
    title: string;
    data:{
        name:string;
        amount: number;
        percent: number;
        color:string;
    }[]
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <SubtitleContainer>
                    { 
                        data.map((indicator) => (
                            <Subtitle key={indicator.name} color={indicator.color}>
                                <div>{indicator.percent}%</div>
                                <span>{indicator.name}</span>
                            </Subtitle>
                        ))
                    }
                </SubtitleContainer>
            </SideLeft>
            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name="Valor">
                            {
                                data.map((indicator) => {
                                    <Cell 
                                        key={indicator.name}
                                        fill={indicator.color}
                                    />
                                })
                            }
                        </Bar>
                        <Tooltip cursor={{ fill: 'none'}} formatter={(value: number) => formatCurrency(Number(value))} />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );
export default BarChartBox;