import React, { useState } from 'react'
import moment from 'moment'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const DateRagersPicker = () => {
    const [startDate, setStartDate] = useState(moment().subtract(29, 'days'))
    const [endDate, setEndDate] = useState(moment())
    const [range, setRange] = useState({
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    })

    const handleEvent = (event, picker) => {
        setStartDate(picker.startDate);
        setEndDate(picker.endDate);
    };

    let start = this.state.startDate.format('MMMM D, YYYY');
    let end = this.state.endDate.format('MMMM D, YYYY');
    let label = start + ' - ' + end;
    if (start === end) {
        label = start;
    }

    return (
        <div>
            <DatetimeRangePicker
                startDate={startDate}
                endDate={endDate}
                ranges={range}
                alwaysShowCalendars={true}
                onEvent={handleEvent}
            >
                <button>
                    <div className="pull-left">
                        <i className="fa fa-calendar" />
                        &nbsp;
                        <span>
                            {label}
                        </span>
                    </div>
                    <div className="pull-right">
                        <i className="fa fa-angle-down" />
                    </div>
                </button>
            </DatetimeRangePicker>
        </div>
    )

}

export default DateRagersPicker
