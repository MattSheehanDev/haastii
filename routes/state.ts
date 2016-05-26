
interface IOrderState {
    title: string;
    place: string;
    expires: Date;
}


export var state: IOrderState = {
    title: "Haastii",
    place: null,
    expires: null
}
