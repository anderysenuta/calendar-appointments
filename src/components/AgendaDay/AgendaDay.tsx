import React from 'react';
import * as dateFns from 'date-fns';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import { ReminderObj } from '../../redux/actions';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		minHeight: '250px',
		marginTop: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	},
	reminderItem: {
		display: 'flex',
		alignItems: 'baseline',
	},
	reminderColor: {
		display: 'block',
		width: '12px',
		height: '12px',
		borderRadius: '2px',
	},
	reminderTime: {
		margin: '0 10px'
	}
});

interface Props extends WithStyles<typeof styles>{
	agendaStatus: {
		isOpen: boolean,
		date: Date
	}
	onClose: () => void,
	reminders: ReminderObj[]
}

const AgendaDay = (props: Props) => {
	const { classes, agendaStatus, onClose, reminders } = props;
	const dateTitle = agendaStatus.date ? dateFns.format( agendaStatus.date, 'LLLL do, yyyy' ) : 'Closing'

	return (
		<Dialog
			open={ agendaStatus.isOpen }
			onClose={ onClose }
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				{ dateTitle }
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={ onClose }>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.remindersContainer }>
				{
					reminders.map((item, i) => (
						<div className={ classes.reminderItem } key={ i }>
							<Avatar className={  classes.reminderColor } style={ { background: item.color } } />
							<Typography className={ classes.reminderTime }>
								{ dateFns.format( item.date, 'HH:mm' ) }
							</Typography>
							<Typography>
								{ item.reminder }
							</Typography>
						</div>
					))
				}
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )( AgendaDay );
