import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate, format } from 'date-fns';
import { ReminderObj } from '../../redux/actions';
import { Typography } from '@material-ui/core';


const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer',
		overflow: 'hidden'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '70px',
		margin: 5,
	},
	reminderItem: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	reminderColor: {
		display: 'inline-block',
		width: '8px',
		height: '8px',
		borderRadius: '1px',
	},
	reminderTime: {
		margin: '0 3px',
		fontSize: '0.75rem',
		display: 'inline-block',
	},
	reminderText: {
		fontSize: '0.75rem',
		display: 'inline-block',
	},
	showMore: {
		fontSize: '0.625rem',
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void,
	reminders: ReminderObj[],
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
	const [ focused, setFocused ] = useState(false)

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;

	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
			<div className={ classes.remindersContainer }>
				{
					reminders.slice(0, 3).map((item, i) => (
						<div key={ i } className={ classes.reminderItem }>
							<Avatar className={  classes.reminderColor } style={ { background: item.color } } />
							<Typography className={ classes.reminderTime }>
								{ format( item.date, 'HH:mm' ) }
							</Typography>
							<Typography className={ classes.reminderText }>
								{ item.reminder }
							</Typography>
						</div>
					))
				}
				{
					reminders.length > 3 &&
					<Typography className={ classes.showMore } color={'textSecondary'}>...show more</Typography>
				}
			</div>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
