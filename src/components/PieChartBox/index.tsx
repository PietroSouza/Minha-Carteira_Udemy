import React from 'react';
import { Container, SideLeft, SubtitleContainer, Subtitle, SideRight } from './styles'

import {PieChart, Cell, Pie, ResponsiveContainer} from 'recharts'

interface IPieChartProps{
    data:{
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

const PieChartBox: React.FC<IPieChartProps> = ({data}) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
            <SubtitleContainer>
                { 
                    data.map((indicator) => (
                        <Subtitle key={indicator.name} color={indicator.color}>
                            <div>{indicator.percent}</div>
                            <span>{indicator.name}</span>
                        </Subtitle>
                    ))
                }
            </SubtitleContainer>
        </SideLeft>

        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        labelLine={false}
                        dataKey="percent"
                    >
                        {
                            data.map((indicator) => (
                                <Cell key={indicator.name} fill={indicator.color} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>

);
export default PieChartBox;