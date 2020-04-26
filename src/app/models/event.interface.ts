export interface Event{
    eventUID: string;
    title: string;
    desc: string;
    startTime: Date;
    endTime: Date;
    userUID :string;
    done: boolean;

    assignerUID?:string;
    notifTime?: string;
    
}