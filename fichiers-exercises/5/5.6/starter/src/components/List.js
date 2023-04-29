import { useSelector, useDispatch } from "react-redux";
import { check } from "../redux/reducer";
const List = ({ styles }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.checklist);
  return (
    <ul>
      {items.map((item) => (
        <li
          style={item.done ? styles.item_done : {}}
          onClick={() => dispatch(check(item.id))}
        >
          {item.task}
        </li>
      ))}
    </ul>
  );
};
export default List;
