import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../schemas/registrSchema";

export default function RegistrForm() {
    // State für die Erfolgsmeldung (wird nach erfolgreichem Submit angezeigt)
    const [success, setSuccess] = useState(false);

    // React Hook Form Setup
    const {
        register,                                        // verbindet Inputs mit dem Formular-State
        handleSubmit,                                    // verarbeitet Submit + Validierung
        reset,                                           // setzt das Formular zurück
        formState: { errors },                           // enthält Validierungsfehler von Yup
    } = useForm({
        mode: "onChange",                                // Validierung während der Eingabe
        resolver: yupResolver(schema),                   // verbindet Yup Schema mit dem Formular
    });

    // Wird nur ausgeführt, wenn das Formular gültig ist
    const onSubmit = (data) => {
        console.log("FORM DATA:", data); // Ausgabe der Formulardaten

        // Erfolgsmeldung aktivieren
        setSuccess(true);

        // Formular zurücksetzen
        reset();

        // Erfolgsmeldung nach 3 Sekunden ausblenden
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    return (
        <div className="flex justify-center items-center
        min-h-[calc(100vh-80px)]">

            {/* ERFOLGSMELDUNG */}
            {success && (
                <div className="mt-[20px] text-[var(--mainColor)] font-medium text-[18px] text-center">
                    Account successfully created!
                </div>
            )}

            {/* FORMULAR */}
            <form
                onSubmit={handleSubmit(onSubmit)} // Submit mit Validierung
                className="
                    rounded-lg

                    px-24 py-12

                    flex flex-col
                    justify-center items-center
                    gap-[25px]
                    border
                    "
            >

                {/* VOR- UND NACHNAME */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        First- and Lastname
                    </label>

                    <input
                        type="text"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("fullName")}
                    />

                    {/* Fehlermeldung für fullName */}
                    {errors.fullName && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                {/* BENUTZERNAME */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        Username
                    </label>

                    <input
                        type="text"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("username")}
                    />

                    {/* Fehlermeldung für username */}
                    {errors.username && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                {/* E-MAIL */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        E-Mail
                    </label>

                    <input
                        type="email"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("email")}
                    />

                    {/* Fehlermeldung für email */}
                    {errors.email && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* PASSWORT */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        Password
                    </label>

                    <input
                        type="password"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("password")}
                    />

                    {/* Fehlermeldung für password */}
                    {errors.password && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* PASSWORT BESTÄTIGEN */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("confirmPassword")}
                    />

                    {/* Fehlermeldung für confirmPassword */}
                    {errors.confirmPassword && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* LAND */}
                <div className="flex flex-col gap-[10px]">
                    <label className="leading-[1.2em] font-medium text-[18px]">
                        Country
                    </label>

                    <input
                        type="text"
                        className="rounded border-2 border-neutral-300 h-[32px] w-[350px] text-[16px]"
                        {...register("country")}
                    />

                    {/* Fehlermeldung für country */}
                    {errors.country && (
                        <p className="text-[var(--mainColor)] text-sm">
                            {errors.country.message}
                        </p>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md font-semibold text-[var(--bgColor)] bg-[var(--mainColor)] hover:text-white hover:bg-neutral-800"
                >
                    Register
                </button>

            </form>
        </div>
    );
}
