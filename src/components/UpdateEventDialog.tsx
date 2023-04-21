import React, { useContext } from 'react';
import { EventContext } from '../context';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import moment from 'moment';

const UpdateEventDialog: React.FC = () => {
    const { 
        deleteEvent,
        updateEvent, 
        closeModalEvent, 
        eventModalOpen,
        eventClickInfo 
    } = useContext(EventContext) as EventContextType;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        width: 500,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const addEventValidationFormSchema = yup.object().shape({
        title: yup.string().required("Please enter event title"),
        start: yup.date().required(),
        end: yup.date().required(),
        backgroundColor: yup.string(),
    });
    const [formData, setFormData] = React.useState<CalendarEvent | {}>();

    const handleForm = (e: React.FormEvent<HTMLInputElement> | any) : void => {
        setFormData({
          ...formData,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      }

    const { handleSubmit, register } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(addEventValidationFormSchema),
    });

    const handleDelete = () => {
        deleteEvent(eventClickInfo.event.extendedProps._id);
        closeModalEvent();
    }

    const handleUpdate = (formData: CalendarEvent| any) => {
        updateEvent(eventClickInfo.event.extendedProps._id, formData);
        setFormData({});
        closeModalEvent();
    }

    const format = "YYYY-MM-DD HH:mm:ss";
    
    return(
        <div>
            <Modal
                open={eventModalOpen}
                onClose={closeModalEvent}
                aria-labelledby="modal-modal-title"
                >
                    <Box sx={style}>
                    <Typography sx={{marginBottom:3}} id="modal-modal-title" variant="h6" component="h2">Edit event</Typography>
                    <form className="Form" onSubmit={handleSubmit(handleUpdate)}>
                        <TextField 
                            sx={{marginRight:2, marginBottom:3}}
                            id="outlined-basic" 
                            label="Enter event title"
                            {...register("title")}  
                            onChange={handleForm}
                            defaultValue={eventClickInfo?.event?.title}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Enter start date"
                            {...register("start")}  
                            onChange={handleForm}
                            defaultValue={moment(eventClickInfo?.event?.start).format(format)}
                        />
                         <TextField 
                            sx={{marginRight:2, marginBottom:3}}
                            id="outlined-basic" 
                            label="Enter end date"
                            {...register("end")}  
                            onChange={handleForm}
                            defaultValue={moment(eventClickInfo?.event?.end).format(format)}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Enter event color"
                            {...register("backgroundColor")} 
                            defaultValue={eventClickInfo?.event?.backgroundColor} 
                            onChange={handleForm}/>
                        <Button sx={{marginRight:2}} type="submit" variant="outlined">Update event</Button>
                        <Button type="button" variant="outlined" onClick={handleDelete}>Delete event</Button>
                    </form>
                    </Box>
                
            </Modal>   
        </div>
    ) 
}
export default UpdateEventDialog;