export interface Assignment{
    assignmentUID: string;
    assignerUID: string;
    userUID: string;
    eventUID: string;
    title: string;
    desc: string;
    startTime: string;
    endTime: string;
    done: boolean;
    answer?: string;
}