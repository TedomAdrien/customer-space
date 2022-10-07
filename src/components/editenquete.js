import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { toast } from 'react-toastify';
import "reactjs-popup/dist/index.css";
import {DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, Media, } from "reactstrap";
import Profil from "../components/assets/img/undraw_profile.svg"
import "../components/assets/css/sb-admin-2.min.css";
import "../components/assets/vendor/fontawesome-free/css/all.min.css";

function EditEnquete() {
	const userId = JSON.parse(window.localStorage.getItem("userId"));
	const [profil, setProfil] = useState([])
	const [enqueteList, setEnqueteList] = useState([]);
	const [usersetId, setUserId] = useState("");
	const [nom, setNom] = useState("");
	const [newNom, setNewNom] = useState("");

	const  componentDidMount = () => {
		//s'il n'est pas connecter on le renvoie au login
		if (!JSON.parse(window.localStorage.getItem("userToken"))) {
			window.location.href = "/";
		 }
		}
		
	useEffect(() => {
        componentDidMount();
    }, [])

	const logout = () => {
		window.localStorage.clear();
		window.location.reload();
		toast.success("Aurevoir et revener vite");
	}



	const getProfilUser = () => {
		Axios.get(`https://customer-space.herokuapp.com/api/auth/show/${userId}`)
			.then((response) => {
				setProfil(response.data);
			})
		
	}
	useEffect(() => {
        getProfilUser();
    }, [])

	const addEnquete = (e) => {
	e.preventDefault();
		if (nom === "")
			toast.success("Le champ ne doit pas etre vide");
			// alert("Le champ ne doit pas etre vide");
		else {
			fetch("https://customer-space.herokuapp.com/app/enquete", {
				method: "POST",
				crossDomain: true,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: `Bearer ${JSON.parse(
						window.localStorage.getItem("userToken")
					)}`,
				},
				body: JSON.stringify({
					nom,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message) {
						toast.success("Enquete créée avec succès");
						// alert("Enquete créée avec succès");
						//initialiser le enqueteId pour les requette qui en aurons besoin
						fetch("https://customer-space.herokuapp.com/app/enquete", {
							headers: {
								Authorization: `Bearer ${JSON.parse(
									window.localStorage.getItem("userToken")
								)}`,
							},
						}).then((res) => {
							res.json().then((enquetes) => {
								window.localStorage.setItem(
									"enqueteId",
									JSON.stringify(enquetes[0]._id)
								);
								//tout s'est bien derouler
								window.location.href = "./enquete";
							});
						});
					} else {
						toast.error("Echec lors de la création de votre Enquete");
						// alert("Echec lors de la création de votre Enquete");
					}
				});
		}
	};

	const getEnquetes = () => {
		Axios.get("https://customer-space.herokuapp.com/app/enquete").then(
			(response) => {
				setEnqueteList(response.data);
			}
		);
	};

	useEffect(() => {
        getEnquetes();
    }, [])

	const updateEnqueteNom = (id) => {
		if (newNom ==="") {
			// alert("Le champs ne doit pas être vide");
			toast.success("Le champs ne doit pas être vide");
		} else {
			Axios.put(`https://customer-space.herokuapp.com/app/enquete/${id}`, {
				nom: newNom,
				_id: id,
			}).then((response) => {
				getEnquetes();
				if (response.status === 201) 
				// alert(response.data.message);
				toast.success("La modification a ete modifier avec success");
				else 
				// alert("Verifiez vos champs et recommencez");
				toast.error("Verifiez vos champs et recommencez");
			});
		}
	};


	const deleteEnquete = (id) => {
		Axios.delete(`https://customer-space.herokuapp.com/app/enquete/${id}`).then(
			(response) => {
				setEnqueteList(
					enqueteList.filter((val) => {
						return val._id !== id;
					})
				);
				if (response.status === 200) 
				// alert(response.data.message);
				toast.success("Votre enquete a ete modifier avec success");
				else 
				// alert("Verifiez vos champs et recommencez");
				toast.error("Verifiez vos champs et recommencez");
			}
		);
	};

	useEffect(() => {
        deleteEnquete();
    }, [])

	const checkEnquete = (enqueteId) => {
		fetch(`https://customer-space.herokuapp.com/app/enquete/${enqueteId}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(
					window.localStorage.getItem("userToken")
				)}`,
			},
		}).then((res) => {
			res.json().then((enquete) => {
				window.localStorage.setItem(
					"enqueteId",
					JSON.stringify(enquete._id)
				);
				toast.success("Changement de enquete reussie");
				// alert("Changement de enquete reussie");
			});
		});
	};
	const rendered = (enqueteId) => {
		if (JSON.parse(window.localStorage.getItem("enqueteId")) === enqueteId) {
			return (
				<input
					className="form-check-input p-2 w-25"
					type="radio"
					name="checkFerme"
					value="check"
					defaultChecked
					onInput={() => {
						checkEnquete(enqueteId);
					}}
				/>
			);
		} else {
			return (
				<input
					className="form-check-input p-2 w-5 ml-10"
					type="radio"
					name="checkFerme"
					value="check"
					onInput={() => {
						checkEnquete(enqueteId);
					}}
				/>
			);
		}
	};

	return (
		<div>
			<div id="wrapper">
				<ul className="navbar-nav  sidebar sidebar-dark accordion" id="accordionSidebar" style={{ backgroundColor: "red" }}>
					<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
						<div className="sidebar-brand-icon rotate-n-15">
							<i className="fas fa-laugh-wink"></i>
						</div>
						<div className="sidebar-brand-text mx-3">Customer Spaces</div>
					</a>
					<hr className="sidebar-divider my-0"/>
					<li className="nav-item active">
						<a className="nav-link" href="/pages/dashboard">
							<i className="fas fa-fw fa-tachometer-alt"></i>
							<span>Dashboard</span></a>
					</li>
					<hr className="sidebar-divider"/>
					<div className="sidebar-heading">
						Interface
					</div>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/userprofil">
							<i className="fas fa-fw fa-chart-area"></i>
							<span>Profil</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/enquete">
							<i className="fas fa-fw fa-chart-area"></i>
							<span>Enquete</span></a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/pages/dashboard/enquete/results">
							<i className="fas fa-fw fa-table"></i>
							<span>Commentaire</span></a>
					</li>
    				<hr className="sidebar-divider d-none d-md-block"/>
				</ul>

					<div id="content-wrapper" className="d-flex flex-column">
    					<div id="content">
					        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
							    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
									
								</button>
            						<ul className="navbar-nav ml-auto">
										<div className="topbar-divider d-none d-sm-block"></div>
											<div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
												<Nav
													className="align-items-center d-none d-md-flex"
													navbar>
													<UncontrolledDropdown nav>
														<DropdownToggle className="pr-0" nav>
															<ul className="navbar-nav navbar-nav-right">
																<Media className="align-items-center">
																	<Media className="ml-2 d-none d-lg-block">
																		<span className="mb-0 text-sm font-weight-bold" style={{ color: "red" }}>
																			{profil.nom}
																		</span>
																	</Media>
																	<li className="nav-item nav-profile dropdown">
																		<a
																			className="nav-link dropdown-toggle"
																			href="#"
																			data-toggle="dropdown"
																			id="profileDropdown"
																		>
																			<img className="img-profile rounded-circle"
																			src={ Profil}/>
																		</a>
																	</li>
																</Media>
															</ul>
														</DropdownToggle>
														<DropdownMenu
															className="dropdown-menu-arrow"
															right
														>
															<DropdownItem
																className="noti-title"
																header
																tag="div"
															>
																<h6 className="text-overflow m-0">
																	Welcome !
																</h6>
															</DropdownItem>
															<DropdownItem
																to="/pages/dashboard"
																tag={Link}
															>
																<i className="ni ni-calendar-grid-58" />
																<span>Espace Utilisateur</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																to="/pages/dashboard/userprofil"
																tag={Link}
															>
																<i className="ni ni-calendar-grid-58" />
																<span>Profil</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																to="/pages/dashboard/enquete"
																tag={Link}
															>
																<i className="ni ni-settings-gear-65" />
																<span>Mes Enquetes</span>
															</DropdownItem>
															<DropdownItem divider />
															<DropdownItem
																onClick={() =>logout()}
															>
																<i className="ni ni-settings-gear-65" />
																<span>Logout</span>
															</DropdownItem>
														</DropdownMenu>
													</UncontrolledDropdown>
												</Nav>
											</div>
            						</ul>
        					</nav>
							<div className="container-fluid">
								<div className="d-sm-flex align-items-center justify-content-between mb-4">
									<h1 className="h3 mb-0 text-gray-800">Enquete(s)</h1>
								</div>
							</div>
        
							<Popup
		trigger={
			<button className="btn btn-success mb-4">
				{" "}
				Ajouter une Enquete{" "}
			</button>
		}
		position="bottom top"
	>
		{(close) => (
			<div className="popup-add">
				<a className="close" onClick={close}>
					&times;
				</a>
				<h2 className="">Ajouter une Nouvelle Enquete</h2>
				<form onSubmit={addEnquete} className="forms-sample">
					<div className="form-group">
						<input
							type="hidden"
							onChange={(event) => {
								setUserId(event.target.value);
							}}
						/>
					</div>
					<div className="form-group">
						<label>Nom de l'enquete:</label>
						<input
							type="text"
							onChange={(event) => {
								setNom(event.target.value);
							}}
							className="form-control"
							placeholder="Nom de l'enquete..."
							required
						/>
					</div>
					
					
					<button
						
						className="btn btn-danger"
						onClick={close}
					>
						Fermer
					</button>
					<button type="submit" className="btn btn-success" style={{ marginLeft: "10px" }}>
						Ajouter
					</button>
				</form>
			</div>
		)}
							</Popup>

							<div className="table-responsive" style={{ width: "100%" }}>
								<table className="table table-striped">
									<thead>
										<tr>
											<th> Nom </th>
											<th> Action </th>
											<th> Selectionener <br/>l'enquete</th>
											<th> Questionnaire </th>
										</tr>
									</thead>
									<tbody>
										{enqueteList.map((val) => (
											<tr key={val._id}>
												<td>{val.nom}</td>
												<td>
													<Popup
														trigger={
															<button className="btn btn-outline-primary btn-fw">
																{" "}
																Modifier{" "}
															</button>
														}
														position="center center"
													>
														{(close) => (
															<div className="popup-update">
																<div className="form-group">
																	<input
																		type="text"
																		placeholder={val.nom}
																		onChange={(event) => {
																			setNewNom(
																				event.target
																					.value
																			);
																		}}
																		className="form-control form-perso"
																	/>
																	<button
																	style={{
																		marginLeft: "10px",
																	}}
																		className="btn btn-success btn-fw"
																		onClick={() => {
																			updateEnqueteNom(
																				val._id
																			);
																		}}
																	>
																		{" "}
																		Mettre à jour
																	</button>
																</div>
																<button
																	style={{
																		marginLeft: "10px",
																	}}
																	className="btn btn-danger"
																	onClick={close}
																>
																	Fermer
																</button>
															</div>
														)}
													</Popup>
													{/* <Popup
														trigger={
															<button className="btn btn-outline-danger btn-fw">
																{" "}
																Supprimer{" "}
															</button>
														}
														position="left center"
													>
														{(close) => (
															<div className="p-2">
																<p>
																	Êtes-vous sur de vouloir
																	supprimer ?
																</p>
																<button
																	onClick={() => {
																		deleteEnquete(val._id);
																	}}
																	className="btn btn-danger"
																>
																	Oui
																</button>
																<button
																	style={{
																		marginLeft: "10px",
																	}}
																	className="btn btn-primary"
																	onClick={close}
																>
																	Non
																</button>
															</div>
														)}
													</Popup> */}
												</td>
												<td>
													<div
														className="form-check text-center"
														title="Switcher de ferme"
													>
														{rendered(val._id)}
													</div>
												</td>
													<td>
													<div className="btn btn-primary">
													<Link to="/pages/dashboard/enquete/question">
														<span className="btnO btn-primary px-3">Consulter</span>
													</Link>
													
													</div>
													</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							
    					</div>
   
							<footer className="sticky-footer bg-white">
								<div className="container my-auto">
									<div className="copyright text-center my-auto">
									<span>Copyright &copy; ALLHCorp 2022</span>
									</div>
								</div>
							</footer>
					</div>
			</div>
		</div>
	);
}

export default EditEnquete;

