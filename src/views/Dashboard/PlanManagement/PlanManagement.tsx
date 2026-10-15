"use client";

import React, { useEffect, useState } from "react";
import { Plus, Check, Calendar, CheckCircle2, XCircle, User, Briefcase, type LucideIcon } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useGetPlanHandler } from "@/models/Plan/Plan";
import { Plans } from "@/redux/Plan/PlanTypes";
import PlanModal, { type Plan, type PlanPayload, type PlanType, type PlanInterval } from "@/components/PlanModal/PlanModal";

const colors = {
   PrimaryColor: "#38B6FF",
   SecondaryColor: "#FFFDFE",
   lightGray: "#fafafa",
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
   type?: PlanType;
}

// Page par sirf month / year filter hai (modal mein week bhi available hai)
type FilterInterval = Extract<PlanInterval, "month" | "year">;

const TYPE_FILTERS: { value: PlanType; label: string; Icon: LucideIcon }[] = [
   { value: "user", label: "User Plans", Icon: User },
   { value: "agent", label: "Agent Plans", Icon: Briefcase },
];

const INTERVAL_FILTERS: { value: FilterInterval; label: string }[] = [
   { value: "month", label: "Monthly" },
   { value: "year", label: "Yearly" },
];

/* Reusable segmented switch */
function SegmentedSwitch<T extends string>({ options, value, onChange }: { options: { value: T; label: string; Icon?: LucideIcon }[]; value: T; onChange: (v: T) => void }) {
   return (
      <div
         style={{
            display: "inline-flex",
            gap: "0.25rem",
            padding: "0.25rem",
            backgroundColor: colors.white,
            borderRadius: "10px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
         }}
      >
         {options.map(({ value: v, label, Icon }) => {
            const selected = value === v;
            return (
               <button
                  key={v}
                  type="button"
                  onClick={() => onChange(v)}
                  style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "0.4rem",
                     padding: "0.55rem 1.1rem",
                     border: "none",
                     borderRadius: "8px",
                     cursor: "pointer",
                     fontSize: "0.9rem",
                     fontWeight: 600,
                     backgroundColor: selected ? colors.PrimaryColor : "transparent",
                     color: selected ? colors.white : colors.textColor,
                     transition: "all 0.2s ease",
                  }}
               >
                  {Icon && <Icon style={{ width: "16px", height: "16px" }} />}
                  {label}
               </button>
            );
         })}
      </div>
   );
}

export default function PlanManagement() {
   const [plans, setPlans] = useState<Plans[] | undefined>();
   const [showModal, setShowModal] = useState(false);
   const [editingPlan, setEditingPlan] = useState<Plans | null>(null);

   // Filters
   const [interval, setInterval] = useState<FilterInterval>("month");
   const [type, setType] = useState<PlanType>("user");

   // Get Plans API - interval ya type badalne par naya data aana chahiye
   const { PlanData, GetPlan } = useGetPlanHandler({ interval, type });

   useEffect(() => {
      const plansDetail = PlanData?.plans || [];
      setPlans(plansDetail);
   }, [PlanData]);

   const handleAddPlan = () => {
      setEditingPlan(null);
      setShowModal(true);
   };

   const handleEditPlan = (plan: Plans) => {
      setEditingPlan(plan);
      setShowModal(true);
   };

   const handleDeletePlan = (id: string | undefined) => {
      if (id && window.confirm("Are you sure you want to delete this plan?")) {
         setPlans(plans?.filter((plan) => plan._id !== id));
      }
   };

   // Modal se aaya hua validated payload
   const handleSavePlan = async (payload: PlanPayload) => {
      // TODO: yahan create / update API call lagao, phir GetPlan() se list refresh karo
      if (editingPlan) {
         setPlans((plans as any)?.map((plan: any) => (plan?._id === editingPlan._id ? { ...plan, ...payload } : plan)));
      } else {
         const newPlan = { ...payload, _id: Date.now().toString() };
         setPlans([...(plans || []), newPlan] as any);
      }
      setShowModal(false);
      setEditingPlan(null);
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
               <button
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
               </button>
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
            {/* Filters: Type + Interval */}
            <div
               style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
               }}
            >
               <SegmentedSwitch options={TYPE_FILTERS} value={type} onChange={setType} />
               <SegmentedSwitch options={INTERVAL_FILTERS} value={interval} onChange={setInterval} />
            </div>

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
                              <CheckCircle2 style={{ width: "14px", height: "14px" }} /> Active
                           </>
                        ) : (
                           <>
                              <XCircle style={{ width: "14px", height: "14px" }} /> Inactive
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
                           {plan.amount}
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
                        <Calendar style={{ width: "14px", height: "14px", color: colors.PrimaryColor }} />
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
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
                     No {type} plans ({interval === "month" ? "monthly" : "yearly"}) available. Create your first plan!
                  </p>
               </div>
            )}
         </main>

         {/* Modal - current filter wali type default hogi */}
         {showModal && (
            <PlanModal
               isOpen={showModal}
               onClose={() => {
                  setShowModal(false);
                  setEditingPlan(null);
               }}
               editingPlan={editingPlan as unknown as Plan | null}
               defaultType={type}
            />
         )}
      </DashboardLayout>
   );
}
