
import { Button } from "@/components/ui/button";
import ShadowCardGrid from "@/components/homepage/ShadowCardGrid";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>UiXplore</title>
            </Head>
            <main className={`main-border-around `}>
                <div className="container py-8 text-center justify-center">
                    <h1 className="text-5xl font-bold">The Largest Library of <br />Open-Source UI</h1>
                    <p className="text-center">Community-built library of UI elements. Copy as HTML/CSS, Tailwind, React and Figma.</p>
                </div>
                <ShadowCardGrid />
            </main>
        </>
    );
}

