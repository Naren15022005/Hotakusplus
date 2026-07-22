import { Rule34Service } from './rule34.service';
export declare class Rule34Controller {
    private readonly rule34Service;
    constructor(rule34Service: Rule34Service);
    autocomplete(query: string): Promise<import("./interfaces/autocomplete-item.interface").AutocompleteItem[]>;
    search(query: string): Promise<import("./interfaces/paginated-result.interface").PaginatedResult>;
    getById(id: string): Promise<import("./interfaces/image-info.interface").ImageInfo>;
}
