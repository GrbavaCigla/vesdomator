import { z } from "zod";

const translatedErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.too_small) {
        return {
            message: `Поље мора садржати најмање ${issue.minimum} карактер(а)`,
        };
    } else if (issue.code === z.ZodIssueCode.too_big) {
        return {
            message: `Поље мора садржати највише ${issue.maximum} карактер(а)`,
        };
    }
    return { message: ctx.defaultError };
};

z.setErrorMap(translatedErrorMap);

export { z };
