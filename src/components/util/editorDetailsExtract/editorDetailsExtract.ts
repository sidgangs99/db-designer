export class EditorDetailsExtract {
    tableNames: string[] = [];
    tableWithDetails: Record<string, any> = {};

    getTableNames() {
        return this.tableNames;
    }

    getTableWithDetails() {
        return this.tableWithDetails;
    }
}
