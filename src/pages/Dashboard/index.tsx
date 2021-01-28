import React, { useMemo, useState } from 'react';
import {Container, Content} from './styles';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'
import PieChartBox from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import listOfMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return{
                value: index + 1,
                label:month
            }
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
           }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });
    },[]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                }catch {
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);	
 
    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                }catch {
                    throw new Error('Invalid amount! Amount must be a number.')
                }
            }
        });

        return total;
    },[monthSelected, yearSelected]);	
 
    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses

    },[totalGains, totalExpenses]);	
 
    const message = useMemo(() => {
        if(totalBalance < 0){
            return{ 
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria!",
                footerText:"Verifique seus gastos, corte coisas desnecessárias.",
                icon: sadImg
            }
        } else if( totalBalance === 0){
            return{ 
                title: "Ufa!",
                description: "Neste mês, você gastou tudo!",
                footerText:"Tenha cuidado, tente poupar o seu dinheiro.",
                icon: grinning
            }
        } else{
            return{ 
                title:"Muito Bem!",
                description:"Sua carteira está positiva!",
                footerText:"Continue assim, considere investir o seu saldo.",
                icon: happyImg
            }
        }

    },[totalBalance]);	

    const relationExpensesXGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name:"Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: "#F7931B"
            },
            {
                name:"Saídas",
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: "#E44C4E"
            }
        ];
        return data;
    },[totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected) {
                    try{
                        amountEntry += Number(gain.amount);
                    }
                    catch{
                        throw new Error('Invalid')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected) {
                    try{
                        amountOutput += Number(expense.amount);
                    }
                    catch{
                        throw new Error('Invalid')
                    }
                }
            });

            return { 
                monthNumber: month,
                month: listOfMonths[month].substr(0,3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth()+1;
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        });
    },[yearSelected])
 
    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch{
            throw new Error('Invalid month value')
        }
    }

    const handleYearSelected = (year: string) => {
        try{
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch{
            throw new Error('Invalid year value')
        }
    }

    return(
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>
                <WalletBox 
                    title="saldo"
                    amount={totalBalance}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="dolar"
                    color="#4041F0"
                />
                <WalletBox 
                    title="entradas"
                    amount={totalGains}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="arrowUp"
                    color="#F7931B"
                />
                <WalletBox 
                    title={"saídas"}
                    amount={totalExpenses}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="arrowDown"
                    color="#E44c4E"
                />

                <MessageBox 
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox
                    data={relationExpensesXGains}
                />

                <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />
            </Content>
        </Container>
    );
}
export default Dashboard
