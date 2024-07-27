import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, getOrdersUser } from "../../redux/actions";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import NothingFound from "../../components/NothingFound/NothingFound";
import "./DetailOrder.css";

const DetailOrder = () => {

    const dispatch = useDispatch();

    const { id, id_User } = useParams();
    // const { id_User } = useParams();
    const orders = useSelector((state) => state.orders)
    const isLoading = useSelector(state => state.isLoading);


    useEffect(() => {
        dispatch(getOrderById(id))
        dispatch(getOrdersUser(id_User))
    }, [dispatch, id, id_User])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id_Orders} className="conteiner-card-order">
                            <div className="subcontainer01-order">
                                <div className="title-order-detail">
                                    <h1>Order Detail</h1>
                                </div>
                                {order.userMail ? (
                                    <div>
                                        <br /><br />
                                        <div className="group-container-order">
                                            <p className="variable-order">Status:</p>
                                            {order.status === "Realizado" ? (
                                                <p className="datoTerminado-detail">{order.status}</p>
                                            ) : (
                                                <p className={
                                                    order.status === "Pendiente"
                                                        ? "datoPendiente-detail"
                                                        : "datoCancelado-detail"
                                                }>
                                                    {order.status}
                                                </p>
                                            )}
                                        </div>

                                        <div className="group-container-order">
                                            <p className="variable-order">ID:</p>
                                            <p className="value-order">{order.id_Orders}</p>
                                        </div>

                                        <div className="group-container-order">
                                            <p className="variable-order">Date:</p>
                                            <p className="value-order">{order.date}</p>
                                        </div>

                                        <div className="group-container-order">
                                            <p className="variable-order">User Email:</p>
                                            <p className="value-order">{order.userMail}</p>
                                        </div>

                                        {/* <div className="group-container-order">
                                            <p className="variable-order">User Name:</p>
                                            <p className="value-order">{order.user.name}</p>
                                        </div> */}

                                        <div className="group-container-order">
                                            <p className="variable-order">Payment:</p>
                                            <p className="value-order">{order.payment}</p>
                                        </div>

                                        <br />
                                        <div className="group-container-order">
                                            <p className="variable-order">Total:</p>
                                            <p className="value-total-order">$ {parseFloat(order.subTotal).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <Loading />
                                )}
                            </div>
                            <div className="container-cells-order">
                                {order.cells && order.cells.length > 0 ? (
                                    order.cells.map((c) => (
                                        <div key={c.id} className="cell-card-order">
                                            <figure className="card-order">
                                                <div className="imgCard">
                                                    <img src={c.image} alt="imagen" />
                                                </div>
                                                <div className="name-cell-order">
                                                    <figcaption>{c.model}</figcaption>
                                                </div>
                                                <div className="price-cell-order">
                                                    <figcaption>{c.price ? `$ ${c.price}` : null}</figcaption>
                                                </div>
                                            </figure>
                                        </div>
                                    ))
                                ) : (
                                    <div>has no items selected!</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <NothingFound />
                )
            )}
        </div>
    )
}

export default DetailOrder;