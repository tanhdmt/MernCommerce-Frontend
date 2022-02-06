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

const ChartProduct = (props) => {
    var OptionPro = props.reqOptionPro;
    const orders = useSelector(state => state.order.orders);
    var labels = [];
    var datas = [];
    if (orders.Orders) {
        if (OptionPro === 0) {
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
                        value.orderItems.forEach(index => {
                            s += index.quantity;
                        })
                    };
                });
                labels.push(a);
                datas.push(s);
                i++;
            };
        } else if (OptionPro === 1) {
            let year = moment().year();
            let min = 1;

            var temp = orders.Orders.filter(value => Number(value.createdAt.substring(0, 4)) === year);
            let i = min;

            while (i <= (moment().month() + 1)) {
                let a = i;
                let s = 0;
                temp.forEach(value => {
                    if (Number(value.createdAt.substring(5, 7)) === a) {
                        value.orderItems.forEach(index => {
                            s += index.quantity;
                        })
                    };
                });
                labels.push(moment().month(a - 1).format('MMM'));
                datas.push(s);
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
                    item.orderItems.forEach(index => {
                        data[0] += index.quantity;
                    })
                } else if (d > 7 && d <= 14) {
                    item.orderItems.forEach(index => {
                        data[1] += index.quantity;
                    })
                } else if (d > 14 && d <= 21) {
                    item.orderItems.forEach(index => {
                        data[2] += index.quantity;
                    })
                } else if (d > 21 && d <= 28) {
                    item.orderItems.forEach(index => {
                        data[3] += index.quantity;
                    })
                } else if (d > 28) {
                    item.orderItems.forEach(index => {
                        data[4] += index.quantity;
                    })
                }
            })
            data.forEach(value => datas.push(value))
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
            text: "Product Statistics"
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: OptionPro === 0 ? 'Yearly' : OptionPro === 1 ? "Monthly" : "Weekly",
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

export default ChartProduct
