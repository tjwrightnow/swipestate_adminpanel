"use client";

import React, { useState } from "react";
import { Bed, Bath, Square, MapPin, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface Apartment {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  availability: "Available" | "Sold" | "Rented";
}

// Sample data
const apartments: Apartment[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    title: "Luxury 3 Bedroom Apartment",
    location: "Manhattan, New York, NY",
    price: 1850000,
    beds: 3,
    baths: 3,
    area: 1800,
    availability: "Available",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    title: "Modern 2 Bedroom Flat",
    location: "Downtown, Los Angeles, CA",
    price: 925000,
    beds: 2,
    baths: 2,
    area: 1400,
    availability: "Available",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    title: "Spacious 4 Bedroom Penthouse",
    location: "Miami Beach, Florida, FL",
    price: 2750000,
    beds: 4,
    baths: 4,
    area: 2500,
    availability: "Sold",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    title: "Cozy 1 Bedroom Studio",
    location: "Brooklyn, New York, NY",
    price: 485000,
    beds: 1,
    baths: 1,
    area: 800,
    availability: "Rented",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    title: "Premium 3 Bedroom Flat",
    location: "San Francisco, California, CA",
    price: 1950000,
    beds: 3,
    baths: 3,
    area: 2000,
    availability: "Available",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    title: "Beautiful 2 Bedroom Apartment",
    location: "Chicago, Illinois, IL",
    price: 675000,
    beds: 2,
    baths: 2,
    area: 1200,
    availability: "Available",
  },
];

export default function Apartments() {
  const [filterStatus, setFilterStatus] = useState<"All" | "Available" | "Sold" | "Rented">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const filteredApartments = apartments.filter((apt) => {
    const matchesStatus = filterStatus === "All" || apt.availability === filterStatus;
    const matchesSearch = apt.title.toLowerCase().includes(searchQuery.toLowerCase()) || apt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
          padding: "1.5rem 0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: colors.PrimaryColor,
              margin: 0,
            }}
          >
            Agent Property Listings
          </h1>
          <p
            style={{
              color: colors.textColor,
              marginTop: "0.5rem",
            }}
          >
            Find your dream apartment across the United States
          </p>
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
        {/* Search and Filter Bar */}
        <div
          style={{
            backgroundColor: colors.white,
            padding: "1.5rem",
            borderRadius: "12px",
            marginBottom: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Search Input */}
            <div style={{ flex: "1", minWidth: "250px", position: "relative" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.gray,
                  width: "20px",
                  height: "20px",
                }}
              />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  border: `1px solid ${colors.gray}`,
                  borderRadius: "8px",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
            </div>

            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Filter style={{ color: colors.textColor, width: "20px", height: "20px" }} />
              {["All", "Available", "Sold", "Rented"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    backgroundColor: filterStatus === status ? colors.PrimaryColor : colors.white,
                    color: filterStatus === status ? colors.white : colors.textColor,
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "all 0.3s",
                    border: `1px solid ${filterStatus === status ? colors.PrimaryColor : colors.gray}`,
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p
          style={{
            color: colors.textColor,
            marginBottom: "1rem",
            fontSize: "0.95rem",
          }}
        >
          Showing {filteredApartments.length} {filteredApartments.length === 1 ? "property" : "properties"}
        </p>

        {/* Apartment Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredApartments.map((apartment) => (
            <div
              key={apartment.id}
              style={{
                backgroundColor: colors.white,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
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
              {/* Image */}
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <Image
                  src={apartment.image}
                  alt={apartment.title}
                  width={500}
                  height={500}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: getStatusColor(apartment.availability),
                    color: colors.white,
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  {apartment.availability}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.25rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: colors.black,
                    marginBottom: "0.5rem",
                  }}
                >
                  {apartment.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <MapPin style={{ width: "16px", height: "16px", color: colors.textBlue }} />
                  <p
                    style={{
                      color: colors.textColor,
                      fontSize: "0.9rem",
                    }}
                  >
                    {apartment.location}
                  </p>
                </div>

                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: colors.PrimaryColor,
                    marginBottom: "1rem",
                  }}
                >
                  {formatPrice(apartment.price)}
                </div>

                {/* Features */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                    borderTop: `1px solid ${colors.SecondaryColor}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Bed style={{ width: "18px", height: "18px", color: colors.textBlue }} />
                    <span style={{ color: colors.textColor, fontSize: "0.9rem" }}>{apartment.beds} Beds</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Bath style={{ width: "18px", height: "18px", color: colors.textBlue }} />
                    <span style={{ color: colors.textColor, fontSize: "0.9rem" }}>{apartment.baths} Baths</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Square style={{ width: "18px", height: "18px", color: colors.textBlue }} />
                    <span style={{ color: colors.textColor, fontSize: "0.9rem" }}>{apartment.area} sq ft</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  style={{
                    width: "100%",
                    marginTop: "1rem",
                    padding: "0.75rem",
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
                  onClick={() => router.push("/users/single-apartment/1")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredApartments.length === 0 && (
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
              }}
            >
              No apartments found matching your criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
