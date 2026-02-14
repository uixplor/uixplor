import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";

export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="web-layout">
            <Header/>
            {children}
             <Footer/>
        </div>
    );
}

