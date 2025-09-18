export interface TableOptions {
    inputUrl: {
        getAll: string;
        delete: string;
    };
    bodyOptions: {
        pageNumber: number;
        pageSize: number;
        orderByValue: { colId: string; sort: 'asc' | 'desc' }[];
        filter: any;
    };
    appId: number;
    permissions?: any;
    inputCols?: any[];
    inputActions?: any[];
    responsiveDisplayedProperties?: string[];
    rowKeys?: object[];
    route?: string;
    includeAppId?: boolean;
    dataKey?: string;
    hasFilterInputs?: boolean;
}

export interface DataTableService {
    opt: any;
    searchNew$: any;
    loadData(url: string): any;
    delete(url: string, id: string): any;
    deleteRange(url: string, ids: string[]): any;
}
