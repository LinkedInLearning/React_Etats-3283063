const List = ({ items, check, styles }) => {
  return (
    <ul>
      {items.map((item) => (
        <li
          style={item.done ? styles.item_done : {}}
          onClick={() => check(item.id)}
        >
          {item.task}
        </li>
      ))}
    </ul>
  );
};
export default List;
