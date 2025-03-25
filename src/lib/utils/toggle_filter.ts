import type { ColumnFilter, Table } from "@tanstack/table-core";

export const toggle_filter = (
    container: ColumnFilter[],
    id: string,
    value: boolean | undefined
) => {
    const index = container.findIndex((val) => val.id === id);

    if (value === undefined) {
        if (index !== -1) container.splice(index);
        return container;
    }

    if (index === -1) {
        container.push({ id, value });
    } else {
        container[index].value = value;
    }
    return container;
};
