export default function Loader() {

    return (
        <div className="flex items-center justify-center gap-2 py-10">

            <div
                className="
                    h-3 w-3 rounded-full
                     bg-neutral-500
                    animate-bounce
                "
            />

            <div
                className="
                    h-3 w-3 rounded-full
                    bg-neutral-500
                    animate-bounce
                    [animation-delay:150ms]
                "
            />

            <div
                className="
                    h-3 w-3 rounded-full
                    bg-neutral-500
                    animate-bounce
                    [animation-delay:300ms]
                "
            />

        </div>
    );
}