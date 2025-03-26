import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import {
    sortingFns,
    type FilterFn,
    type SortingFn,
} from "@tanstack/table-core";
import CyrLatConverter from "cyrlatconverter";

const CyrLat = new CyrLatConverter().init();

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {

    const itemRank = rankItem(
        row.getValue(columnId) !== null
            ? CyrLat.getC2L(row.getValue(columnId))
            : null,
        value !== null && value !== undefined
            ? CyrLat.getC2L(CyrLat.getL2C(value))
            : null
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
            dir = compareItems(
                v?.itemRank!,
                rowB.columnFiltersMeta[k]?.itemRank!
            );
        }

        if (dir !== 0) break;
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
