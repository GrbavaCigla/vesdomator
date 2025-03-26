export const format_error = (form: object, res: unknown) => {
    let to_return = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [
            k,
            { error: false, message: null },
        ])
    );

    if (res.error !== undefined && res.error.issues !== undefined) {
        res.error.issues.forEach((v) => {
            to_return[v.path[0]] = { error: true, message: v.message };
        });
    }

    return to_return;
};
