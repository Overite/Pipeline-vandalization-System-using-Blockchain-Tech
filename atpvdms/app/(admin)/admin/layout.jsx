import Header from "@/components/layout/header"

export default function Admin_Layout({ children }) {
    return (
        <div className="w-full h-[100vh] grid grid-rows-[54px_auto]">
            <Header />
            {children}
        </div>
    )
}