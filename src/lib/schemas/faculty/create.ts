import { z } from "$lib/schemas";
import CyrLatConverter from "cyrlatconverter";

const Cyr2Lat = new CyrLatConverter().init();

export const CreateFaculty = z.object({
    name: z
        .string()
        .nonempty()
        .max(128)
        .transform((arg) => Cyr2Lat.getL2C(arg.toUpperCase())),
    short: z
        .string()
        .max(8)
        .transform((arg) => Cyr2Lat.getL2C(arg.toUpperCase()))
        .optional(),
    ubg: z.boolean(),
});
