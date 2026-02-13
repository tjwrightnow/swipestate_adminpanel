"use client";

import React, {useEffect, useState} from "react";
import {Plus, Edit2, Trash2, X, Check, Calendar, CheckCircle2, XCircle} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {useGetPlanHandler} from "@/models/Plan/Plan";
import {Plans} from "@/redux/Plan/PlanTypes";

const colors = {
	PrimaryColor: "#38B6FF",
	SecondaryColor: "#FFFDFE",
	textColor: "#555555",
	textBlue: "#38B6FF",
	white: "#fff",
	black: "#000000",
	gray: "#999999",
};

export interface PlansEdit {
	_id?: string;
	title: string;
	description: string;
	amount: number;
	planPoints: string[];
	interval: string;
	active: boolean;
}

export default function PlanManagement() {
	const [plans, setPlans] = useState<Plans[] | undefined>();
	const [showModal, setShowModal] = useState(false);
	const [editingPlan, setEditingPlan] = useState<PlansEdit | null>(null);
	const [formData, setFormData] = useState<PlansEdit>({
		title: "",
		description: "",
		amount: 0,
		planPoints: [],
		interval: "monthly",
		active: true,
	});
	const [currentPoint, setCurrentPoint] = useState("");

	const handleAddPlan = () => {
		setEditingPlan(null);
		setFormData({
			title: "",
			description: "",
			amount: 0,
			planPoints: [],
			interval: "monthly",
			active: true,
		});
		setCurrentPoint("");
		setShowModal(true);
	};

	// Get Plans API
	const {PlanData, GetPlan} = useGetPlanHandler({interval: "month"});
	console.log(PlanData);

	useEffect(() => {
		const plansDetail = PlanData?.plans || [];
		setPlans(plansDetail);
	}, [GetPlan]);

	const handleEditPlan = (plan: Plans) => {
		setEditingPlan(plan);
		setFormData(plan);
		setCurrentPoint("");
		setShowModal(true);
	};

	const handleDeletePlan = (id: string | undefined) => {
		if (id && window.confirm("Are you sure you want to delete this plan?")) {
			setPlans(plans?.filter((plan) => plan._id !== id));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (editingPlan) {
			// Update existing plan
			setPlans((plans as any)?.map((plan: any) => (plan?._id === editingPlan._id ? {...formData, _id: editingPlan._id} : plan)));
		} else {
			// Add new plan
			const newPlan = {
				...formData,
				_id: Date.now().toString(),
			};
			setPlans([...(plans as any), newPlan]);
		}

		setShowModal(false);
		setFormData({
			title: "",
			description: "",
			amount: 0,
			planPoints: [],
			interval: "monthly",
			active: true,
		});
	};

	const handleAddPoint = () => {
		if (currentPoint.trim()) {
			setFormData({
				...formData,
				planPoints: [...formData.planPoints, currentPoint.trim()],
			});
			setCurrentPoint("");
		}
	};

	const handleRemovePoint = (index: number) => {
		setFormData({
			...formData,
			planPoints: formData.planPoints.filter((_, i) => i !== index),
		});
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	};

	return (
		<DashboardLayout>
			{/* Header */}
			<header
				style={{
					backgroundColor: colors.white,
					padding: "1.5rem 0",
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
				}}
			>
				<div
					style={{
						maxWidth: "1200px",
						margin: "0 auto",
						padding: "0 1rem",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<h1
							style={{
								fontSize: "2rem",
								fontWeight: "bold",
								color: colors.PrimaryColor,
								margin: 0,
							}}
						>
							Plan Management
						</h1>
						<p
							style={{
								color: colors.textColor,
								marginTop: "0.5rem",
							}}
						>
							Manage your subscription plans
						</p>
					</div>
					{/* <button
                  onClick={handleAddPlan}
                  style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "0.5rem",
                     padding: "0.75rem 1.5rem",
                     backgroundColor: colors.PrimaryColor,
                     color: colors.white,
                     border: "none",
                     borderRadius: "8px",
                     fontSize: "1rem",
                     fontWeight: "600",
                     cursor: "pointer",
                     transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2A9FE8")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.PrimaryColor)}
               >
                  <Plus style={{ width: "20px", height: "20px" }} />
                  Add New Plan
               </button> */}
				</div>
			</header>

			{/* Main Content */}
			<main
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "2rem 1rem",
				}}
			>
				{/* Plans Grid */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
						gap: "1.5rem",
					}}
				>
					{plans?.map((plan) => (
						<div
							key={plan._id}
							style={{
								backgroundColor: colors.white,
								borderRadius: "12px",
								padding: "2rem",
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
								position: "relative",
								border: plan.active ? `2px solid ${colors.PrimaryColor}` : `2px solid ${colors.gray}`,
								transition: "transform 0.3s, box-shadow 0.3s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = "translateY(-4px)";
								e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = "translateY(0)";
								e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
							}}
						>
							{/* Status Badge */}
							<div
								style={{
									position: "absolute",
									top: "1rem",
									right: "1rem",
									display: "flex",
									alignItems: "center",
									gap: "0.5rem",
									padding: "0.4rem 0.8rem",
									borderRadius: "6px",
									backgroundColor: plan.active ? "#10B981" : "#EF4444",
									color: colors.white,
									fontSize: "0.85rem",
									fontWeight: "600",
								}}
							>
								{plan.active ? (
									<>
										<CheckCircle2 style={{width: "14px", height: "14px"}} /> Active
									</>
								) : (
									<>
										<XCircle style={{width: "14px", height: "14px"}} /> Inactive
									</>
								)}
							</div>

							{/* Plan Title */}
							<h3
								style={{
									fontSize: "1.5rem",
									fontWeight: "700",
									color: colors.black,
									marginBottom: "0.5rem",
									marginTop: "1rem",
								}}
							>
								{plan.title}
							</h3>

							{/* Description */}
							<p
								style={{
									color: colors.textColor,
									fontSize: "0.95rem",
									marginBottom: "1.5rem",
									lineHeight: "1.5",
								}}
							>
								{plan.description}
							</p>

							{/* Price */}
							<div
								style={{
									display: "flex",
									alignItems: "baseline",
									marginBottom: "1rem",
								}}
							>
								<span
									style={{
										fontSize: "2.5rem",
										fontWeight: "bold",
										color: colors.PrimaryColor,
									}}
								>
									{formatPrice(plan.amount)}
								</span>
								<span
									style={{
										fontSize: "1rem",
										color: colors.textColor,
										marginLeft: "0.5rem",
									}}
								>
									/ {plan.interval}
								</span>
							</div>

							{/* Interval Badge */}
							<div
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "0.3rem",
									padding: "0.3rem 0.8rem",
									backgroundColor: colors.SecondaryColor,
									borderRadius: "6px",
									marginBottom: "1.5rem",
								}}
							>
								<Calendar style={{width: "14px", height: "14px", color: colors.PrimaryColor}} />
								<span
									style={{
										fontSize: "0.85rem",
										color: colors.textColor,
										textTransform: "capitalize",
									}}
								>
									{plan.interval} Billing
								</span>
							</div>

							{/* Plan Points */}
							<div
								style={{
									borderTop: `1px solid ${colors.SecondaryColor}`,
									paddingTop: "1.5rem",
									marginBottom: "1.5rem",
								}}
							>
								<h4
									style={{
										fontSize: "1rem",
										fontWeight: "600",
										color: colors.black,
										marginBottom: "1rem",
									}}
								>
									Features:
								</h4>
								<div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
									{plan.planPoints.map((point, index) => (
										<div
											key={index}
											style={{
												display: "flex",
												alignItems: "center",
												gap: "0.5rem",
											}}
										>
											<Check
												style={{
													width: "18px",
													height: "18px",
													color: colors.PrimaryColor,
													flexShrink: 0,
												}}
											/>
											<span
												style={{
													color: colors.textColor,
													fontSize: "0.9rem",
												}}
											>
												{point}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Action Buttons */}
							{/* <div
								style={{
									display: "flex",
									gap: "0.75rem",
								}}
							>
								<button
									onClick={() => handleEditPlan(plan)}
									style={{
										flex: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "0.5rem",
										padding: "0.75rem",
										backgroundColor: colors.white,
										color: colors.PrimaryColor,
										border: `2px solid ${colors.PrimaryColor}`,
										borderRadius: "8px",
										fontSize: "0.95rem",
										fontWeight: "600",
										cursor: "pointer",
										transition: "all 0.3s",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = colors.PrimaryColor;
										e.currentTarget.style.color = colors.white;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = colors.white;
										e.currentTarget.style.color = colors.PrimaryColor;
									}}
								>
									<Edit2 style={{width: "16px", height: "16px"}} />
									Edit
								</button>
								<button
									onClick={() => handleDeletePlan(plan._id)}
									style={{
										flex: 1,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "0.5rem",
										padding: "0.75rem",
										backgroundColor: colors.white,
										color: "#EF4444",
										border: "2px solid #EF4444",
										borderRadius: "8px",
										fontSize: "0.95rem",
										fontWeight: "600",
										cursor: "pointer",
										transition: "all 0.3s",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = "#EF4444";
										e.currentTarget.style.color = colors.white;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = colors.white;
										e.currentTarget.style.color = "#EF4444";
									}}
								>
									<Trash2 style={{width: "16px", height: "16px"}} />
									Delete
								</button>
							</div> */}
						</div>
					))}
				</div>

				{/* Empty State */}
				{plans?.length === 0 && (
					<div
						style={{
							textAlign: "center",
							padding: "3rem",
							backgroundColor: colors.white,
							borderRadius: "12px",
						}}
					>
						<p
							style={{
								color: colors.textColor,
								fontSize: "1.1rem",
								marginBottom: "1rem",
							}}
						>
							No plans available. Create your first plan!
						</p>
						{/* <button
							onClick={handleAddPlan}
							style={{
								padding: "0.75rem 1.5rem",
								backgroundColor: colors.PrimaryColor,
								color: colors.white,
								border: "none",
								borderRadius: "8px",
								fontSize: "1rem",
								fontWeight: "600",
								cursor: "pointer",
							}}
						>
							Add New Plan
						</button> */}
					</div>
				)}
			</main>

			{/* Modal */}
			{showModal && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0,0,0,0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
						padding: "1rem",
					}}
				>
					<div
						style={{
							backgroundColor: colors.white,
							borderRadius: "12px",
							width: "100%",
							maxWidth: "600px",
							maxHeight: "90vh",
							overflow: "auto",
							boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
						}}
					>
						{/* Modal Header */}
						<div
							style={{
								padding: "1.5rem",
								borderBottom: `1px solid ${colors.SecondaryColor}`,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								position: "sticky",
								top: 0,
								backgroundColor: colors.white,
								zIndex: 1,
							}}
						>
							<h2
								style={{
									fontSize: "1.5rem",
									fontWeight: "700",
									color: colors.black,
									margin: 0,
								}}
							>
								{editingPlan ? "Edit Plan" : "Add New Plan"}
							</h2>
							<button
								onClick={() => setShowModal(false)}
								style={{
									backgroundColor: "transparent",
									border: "none",
									cursor: "pointer",
									padding: "0.5rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<X style={{width: "24px", height: "24px", color: colors.textColor}} />
							</button>
						</div>

						{/* Modal Body */}
						<form
							onSubmit={handleSubmit}
							style={{padding: "1.5rem"}}
						>
							{/* Title */}
							<div style={{marginBottom: "1.5rem"}}>
								<label
									style={{
										display: "block",
										marginBottom: "0.5rem",
										color: colors.black,
										fontWeight: "600",
										fontSize: "0.95rem",
									}}
								>
									Plan Title *
								</label>
								<input
									type="text"
									required
									value={formData.title}
									onChange={(e) => setFormData({...formData, title: e.target.value})}
									placeholder="Enter plan title"
									style={{
										width: "100%",
										padding: "0.75rem",
										border: `1px solid ${colors.gray}`,
										borderRadius: "8px",
										fontSize: "1rem",
										outline: "none",
									}}
								/>
							</div>

							{/* Description */}
							<div style={{marginBottom: "1.5rem"}}>
								<label
									style={{
										display: "block",
										marginBottom: "0.5rem",
										color: colors.black,
										fontWeight: "600",
										fontSize: "0.95rem",
									}}
								>
									Description *
								</label>
								<textarea
									required
									value={formData.description}
									onChange={(e) => setFormData({...formData, description: e.target.value})}
									placeholder="Enter plan description"
									rows={3}
									style={{
										width: "100%",
										padding: "0.75rem",
										border: `1px solid ${colors.gray}`,
										borderRadius: "8px",
										fontSize: "1rem",
										outline: "none",
										resize: "vertical",
									}}
								/>
							</div>

							{/* Amount and Interval */}
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "1rem",
									marginBottom: "1.5rem",
								}}
							>
								<div>
									<label
										style={{
											display: "block",
											marginBottom: "0.5rem",
											color: colors.black,
											fontWeight: "600",
											fontSize: "0.95rem",
										}}
									>
										Amount (USD) *
									</label>
									<input
										type="number"
										required
										min="0"
										value={formData.amount}
										onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
										placeholder="0"
										style={{
											width: "100%",
											padding: "0.75rem",
											border: `1px solid ${colors.gray}`,
											borderRadius: "8px",
											fontSize: "1rem",
											outline: "none",
										}}
									/>
								</div>

								<div>
									<label
										style={{
											display: "block",
											marginBottom: "0.5rem",
											color: colors.black,
											fontWeight: "600",
											fontSize: "0.95rem",
										}}
									>
										Interval *
									</label>
									<select
										value={formData.interval}
										onChange={(e) => setFormData({...formData, interval: e.target.value})}
										style={{
											width: "100%",
											padding: "0.75rem",
											border: `1px solid ${colors.gray}`,
											borderRadius: "8px",
											fontSize: "1rem",
											outline: "none",
											backgroundColor: colors.white,
										}}
									>
										<option value="monthly">Monthly</option>
										<option value="yearly">Yearly</option>
										<option value="weekly">Weekly</option>
									</select>
								</div>
							</div>

							{/* Active Status */}
							<div style={{marginBottom: "1.5rem"}}>
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
										cursor: "pointer",
									}}
								>
									<input
										type="checkbox"
										checked={formData.active}
										onChange={(e) => setFormData({...formData, active: e.target.checked})}
										style={{
											width: "18px",
											height: "18px",
											cursor: "pointer",
										}}
									/>
									<span
										style={{
											color: colors.black,
											fontWeight: "600",
											fontSize: "0.95rem",
										}}
									>
										Active Plan
									</span>
								</label>
							</div>

							{/* Plan Points */}
							<div style={{marginBottom: "1.5rem"}}>
								<label
									style={{
										display: "block",
										marginBottom: "0.5rem",
										color: colors.black,
										fontWeight: "600",
										fontSize: "0.95rem",
									}}
								>
									Plan Features
								</label>

								{/* Add Point Input */}
								<div
									style={{
										display: "flex",
										gap: "0.5rem",
										marginBottom: "1rem",
									}}
								>
									<input
										type="text"
										value={currentPoint}
										onChange={(e) => setCurrentPoint(e.target.value)}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												handleAddPoint();
											}
										}}
										placeholder="Add a feature"
										style={{
											flex: 1,
											padding: "0.75rem",
											border: `1px solid ${colors.gray}`,
											borderRadius: "8px",
											fontSize: "1rem",
											outline: "none",
										}}
									/>
									<button
										type="button"
										onClick={handleAddPoint}
										style={{
											padding: "0.75rem 1.25rem",
											backgroundColor: colors.PrimaryColor,
											color: colors.white,
											border: "none",
											borderRadius: "8px",
											fontSize: "1rem",
											fontWeight: "600",
											cursor: "pointer",
										}}
									>
										<Plus style={{width: "20px", height: "20px"}} />
									</button>
								</div>

								{/* Points List */}
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "0.5rem",
										maxHeight: "200px",
										overflowY: "auto",
										padding: "0.5rem",
										backgroundColor: colors.SecondaryColor,
										borderRadius: "8px",
									}}
								>
									{formData.planPoints.length === 0 ? (
										<p
											style={{
												color: colors.textColor,
												fontSize: "0.9rem",
												textAlign: "center",
												padding: "1rem",
											}}
										>
											No features added yet
										</p>
									) : (
										formData.planPoints.map((point, index) => (
											<div
												key={index}
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													padding: "0.75rem",
													backgroundColor: colors.white,
													borderRadius: "6px",
												}}
											>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "0.5rem",
													}}
												>
													<Check
														style={{
															width: "16px",
															height: "16px",
															color: colors.PrimaryColor,
														}}
													/>
													<span
														style={{
															color: colors.textColor,
															fontSize: "0.9rem",
														}}
													>
														{point}
													</span>
												</div>
												<button
													type="button"
													onClick={() => handleRemovePoint(index)}
													style={{
														backgroundColor: "transparent",
														border: "none",
														cursor: "pointer",
														padding: "0.25rem",
														display: "flex",
														alignItems: "center",
													}}
												>
													<X
														style={{
															width: "18px",
															height: "18px",
															color: "#EF4444",
														}}
													/>
												</button>
											</div>
										))
									)}
								</div>
							</div>

							{/* Submit Buttons */}
							<div
								style={{
									display: "flex",
									gap: "1rem",
									paddingTop: "1rem",
									borderTop: `1px solid ${colors.SecondaryColor}`,
								}}
							>
								<button
									type="button"
									onClick={() => setShowModal(false)}
									style={{
										flex: 1,
										padding: "0.75rem",
										backgroundColor: colors.white,
										color: colors.textColor,
										border: `2px solid ${colors.gray}`,
										borderRadius: "8px",
										fontSize: "1rem",
										fontWeight: "600",
										cursor: "pointer",
									}}
								>
									Cancel
								</button>
								<button
									type="submit"
									style={{
										flex: 1,
										padding: "0.75rem",
										backgroundColor: colors.PrimaryColor,
										color: colors.white,
										border: "none",
										borderRadius: "8px",
										fontSize: "1rem",
										fontWeight: "600",
										cursor: "pointer",
									}}
								>
									{editingPlan ? "Update Plan" : "Create Plan"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
}
