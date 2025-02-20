"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxProps {
    source: MDXRemoteSerializeResult;
}

export default function Mdx({ source }: MdxProps) {
    return <MDXRemote {...source} />;
}
