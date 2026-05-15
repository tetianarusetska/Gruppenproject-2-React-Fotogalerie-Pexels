import * as yup from "yup";

// Full name: Firstname + Lastname
const fullNameVal = /^[A-Za-zА-Яа-яЁёÄÖÜäöüß\s-]{2,50}$/;
// Username: letters, numbers, underscore
const usernameVal = /^[a-zA-Z0-9_]{3,20}$/;

const schema = yup.object({
    fullName: yup
        .string()
        .required("Please enter your first and last name.")
        .matches(fullNameVal, "Please enter a valid name."),

    username: yup
        .string()
        .required("Please enter a username.")
        .matches(
            usernameVal,
            "Only letters, numbers and _ are allowed (3–20 characters)."
        ),

    email: yup
        .string()
        .required("Please enter your email.")
        .email("Please enter a valid email address."),

    password: yup
        .string()
        .required("Please enter a password.")
        .min(8, "Password must be at least 8 characters long.")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter.")
        .matches(/[0-9]/, "Must contain at least one number."),

    confirmPassword: yup
        .string()
        .required("Please confirm your password.")
        .oneOf([yup.ref("password")], "Passwords do not match."),

    country: yup
        .string()
        .required("Please select your country."),
});

export default schema;