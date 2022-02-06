import moment from 'moment';
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux';

const ChartPrice = (props) => {
    var optionPrice = props.reqOptionPrice;
    const orders = useSelector(state => state.order.orders);
    var labels = [];
    var datas = [];
    if (orders.Orders) {
        if (optionPrice === 0) {
            let min = moment().year();
            orders.Orders.forEach(element => {
                if (element.createdAt.substring(0, 4) < min) {
                    min = Number(element.createdAt.substring(0, 4));
                };
            });
            let i = min;
            while (i <= moment().year()) {
                let a = i;
                let s = 0;
                orders.Orders.forEach(value => {
                    if (Number(value.createdAt.substring(0, 4)) === a) {
                        s += value.totalPrice;
                    };
                });
                labels.push(a);
                datas.push((s / 25000).toFixed(2));
                i++;
            };
        } else if (optionPrice === 1) {
            let year = moment().year();
            let min = 1;

            var temp = orders.Orders.filter(value => Number(value.createdAt.substring(0, 4)) === year);
            let i = min;

            while (i <= (moment().month() + 1)) {
                let a = i;
                let s = 0;
                temp.forEach(value => {
                    if (Number(value.createdAt.substring(5, 7)) === a) {
                        s += value.totalPrice;
                    };
                });
                labels.push(moment().month(a - 1).format('MMM'));
                datas.push((s / 25000).toFixed(2));
                i++;
            }
        } else {
            let year = moment().year();
            let month = moment().month() + 1;
            var temp2 = orders.Orders.filter(value => Number(value.createdAt.substring(0, 4)) === year && Number(value.createdAt.substring(5, 7)) === month);
            let week = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]
            week.forEach(value => labels.push(value))
            let data = [0, 0, 0, 0, 0];
            temp2.forEach(item => {
                let d = Number(item.createdAt.substring(8, 10))
                if (d <= 7) {
                    data[0] += item.totalPrice;
                } else if (d > 7 && d <= 14) {
                    data[1] += item.totalPrice;
                } else if (d > 14 && d <= 21) {
                    data[2] += item.totalPrice;
                } else if (d > 21 && d <= 28) {
                    data[3] += item.totalPrice;
                } else if (d > 28) {
                    data[4] += item.totalPrice;
                }
            })
            data.forEach(value => datas.push((value / 25000).toFixed(2)))
        }
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        legend: { display: false },
        title: {
            display: true,
            text: "Income Statistics"
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: optionPrice === 0 ? 'Yearly' : optionPrice === 1 ? "Monthly" : "Weekly",
                data: datas,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default ChartPrice
