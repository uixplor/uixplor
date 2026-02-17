
import { Button } from "@/components/ui/button";
import ShadowCardGrid from "@/components/homepage/ShadowCardGrid";
import Head from "next/head";
import Home from "./Home/home";

export default function Index() {
    return (
        <>
            <Head>
                <title>UiXplor</title>
            </Head>
            <Home />

        </>
    );
}

