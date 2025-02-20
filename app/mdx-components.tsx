import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1
                style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#1a202c",
                }}
            >
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#2d3748",
                }}
            >
                {children}
            </h2>
        ),
        p: ({ children }) => (
            <p
                style={{
                    fontSize: "18px",
                    color: "#4a5568",
                    lineHeight: "1.6",
                }}
            >
                {children}
            </p>
        ),
        img: (props) => (
            <Image
                {...(props as ImageProps)}
                style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                width={200}
                height={200}
                alt={props.alt || ""}
            />
        ),
        ul: ({ children }) => (
            <ul
                style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    color: "#4a5568",
                }}
            >
                {children}
            </ul>
        ),
        li: ({ children }) => (
            <li style={{ marginLeft: "16px" }}>{children}</li>
        ),
        blockquote: ({ children }) => (
            <blockquote
                style={{
                    borderLeft: "4px solid #718096",
                    paddingLeft: "16px",
                    fontStyle: "italic",
                    color: "#718096",
                }}
            >
                {children}
            </blockquote>
        ),
        ...components,
    };
}
