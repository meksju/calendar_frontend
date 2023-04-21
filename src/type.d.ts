interface CalendarEvent {
    _id: string
    title: string
    start: Date
    end: Date
    backgroundColor?: string
} 

interface EventProps {
    event: CalendarEvent
}

type ApiDataType = {
    message: string
    events: CalendarEvent[]
    event?: CalendarEvent
}

interface Date {
    day: number;
}

interface Weekday {
    letter: string;
}

type EventContextType = {
    events:CalendarEvent[];
    addEvent: (event: CalendarEvent) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, event: CalendarEvent) => void;
    openModalEvent: (eventClickInfo: {}) => void;
    openAddModalEvent:(selectionInfo: {}) => void;
    closeModalEvent: () => void;
    fetchEvents: () => void;
    eventModalOpen: boolean;
    addEventModalOpen: boolean;
    eventClickInfo: any;
    closeAddEventModal: () => void;
    selectionInfo: any;
};