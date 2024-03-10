import useDeviceDetect from "@/hooks/useDeviceDetect";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";

interface Section {
  slug: string;
  markdown: string;
}

interface EditorColumnProps {
  focusedSectionSlug: string;
  templates: Section[];
  setTemplates: React.Dispatch<React.SetStateAction<Section[]>>;
  theme: string;
  setToggleState: React.Dispatch<React.SetStateAction<{ theme: string; img: string }>>;
}

export const EditorColumn: React.FC<EditorColumnProps> = ({
  focusedSectionSlug,
  templates,
  setTemplates,
  theme,
  setToggleState,
}) => {
  const { t } = useTranslation("editor");

  const getMarkdown = (): string => {
    const section = templates.find((s) => s.slug === focusedSectionSlug);
    return section ? section.markdown : "";
  };

  const [markdown, setMarkdown] = useState<string>(getMarkdown());
  const [isFocused, setFocus] = useState<boolean>(false);

  const { isMobile } = useDeviceDetect();
  const [MonacoEditor, setMonacoEditor] = useState< Monaco | null>(null);
  const { saveBackup } = useLocalStorage();

  const monacoEditorRef = useRef<Monaco | null>(null);
  const textEditorRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorDidMount = (editor: any | null) => {
    monacoEditorRef.current = editor;
    setEditorColorThemeFromLocalStorage();
  };

  const setEditorColorThemeFromLocalStorage = () => {
    if (localStorage.getItem("editor-color-theme") === "light") {
      setToggleState({ theme: "light", img: "toggle_moon.svg" });
    }
  };

  const onEdit = (val: string) => {
    setMarkdown(val);
    const newTemplates = templates.map((template) => {
      if (template.slug === focusedSectionSlug) {
        return { ...template, markdown: val };
      }
      return template;
    });
    setTemplates(newTemplates);
    saveBackup(newTemplates);
  };

  useEffect(() => {
    if (!isMobile && !MonacoEditor) {
      import("@monaco-editor/react").then((EditorComp) => setMonacoEditor(EditorComp.default));
    }
  }, [MonacoEditor, isMobile, setMonacoEditor]);

  useEffect(() => {
    const markdown = getMarkdown();
    setMarkdown(markdown);
  }, [focusedSectionSlug, templates]);

  return (
    <>
      {focusedSectionSlug === "noEdit" ? (
        <p className="font-sm text-green-500 max-w-[28rem] text-center mx-auto mt-10">
          {t("editor-select")}
        </p>
      ) : isMobile ? (
        <textarea
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={textEditorRef}
          onChange={(e) => onEdit(e.target.value)}
          value={markdown}
          className={`full-screen rounded-sm border border-gray-500 w-full p-6 resize-none ${
            theme === "vs-dark" ? "bg-gray-800 text-white" : ""
          }`}
        />
      ) : (
        MonacoEditor && (
          <MonacoEditor
            onMount={handleEditorDidMount}
            wrapperClassName="rounded-sm border border-gray-500"
            className="full-screen"
            theme={theme}
            language="markdown"
            value={markdown}
            onChange={onEdit}
            loading={"Loading..."}
            aria-label="Markdown Editor"
            options={{
              minimap: {
                enabled: false,
              },
              lineNumbers: false,
            }}
          />
        )
      )}
    </>
  );
};
