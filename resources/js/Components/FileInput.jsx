import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function FileInput(
    {
        name,
        id,
        value,
        className,
        required,
        isFocused,
        handleChange,
        placeholder = "",
        acceptedFileTypes = "image/*",
        maxFileSize = 5000000, // 5MB
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    function handleFileChange(event) {
        const file = event.target.files[0]; // Check file type
        const allowedTypes = acceptedFileTypes.split(",");
        const fileType = file.type;
        const isFileTypeAllowed = allowedTypes.some(
            (type) => fileType === type
        );
        if (!isFileTypeAllowed) {
            alert(`Only ${acceptedFileTypes} files are allowed.`);
            return;
        }

        // Check file size
        const fileSize = file.size;
        if (fileSize > maxFileSize) {
            alert(`File size must be less than ${maxFileSize / 1000000} MB.`);
            return;
        }

        // Pass the file to the handleChange function
        handleChange(file);
    }

    return (
        <div className="flex flex-col items-start">
            <input
                type="file"
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm` +
                    className
                }
                ref={input}
                required={required}
                onChange={handleFileChange}
                accept={acceptedFileTypes}
            />
        </div>
    );
});
