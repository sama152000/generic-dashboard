export interface TableOptions {
    inputUrl: {
        getAll: string;
        delete: string;
    };
    bodyOptions: {
        filter: any;
    };
    appId: number;
}

export interface DataTableService {
    opt: any;
    searchNew$: any;
    loadData(url: string): any;
    delete(url: string, id: string): any;
    deleteRange(url: string, ids: string[]): any;
}
