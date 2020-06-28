import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Actions de redux
import { crearNuevoProductoAction } from "../actions/productosAction";
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from "../actions/alertaAction";

const NuevoProductos = ({ history }) => {
  //State del componente, como no fluye a otros componentes puedo usar simplemente useState
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //Guardo el useDispatch para poder llamar la funcion del action
  const dispatch = useDispatch();

  //Creo una nueva funcion de callback para ir a buscar la funcion del action con el dispatch
  //en el callback paso los datos que envio como objeto cuando uso la funcion mas abajo
  //asi pasa al dispactch y este permite pasarlo como parametro al action
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //Cuando el usuario haga submit en un nuevo Producto
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //Validar form
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlertaAction(alerta));
      return;
    }
    //Si no hay errores

    dispatch(ocultarAlertaAction());

    //crear el nuevo Producto con la funcion que llama a la funcion del action
    agregarProducto({
      nombre,
      precio,
    });

    //Redireccionar
    history.push(`/`);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-wight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProductos;
