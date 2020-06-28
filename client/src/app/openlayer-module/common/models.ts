export interface Grade {
    title: string;
    background: Array<number>;
    stroke: Array<number>;
    breakpoint: {
        min: number;
        max: number;
    };
}

export interface Legend {
    id: string;
    title: string;
    grades: Grade[];
    stroke: Array<number>;
}

export interface Basemap {
    id: string;
    title: string;
    URL: string;
}

export interface Param {
    id: string;
    title: string;
    data: any;
}
