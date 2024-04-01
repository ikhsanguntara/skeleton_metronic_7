import React, { useState } from "react";
import { render } from "react-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

// Buat komponen item yang dapat diurutkan
const SortableItem = SortableElement(({ value }) => (
  <li style={{ cursor: "pointer" }}>{value}</li>
));

// Buat komponen container untuk daftar item yang dapat diurutkan
const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

// Fungsi untuk mengganti urutan item dalam array
const moveItem = (array, fromIndex, toIndex) => {
  const newArray = [...array];
  const removedItem = newArray.splice(fromIndex, 1)[0];
  newArray.splice(toIndex, 0, removedItem);
  return newArray;
};

// Komponen utama App
export const MyPage = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  // Fungsi untuk menangani perubahan urutan item
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(moveItem(items, oldIndex, newIndex));
  };

  return (
    <div>
      <h2>React Sortable List</h2>
      <SortableList items={items} onSortEnd={onSortEnd} />
    </div>
  );
};

render(<MyPage />, document.getElementById('root'));
