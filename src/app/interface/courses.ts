import { Valutes } from "./valutes";

export interface Courses {
    Date:         Date;
    PreviousDate: Date;
    PreviousURL:  string;
    Timestamp:    Date;
    Valute:       { [key: string]: Valutes };
}
