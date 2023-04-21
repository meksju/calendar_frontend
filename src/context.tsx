import React, {createContext, useState} from "react";
import axios, { AxiosResponse } from "axios"


export const EventContext = createContext<EventContextType | null >(null);

interface Props {
    children: React.ReactNode;
}

const baseUrl: string = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const EventProvider: React.FC<Props> = ({ children }) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const [eventClickInfo, setEventClickInfo] = useState({});
    const [selectionInfo, setSelectionInfo]= useState({});
    const [addEventModalOpen, setAddEventModalOpen] = useState(false);

    const openModalEvent = (eventClickInfo: any) => {
        setEventModalOpen(true);
        setEventClickInfo(eventClickInfo);
    };
    const openAddModalEvent= (daySelectionInfo: any) => {
      setAddEventModalOpen(true);
      setSelectionInfo(daySelectionInfo);
    }

    const closeModalEvent = () => {
        setEventModalOpen(false);
    };

    const closeAddEventModal = () => {
      setAddEventModalOpen(false);
    }

    const getEvents = async (): Promise<AxiosResponse<ApiDataType>> => {
        try{
            const events: AxiosResponse<ApiDataType> = await axios.get(
                baseUrl + "/events"
            )
            return events
        }
        catch(error: any) {
            throw new Error(error)
        }
    
    }

    const fetchEvents = (): void => {
        getEvents()
        .then(({ data: { events } }: CalendarEvent[] | any) => setEvents(events))
        .catch((err: Error) => console.log(err))
      }

    const addEvent = async (
        formData: CalendarEvent
      ): Promise<AxiosResponse<ApiDataType>> => {
        try {
          const event: Omit<CalendarEvent, "_id"> = {
            title: formData.title,
            start: formData.start,
            end: formData.end,
            backgroundColor: formData.backgroundColor
          }
          const saveEvent: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-event",
            event
          )
          fetchEvents()
          return saveEvent
        } catch (error: any) {
          throw new Error(error)
        }
      }

    const updateEvent = async (
        _id: string,
        event: CalendarEvent,
      ): Promise<AxiosResponse<ApiDataType>> => {
        try {
            const eventUpdate: Omit<CalendarEvent, "_id"> = {
                title: event.title,
                start: event.start,
                end: event.end,
                backgroundColor: event.backgroundColor
              }
          const updatedEvent: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-event/${_id}`,
            eventUpdate
          )
          fetchEvents()
          return updatedEvent
        } catch (error: any) {
          throw new Error(error)
        }
      }
    
    const deleteEvent = async (
        _id: string
      ): Promise<AxiosResponse<ApiDataType>> => {
        try {
          const deletedEvent: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-event/${_id}`
          )
          fetchEvents()
          return deletedEvent
        } catch (error: any) {
          throw new Error(error)
        }
      }

      return <EventContext.Provider 
        value={{
          events, 
          eventClickInfo, 
          openModalEvent,
          openAddModalEvent, 
          closeModalEvent, 
          addEvent, 
          deleteEvent, 
          updateEvent, 
          fetchEvents, 
          eventModalOpen,
          addEventModalOpen,
          closeAddEventModal, 
          selectionInfo
         }}>
          {children}
        </EventContext.Provider>;

}
export default  EventProvider;
