import React, { useMemo, useState } from 'react';
import {Container, Content} from './styles';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import listOfMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const options = [
        {value: 'Eu', label: 'eu'},
        {value: 'Ele', label:'ele'}
    ]

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
        } else if( totalBalance == 0){
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
            </Content>
        </Container>
    );
}
export default Dashboard
