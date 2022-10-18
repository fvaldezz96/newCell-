import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { allUser } from "../../redux/actions";
import { BsCartFill, BsStarFill, BsFillPhoneFill, BsCardChecklist } from 'react-icons/bs';
import { AiOutlineUpload } from 'react-icons/ai';
import { AiOutlineUserAdd } from "react-icons/ai"
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css'
import Image from '../../image/logoConectCell.png';
//LOGIN
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../Login/LoginButton";
import LogoutButton from '../Logout/LogoutButton';
import { useNavigate } from "react-router-dom"
//LOGIN
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'


export default function NavBar() {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)
  const [dropdown1, setDropdown1] = useState(false)
  const dispatch = useDispatch()
  const allUsers = useSelector(state => state.allUser);
  const { user, isAuthenticated, logout } = useAuth0()
  const usuarios = allUsers
  const emailAuth0 = email()
  const gmail = filterEmail()
  // console.log(usuarios)
  // console.log(emailAuth0)
  // console.log(gmail)
  // const userdata = data()
  // console.log(usuarios)
  // console.log(isAuthenticated)

  //  user
  localStorage.setItem('user', JSON.stringify(usuarios))



  // const filterEmail=usuarios.filter(e=>e.email==="nahirarroyo@gmail.com")
  function filterEmail() {
    if (isAuthenticated && usuarios.length) {
      return usuarios.filter(e => e.email === emailAuth0)
    }
  }

  // function role() {
  //   if (!gmail === undefined) {
  //     return gmail[0].role
  //   }
  // }

  function email() {
    if (isAuthenticated) {
      return user.email
    }
  }
  // function data(){
  //   let obj={}
  //   if(isAuthenticated){
  //     obj={
  //       name:user.name,
  //       image:user.picture,
  //       email:user.email
  //     }
  //   }
  //   return obj
  // }

  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown)
  }
  const abrirCerrarDropdown1 = () => {
    setDropdown1(!dropdown1)
  }
  const userlist = () => {
    navigate('/panelUsers')
  }
  const celllist = () => {
    navigate('/panelCells')
  }
  const orderlist = () => {
    navigate('/panelorders')
  }
  const userIr = () => {
    navigate('/Profile')
  }
  const orderList = () => {
    navigate('panelOrders')
  }
  //  function hola(){
  //   navigate('/postUser')
  //  }

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch])

  return (
    <nav className='NavBar m-0 p-0 sticky-top bg-dark'>
      <div className="containerNavBar container-fluid justify-content-around m-0 p-0">
        <div className="navbar-nav hstack gap-3 NavBar-Item">
          <div className="logoStyle">
            <Link to='/home'>
              <img src={Image} alt="#" width={"110px"} height={"85px"} />
            </Link>
          </div>
          <SearchBar />
          <Link to='/home' className="nav-link"><BsFillPhoneFill className='NavBarIcon' /></Link>
          <Link to='/favorites' className="nav-link"><BsStarFill className='NavBarIcon' /></Link>
          <Link to='/cart' className="nav-link"><BsCartFill className='NavBarIcon' /></Link>
          {
            isAuthenticated && gmail !== undefined && gmail[0] && gmail[0].role !== "Cliente"
              ? <Link to='/create' className="nav-link"><AiOutlineUpload className='NavBarIcon' /></Link>
              : null
          }
          {/* {isAuthenticated ? <Link to={'Profile/'} className='nav-link'><AiOutlineUserAdd className='NavBarIcon' /></Link> : null} */}

          {isAuthenticated && gmail !== undefined && gmail[0] ? <Link to={`orders/${gmail[0].id}`} className='nav-link'><BsCardChecklist className='NavBarIcon' /></Link> : null}

          <div className="navbar-nav hstack gap-3 NavBar-Item">
            {isAuthenticated
              //  ? <Link to={'Profile/'} className='nav-link'><AiOutlineUserAdd className='NavBarIcon' /></Link> 
              ? <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} size='sm'>
                <DropdownToggle caret>
                  <img className="ProfileImg" src={gmail !== undefined && gmail[0] ? gmail[0].image : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={userIr}>Perfil</DropdownItem>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              : <LoginButton />
            }

            {
              isAuthenticated && gmail !== undefined

                ? (!gmail[0] ?
                  <Link to='/postUser'>
                    <button type="button" className="btn btn-outline-danger">Complete your user information</button>
                  </Link>
                  : null
                )
                : null

            }
            {
              isAuthenticated && gmail === undefined

                ? (

                  <Link to='/postUser'>
                    <button type="button" className="btn btn-outline-danger">Complete sus datos de usuario</button>
                  </Link>

                )

                : null
            }


            <br></br>
            {
              isAuthenticated && gmail !== undefined && gmail[0] && gmail[0].role === "Administrador"
                ? <Dropdown isOpen={dropdown1} toggle={abrirCerrarDropdown1} size='sm'>
                  <DropdownToggle caret>
                    Admin Panel
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={userlist}>User list</DropdownItem>
                    <DropdownItem onClick={celllist}>Cell list</DropdownItem>
                    <DropdownItem onClick={orderList}>Order list</DropdownItem>

                  </DropdownMenu>
                </Dropdown>
                : null
            }
            {/* <button onClick={hola}>user</button> */}
          </div>
        </div>
      </div>
    </nav >
  )
}