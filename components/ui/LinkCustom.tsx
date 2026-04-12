import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type LinkCustomProps = {
    variant?: "link" | "corporativo" | "contraste";
    className?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

const variantStyles: Record<string, string> = {
    link: "text-white hover:text-corporative",
    corporative: "p-2 bg-corporative text-white block w-fit transition-all hover:bg-white hover:text-black",
    contrast: "p-2 bg-white text-black block w-fit transition-all hover:bg-corporative hover:text-white",
};

const LinkCustom: React.FC<PropsWithChildren<LinkCustomProps>> = ({
    variant = "link",
    className = "",
    children,
    ...props
}) => {
    return (
        <Link
            className={clsx(
                "transition-colors duration-200",
                variantStyles[variant],
                className
            )}
            href={props.href}
            {...props}
        >
            {children}
        </Link>
    );
};

export default LinkCustom;