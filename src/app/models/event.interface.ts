export interface Event{
    eventUID: string;
    title: string;
    desc: string;
    startTime: string;
    endTime: string;
    userUID :string;
    done: boolean;

    assignerUID?:string;
    notifTime?: string;
    
}