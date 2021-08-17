import React, { useCallback, useMemo, useState } from 'react';

// Import the Slate editor factory.
import { createEditor, Descendant, Editor, Node, Range, Text, Transforms } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';

import './SlateTextArea.scss';

// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = { type: 'paragraph' | 'code'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

//@ts-expect-error
const CodeElement = (props) => {
  console.log({ props });
  return <pre {...props.attributes}>{props.children}</pre>;
};

//@ts-expect-error
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export const SlateTextArea = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);
  console.log({ value });
  const renderElement = useCallback((props) => {
    console.log(props.element.type);
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className='slate-container'>
      <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
        <Editable
          renderElement={renderElement}
          // Pass in the `renderLeaf` function.
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }
            console.log(event.key);
            switch (event.key) {
              // When "`" is pressed, keep our existing code block logic.
              case '`': {
                event.preventDefault();
                const [match] = Editor.nodes(editor, {
                  //@ts-expect-error
                  match: (n) => n.type === 'code',
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: (n) => Editor.isBlock(editor, n) },
                );
                break;
              }

              case 'b': {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  // @ts-expect-error
                  { bold: true },
                  { match: (n) => Text.isText(n), split: true },
                );
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

//@ts-expect-error
const Leaf = (props) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  );
};
