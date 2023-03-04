import { forwardRef, useEffect, useRef, useState } from "react";
import InputError from "@/Components/InputError";

export default forwardRef(function ImageInput(
    {
        name,
        id,
        value,
        error,
        className,
        required,
        handleChange,
        accept = ".jpg,.jpeg,.png",
        maxSize = 5 * 1024 * 1024,
        preview = null,
    },
    ref
) {
    const input = ref ? ref : useRef();
    const [previewUrl, setPreviewUrl] = useState(preview);
    const [errorMessage, setErrorMessage] = useState(error);

    useEffect(() => {
        if (value) {
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(value);
        }
    }, [value]);

    return (
        <div className="flex flex-col items-start">
            <input
                type="file"
                name={name}
                id={id}
                className="hidden"
                ref={input}
                required={required}
                accept={accept}
                onChange={(event) => {
                    const selected = event.target.files[0];

                    if (selected) {
                        if (selected.size > maxSize) {
                            return setErrorMessage(
                                `File terlalu besar (maksimal ${
                                    maxSize / 1024 / 1024
                                }MB)`
                            );
                        }

                        if (
                            !accept
                                .split(",")
                                .some((type) =>
                                    selected.type.includes(
                                        type.replace(".", "/")
                                    )
                                )
                        ) {
                            return setErrorMessage(
                                `Format file tidak didukung (harus ${accept})`
                            );
                        }

                        setErrorMessage(null);
                        return handleChange(event);
                    }
                }}
            />
            <div
                className={
                    `relative border border-gray-300 focus:border-indigo-500  focus:ring-indigo-500  rounded-md shadow-inner ` +
                    className
                }
            >
                <label
                    htmlFor={name}
                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer overflow-hidden rounded-md"
                >
                    {previewUrl ? (
                        <>
                            <div className="absolute p-4 h-full w-full justify-center flex flex-col">
                                <div className="p-2 rounded-md w-full hover:shadow-xl backdrop-blur-sm bg-gray-800/50 flex flex-col items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-8 h-8 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>

                                    <p className="text-xs font-light text-center text-white">
                                        Klik Untuk Ubah Gambar
                                    </p>
                                </div>
                            </div>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="rounded-md"
                            />
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-indigo-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>

                            <p className="text-xs font-light text-center text-gray-500">
                                Klik Untuk Upload Gambar
                            </p>
                        </>
                    )}

                    <InputError
                        message={errorMessage}
                        className="absolute top-0 bg-white rounded-md text-center"
                    />
                </label>
            </div>
        </div>
    );
});
