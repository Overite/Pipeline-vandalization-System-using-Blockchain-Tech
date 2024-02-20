export default function Container({ children, className }) {
    return (
        <div className={`max-sm:w-[98%] w-[95%] h-full mx-auto ${className}`}>
            {children}
        </div>
    )
}