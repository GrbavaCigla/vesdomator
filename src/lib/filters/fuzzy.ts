import { get_latn_from_cyr } from "$lib/utils/transcript";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import {
    sortingFns,
    type FilterFn,
    type SortingFn,
} from "@tanstack/table-core";

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(
        get_latn_from_cyr(row.getValue(columnId)),
        get_latn_from_cyr(value)!
    );

    addMeta({
        itemRank,
    });

    return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0;

    for (const [k, v] of Object.entries(rowA.columnFiltersMeta)) {
        if (v && rowB.columnFiltersMeta[k]) {
            console.log(v, rowB.columnFiltersMeta[k]);

            dir = compareItems(
                v?.itemRank!,
                rowB.columnFiltersMeta[k]?.itemRank!
            );
        }

        if (dir !== 0) break;
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
