"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { X, Plus, Check, User, Briefcase, type LucideIcon } from "lucide-react";
import { useCreatePlanHandler } from "@/models/Plan/Plan";

/* =========================================================
 * Types
 * ======================================================= */

export type PlanType = "user" | "agent";
export type PlanInterval = "week" | "month" | "year";
export type RestrictionKind = "number" | "boolean";
export type RestrictionValue = number | boolean;
export type PlanRestrictions = Record<string, RestrictionValue>;

/** Backend se aane wala plan (Mongoose PlanScheme ke mutabiq) */
export interface Plan {
   _id?: string;
   title: string;
   description?: string;
   planPoints?: string[];
   productId?: string;
   priceId?: string;
   appleProductId?: string; // sirf user plans ke liye
   amount: number;
   currency?: string;
   interval?: PlanInterval;
   active?: boolean;
   type: PlanType;
   planRestrictions?: PlanRestrictions;
   createdAt?: string;
   updatedAt?: string;
}

/** Modal se backend ko jane wala data (productId / priceId Stripe se backend set karta hai) */
export interface PlanPayload {
   title: string;
   description: string;
   appleProductId?: string; // sirf type "user" par bheji jati hai
   amount: number;
   currency: string;
   interval: PlanInterval;
   active: boolean;
   type: PlanType;
   planPoints: string[];
   planRestrictions: PlanRestrictions;
}

export interface PlanModalProps {
   isOpen: boolean;
   onClose: () => void;
   editingPlan?: Plan | null;
   defaultType?: PlanType;
   isLoading?: boolean;
}

interface RestrictionRow {
   key: string;
   value: string; // input ke liye string, submit par number/boolean ban jati hai
}

interface FormState {
   type: PlanType;
   title: string;
   description: string;
   appleProductId: string;
   amount: string | number;
   currency: string;
   interval: PlanInterval;
   active: boolean;
   planPoints: string[];
   restrictions: RestrictionRow[];
}

/* =========================================================
 * Constants
 * ======================================================= */

const colors = {
   PrimaryColor: "var(--primary-color, #38b6ff)",
   SecondaryColor: "var(--secondary-color, #f7f7f7)",
   lightGray: "var(--color-lightgray, #fafafa)",
   textColor: "var(--text-color, #555555)",
   white: "var(--white, #fff)",
   black: "var(--black, #000000)",
   gray: "var(--gray, #999999)",
   danger: "#EF4444",
} as const;

const PLAN_TYPES: { value: PlanType; label: string; Icon: LucideIcon }[] = [
   { value: "user", label: "User Plan", Icon: User },
   { value: "agent", label: "Agent Plan", Icon: Briefcase },
];

// Stripe-style intervals (schema default "year")
const INTERVALS: { value: PlanInterval; label: string }[] = [
   { value: "week", label: "Weekly" },
   { value: "month", label: "Monthly" },
   { value: "year", label: "Yearly" },
];

// Allowed restriction keys (type ke hisaab se) + unki value ka kind (number / boolean)
const RESTRICTION_FIELDS: Record<PlanType, { key: string; kind: RestrictionKind }[]> = {
   user: [
      { key: "numberOfSwipes", kind: "number" },
      { key: "maxContactShow", kind: "number" },
   ],
   agent: [
      { key: "numberOfAcceptMatch", kind: "number" },
      { key: "numberOfUpload", kind: "number" },
   ],
};

const getRestrictionKind = (key: string): RestrictionKind => {
   const all = [...RESTRICTION_FIELDS.user, ...RESTRICTION_FIELDS.agent];
   return all.find((f) => f.key === key)?.kind ?? "number";
};

const emptyForm = (type: PlanType = "user"): FormState => ({
   type,
   title: "",
   description: "",
   appleProductId: "",
   amount: "",
   currency: "usd",
   interval: "year",
   active: true,
   planPoints: [],
   restrictions: [],
});

/* =========================================================
 * Helpers
 * ======================================================= */

// planRestrictions object -> rows
const restrictionsToRows = (obj?: PlanRestrictions): RestrictionRow[] => Object.entries(obj ?? {}).map(([key, value]) => ({ key, value: String(value) }));

// rows -> planRestrictions object (sirf number / boolean)
const rowsToRestrictions = (rows: RestrictionRow[]): PlanRestrictions => {
   const out: PlanRestrictions = {};
   rows.forEach(({ key, value }) => {
      const k = key.trim();
      if (!k) return;
      out[k] = getRestrictionKind(k) === "boolean" ? value === "true" : Number(value);
   });
   return out;
};

const labelStyle: CSSProperties = {
   display: "block",
   marginBottom: "0.5rem",
   color: colors.black,
   fontWeight: 600,
   fontSize: "0.95rem",
};

const inputStyle: CSSProperties = {
   width: "100%",
   padding: "0.75rem",
   border: `1px solid ${colors.gray}`,
   borderRadius: "8px",
   fontSize: "1rem",
   outline: "none",
   color: colors.black,
   backgroundColor: colors.white,
   boxSizing: "border-box",
};

const restrictionInputStyle: CSSProperties = {
   ...inputStyle,
   padding: "0.6rem",
   fontSize: "0.9rem",
};

const iconButtonStyle: CSSProperties = {
   backgroundColor: "transparent",
   border: "none",
   cursor: "pointer",
   padding: "0.25rem",
   display: "flex",
   alignItems: "center",
};

/* =========================================================
 * Component
 * ======================================================= */

export default function PlanModal({ isOpen, onClose, editingPlan = null, defaultType = "user" }: PlanModalProps) {
   const [formData, setFormData] = useState<FormState>(emptyForm(defaultType));
   const [currentPoint, setCurrentPoint] = useState<string>("");

   // Handle API (hooks hamesha early return se pehle honi chahiye)
   const { HandleCreatePlan, isLoading } = useCreatePlanHandler();

   // Modal khulne par form ko fill / reset karo
   useEffect(() => {
      if (!isOpen) return;
      if (editingPlan) {
         setFormData({
            type: editingPlan.type || "user",
            title: editingPlan.title || "",
            description: editingPlan.description || "",
            appleProductId: editingPlan.appleProductId || "",
            amount: editingPlan.amount ?? "",
            currency: editingPlan.currency || "usd",
            interval: editingPlan.interval || "year",
            active: editingPlan.active ?? true,
            planPoints: editingPlan.planPoints || [],
            restrictions: restrictionsToRows(editingPlan.planRestrictions),
         });
      } else {
         setFormData(emptyForm(defaultType));
      }
      setCurrentPoint("");
   }, [isOpen, editingPlan, defaultType]);

   // Escape se band
   useEffect(() => {
      if (!isOpen) return;
      const onKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   const set = (patch: Partial<FormState>) => setFormData((prev) => ({ ...prev, ...patch }));

   /* ---------- Type switch ---------- */
   // Restriction keys aur appleProductId type-specific hain, isliye type badalne par reset
   const handleTypeChange = (value: PlanType): void => {
      if (value === formData.type) return;
      set({ type: value, restrictions: [], appleProductId: "" });
   };

   /* ---------- Features ---------- */
   const handleAddPoint = (): void => {
      const value = currentPoint.trim();
      if (!value) return;
      set({ planPoints: [...formData.planPoints, value] });
      setCurrentPoint("");
   };

   const handleRemovePoint = (index: number): void => set({ planPoints: formData.planPoints.filter((_, i) => i !== index) });

   /* ---------- Restrictions ---------- */
   // Key sirf chips se add hoti hai (custom key nahi), boolean ki default value "false"
   const addRestriction = (key: string): void => set({ restrictions: [...formData.restrictions, { key, value: getRestrictionKind(key) === "boolean" ? "false" : "" }] });

   const updateRestrictionValue = (index: number, value: string): void =>
      set({
         restrictions: formData.restrictions.map((r, i) => (i === index ? { ...r, value } : r)),
      });

   const removeRestriction = (index: number): void => set({ restrictions: formData.restrictions.filter((_, i) => i !== index) });

   const unusedSuggestions = RESTRICTION_FIELDS[formData.type].filter((f) => !formData.restrictions.some((r) => r.key === f.key));

   /* ---------- Submit ---------- */
   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const payload: PlanPayload = {
         title: formData.title.trim(),
         description: formData.description.trim(),
         // appleProductId sirf user plan ke payload mein jayegi
         ...(formData.type === "user" ? { appleProductId: formData.appleProductId.trim() } : {}),
         amount: Number(formData.amount),
         currency: formData.currency,
         interval: formData.interval,
         active: formData.active,
         type: formData.type,
         planPoints: formData.planPoints,
         planRestrictions: rowsToRestrictions(formData.restrictions),
      };
      await HandleCreatePlan(payload);
      // onClose();
   };

   return (
      <div
         onClick={onClose}
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
            onClick={(e) => e.stopPropagation()}
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
               <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: colors.black, margin: 0 }}>
                  {editingPlan ? "Edit" : "Add New"} {formData.type === "agent" ? "Agent" : "User"} Plan
               </h2>
               <button type="button" onClick={onClose} aria-label="Close" style={{ ...iconButtonStyle, padding: "0.5rem", justifyContent: "center" }}>
                  <X style={{ width: "24px", height: "24px", color: colors.textColor }} />
               </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: "1.5rem" }}>
               {/* Type Switch (User / Agent) */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Plan Type *</label>
                  <div
                     style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.25rem",
                        padding: "0.25rem",
                        backgroundColor: colors.SecondaryColor,
                        borderRadius: "10px",
                     }}
                  >
                     {PLAN_TYPES.map(({ value, label, Icon }) => {
                        const selected = formData.type === value;
                        return (
                           <button
                              key={value}
                              type="button"
                              onClick={() => handleTypeChange(value)}
                              style={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 gap: "0.5rem",
                                 padding: "0.65rem",
                                 border: "none",
                                 borderRadius: "8px",
                                 cursor: "pointer",
                                 fontSize: "0.95rem",
                                 fontWeight: 600,
                                 backgroundColor: selected ? colors.PrimaryColor : "transparent",
                                 color: selected ? colors.white : colors.textColor,
                                 transition: "all 0.2s ease",
                              }}
                           >
                              <Icon style={{ width: "18px", height: "18px" }} />
                              {label}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Title */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Plan Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => set({ title: e.target.value })} placeholder="Enter plan title" style={inputStyle} />
               </div>

               {/* Description */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={formData.description} onChange={(e) => set({ description: e.target.value })} placeholder="Enter plan description" rows={3} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
               </div>

               {/* Apple Product ID (sirf User plan ke liye) */}
               {formData.type === "user" && (
                  <div style={{ marginBottom: "1.5rem" }}>
                     <label style={labelStyle}>Apple Product ID</label>
                     <input type="text" value={formData.appleProductId} onChange={(e) => set({ appleProductId: e.target.value })} placeholder="Enter Apple product ID" style={inputStyle} />
                  </div>
               )}

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
                     <label style={labelStyle}>Amount (USD) *</label>
                     <input type="number" required min="0" step="0.01" value={formData.amount} onChange={(e) => set({ amount: e.target.value })} placeholder="0" style={inputStyle} />
                  </div>

                  <div>
                     <label style={labelStyle}>Interval *</label>
                     <select value={formData.interval} onChange={(e) => set({ interval: e.target.value as PlanInterval })} style={inputStyle}>
                        {INTERVALS.map((i) => (
                           <option key={i.value} value={i.value}>
                              {i.label}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>

               {/* Active Status */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                     <input type="checkbox" checked={formData.active} onChange={(e) => set({ active: e.target.checked })} style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#38b6ff" }} />
                     <span style={{ color: colors.black, fontWeight: 600, fontSize: "0.95rem" }}>Active Plan</span>
                  </label>
               </div>

               {/* Plan Points */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Plan Features</label>

                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                     <input
                        type="text"
                        value={currentPoint}
                        onChange={(e) => setCurrentPoint(e.target.value)}
                        onKeyDown={(e) => {
                           if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddPoint();
                           }
                        }}
                        placeholder="Add a feature"
                        style={{ ...inputStyle, flex: 1, width: "auto" }}
                     />
                     <button
                        type="button"
                        onClick={handleAddPoint}
                        aria-label="Add feature"
                        style={{
                           padding: "0.75rem 1.25rem",
                           backgroundColor: colors.PrimaryColor,
                           color: colors.white,
                           border: "none",
                           borderRadius: "8px",
                           cursor: "pointer",
                           display: "flex",
                           alignItems: "center",
                        }}
                     >
                        <Plus style={{ width: "20px", height: "20px" }} />
                     </button>
                  </div>

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
                              margin: 0,
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
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                 <Check style={{ width: "16px", height: "16px", color: colors.PrimaryColor }} />
                                 <span style={{ color: colors.textColor, fontSize: "0.9rem" }}>{point}</span>
                              </div>
                              <button type="button" onClick={() => handleRemovePoint(index)} aria-label="Remove feature" style={iconButtonStyle}>
                                 <X style={{ width: "18px", height: "18px", color: colors.danger }} />
                              </button>
                           </div>
                        ))
                     )}
                  </div>
               </div>

               {/* Plan Restrictions (type ke hisaab se allowed keys) */}
               <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>{formData.type === "agent" ? "Agent" : "User"} Restrictions</label>

                  {unusedSuggestions.length > 0 && (
                     <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        {unusedSuggestions.map(({ key }) => (
                           <button
                              key={key}
                              type="button"
                              onClick={() => addRestriction(key)}
                              style={{
                                 padding: "0.35rem 0.75rem",
                                 backgroundColor: colors.white,
                                 color: colors.PrimaryColor,
                                 border: `1px solid ${colors.PrimaryColor}`,
                                 borderRadius: "999px",
                                 fontSize: "0.8rem",
                                 fontWeight: 600,
                                 cursor: "pointer",
                              }}
                           >
                              + {key}
                           </button>
                        ))}
                     </div>
                  )}

                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: colors.SecondaryColor,
                        borderRadius: "8px",
                     }}
                  >
                     {formData.restrictions.length === 0 ? (
                        <p
                           style={{
                              color: colors.textColor,
                              fontSize: "0.9rem",
                              textAlign: "center",
                              padding: "1rem",
                              margin: 0,
                           }}
                        >
                           No restrictions added yet
                        </p>
                     ) : (
                        formData.restrictions.map((row, index) => (
                           <div key={row.key} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                              {/* Key edit nahi ho sakti */}
                              <input
                                 type="text"
                                 value={row.key}
                                 disabled
                                 readOnly
                                 style={{
                                    ...restrictionInputStyle,
                                    backgroundColor: colors.lightGray,
                                    color: colors.textColor,
                                    cursor: "not-allowed",
                                 }}
                              />

                              {/* Value: sirf number ya boolean */}
                              {getRestrictionKind(row.key) === "boolean" ? (
                                 <select value={row.value} onChange={(e) => updateRestrictionValue(index, e.target.value)} style={restrictionInputStyle}>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                 </select>
                              ) : (
                                 <input type="number" required min="0" step="1" value={row.value} onChange={(e) => updateRestrictionValue(index, e.target.value)} placeholder="Enter number" style={restrictionInputStyle} />
                              )}

                              <button type="button" onClick={() => removeRestriction(index)} aria-label="Remove restriction" style={iconButtonStyle}>
                                 <X style={{ width: "18px", height: "18px", color: colors.danger }} />
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
                     onClick={onClose}
                     style={{
                        flex: 1,
                        padding: "0.75rem",
                        backgroundColor: colors.white,
                        color: colors.textColor,
                        border: `2px solid ${colors.gray}`,
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        cursor: "pointer",
                     }}
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={isLoading}
                     style={{
                        flex: 1,
                        padding: "0.75rem",
                        backgroundColor: colors.PrimaryColor,
                        color: colors.white,
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        opacity: isLoading ? 0.7 : 1,
                     }}
                  >
                     {isLoading ? "Saving..." : editingPlan ? "Update Plan" : "Create Plan"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
