import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputColor from 'react-input-color';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns';

import { ReminderObj } from '../../redux/actions';

import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';


const MAX_LENGTH = 30;
const DEFAULT_COLOR = '#000';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	colorBlock: {
		marginTop: '25px'
	}

});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onSubmit: (reminder: ReminderObj) => void,
}

const AddReminder = (props: Props) => {
	const { classes, isOpen, onClose, onSubmit } = props;
	const [ reminder, setReminder ] = useState<string>('');
	const [ date, setDate ] = useState<Date>(new Date());
	const [ color, setColor ] = useState<any>(DEFAULT_COLOR);

	const handleReminderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > MAX_LENGTH) return;
		setReminder(e.target.value)
	}

	const handleColorChange = () => setColor( color.hex );

	const handleSubmit = () => onSubmit({ reminder, color, date });

	return (
		<Dialog
			open={ isOpen }
			onClose={ onClose }
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={ onClose }>
					<CloseIcon/>
				</IconButton>
			</DialogTitle>
			<Divider light/>
			<DialogContent className={ classes.addReminderFormContainer }>
				<Grid container spacing={ 40 }>
					<Grid item xs={ 12 } sm={ 6 }>
						<TextField
							label="Reminder"
							helperText={ `${ reminder.length >= MAX_LENGTH ? '30 character maximum' : '' } ` }
							fullWidth={ true }
							onChange={ handleReminderChange } value={ reminder }/>
					</Grid>
					<Grid item xs={ 12 } sm={ 4 }>
						<MuiPickersUtilsProvider utils={ DateFnsUtils }>
							<DateTimePicker
								value={ date }
								label="Select Date and Time"
								fullWidth={ true }
								autoOk={ true }
								onChange={ (date) => setDate( date ) }
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={ 12 } sm={ 2 }>
						<FormControl fullWidth={ true }>
							<InputLabel shrink> Select Type </InputLabel>
							<div className={ classes.colorBlock }>
								<InputColor
									initialValue={ DEFAULT_COLOR }
									placement="top"
									onChange={ handleColorChange }
								/>
							</div>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<Divider light/>
			<DialogActions>
				<Button color="primary" disabled={ !reminder.length } onClick={ handleSubmit }>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
