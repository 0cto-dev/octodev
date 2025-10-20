'use client'

import Editor, { OnChange } from "@monaco-editor/react";
import { useEffect, useState } from "react";

type MonacoEditorProps = {
  value: string;
  language: string;
  onChange?: OnChange | undefined;
  theme?: string;
}

export default function MonacoEditor({
  value,
  language,
  onChange,
  theme = "vs-dark",
}: MonacoEditorProps) {
  return (
    <Editor
      height="500px"
      language={language}
      value={value}
      onChange={onChange}
      theme={theme}
    />
  );
}