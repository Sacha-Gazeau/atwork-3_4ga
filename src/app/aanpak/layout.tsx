
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aanpak",
};

export default function AanpakLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
