export interface INotify {
    type: TNotifyContextType;
    message:string;
    code:string;
    codeSubName?:string;
    notifyIndex?:number
}

export type TNotifyContextType = "Error" | "Success" | "Info" | "Warn"


export interface INotifyProperties {
    context:TNotifyContext;
    borderColor:string;
    bgColor:string;
    boxShadow:string

}

export type TNotifyContext = 'Wystapił błąd!' | 'Sukces' | 'Informacja' | 'Ostrzeżenie'