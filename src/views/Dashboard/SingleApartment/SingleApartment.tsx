"use client";

import React, { useState } from "react";
import { Bed, Bath, Square, MapPin, Home, Car, Sofa, CheckCircle2, Calendar, DollarSign, Building2, ArrowLeft, Phone, Mail, Share2 } from "lucide-react";
import Image from "next/image";

const colors = {
  PrimaryColor: "#38B6FF",
  SecondaryColor: "#FFFDFE",
  textColor: "#555555",
  textBlue: "#38B6FF",
  white: "#fff",
  black: "#000000",
  gray: "#999999",
};

export interface Apartment {
  _id: string;
  sellerId: string;
  title: string;
  type: "Rent" | "Sale";
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  furnished: "Furnished" | "Semi-Furnished" | "Unfurnished";
  amenities: string[];
  availability: "Available" | "Sold" | "Rented";
  image: string;
  featuredImages: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  balcony: boolean;
  parking: boolean;
  featured: boolean;
  __v: number;
}

// Sample apartment data
const sampleApartment: Apartment = {
  _id: "1",
  sellerId: "agent123",
  title: "Luxury 3 Bedroom Penthouse with Stunning City Views",
  type: "Sale",
  location: "Manhattan, New York, NY 10001",
  price: 2850000,
  area: 2200,
  bedrooms: 3,
  bathrooms: 3,
  floor: 25,
  furnished: "Furnished",
  amenities: ["Swimming Pool", "Fitness Center", "Concierge Service", "24/7 Security", "Rooftop Terrace", "Pet Friendly", "In-unit Laundry", "Central AC", "High-speed Internet", "Storage Space"],
  availability: "Available",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
  featuredImages: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=800&fit=crop",
  ],
  description:
    "Experience luxury living at its finest in this stunning 3-bedroom penthouse located in the heart of Manhattan. This magnificent residence offers breathtaking panoramic city views, floor-to-ceiling windows, and the finest finishes throughout. The open-concept living space features a gourmet kitchen with top-of-the-line appliances, spacious bedrooms with en-suite bathrooms, and a private terrace perfect for entertaining. Building amenities include a state-of-the-art fitness center, swimming pool, 24/7 concierge, and secure parking. This is a rare opportunity to own a piece of New York City luxury.",
  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-02-01T14:20:00.000Z",
  balcony: true,
  parking: true,
  featured: true,
  __v: 0,
};

export default function SingleApartment() {
  const [apartment] = useState<Apartment>(sampleApartment);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "#10B981";
      case "Sold":
        return "#EF4444";
      case "Rented":
        return "#F59E0B";
      default:
        return colors.gray;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.SecondaryColor }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: colors.white,
          padding: "1rem 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray}`,
              borderRadius: "8px",
              cursor: "pointer",
              color: colors.textColor,
              fontSize: "0.95rem",
              fontWeight: "500",
            }}
          >
            <ArrowLeft style={{ width: "20px", height: "20px" }} />
            Back to Listings
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: colors.white,
              border: `1px solid ${colors.PrimaryColor}`,
              borderRadius: "8px",
              cursor: "pointer",
              color: colors.PrimaryColor,
              fontSize: "0.95rem",
              fontWeight: "500",
            }}
          >
            <Share2 style={{ width: "18px", height: "18px" }} />
            Share
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
        {/* Image Gallery */}
        <div style={{ marginBottom: "2rem" }}>
          {/* Main Image */}
          <div
            style={{
              position: "relative",
              height: "500px",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            <Image
              src={apartment.featuredImages[selectedImage]}
              alt={apartment.title}
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {apartment.featured && (
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  backgroundColor: "#FFD700",
                  color: colors.black,
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ⭐ Featured
              </div>
            )}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: getStatusColor(apartment.availability),
                color: colors.white,
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: "700",
              }}
            >
              {apartment.availability}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
            }}
          >
            {apartment.featuredImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  height: "120px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: selectedImage === index ? `3px solid ${colors.PrimaryColor}` : "3px solid transparent",
                  transition: "all 0.3s",
                }}
              >
                <Image
                  src={img}
                  width={200}
                  height={200}
                  alt={`View ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Left Column */}
          <div>
            {/* Title and Location */}
            <div
              style={{
                backgroundColor: colors.white,
                padding: "2rem",
                borderRadius: "12px",
                marginBottom: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: colors.PrimaryColor,
                  color: colors.white,
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                For {apartment.type}
              </div>

              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: colors.black,
                  marginBottom: "1rem",
                  lineHeight: "1.3",
                }}
              >
                {apartment.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: colors.textColor,
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <MapPin style={{ width: "20px", height: "20px", color: colors.PrimaryColor }} />
                {apartment.location}
              </div>

              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: colors.PrimaryColor,
                }}
              >
                {formatPrice(apartment.price)}
                {apartment.type === "Rent" && <span style={{ fontSize: "1.2rem", color: colors.textColor, fontWeight: "500" }}>/month</span>}
              </div>
            </div>

            {/* Key Features */}
            <div
              style={{
                backgroundColor: colors.white,
                padding: "2rem",
                borderRadius: "12px",
                marginBottom: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: colors.black,
                  marginBottom: "1.5rem",
                }}
              >
                Key Features
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Bed style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>{apartment.bedrooms}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>Bedrooms</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Bath style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>{apartment.bathrooms}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>Bathrooms</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Square style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>{apartment.area.toLocaleString()}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>sq ft</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Building2 style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>Floor {apartment.floor}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>Level</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Sofa style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>{apartment.furnished}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>Status</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      backgroundColor: colors.SecondaryColor,
                      padding: "0.8rem",
                      borderRadius: "10px",
                    }}
                  >
                    <Car style={{ width: "24px", height: "24px", color: colors.PrimaryColor }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: colors.black, fontSize: "1.1rem" }}>{apartment.parking ? "Yes" : "No"}</div>
                    <div style={{ color: colors.textColor, fontSize: "0.9rem" }}>Parking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              style={{
                backgroundColor: colors.white,
                padding: "2rem",
                borderRadius: "12px",
                marginBottom: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: colors.black,
                  marginBottom: "1rem",
                }}
              >
                Description
              </h2>
              <p
                style={{
                  color: colors.textColor,
                  lineHeight: "1.8",
                  fontSize: "1rem",
                }}
              >
                {apartment.description}
              </p>
            </div>

            {/* Amenities */}
            <div
              style={{
                backgroundColor: colors.white,
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: colors.black,
                  marginBottom: "1.5rem",
                }}
              >
                Amenities
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {apartment.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      backgroundColor: colors.SecondaryColor,
                      borderRadius: "8px",
                    }}
                  >
                    <CheckCircle2
                      style={{
                        width: "20px",
                        height: "20px",
                        color: colors.PrimaryColor,
                      }}
                    />
                    <span
                      style={{
                        color: colors.textColor,
                        fontSize: "0.95rem",
                      }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
                {apartment.balcony && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      backgroundColor: colors.SecondaryColor,
                      borderRadius: "8px",
                    }}
                  >
                    <CheckCircle2
                      style={{
                        width: "20px",
                        height: "20px",
                        color: colors.PrimaryColor,
                      }}
                    />
                    <span style={{ color: colors.textColor, fontSize: "0.95rem" }}>Balcony</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div>
            <div
              style={{
                backgroundColor: colors.white,
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                position: "sticky",
                top: "100px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: colors.black,
                  marginBottom: "1.5rem",
                }}
              >
                Contact Agent
              </h3>

              <div
                style={{
                  backgroundColor: colors.SecondaryColor,
                  padding: "1.5rem",
                  borderRadius: "10px",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: colors.PrimaryColor,
                    color: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: "600",
                    margin: "0 auto 1rem",
                  }}
                >
                  JD
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: colors.black,
                    marginBottom: "0.5rem",
                  }}
                >
                  John Doe
                </div>
                <div
                  style={{
                    color: colors.textColor,
                    fontSize: "0.9rem",
                  }}
                >
                  Licensed Real Estate Agent
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: colors.PrimaryColor,
                  color: colors.white,
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2A9FE8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.PrimaryColor)}
              >
                <Phone style={{ width: "18px", height: "18px" }} />
                Call Now
              </button>

              <button
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: colors.white,
                  color: colors.PrimaryColor,
                  border: `2px solid ${colors.PrimaryColor}`,
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
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
                <Mail style={{ width: "18px", height: "18px" }} />
                Send Message
              </button>

              <div
                style={{
                  borderTop: `1px solid ${colors.SecondaryColor}`,
                  paddingTop: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                    color: colors.textColor,
                    fontSize: "0.9rem",
                  }}
                >
                  <Calendar style={{ width: "16px", height: "16px" }} />
                  Listed on: {formatDate(apartment.createdAt)}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: colors.textColor,
                    fontSize: "0.9rem",
                  }}
                >
                  <Home style={{ width: "16px", height: "16px" }} />
                  Property ID: {apartment._id}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
