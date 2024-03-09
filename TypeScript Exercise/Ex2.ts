/**
 * START: Follow the instructions below.
 */

// Add the `any` type to fix the type errors in the following code.

let currency: any = { name: "Indian rupee" };

currency.code = "THB";

// This assignment is incorrect because we're trying to assign a string to an object.
// Either remove this line or assign a valid object.
// currency = "Baht";

// Fix the if statement in this function so the type of `value` is narrowed to `string`.

function countryNameLength(value: unknown) {
    if (typeof value === "string") {
        console.log(value.length);
    }
}

countryNameLength("United States of America");

// Fix the type error we see when calling this function.
// Hint: Replace one of the `never` types with a different type.

// Change the return type from `never` to `void`
function throwCountryError(message: string): void {
    throw new Error(`Could not find country: ${message}`);
}

throwCountryError("Narnia");

// ----

export {};
