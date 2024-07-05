import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import ReactStars from 'react-stars';
import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from "react-redux";
import { getRatingCheck, getRolesRating } from "../../redux/actions";


const Ratings = ({ cellId, r, get }) => {

   const dispatch = useDispatch();
   const { user, isAuthenticated } = useAuth0();
   const ratingRol = useSelector((state) => state.rating);
   const ratingCheck = useSelector((state) => state.ratingCheck);
   // console.log('RATING ROL ACTION', ratingRol);
   const [rating, setRating] = useState({
      id: cellId,
      rating: 0,
      comment: "",
      emailUser: ""
   });

   const ratingChanged = (newRating) => {
      setRating({
         ...rating,
         rating: newRating,
         emailUser: user.email
      });
   }

   const handleChange = (e) => {
      e.preventDefault()
      const { name, value } = e.target
      setRating({
         ...rating,
         [name]: value
      });
   }

   const createRating = async (e) => {
      e.preventDefault()
      if (Object.keys(rating).length > 0) {
         await axios.post(`/rating/${cellId}`, rating);
         toast.success(`rating sent!!`);
         setRating({
            rating: 0,
            comment: "",
            emailUser: ""
         })
         get();
      }
   }

   useEffect(() => {
      if (isAuthenticated && user && user.email && cellId) {
         dispatch(getRolesRating(user.email, cellId));
         dispatch(getRatingCheck(user.email, cellId));
      }
   }, [dispatch, r, isAuthenticated, user, cellId])

   return (
      <div>
         {isAuthenticated ?
            <form style={styles.container} onSubmit={(e) => createRating(e)}>
               <div style={styles.stars}>
                  {ratingRol && ratingCheck ? (
                     <div>
                        <h2>Rate the product!</h2>
                        <ReactStars
                           count={5}
                           value={rating.rating}
                           onChange={ratingChanged}
                           size={40}
                           half={false}
                           edit={true}
                           color2={'#ffd700'} />
                        <textarea
                           type="text"
                           name="comment"
                           value={rating.comment}
                           onChange={(e) => handleChange(e)}
                           placeholder="What's your experience?"
                           style={styles.textarea}
                        />
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                     </div>
                  ) :
                     <p>No has comprado el producto, no puedes clasificarlo!</p>
                  }
               </div>
            </form>
            : ""
         }
         <Toaster
            position="button-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
               className: '',
               duration: 5000,
               style: {
                  background: '#363636',
                  color: '#fff',
               },
               success: {
                  duration: 3000,
                  theme: {
                     primary: 'green',
                     secondary: 'black',
                  },
               },
            }}
         />
      </div>
   )
}

const styles = {
   container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
   },
   stars: {
      display: "flex",
      flexDirection: "row",
   },
   textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300
   },
   button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
   }
};

export default Ratings;