import React, { useEffect, useContext } from 'react';
import { EventContext } from '../context';
import { Box, Typography, TextField, Button, Modal } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import moment from 'moment';

const AddEventDialog: React.FC = () => {
    const { 
        addEvent,
        closeAddEventModal, 
        addEventModalOpen, 
        selectionInfo
    } = useContext(EventContext) as EventContextType;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [formData, setFormData] = React.useState<CalendarEvent | {}>();

    const addEventValidationFormSchema = yup.object().shape({
        title: yup.string().required("Please enter event title"),
        start: yup.date().required("Please enter event start date"),
        end: yup.date().required("Please enter event end date"),
        backgroundColor: yup.string(),
    });
     const defaultValues ={
            title: "",
            start: "",
            end: "",
            backgroundColor:"",
        };
    
        const { handleSubmit, register, reset, control, formState,
        formState: { isSubmitSuccessful }} = useForm({
            mode: 'onSubmit',
            resolver: yupResolver(addEventValidationFormSchema),
        });


    useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset(defaultValues);
        }
      }, [formState, formData, reset]);

      const handleNewEvent = ( formData: CalendarEvent| any) => {
        addEvent(formData);
        closeAddEventModal();
      }

      const handleForm = (e: React.FormEvent<HTMLInputElement> | any) : void => {
        setFormData({
          ...formData,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      }
      const format = "YYYY-MM-DD HH:mm:ss";

      return(
        <Modal
            open={addEventModalOpen}
            onClose={closeAddEventModal}
            aria-labelledby="modal-modal-title"
            >
              <Box sx={style}>
                <Typography sx={{marginBottom:3}} id="modal-modal-title" variant="h6" component="h2">Add event</Typography>
                <form className="Form" onSubmit={handleSubmit(handleNewEvent)}>
                  <TextField 
                    sx={{marginBottom:2}}
                    id="outlined-basic" 
                    label="Enter event title"
                    {...register("title")}  
                    onChange={handleForm}/>
                  <TextField 
                    sx={{marginBottom:2}}
                    id="outlined-basic" 
                    label="Enter start date"
                    {...register("start")}  
                    onChange={handleForm}
                    defaultValue={moment(selectionInfo.start).format(format)}
                  />                  
                  <TextField
                    sx={{marginBottom:2}} 
                    id="outlined-basic" 
                    label="Enter end date"
                    {...register("end")}  
                    onChange={handleForm}
                    defaultValue={moment(selectionInfo.end).format(format)}
                  />
                  <TextField 
                      sx={{marginBottom:2}}
                      id="outlined-basic" 
                      label="Enter event color"
                      {...register("backgroundColor")}  
                      onChange={handleForm}/>
                      <br/>
                    <Button type="submit" variant="outlined" disabled={formData === undefined ? true : false}>Add event</Button>
                </form>
              </Box>
          </Modal>
      )
    
}
export default AddEventDialog;