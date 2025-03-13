export interface SquareProps {
    id: number;
    xLabel: string;
    yLabel: number;
    top: string;
    left: string;
    width: string;
    height: string;
    border: string;
}

export enum MapEnum {
    Marcinkowice = 'Marcinkowice',
    Stanowice = 'Stanowice'
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSquare: SquareProps | null;
    map: MapEnum;
}

export interface IReport {
    _id?: string;
    place: string;
    square: string;
    description: string;
    amountAndType: string;
}