export enum EStatus {
  InProgress = "InProgress",
  Complete = "Complete"
}
export interface IListItem {
    id: number, 
    text: string,
    description: string,
    status: EStatus 
};

export interface ICreateItem {
  text: string,
  description: string
};

export interface ISelectListItem {
    key: string|null; 
    value: string
};