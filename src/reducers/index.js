//En este index se unen y se pasan como un objeto con el combine reducer, todos los reducer de cada componente
import { combineReducers } from "redux";
import productosReducer from "./productosReducer";

export default combineReducers({
  productos: productosReducer,
});
