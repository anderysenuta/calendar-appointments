import React from 'react';
import { connect } from 'react-redux';
import CalendarDay from './CalendarDay';
import { openAgenda, ReminderObj } from '../../redux/actions';
import * as dateFns from 'date-fns';

interface Props {
	dateObj: {
		date: Date
	}
}
interface DateObj {
	date: Date
}

interface State {
	reminders: ReminderObj[]
}

interface DateObj {
	date: Date
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const reminders = state.reminders
		.filter(item => dateFns.isSameDay( item.date, ownProps.dateObj.date ))
		.sort((a, b) => dateFns.compareAsc( a.date, b.date ));

	return { ...state, ...ownProps, reminders };
}

const mapDispatchToProps = (dispatch: any)=> {
	return {
		onDayClick: (dateObj: DateObj) => {
			dispatch( openAgenda( dateObj ) )
		}
	}
}

const CalendarDayContainer = connect( mapStateToProps, mapDispatchToProps )( React.memo(CalendarDay) );

export default CalendarDayContainer;
