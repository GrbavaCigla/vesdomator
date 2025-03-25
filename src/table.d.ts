import "@tanstack/table-core";

import { FilterFn } from "@tanstack/table-core";
import { RankingInfo } from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
    interface ColumnMeta<TData extends RowData, TValue> {
        headerClass?: string;
        cellClass?: string;
    }
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}
