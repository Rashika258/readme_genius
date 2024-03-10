/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface SortableItemProps {
  id: string;
  setFocusedSectionSlug: Function;
  onDeleteSection: Function;
  onResetSection: Function;
  section: {
    slug: string;
    name: string;
  };
  focusesSectionSlug: string;
}

export function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const [transformState, setTransformState] = useState(transform);

  const style = {
    transform: CSS.Transform.toString(transformState),
    transition,
  };

  const onClickSection = () => {
    localStorage.setItem("current-focused-ring", props.id);
    props.setFocusedSectionSlug(props.id);
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === "enter") {
      onClickSection();
    }
  };

  const onClickTrash = (e: React.MouseEvent) => {
    props.onDeleteSection(e, props.section.slug);
  };

  const onClickReset = (e: React.MouseEvent) => {
    const sectionResetConfirmed = window.confirm(
      "This section will be reset to default template; to continue, click OK"
    );
    if (sectionResetConfirmed === true) {
      props.onResetSection(e, props.section.slug);
    }
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onClickSection}
      onKeyUp={onKeyUp}
      className={`bg-white shadow rounded-md pl-1 pr-14 py-2 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 relative select-none ${
        props.section.slug === props.focusesSectionSlug ? "ring-2 ring-green-400" : ""
      }`}
    >
      <button
        type="button"
        className="mr-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
        {...listeners}
      >
        <img 
        className="w-5 h-5"
         src="drag.svg" alt="drag-icon" />
      </button>
      <p>{props.section.name}</p>
      {props.section.slug === props.focusesSectionSlug && (
        <>
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 absolute right-8"
            type="button"
            onClick={onClickReset}
          >
            <img className="w-auto h-5" src="reset.svg" alt="reset-icon" />
          </button>
          <button
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 absolute right-2"
            type="button"
            onClick={onClickTrash}
          >
            <img className="w-auto h-5" src="trash.svg" alt="trash-icon" />
          </button>
        </>
      )}
    </li>
  );
}
