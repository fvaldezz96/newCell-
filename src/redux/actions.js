import axios from "axios";

export const RUTA_ID = "/celulares/home/"
export const GET_ADMIN = "GET_ADMIN";
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_QUESTION = "GET_ALL_QUESTION";
export const GET_ALL_RATING = "GET_ALL_RATING";
export const ACTIVE_LOADING = "ACTIVE_LOADING";
export const CELL_DETAIL = "CELL_DETAIL"
export const POST_PRODUCT = "POST_PRODUCT";
export const POST_QUESTION = "POST_QUESTION";
export const CREATE_RATING = "CREATE_RATING";
export const PUT_QUESTION = "PUT_QUESTION";
export const PUT_CELL = "PUT_CELL";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const PUT_USERS = "PUT_USERS";
export const GET_USER_CART = "GET_USER_CART"
export const RUTA_USER = "/users"
export const POST_USER = "POST USER"
export const ALL_USER = "ALL USER"
export const RUTA_USER_ID = "/users/id/"
export const USER_ID = "USER ID"
export const DELETE_FOR_CART = "DELETE_FOR_CART"
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const PUT_ORDERS = "PUT_ORDERS";
export const GET_ORDER_ID = "GET_ORDER_ID";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const GET_REVIEW_BOOLEAN = "GET_REVIEW_BOOLEAN"




export const getAllProducts = () => {
   return async function (dispatch) {
      const products = await axios('/celulares/home');
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: products.data
      })
   }
}


export const getFilteredProducts = (payload) => {
   return async function (dispatch) {
      const products = await axios(`/celulares/home?${payload}`);
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: products.data
      });
   };
};

export const activeLoading = () => {
   return function (dispatch) {
      return dispatch({
         type: ACTIVE_LOADING
      });
   };
}


//CELL_DETAIL
export function cellDetail(id) {
   return async function (dispatch) {
      try {
         var cellDetail = await axios.get(RUTA_ID + id)
         return dispatch({
            type: CELL_DETAIL,
            payload: cellDetail.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}


export function cleanStatus(payload) {
   return {
      type: "clean estado",
      payload
   }
}


//POST USER
export function postUser(user) {
   return async function (dispatch) {
      return await axios.post(RUTA_USER, user)
         .then((response) => {
            dispatch({
               type: POST_USER,
               payload: response.data
            })
         })
   }
}

//GET USER
export function allUser() {
   return async function (dispatch) {
      const allUser = (await axios(RUTA_USER)).data
      console.log("estoy en el dispatch", allUser);
      if (allUser.message === "No users") {
         return dispatch({
            type: ALL_USER,
            payload: []
         })
      }

      return dispatch({
         type: ALL_USER,
         payload: allUser
      })
   }

}

//GET RATING 
export const getAllRating = (id) => {
   return async function (dispatch) {
      const allRating = await axios.get(`/rating/k/${id}`)
      return dispatch({
         type: GET_ALL_RATING,
         payload: allRating.data
      })
   }
}

//GET USER
export const getAllBrands = () => {
   return async function (dispatch) {
      const products = await axios('/marcas');

      return dispatch({
         type: GET_ALL_BRANDS,
         payload: products.data
      });
   };
};

export function createPost(product) {
   return async function (dispatch) {
      return await axios
         .post("/celulares", product)
         .then((response) => {
            dispatch({
               type: POST_PRODUCT,
               payload: response.data,
            });
         });
   };
}
//USER ID
export function userId(id) {
   return async function (dispatch) {
      try {
         var userId = await axios.get(RUTA_USER_ID + id)
         return dispatch({
            type: USER_ID,
            payload: userId.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}
//USER ID

export function createQuestion(question) {
   return async function (dispatch) {
      return await axios.post(`/questions/${question.id}`, question)
         .then((response) => {
            dispatch({
               type: POST_QUESTION,
               payload: response.data,
            });
         });
   };
}

export function getRole(email) {
   return async function (dispatch) {
      try {
         var admin = await axios.get(`/questions/role/${email}`)
         return dispatch({
            type: GET_ADMIN,
            payload: admin.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}

export function createAnswer(a) {
   return async function (dispatch) {
      return await axios
         .put(`/questions/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_QUESTION,
               payload: response.data,
            });
         });
   };
}

export function putCell(a) {
   return async function (dispatch) {
      return await axios
         .put(`/celulares/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_CELL,
               payload: response.data,
            });
         });
   };
}

export const getAllUsers = () => {
   return async function (dispatch) {
      const users = await axios('/users/admin');
      return dispatch({
         type: GET_ALL_USERS,
         payload: users.data
      });
   };
};

export function putUser(a) {
   return async function (dispatch) {
      return await axios
         .put(`/users/${a.id}`, a)
         .then((response) => {
            dispatch({
               type: PUT_USERS,
               payload: response.data,
            });
         });
   };
}

export function updateProduct(id, payload) {
   return function () {
      axios.put(`/celulares/${id}`, payload)
   }
}

// export function postRating(id){
//    return function(){
//       axios.post("/celulares",rating)
//    }
// }


export const getFiltersProductsAdmin = (filters) => {
   return async function (dispatch) {
      const p = await axios(`/celulares/panel/?${filters}`);
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: p.data
      });
   };
};

export const getUserCart = (email) => {
   return async function (dispatch) {
      try {
         const user = (await axios.get('/users/getByEmail/' + email)).data
         let localCart = JSON.parse(localStorage.getItem('cartList'))
         if (localCart) {
            await axios.post('/cart', { userId: user.id, phoneId: localCart.map(e => e.id) })
            localStorage.removeItem('cartList');
         }
         let cart = (await axios.get('/cart/' + user.id)).data

         return dispatch({
            type: GET_USER_CART,
            payload: cart.map(e => { return { ...e, quantity: 1 } })
         });
      } catch (err) {
         console.log(err)
         return dispatch({
            type: GET_USER_CART,
            payload: []
         });
      }
   };
};

export const deleteFromCart = (email, id) => {
   return async function (dispatch) {
      try {
         const user = (await axios.get('/users/getByEmail/' + email)).data
         await axios.delete('/cart', { data: { userId: user.id, phoneId: id } })
      } catch (err) {
         console.log(err)
      }
   };
};

export function deleteItemFromCart(id) {
   return {
      type: DELETE_FOR_CART,
      payload: id
   }
}

export const getAllProductsAdmin = () => {
   return async function (dispatch) {
      const p = await axios(`/celulares/panel`);
      return dispatch({
         type: GET_ALL_PRODUCTS,
         payload: p.data
      });
   };
};

export const getAllOrders = () => {
   return async function (dispatch) {
      const orders = await axios('/orders');
      return dispatch({
         type: GET_ALL_ORDERS,
         payload: orders.data
      });
   };
};

export function putOrder(a) {
   return async function (dispatch) {
      return await axios
         .put(`/orders/${a.id_Orders}`, a)
         .then((response) => {
            dispatch({
               type: PUT_ORDERS,
               payload: response.data,
            });
         });
   };
}

export const getFiltersUsersAdmin = (filters) => {
   return async function (dispatch) {
      const u = await axios(`/users/admin/?${filters}`);
      return dispatch({
         type: GET_ALL_USERS,
         payload: u.data
      });
   };
};

export const getFiltersOrdersAdmin = (filters) => {
   return async function (dispatch) {
      const orders = await axios(`/orders/?${filters}`);
      return dispatch({
         type: GET_ALL_ORDERS,
         payload: orders.data
      });
   };
};

export function getOrderById(id) {
   return async function (dispatch) {
      try {
         var orde = await axios.get("/orders/id/" + id)
         return dispatch({
            type: GET_ORDER_ID,
            payload: orde.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}


export function getOrdersUser(id) {
   return async function (dispatch) {
      try {
         var orde = await axios.get("/orders/user/" + id)
         return dispatch({
            type: GET_ORDER_ID,
            payload: orde.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}
export function changeQuantity(id, quantity) {
   return async function (dispatch) {
      return dispatch({
         type: UPDATE_QUANTITY,
         payload: { id, quantity }
      })
   }
}

export function getRolesRating(email, cellId) {
   console.log(email,cellId, 'soy lo que llega a la action')
   return async function (dispatch) {
      try {
         var rating = await axios.get(`/rating/role/?em=${email}&cellId=${cellId}`)
         console.log(rating,'soy lo que llega del back')
         return dispatch({
            type: GET_REVIEW_BOOLEAN,
            payload: rating.data
         })
      } catch (error) {
         console.log(error)
      }
   }
}