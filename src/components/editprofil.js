import React, { useState, useEffect } from "react";
import "../components/assets/styles/profil.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profil from "../components/assets/img/undraw_profile.svg"
import Axios from "axios";


const EditProfil = () => {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
	const[profil, setProfil] = useState([]);

	const  componentDidMount = () => {
		//s'il n'est pas connecter on le renvoie au login
		if (!JSON.parse(window.localStorage.getItem("userToken"))) {
			window.location.href = "/";
		 }
		}
		
	useEffect(() => {
        componentDidMount();
    }, [])


	const getProfilUser = () =>{
		Axios.get(`https://customer-space.herokuapp.com/api/auth/show/${userId}`)
			.then((response) => {
				console.log(response.data);
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])

	//update le profil
//     const  setUpdateUser =() => {

// 	if (!email && !nom && !tel) alert("Aucune donnée à modifier");
// 	else {
// 		if (!nom) nom = profil.nom;
// 		if (!tel) tel = profil.tel;
// 		if (!email) email = profil.email;
// 		Axios.put(`/api/auth/update/${userId}`, {
// 			nom: nom,
// 			tel: tel,
// 			email: email,
// 		})
// 			.then((response) => {
// 				if (response.status === 201) {
// 					alert(response.data.message);
// 					window.location.href = "../";
// 				}
// 			})
// 			.catch((error) => {
// 				alert(error.response.data.message);
// 			});
// 	}
// }
 
	return (
		<div className="profil">

		 				<div className="container">
		 					<div className="main-body">
		 		<nav
		 							aria-label="breadcrumb"
		 							className="main-breadcrumb"
		 						>
		 							<ol className="breadcrumb">
		 								<li className="breadcrumb-item">
		 									<Link to="/">Acceuil</Link>
		 								</li>
		 								<li className="breadcrumb-item">
		 									<Link to="/pages/dashboard">
		 										Espace utilisateur
		 									</Link>
		 								</li>
		 								<li className="breadcrumb-item">
		 									<Link to="/pages/dashboard/userprofil">
		 										Profil utilisateur
		 									</Link>
		 								</li>
		 								<li className="breadcrumb-item">
		 									<Link to="/pages/dashboard/userprofil/update">
		 										Modifier le profil
		 									</Link>
		 								</li>
		 							</ol>
		 						</nav>
		
		 						<div className="container1 rounded bg-white  mb-5">
		 							<div className="row">
		 								<div className="col-md-3 border-right">
		 									<div className="d-flex flex-column align-items-center text-center p-3 py-5">
		 										<img
		 											className="rounded-circle"
		 											width="150px"
		 											src={Profil}
		 										/>
		 										<span className="font-weight-bold mt-3">
		 											{profil.nom}
		 										</span>
		 										<span className="text-black-50 mt-3">
		 											{profil.email}
		 										</span>
		 									</div>
		 								</div>
		 								<div className="col-md-5 border-right">
		 									<div className="p-3 py-5">
		 										<div className="d-flex justify-content-center align-items-center mb-3">
		 											<h4 className="text-center text-success text-decoration-underline">
		 												Modifier les infos du profil
		 											</h4>
		 										</div>
		
		 										<div className="row mt-3 ">
		 											<div className="col-md-12 text-left">
		 												<label className="labels">
		 													Nom complet :
		 												</label>
		 												<input
		 													type="text"
		 													className="form-control"
		 													placeholder={profil.nom}
		 													
		 												/>
		 											</div>
		 											<div className="col-md-12 mt-3 text-left">
		 												<label className="labels">
		 													Téléphone :
		 												</label>
		 												<input
		 													type="text"
		 													className="form-control"
		 													placeholder={profil.tel}
		 													
		 												/>
		 											</div>
		
		 											<div className="col-md-12 mt-3 text-left">
		 												<label className="labels">
		 													Email :
		 												</label>
		 												<input
		 													type="text"
		 													className="form-control"
		 													placeholder={profil.email}
		 													
		 												/>
		 											</div>
		 											<div className="col-md-12 mt-3 text-left">
		 												<label className="labels">
		 													Localisation :
		 												</label>
		 												<input
		 													type="text"
		 													className="form-control"
		 													placeholder={profil.localisation}
		 													
		 												/>
		 											</div>
		 											<div className="col-md-12 mt-3 text-left">
		 												<label className="labels">
														 Secteur_activité :
		 												</label>
		 												<input
		 													type="text"
		 													className="form-control"
		 													placeholder={profil.secteur_activité}
		 													
		 												/>
		 											</div>
		
		 											<div className="mt-5 text-center">
		 												<button
		 													className="btn btn-outline-success profile-button"
		 													type="button"
		 													
		 												>
		 													Sauvegarder
		 												</button>
		 											</div>
		 										</div>
		 									</div>
		 								</div>
		 							</div>
		 						</div>
		 					</div>
		 				</div>
		 			</div>
		);
};

export default EditProfil;