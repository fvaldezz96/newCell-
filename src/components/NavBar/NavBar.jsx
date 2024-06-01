import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from 'react';
import { allUser } from "../../redux/actions";
import { BsCartFill, BsFillPhoneFill, BsCardChecklist } from 'react-icons/bs';
import { FcLike } from "react-icons/fc";
import { AiOutlineUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css'
import Image from '../../image/iphone.png';
//LOGIN
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "../Login/LoginButton";
import { useNavigate } from "react-router-dom"
//LOGIN
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { Tooltip } from "@mui/material";


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

  // const handleLogout = async () => {
  //   logout();
  //   navigate('/');
  // };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate('/');
    }
  }
  // user
  localStorage.setItem('user', JSON.stringify(usuarios))
  function filterEmail() {
    if (isAuthenticated && usuarios.length) {
      return usuarios.filter(e => e.email === emailAuth0)
    }
  }
  function email() {
    if (isAuthenticated) {
      return user?.email
    }
  }
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
  const userIr = () => {
    navigate('/Profile')
  }
  const orderList = () => {
    navigate('panelOrders')
  }
  useEffect(() => {
    dispatch(allUser());
  }, [dispatch])

  return (
    <nav className='NavBar m-0 p-0 sticky-top bg-dark'>
      <div className="containerNavBar container-fluid justify-content-around m-0 p-0">
        <div className="navbar-nav hstack gap-3 NavBar-Item">
          <div className="logoStyle">
            <Link to='/home'>
              <img src={Image} alt="imagen home" width={"110px"} height={"85px"} />
            </Link>
          </div>
          <SearchBar />
          <Tooltip title="Home" aria-label="add">
            <Link to='/home' className="nav-link"><BsFillPhoneFill className='NavBarIcon' /></Link>
          </Tooltip>
          <Tooltip title="favorite" arial-label="add">
            <Link to='/favorites' className="nav-link"><FcLike className='NavBarIcon' /></Link>
          </Tooltip>
          <Tooltip title="cart" arial-label="add">
            <Link to='/cart' className="nav-link"><BsCartFill className='NavBarIcon' /></Link>
          </Tooltip>
          {
            isAuthenticated && gmail !== undefined && gmail[0] && gmail[0].role !== "Cliente"
              ? <Link to='/create' className="nav-link"><AiOutlineUpload className='NavBarIcon' /></Link>
              : null
          }
          {isAuthenticated && gmail !== undefined && gmail[0] ?
            <Link to={`orders/${gmail[0].id}`} className='nav-link'>
              <BsCardChecklist className='NavBarIcon' />
            </Link>
            : null
          }
          <div className="navbar-nav hstack gap-3 NavBar-Item">
            {isAuthenticated
              ? <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown} size='sm'>
                <DropdownToggle caret>
                  <img className="ProfileImg" alt='image profil' src={gmail !== undefined && gmail[0] ? gmail[0].image : "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={userIr}>Perfil</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              : <LoginButton />
            }
            {
              isAuthenticated && gmail !== undefined ? (!gmail[0] ?
                <Link to='/postUser'>
                  <button type="button" className="w-75 btn btn-outline-danger">Complete your user information</button>
                </Link>
                : null
              )
                : null
            }
            {
              isAuthenticated && gmail === undefined ? (
                <Link to='/postUser'>
                  <button type="button" className="btn btn-outline-danger">Complete sus datos de usuario</button>
                </Link>
              )
                : null
            }
            {
              isAuthenticated && gmail !== undefined && gmail[0] && gmail[0].role === "Administrador" ?
                <Dropdown isOpen={dropdown1} toggle={abrirCerrarDropdown1} size='sm'>
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
          </div>
        </div>
      </div>
    </nav >
  )
}