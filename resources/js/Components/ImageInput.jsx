import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function ImageInput(
    {
        name,
        id,
        className,
        required,
        handleChange,
        accept = ".jpg,.jpeg,.png",
        maxSize = 5 * 1024 * 1024, // in bytes
    },
    ref
) {
    const input = ref ? ref : useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const handleFileChange = (event) => {
        const selected = event.target.files[0];
        
        if (selected) {
            if (selected.size > maxSize) {
                setErrorMessage(
                    `File terlalu besar (maksimal ${maxSize / 1024 / 1024}MB)`
                );
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }

            if (
                !accept
                    .split(",")
                    .some((type) =>
                        selected.type.includes(type.replace(".", "/"))
                    )
            ) {
                setErrorMessage(`Format file tidak didukung (harus ${accept})`);
                setSelectedFile(null);
                setPreviewUrl(null);
                return;
            }

            setSelectedFile(selected);
            setErrorMessage(null);
        } else {
            setSelectedFile(null);
            setErrorMessage(null);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <input
                type="file"
                name={name}
                id={id}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm` +
                    className
                }
                ref={input}
                required={required}
                accept={accept}
                onChange={handleFileChange}
            />
            {previewUrl && (
                <div className="mt-2">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-full h-auto"
                    />
                </div>
            )}
            {errorMessage && (
                <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
});
