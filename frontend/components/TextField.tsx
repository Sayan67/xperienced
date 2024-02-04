
export default function TextField(
    { name, placeholder, isMandatory, value = "", onChange, className = "", ...props }
    : 
    { 
        name: string, 
        placeholder?: string, 
        isMandatory: boolean, 
        value?: string,
        onChange?: Function,  
        className?: string,
}) {
    return (
        <label className="font-primary">
            <div className="mb-2">
                {name}
                {
                    isMandatory && <b className="text-blue-600">*</b>
                }
            </div>
            <input placeholder={placeholder || ""}
                onChange={(e) => onChange && onChange(e)}
                defaultValue={value}
                className="px-4 py-2 bg-neutral-100 border-neutral-300 border-[1px] border-solid rounded outline-none w-full"
                {...props}
            ></input>
        </label>
    )
}