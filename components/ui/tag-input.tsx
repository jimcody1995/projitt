import { useState } from "react";

/**
 * TagInput component allows users to input and manage a dynamic list of tags.
 * 
 * @param tags - An array of current tags
 * @param setTags - A callback function to update the tags array
 * @returns JSX.Element
 */
export default function TagInput({
    tags,
    setTags,
}: {
    tags: string[];
    setTags: (tags: string[]) => void;
}): JSX.Element {
    const [inputValue, setInputValue] = useState("");

    /**
     * Handles keyboard input events for the tag input field.
     * - Adds a new tag on 'Enter' if it doesn't already exist.
     * - Removes the last tag on 'Backspace' if input is empty.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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

    /**
     * Removes a tag at the specified index.
     * 
     * @param index - The index of the tag to remove
     */
    const removeTag = (index: number): void => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div
            id="tag-input-wrapper"
            data-testid="tag-input-wrapper"
            className="p-[16px] border border-[#bcbcbc] rounded-[10px] w-full flex flex-wrap gap-[10px]"
        >
            {/* Render each tag with a remove button */}
            {tags.map((tag, index) => (
                <div
                    key={index}
                    id={`tag-${index}`}
                    data-testid={`tag-${index}`}
                    className="flex items-center bg-[#d6eeec] text-[#0d978b] px-3 py-1 rounded-full"
                >
                    <span id={`tag-label-${index}`} data-testid={`tag-label-${index}`}>
                        {tag}
                    </span>
                    <button
                        id={`remove-tag-${index}`}
                        data-testid={`remove-tag-${index}`}
                        onClick={() => removeTag(index)}
                        className="ml-2 focus:outline-none"
                        aria-label={`Remove ${tag}`}
                    >
                        ×
                    </button>
                </div>
            ))}

            {/* Input field for new tags */}
            <input
                id="tag-input-field"
                data-testid="tag-input-field"
                className="flex-grow min-w-[100px] outline-none text-gray-700"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill..."
                aria-label="Add a skill"
            />
        </div>
    );
}
