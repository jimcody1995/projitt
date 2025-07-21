import { useState } from "react";

export default function TagInput({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: (tags: string[]) => void;
}) {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
                setInputValue("");
            }
        } else if (e.key === "Backspace" && inputValue === "") {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="p-[16px] border border-[#bcbcbc] rounded-[10px] w-full flex flex-wrap gap-[10px]">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex items-center bg-[#d6eeec] text-[#0d978b] px-3 py-1 rounded-full"
                >
                    <span>{tag}</span>
                    <button
                        onClick={() => removeTag(index)}
                        className="ml-2 focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            ))}
            <input
                className="flex-grow min-w-[100px] outline-none text-gray-700"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill..."
            />
        </div>
    );
}
